import jwt from 'jsonwebtoken';

export const generateAccessTokens = () => {
  const accessToken = jwt.sign('', process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
  return accessToken;
};

export const generateRefreshTokens = () => {
  const refreshToken = jwt.sign('', process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
  return refreshToken;
};
