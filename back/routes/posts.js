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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
