import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const Authenticator = ({ payload, existingUser, res }) => {
  jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
    (err, token) => {
      if (err) {
        console.error('JWT signing error:', err);
        res.status(500).json({ error: 'Login failed' });
        return;
      }
      
      // Create a safe user object without sensitive data
      const safeUser = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        mobile: existingUser.mobile,
        address: existingUser.address
      };
      
      res.status(200).json({ existingUser: safeUser, token });
    }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please login again.' });
      }
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please login again.' });
      }
      return res.status(401).json({ error: 'Invalid token.' });
    }
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    
    req.user = decoded;
    next();
  });
};

export { Authenticator, verifyToken, verifyAdmin };
