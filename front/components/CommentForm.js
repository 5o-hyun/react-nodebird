import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, setCommentText] = useInput();

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea value={commentText} onChange={setCommentText} rows={4} />
      <Button type="primary" htmlType="submit">
        댓글달기
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
