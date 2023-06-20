const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // deserializeUser : serializeUser가 한번 성공하면 그다음 요청부터는 계속 실행. id를 가지고 서버에서 user를 복구해서 req.user에 넣어줌
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
