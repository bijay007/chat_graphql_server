import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Private one-to-one chat schema and model
const privateChatSchema = new Schema({
  id: { type: String },
  senderId: { type: String },
  senderName: { type: String },
  receiverId: { type: String },
  receiverName: { type: String },
  message: { type: String },
  created: { type: String }
})

const PrivateChatModel = mongoose.model('privateChat', privateChatSchema);

export default PrivateChatModel;
