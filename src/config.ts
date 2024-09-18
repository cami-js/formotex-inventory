import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'mongodb+srv://camirivenson07:226452camila@cluster0.psysn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
};

