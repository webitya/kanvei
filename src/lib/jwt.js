// src/lib/jwt.js
import jwt from 'jsonwebtoken';

export function createJWT(user) {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    process.env.JWT_SECRET, // make sure this is in your .env file
    {
      expiresIn: '7d',
    }
  );

  return token;
}
