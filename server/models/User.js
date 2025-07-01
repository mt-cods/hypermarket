import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,   
    trim: true         
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Admin: Number,
  },
  cart: {
    type: Map,
    of: Number,
    default: {}
  },
  refreshToken: String
});

export default mongoose.model('User', userSchema);