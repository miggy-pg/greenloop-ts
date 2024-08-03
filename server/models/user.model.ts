import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  username: string;
  password: string;
  organization: string;
  city: string;
  province: string;
  image: { public: string; url: string };
  isAdmin: boolean;
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
});

const User = mongoose.model("User", userSchema);

export default User;
