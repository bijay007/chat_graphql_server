import mongoose from 'mongoose';
const local_Uri = 'mongodb://localhost:27017/local_chat';

const dbConstructorOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const connectToDB = () => {
  mongoose.connect(process.env.DB_URI || local_Uri, dbConstructorOptions);
  mongoose.connection
    .once('open', () => { console.log('Connected to mongodb.')})
    .once('close', () => { console.log('Connection closed.')})
    .on('error', err => { console.log('Connection error: ', err) })
}

export default connectToDB;
