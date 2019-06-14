import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Chat schema and model
const chatSchema = new Schema({
  id: { type: String },
  senderId: { type: String },
  message: { type: String },
  created: { type: String }
})

const ChatModel = mongoose.model('chat', chatSchema);

export default ChatModel;
