import mongoose, { ConnectOptions } from 'mongoose';
import dotenv, { config } from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions); 
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1);
  }
};

export default connectDB;

