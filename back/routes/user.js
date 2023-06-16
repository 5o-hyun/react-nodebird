const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 서버에러있으면
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트에러있으면
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/", async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 암호화된 비밀번호 'npm i bcrypt', 뒤의 12은 10-13사이의 숫자를 넣으며 높을수록 암호화가 쎄짐. 보통 10 or 12
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error); // 에러를 next에 보내주면 브라우저에 에러가뜸 500
  }
});

module.exports = router;
