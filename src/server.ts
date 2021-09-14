import App from './App';
import mongoose from './config/database';

const server = App.server;

mongoose.connection.on('Error', console.error.bind(console, 'Databse connection error.'));

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Server running in port ${port}`)
});

