import mongoose from 'mongoose';
import PublicChatModel from '../chat/publicChat';
import PrivateChatModel from '../chat/privateChat';

const Schema = mongoose.Schema;
// User schema and model
const userSchema = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  publicChats: { type: [PublicChatModel.schema] },
  privateChats: { type: [PrivateChatModel.schema]} // TODO: convert this into a matrix eg.array of objects containing array of chats (Array<uniqIdSenderReceiver: Array<chats between sender & receiver>>)
})

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
