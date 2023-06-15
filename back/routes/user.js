const express = require("express");
const bcypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

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

    const hashedPassword = await bcypt.hash(req.body.password, 12); // 암호화된 비밀번호 'npm i bcypt', 뒤의 12은 10-13사이의 숫자를 넣으며 높을수록 암호화가 쎄짐. 보통 10 or 12
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
