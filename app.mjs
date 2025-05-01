import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./router/userRouter.mjs";
import todoRouter from "./router/todoRouter.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "signuplogin")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "signuplogin", "signup.html"));
});

app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.use(express.static("signuplogin"));

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
