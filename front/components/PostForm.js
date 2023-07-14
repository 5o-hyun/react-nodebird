import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import {
  addPost,
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from "../reducers/post";

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
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p); // req.body.image
    });
    formData.append("content", text); // req.body.content
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

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
          name="image"
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          게시하기
        </Button>
      </div>
      <div>
        {imagePaths.map((imagePath, index) => (
          <div key={imagePath} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${imagePath}`}
              style={{ width: "200px" }}
            />
            <div>
              <Button onClick={onRemoveImage(index)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
