import mongoose from 'mongoose';
import PublicChatModel from './chats/publicChat';

const Schema = mongoose.Schema;
// User schema and model
const userSchema = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  chats: { type: [PublicChatModel.schema] }
})

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
