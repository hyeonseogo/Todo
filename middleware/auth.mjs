import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.mjs";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "토큰 없음" });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "유효하지 않은 토큰" });
    req.user = user;
    next();
  });
}
