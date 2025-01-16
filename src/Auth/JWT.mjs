import jwt from "jsonwebtoken";

export const tokenGenerator = (paload) => {
  const token = jwt.sign(paload, "myKey");
  return token;
};

export const decodeToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, "myKey");
  return payload;
};

