import User from '../models/User.js';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import dotenv from 'dotenv';
dotenv.config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    // Find user in MongoDB
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }

    // Extract roles as array
    const roles = Object.values(foundUser.roles);

    // Compare provided password with hashed password in DB
    const match = await compare(password, foundUser.password);
    if (!match) {
      return res.sendStatus(401);
    }

    // Generate tokens
    const accessToken = sign(
      {
        id: foundUser.id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    // Save refresh token in DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Set secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send access token in response
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Check for duplicate username or email
    const duplicateUser = await User.findOne({ username }).exec();
    const duplicateEmail = await User.findOne({ email }).exec();
    if (duplicateUser || duplicateEmail) {
      return res.status(409).json({ message: 'Username or email already taken' }); // Conflict
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create and store the new user
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: { User: 2001 }
    });

    console.log(`✅ New user created: ${result.username}`);
    res.status(201).json({ message: `New user ${username} created` });
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ message: err.message });
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content if no cookie

  const refreshToken = cookies.jwt;

  try {
    // Find user with matching refresh token in DB
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      // Clear cookie anyway if user not found
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.sendStatus(204);
    }

    // Clear refresh token in DB
    foundUser.refreshToken = '';
    await foundUser.save();

    // Clear cookie on client
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized if no cookie

  const refreshToken = cookies.jwt;

  try {
    // Find user by refreshToken in DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden if no user found

    const roles = Object.values(foundUser.roles);

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403); // Forbidden if token invalid or username mismatch
      }

      const accessToken = sign(
        {
          userInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '120s' }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefreshToken
};