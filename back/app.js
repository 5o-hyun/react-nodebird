const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv"); // npm i dotenv
const cookieParser = require("cookie-parser"); // npm i cookie-parser
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

passportConfig(); // passport 설정적용
dotenv.config(); // dotenv 설정적용

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "nodebird.com",
      "http://13.124.226.44:3000",
    ],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  // 배포모드
  app.use(morgan("combined")); // combined를 쓰면 사용자의ip라던지 추적이 가능함 (더 자세함)
  // 이거 두개는 보안상 넣어주자. npm i pm2 cross-env helmet app
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
} else {
  // 개발모드
  app.use(morgan("dev"));
}

app.use("/", express.static(path.join(__dirname, "uploads")));
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

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.listen(80, () => {
  console.log("서버 실행중");
});
