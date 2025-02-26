import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from './config/env.js';

const secretKey = JWT_SECRET; // Must be the same for signing and verifying

// Sign a token
// const token = jwt.sign({ userId: '12345' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
const newToken = jwt.sign({ userId: '12345' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// Verify the token
try {
    
    console.log('New token:', newToken);
} catch (error) {
  console.error('Invalid signature:', error.message);
}