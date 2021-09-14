import mongoose from 'mongoose';

const { DATABASE_URL, DATABASE } = process.env;

mongoose.connect(`${DATABASE_URL}/${DATABASE}`, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let database: mongoose.Connection = mongoose.connection;

database.once('open', () => {
  console.log(`Connected to database ${DATABASE}`);
});

database.on('error', () => {
  console.log(`Error connecting to database ${DATABASE}`);
});

mongoose.Promise = global.Promise;

export default mongoose;
