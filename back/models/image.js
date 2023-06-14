module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      //   id: {},  mysql에 기본적으로 들어있다.
      src: { type: DataTypes.STRING(200), allowNull: false }, // 이미지는 url이라 엄청길어질수있어 넉넉하게 잡아야함
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
