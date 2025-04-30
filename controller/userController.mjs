import { db } from "../data/db.mjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.mjs";

export async function signup(req, res) {
  console.log("회원가입 요청 받음:", req.body);
  const { userid, userpw, name, email } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO users (userid, userpw, name, email) VALUES (?, ?, ?, ?)",
      [userid, userpw, name, email]
    );
    res.status(201).json({ userId: result.insertId });
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { userid, userpw } = req.body;
  const [rows] = await db.query(
    "SELECT * FROM users WHERE userid = ? AND userpw = ?",
    [userid, userpw]
  );
  if (rows.length > 0) {
    const token = jwt.sign(
      { id: rows[0].id, userid: rows[0].userid },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "로그인 성공", token });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
}
