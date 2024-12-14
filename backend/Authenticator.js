import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Authenticator = ({ payload,existingUser,res}) => {

  jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
    (err, token) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: 'Login failed' });
        return;
      }
      res.status(200).json({existingUser,token})
      
    }
  );
 
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
     
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};
export  {Authenticator,verifyToken};
