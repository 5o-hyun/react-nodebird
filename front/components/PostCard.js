import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover } from "antd";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const id = me?.id; // me가 있으면 id 없으면 undefined

  const [liked, setLiked] = useState();
  const [commentFormOpened, setCommentFormOpened] = useState();

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" onClick={onToggleLike} />
          ) : (
            <HeartOutlined onClick={onToggleLike} />
          ),
          <MessageOutlined onClick={onToggleComment} />,
          <Popover
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  itemLayout="horizontal"
                  title={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.proptypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
