import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: 'kanveiproject',
  });

  isConnected = true;
}
