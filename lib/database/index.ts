import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async() => {
    if (cached.conn) return cached.connect;

    if (!MONGODB_URI) throw new Error('No MongoDB URI provided');
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'UniVision',
        bufferCommands: false, // Disable mongoose's default behavior of buffering commands until the first document is found
    })

    cached.conn = await cached.promise;
    console.log('hello')

    return cached.conn;
}