import express from "express";
import { signup, login } from "../controller/userController.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("아이디는 최소 4자 이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("아이디에 특수문자 사용불가"),
  body("userpw")
    .trim()
    .isLength({ min: 8 })
    .withMessage("비밀번호는 최소 8자 이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

router.post(
  "/signup",
  (req, res, next) => {
    console.log("회원가입 요청 받음");
    next();
  },
  validateSignup,
  signup
);

router.post(
  "/login",
  (req, res, next) => {
    console.log("로그인 요청 받음");
    next();
  },
  validateLogin,
  login
);

export default router;
