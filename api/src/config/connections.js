import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const URL = process.env.DB_CONNECTION_STRING || 'mongodb://localhost/NODE_APP';

export default () =>
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
  console.error.bind('Error in db connection');
});

db.on('open', () => {
  console.log('Connection established');
});
