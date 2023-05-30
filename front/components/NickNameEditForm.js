import React, { useMemo } from "react";
import { Form, Input } from "antd";

const NickNameEditForm = () => {
  const style = useMemo(() => ({
    marginBottom: "20px",
    border: "1px solid #ddd",
    padding: "20px",
  }));
  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NickNameEditForm;
