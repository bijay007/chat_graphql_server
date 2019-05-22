import mongoose from 'mongoose';

const connectToDB = () => {
  mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true});
  mongoose.connection
    .once('open', () => { console.log('Connected to mongodb.')})
    .on('error', err => { console.log('Connection error: ', err) })
    .once('close', () => { console.log('Connection closed.')})
}

export default connectToDB;
