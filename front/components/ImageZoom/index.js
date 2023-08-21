import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
} from "./styles";
import { backUrl } from "../../config/config";

const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세이미지</h1>
        <CloseBtn onClick={onClose}></CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0} // 처음 0번째
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)} // 다음페이지로 넘어가게
            infinite // 무한반복
            arrows={false} // 화살표 지움
            slidesToShow={1} // 1장씩 보임
            slidesToScroll={1} // 1장씩 넘기기
          >
            {images.map((image, index) => (
              <ImgWrapper key={index}>
                <img src={`${backUrl}/${image.src}`} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImageZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageZoom;
