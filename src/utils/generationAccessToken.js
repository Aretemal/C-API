import jwt from 'jsonwebtoken';

export const generationAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, 'SECRET_KEY_RANDOM', { expiresIn: '24h' });
};
