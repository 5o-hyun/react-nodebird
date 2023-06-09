import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef(); // ref는 실제 DOM에 접근하기 위해 사용됨

  const [text, onChangeText, setText] = useInput("");
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: "19px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          multiple
          style={{ visibility: "hidden" }}
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          쨲쨲
        </Button>
      </div>
      <div>
        {imagePaths.map((imagePath) => (
          <div key={imagePath.id} style={{ display: "inline-block" }}>
            <img src={imagePath} style={{ width: "200px" }} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
