import mongoose from "mongoose";

interface MessageDocument extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  conversationId: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  message: string;
  image: { url: string; public_id: string };
  hasRead: boolean;
}

const messageSchema = new mongoose.Schema<MessageDocument>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  hasRead: {
    type: Boolean,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
