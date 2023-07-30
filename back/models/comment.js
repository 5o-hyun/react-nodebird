const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        //   id: {},  mysql에 기본적으로 들어있다.
        content: { type: DataTypes.TEXT, allowNull: false },
        // UserId:1,
        // PostId:3,
      },
      {
        modelName: "Comment", // +추가
        tableName: "comments", // +추가
        // mb4는 이모티콘
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize, // +추가
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};

// (sequelize, DataTypes) => {
//   const Comment = sequelize.define(
//     "Comment",
//     {
//       //   id: {},  mysql에 기본적으로 들어있다.
//       content: { type: DataTypes.TEXT, allowNull: false },
//       // UserId:1,
//       // PostId:3,
//     },
//     {
//       // mb4는 이모티콘
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci",
//     }
//   );
//   Comment.associate = (db) => {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//   };
//   return Comment;
// };
