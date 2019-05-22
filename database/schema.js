import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Chat schema and model
const chatSchema = new Schema({
  id: { type: String },
  sender: { type: String },
  message: { type: String },
  created: { type: String }
})
const ChatModel = mongoose.model('chat', chatSchema);

module.exports = {
  ChatModel
};