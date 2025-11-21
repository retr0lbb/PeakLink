import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hiking-app')
  .then(() => console.log('📍 MongoDB conectado!'))
  .catch(err => console.error('Erro MongoDB:', err));