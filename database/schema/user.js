import mongoose from 'mongoose';
import ChatModel from './chat';

const Schema = mongoose.Schema;
// User schema and model
const userSchema = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  chats: { type: [ChatModel.schema] }
})

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
