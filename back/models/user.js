const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        //   id: {},  mysql에 기본적으로 들어있다.
        email: {
          type: DataTypes.STRING(30), // 몇글자정도? STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // true : 선택적 ,false : 필수
          unique: true, // 고유한값
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100), // 비밀번호는 암호화하기떄문에 넉넉하게 남겨놔야함
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        // 이 두개를 써주면 한글저장.
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post); // user는 post를 여러개 가질수있다.
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  }
};

// (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       //   id: {},  mysql에 기본적으로 들어있다.
//       email: {
//         type: DataTypes.STRING(30), // 몇글자정도? STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
//         allowNull: false, // true : 선택적 ,false : 필수
//         unique: true, // 고유한값
//       },
//       nickname: {
//         type: DataTypes.STRING(30),
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING(100), // 비밀번호는 암호화하기떄문에 넉넉하게 남겨놔야함
//         allowNull: false,
//       },
//     },
//     {
//       // 이 두개를 써주면 한글저장.
//       charset: "utf8",
//       collate: "utf8_general_ci",
//     }
//   );
//   User.associate = (db) => {
//     db.User.hasMany(db.Post); // user는 post를 여러개 가질수있다.
//     db.User.hasMany(db.Comment);
//     db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
//     db.User.belongsToMany(db.User, {
//       through: "Follow",
//       as: "Followers",
//       foreignKey: "FollowingId",
//     });
//     db.User.belongsToMany(db.User, {
//       through: "Follow",
//       as: "Followings",
//       foreignKey: "FollowerId",
//     });
//   };
//   return User;
// };

/*
define 뒤가 모델이름 : User . 'User'는 mysql에 가면 자동으로 소문자,복수형이되어 'users' 테이블이 된다.
첫번째 객체는 사용자에게서 받을 객체,
두번째 객체는 기본저장
 */
