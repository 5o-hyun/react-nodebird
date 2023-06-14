module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //   id: {},  mysql에 기본적으로 들어있다.
      name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      // mb4는 이모티콘
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
