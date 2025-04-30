import express from "express";
import { signup, login } from "../controller/userController.mjs";

const router = express.Router();

router.post(
  "/signup",
  (req, res, next) => {
    console.log("회원가입 요청 받음");
    next();
  },
  signup
);

router.post(
  "/login",
  (req, res, next) => {
    console.log("로그인 요청 받음");
    next();
  },
  login
);

export default router;
