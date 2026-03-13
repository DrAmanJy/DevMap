import mongoose from 'mongoose';

export default async function connectDb() {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
