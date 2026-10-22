import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sree_ethnic_finds';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if MongoDB is not installed locally
    });
    console.log(`🌸 MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`⚠️  Local MongoDB not detected or unreachable: ${error.message}`);
    console.log(`ℹ️  Sree Ethnic Finds will operate in resilient In-Memory Mock Store mode.`);
    console.log(`ℹ️  All API endpoints and admin functions remain 100% operational for testing!`);
    return false;
  }
};
