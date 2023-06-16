const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 이메일있는지
          const exUser = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!User) {
            return done(null, false, { reason: "존재하지 않는 이메일입니다." }); // done으로 결과판단. (서버에러, 성공여부, 클라이언트에러)
          }
          // 입력한비번과 db에있는비번이 일치하는지. => 일치하면 사용자정보넘기고 일치안하면 에러
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user); // 다 성공하면 여기로
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
