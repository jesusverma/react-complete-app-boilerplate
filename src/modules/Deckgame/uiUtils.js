import React from "react";
import { UserOutlined } from "@ant-design/icons";

import { Col } from "antd";

export const User = React.memo((props) => (
  <Col
    span={12}
    style={{
      textAlign: "center",
      padding: "1.6em",
    }}
  >
    <UserOutlined
      style={{
        fontSize: "4em",
        color: props.playerNum !== props.playerTurn + 1 ? "#000" : "#e0e0e0",
      }}
    />
    <div>Player {props.playerNum}</div>
  </Col>
));
