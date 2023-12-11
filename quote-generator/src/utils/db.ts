import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, DATABASE_NAME } = process.env;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI || !DATABASE_NAME) {
    throw new Error('MongoDB URI or Database name is not defined in env var.');
  }

  try {
    const options = {}; 
    
    return await mongoose.connect(MONGODB_URI, options);
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${error}`);
  }
}