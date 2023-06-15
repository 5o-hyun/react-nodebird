const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

app.use(cors({ origin: "*" }));
// 프론트에서 보낸 데이터를 req.body에 넣어주기위해 이 두가지 작성. (routes의 req.body사용하기위해, get,post등보다 위에 적어야함 *위치중요)
app.use(express.json()); // 프론트의 json을 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // form데이터는 urlencoded방식으로 넘어와서 넣어줌

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
