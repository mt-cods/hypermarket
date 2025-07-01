import jwt from 'jsonwebtoken';
const { verify } = jwt;
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = {};
      req.user.id = decoded.id;
      next();
    }
  );
};

export default verifyJWT;