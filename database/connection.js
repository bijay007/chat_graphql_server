import mongoose from 'mongoose';

const connectToDB = () => {
  mongoose.connect('mongodb://localhost:27017/local_chat', {useNewUrlParser: true});
  mongoose.connection
    .once('open', () => { console.log('Connected to mongodb.')})
    .once('close', () => { console.log('Connection closed.')})
    .on('error', err => { console.log('Connection error: ', err) })
}

export default connectToDB;
