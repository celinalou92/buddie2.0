import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const dbURI = process.env.MONGODB_URI || process.env.MONGODB_LOCAL


export const runDBClient = async() => {
  try {
    await mongoose.connect(dbURI).then(() => {
      console.log(`Database Connected!`)
    })
  } catch (error) {
    console.log(`Database Error: ${error}`)
      return error;
  }
};