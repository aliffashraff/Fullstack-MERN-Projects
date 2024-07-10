import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected: ' + (await connect).connection.host);
  } catch (error) {
    console.log(`Error connection to databas: ${error.message}`);
    // exit connecting
    process.exit(1);
  }
};

export default connectDB;
