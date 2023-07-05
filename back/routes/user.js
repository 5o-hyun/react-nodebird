const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

// 로그인유지
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      // const user = await User.findOne({
      //   where: { id: req.user.id },
      // });
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { excludes: ["password"] },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
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
        console.error(loginErr);
        return next(loginErr);
      }
      // 이미 user가 있는데 또 찾는 이유는, 기존 user에 정보가 부족해서 me.Posts, me.Followers, me.Followings 등등을 추가해 찾으려고함
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { excludes: ["password"] }, // 비밀번호 제외하고 받겠다.
        include: [
          {
            model: Post, // hasMany라서 model:Post가 me.Posts가 됨. models에 있는걸 가져옴
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword); // back : user , saga : action,data , reducer : me
    });
  })(req, res, next);
});
/*  로그인전체흐름 
1. 프론트의 /user/login이 실행 (line:7)
2. 로컬전략에서 email,pw 받아와 (line:8)
3. 로그인을하면 이때 passport/index.js 의 serializeUser실행됨 (line:18)
실행되면, 쿠키랑 user전체정보가아니라 쿠키랑 user id 만 서버에서 들고있게되고 
4. 프론트로 보낼떄 쿠키랑 user정보를 보내줌 (line:42)
 */

router.post("/logout", isLoggedIn, (req, res) => {
  // 쿠키,세션 삭제
  req.logout(() => {});
  req.session.destroy();
  res.send("ok");
});

// 회원가입
router.post("/", isNotLoggedIn, async (req, res) => {
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

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("없는 사람을 차단하려고 하시네요?");
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("없는 사람을 팔로우할수 없습니다.");
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("없는 사람을 언팔로우 할수없습니다.");
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("없는 사람을 언팔로우 할수없습니다.");
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("없는 사람을 언팔로우 할수없습니다.");
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
