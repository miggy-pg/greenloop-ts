import mongoose from "mongoose";

interface ConversationDocument extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
}

const conversationSchema = new mongoose.Schema<ConversationDocument>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
export { ConversationDocument };
