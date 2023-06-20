const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv"); // npm i dotenv
const cookieParser = require("cookie-parser"); // npm i cookie-parser

passportConfig(); // passport 설정적용
dotenv.config(); // dotenv 설정적용

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

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // 하위 두개는 왠만하면 false
    saveUninitialized: false,
    resave: false,
  })
);
// 이 부분의 설정은 반드시 세션 뒤에 사용해야한다.
app.use(passport.initialize()); // 요청에 passport설정을 넣는다.
app.use(passport.session()); // req.session에 passport정보를 저장한다.

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
