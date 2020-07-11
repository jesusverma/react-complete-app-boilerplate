import React, { Component } from "react";
import { Modal, Row, Col } from "antd";
import { isEmpty } from "lodash";

class ResultModal extends Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.resetGame();
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    this.props.resetGame();
  };

  render() {
    const { winner, totalPlayers, players } = this.props;
    return (
      <div>
        <Modal
          title="Game Over"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={2}>
            {!isEmpty(players) &&
              Object.keys(players).map((item, index) => {
                const p = players[item];
                return (
                  <Col span={24 / totalPlayers}>
                    {!isEmpty(p.cardNumber) &&
                      p.cardNumber.map((c) => {
                        return (
                          <h3>
                            Player {index + 1} : {c.suit} -{" "}
                            {parseInt(c.number) + 1}
                          </h3>
                        );
                      })}
                  </Col>
                );
              })}
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: winner?.result === "draw" ? "#ff6500" : "#52c41a",
                }}
              >
                {winner?.result === "draw"
                  ? "Match Draw"
                  : `Whooopppp   Player ${winner?.result} won!!!`}
              </h1>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ResultModal;
