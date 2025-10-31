import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


const secret = process.env.JWT_SECRET;
const expiration = '24hr';

export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }) {
  let token = req.headers.authorization;

  if (!token || req.body.operationName === "AddUser" || req.body.operationName ===  "login") {
    return req.body;
  }

  const verifyToken = jwt.verify(token, secret, (err, vt) => {
    if (err) {
      console.log("Invalid token", err)
      return err;
    } else {
      return vt;
    }
  });

  const loginContext = {data:verifyToken.data};
  return loginContext;
};