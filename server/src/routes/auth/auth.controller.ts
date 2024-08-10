import { Request, Response, NextFunction } from "express";
import sanitize from "mongo-sanitize";
import passport from "passport";
import { validateLoginInput } from "@middlewares/user.validation";
import { UserDocument } from "@models/user.model";

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Check
  // const checkLoginInputValues = validateLoginInput(req.body);
  // console.log("checkLoginInputValues: ", checkLoginInputValues)

  const { error } = validateLoginInput(req.body);

  // TODO: Check error message so we can use the 2nd code
  if (error) return res.status(400).send({ message: error });
  // if (error) return res.status(400).send({ message: error.details[0].message });

  const sanitizedInput = sanitize<{ username: string; password: string }>(
    req.body
  );
  // TODO: Check values of sanitizedInput
  // console.log("sanitizedInput: ", sanitizedInput);

  // TODO: Create type for info
  passport.authenticate("local", (err: Error, user: UserDocument, info) => {
    if (err) return next(err);

    if (info && info.message === "Missing credentials")
      return res.status(400).send({ message: "[ERROR] Missing credentials" });

    if (!user)
      return res
        .status(400)
        .send({ message: "[ERROR] Invalid email or password" });

    if (!user.isVerified)
      return res.status(401).send({
        message:
          "[ERROR] Your account has not been verified. Please activate your account",
      });
    return;
  });

  return;
};

const postLogout = async (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) res.status(500).send({ message: "[ERROR] Logout failed", err });
  });
  req.sessionId = "";
  req.logout();
  res.status(200).send({ message: "[SUCCESS] Logout success" });
  return;
};
