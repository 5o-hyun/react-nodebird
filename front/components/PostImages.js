import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImageZoom from "./ImageZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation" // 스크린리더가 클릭할수는있지만, 굳이클릭하지않아도 된다는 의미.
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div style={{ display: "flex" }}>
        <img
          role="presentation" // 스크린리더가 클릭할수는있지만, 굳이클릭하지않아도 된다는 의미.
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          width="50%"
        />
        <img
          role="presentation" // 스크린리더가 클릭할수는있지만, 굳이클릭하지않아도 된다는 의미.
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
          width="50%"
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        role="presentation" // 스크린리더가 클릭할수는있지만, 굳이클릭하지않아도 된다는 의미.
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
        width="50%"
      />
      <div
        role="presentation"
        style={{
          display: "inline-block",
          width: "50%",
          textAlign: "center",
          verticalAlign: "middle",
          cursor: "pointer",
        }}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </div>
  );
};

export default PostImages;
