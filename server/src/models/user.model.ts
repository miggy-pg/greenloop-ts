import mongoose from "mongoose";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

interface UserDocument extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  username: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  organization: string;
  city: string;
  province: string;
  image: { public: string; url: string };
  isAdmin: boolean;
  expires?: Date;
  token: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "[ERROR] Please add a username"],
    unique: true,
    minlength: 8,
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, "[ERROR] Please add an email"],
    unique: true,
    minlength: 30,
    maxlength: 100,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: [true, "[ERROR] Please add a password"],
    minlength: 8,
    maxlength: 300,
  },
  passwordResetToken: {
    type: String,
    default: "",
  },
  passwordResetExpires: {
    type: Date,
    default: dayjs().toDate(),
  },
  organization: {
    type: String,
    maxlength: 50,
  },
  city: {
    type: String,
    maxlength: 50,
  },
  province: {
    type: String,
    maxlength: 50,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  isAdmin: {
    type: Boolean,
  },
  token: {
    type: String,
    minlength: 150,
    maxlength: 300,
  },
  expires: {
    type: Date,
    default: dayjs().toDate(),
    expires: 43200,
  },
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hashedPassword) => {
        if (err2) {
          reject(err2);
          return;
        }
        // TODO: Check for differences between these two
        this.password = hashedPassword;
        // this.set("password", hashedPassword);
        // this.save();
        resolve(hashedPassword);
      });
    });
  });
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
