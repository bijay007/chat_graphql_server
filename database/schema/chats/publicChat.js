import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Public chat schema and model
const publicChatSchema = new Schema({
  id: { type: String },
  senderId: { type: String },
  senderName: { type: String },
  message: { type: String },
  created: { type: String }
})

const PublicChatModel = mongoose.model('publicChat', publicChatSchema);

export default PublicChatModel;
