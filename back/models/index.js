const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 환경변수 기본값으로 development. 나중에 배포시 production || development로 바꿔 배포용일땐 production써준다
const config = require("../config/config")[env]; // config의 development를 가져온다.
const db = {};

// 시퀄라이즈에 이 정보를 보내면 mysql2드라이버에 들어가서 mysql과 노드를 연결할수있게된다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db 빈 배열에 만든 테이블 import
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// db에 associate 한것들 반복돌리며 import
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db에 시퀄라이즈 넣음
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
