module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      //   id: {},  mysql에 기본적으로 들어있다.
      content: { type: DataTypes.TEXT, allowNull: false },
      // UserId:1,
      // PostId:3,
    },
    {
      // mb4는 이모티콘
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
