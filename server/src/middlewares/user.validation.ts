import Joi from "joi";
import { UserDocument } from "@models/user.model";

const validateLoginInput = (
  input: Pick<UserDocument, "username" | "password">
) => {
  const schema = Joi.object({
    username: Joi.string().min(8).max(40).required(),
    password: Joi.string().min(8).max(300).required(),
  });

  return schema.validate(input);
};

export { validateLoginInput };
