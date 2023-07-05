import { StopOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  // 반복문안에서 반복문의 데이터를 넘겨줘야할때 고차함수로 써준다.
  const onCancle = (id) => () => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, sx: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" />]}
            onClick={onCancle(item.id)}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    ></List>
  );
};
FollowList.propTypes = {
  header: PropTypes.string.isRequired,
};

export default FollowList;
