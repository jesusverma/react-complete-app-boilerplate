import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Card, InputNumber, message } from "antd";
import { isEmpty, startCase } from "lodash";

import ResultModal from "./winner";
import * as UI_UTILS from "./uiUtils";

const cardDetails = {
  spades: {
    number: Array.from(Array(13).keys()),
  },
  diamond: {
    number: Array.from(Array(13).keys()),
  },
  heart: {
    number: Array.from(Array(13).keys()),
  },
  clubs: {
    number: Array.from(Array(13).keys()),
  },
};

class DeckGame extends Component {
  state = {
    players: {},
    cards: cardDetails,
    winner: {},
    playerTurn: undefined,
    totalSequnce: 3,
    totalPlayers: 2,
    pickedCard: undefined,
  };

  handlePlayerTurn = () => {
    let { playerTurn } = this.state;
    if (playerTurn === undefined || playerTurn === 1) playerTurn = 0;
    else playerTurn = 1;
    this.setState({ playerTurn }, () => {
      this.selectSuitCard();
    });
  };

  setPlayerNumber = (pNumber) => {
    let players = {};
    for (let i = 0; i < pNumber; i++) {
      players[`p${i}`] = {
        card: {},
        cardNumber: [],
        inAscending: false,
      };
    }
    this.setState({ players, totalPlayers: pNumber });
  };

  componentDidMount() {
    this.setPlayerNumber(2);
  }

  pickCard = () => {
    const { players } = this.state;
    if (isEmpty(players)) {
      message.error("Players not available");
      return;
    }
    this.handlePlayerTurn();
  };

  selectSuitCard = () => {
    const cardArr = Object.keys(this.state.cards);
    const suit = cardArr[Math.floor(Math.random() * (cardArr.length - 1))];
    this.selectCardFromASuit(suit);
  };

  checkIfCardAlreadySelected = (selectedSuit, selectedCard) => {
    const { players, playerTurn, totalPlayers } = this.state;
    let flag = false;
    if (
      isEmpty(players[`p${playerTurn}`]) ||
      isEmpty(players[`p${playerTurn}`]["card"][selectedSuit])
    )
      return flag;

    for (let i = 0; i < totalPlayers; i++) {
      const playerSelectedCard = players[`p${i}`]["card"][selectedSuit];
      if (!playerSelectedCard) continue;
      if (playerSelectedCard.indexOf(selectedCard) >= 0) {
        flag = true;
        break;
      }
    }

    return flag;
  };

  isSorted = (array) => {
    const limit = array.length - 1;
    for (let i = 0; i < limit; i++) {
      const current = array[i],
        next = array[i + 1];
      if (current > next) {
        return false;
      }
    }
    return true;
  };

  checkForAscending = (cardSeq, totalSequnce) => {
    let arr = [];
    cardSeq.map((c) => {
      arr.push(c.number);
    });
    const last3Turn = arr.slice(-totalSequnce);
    const isAscending = this.isSorted(last3Turn);
    return isAscending;
  };

  selectCardFromASuit = (suit) => {
    let { players, playerTurn, totalSequnce, cards } = this.state;
    let processingPlayer = players;
    let leftCardLength = cards[suit].number.length;

    if (!cards[suit]) {
      this.selectSuitCard();
      return;
    }

    if (!leftCardLength) {
      const { cards } = this.state;
      delete cards[suit];
      this.setState({ cards: { ...cards } }, () => {
        this.selectSuitCard();
        return;
      });
    }
    let selectedCard = Math.floor(Math.random() * (leftCardLength - 1));

    const _player = processingPlayer[`p${playerTurn}`];

    if (isEmpty(_player["card"])) {
      _player["card"] = {
        [suit]: [selectedCard],
      };
    } else if (!_player["card"][suit]) _player["card"][suit] = [selectedCard];
    else _player["card"][suit].push(selectedCard);

    _player["cardNumber"].push({
      number: cards[suit]?.number[selectedCard],
      suit,
    });
    if (cards[suit] && cards[suit].number) {
      cards[suit].number.splice(selectedCard, 1);
    }

    this.setState({
      players: { ...processingPlayer },
      pickedCard: suit + (selectedCard + 1),
      cards: { ...cards },
    });

    if (_player["cardNumber"].length >= totalSequnce)
      _player["inAscending"] = this.checkForAscending(
        _player["cardNumber"],
        totalSequnce
      );

    if (playerTurn === 1 && _player["cardNumber"].length >= totalSequnce)
      this.findWinner();
  };

  findWinner = () => {
    const { players, winner, totalPlayers, cards } = this.state;
    let win = {
      flag: false,
      player: undefined,
    };
    for (let i = 0; i < totalPlayers; i++) {
      if (!players[`p${i}`]["inAscending"]) win.flag = true;
      else win.player = i;
    }

    if (isEmpty(cards)) {
      winner.result = "draw";
    } else if (win.player >= 0) {
      winner.result = win.player + 1;
      this.setState({ winner });
    }
  };

  handleChangeInputField = (e, type) => {
    switch (type) {
      case "PLAYER_NUMBER":
        if (!e && e <= 0) return;
        this.setPlayerNumber(e);
        break;
      default:
        console.log("Not expecting to come here");
    }
  };

  resetGame = () => {
    this.setState({
      players: {},
      cards: cardDetails,
      winner: {},
      playerTurn: undefined,
      totalSequnce: 3,
      totalPlayers: 2,
      pickedCard: undefined,
    });
    this.setPlayerNumber(2);
  };

  render() {
    const {
      pickedCard,
      winner,
      players,
      totalPlayers,
      playerTurn,
    } = this.state;
    return (
      <Card
        style={{
          height: "100vh",
          background: "#eaeaea",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                {/* <InputNumber
                  placeholder="Players Number"
                  type="number"
                  style={{ width: "50%" }}
                  value={totalPlayers}
                  onChange={(e) =>
                    this.handleChangeInputField(e, "PLAYER_NUMBER")
                  }
                /> */}
              </Col>
              <Col
                span={12}
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={this.resetGame} type="danger">
                  Reset Game
                </Button>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "1em",
              }}
            >
              <Col
                span={24}
                style={{
                  textAlign: "center",
                  marginTop: "1em",
                }}
              >
                <Button
                  onClick={this.pickCard}
                  type="primary"
                  // disabled={isEmpty(players)}
                  style={{
                    height: "10vh",
                    borderRadius: "12px",
                  }}
                >
                  Pick Deck Card
                </Button>
              </Col>
            </Row>

            {pickedCard && (
              <Row>
                <Col
                  span={24}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h2> {startCase(pickedCard)}</h2>
                </Col>
              </Row>
            )}

            <Row gutter={2}>
              {[1, 2].map((i) => (
                <UI_UTILS.User
                  playerTurn={playerTurn}
                  playerNum={i}
                ></UI_UTILS.User>
              ))}
            </Row>
            <Row gutter={2}>
              {!isEmpty(players) &&
                Object.keys(players).map((item, index) => {
                  const p = players[item];
                  return (
                    <Col span={12} key={index} style={{ textAlign: "center" }}>
                      {!isEmpty(p.cardNumber) &&
                        p.cardNumber.map((c) => {
                          return (
                            <h3>
                              Player {index + 1} : {startCase(c.suit)} -{" "}
                              {parseInt(c.number) + 1}
                            </h3>
                          );
                        })}
                    </Col>
                  );
                })}
            </Row>

            {!isEmpty(winner) && (
              <ResultModal
                winner={winner}
                resetGame={this.resetGame}
                players={players}
                totalPlayers={totalPlayers}
              ></ResultModal>
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeckGame);
