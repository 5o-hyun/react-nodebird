import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((data, index) => {
        if (data.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hash/${data.slice(1)}`} key={index}>
              <a>{data}</a>
            </Link>
          );
        }
        return data;
      })}
    </div>
  );
};

PostCardContent.proptypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
