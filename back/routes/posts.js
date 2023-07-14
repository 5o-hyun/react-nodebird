const express = require("express");
const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, // 한번에 n개 가져오기
      order: [
        ["createdAt", "DESC"], // post 최신글부터가져오기 (내림차순)
        [Comment, "createdAt", "DESC"], // 댓글 최신글부터가져오기 (내림차순)
      ],
      include: [
        { model: User, attribute: ["id", "nickname"] },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attribute: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attribute: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
