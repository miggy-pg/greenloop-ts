import mongoose from "mongoose";

interface WasteDocument extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  image: { public_id: string; url: string };
  userId: mongoose.Schema.Types.ObjectId;
  available: boolean;
  category: string;
  details: string;
}

const wasteSchema = new mongoose.Schema<WasteDocument>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    public_id: {
      type: String,
      required: [true, "[ERROR] Please upload an image"],
    },
    url: {
      type: String,
      required: [true, "[ERROR] Please upload an image"],
    },
  },
  available: {
    type: Boolean,
    default: false,
  },
  details: {
    type: String,
    required: [true, "[ERROR] Please write something about the waste"],
    maxlength: 200,
  },
  category: {
    type: String,
    required: [true, "[ERROR] Please select a category"],
  },
});

const Waste = mongoose.model("Waste", wasteSchema);

export default Waste;
