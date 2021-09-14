import jwt from 'jsonwebtoken';
import process from 'process'

export const generateToken = (id: String, email: String) => {

  if (!process.env.SECRET) {
    throw new Error('Impossível criar token.');
  }
  
  const token = jwt.sign(
    { user_id: id, email },
    process.env.SECRET,
    {
      expiresIn: '24h'
    }
  );

  return token;
}