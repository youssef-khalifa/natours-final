const dotenv = require('dotenv');
const app = require('./app');
const Mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception....shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

Mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DB connections successful');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection....shutting down');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

