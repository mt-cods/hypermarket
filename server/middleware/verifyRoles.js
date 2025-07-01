import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyAdmin = async (req, res, next) => {
  try {
    const ADMIN_NUMBER = process.env.ADMIN_NUMBER;
    
    if (!req?.user?.id) {
      return res.sendStatus(401);
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.sendStatus(401);
    }

    if (String(user.roles?.Admin) !== ADMIN_NUMBER) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.error('Error verifying admin:', error);
    return res.sendStatus(500);
  }
};

export default verifyAdmin;
