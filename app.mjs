import express from "express";
import userRouter from "./router/userRouter.mjs";
import todoRouter from "./router/todoRouter.mjs";

const app = express();

// express.json()으로 JSON 요청 처리
app.use(express.json());

// 라우터 설정
app.use("/users", userRouter);
app.use("/todos", todoRouter);

// 정적 파일 서빙
app.use(express.static("signuplogin"));

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
