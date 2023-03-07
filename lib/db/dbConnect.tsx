// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//     };

//     mongoose.set('strictQuery', false);
//     try {
//       cached.promise = mongoose.connect(MONGODB_URI, opts);
//       console.log('Successfully connected to MongoDB 🥰');
//     } catch (err) {
//       console.log(err.message);
//     }
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.set('strictQuery', false);

  return mongoose.connect(process.env.MONGODB_URI!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    bufferCommands: false,
  });
};

export default dbConnect;
