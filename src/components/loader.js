import React from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";

const type = [
  "blank",
  "balls",
  "bars",
  "bubbles",
  "cubes",
  "cylon",
  "spin",
  "spinningBubbles",
  "spokes",
];

const typeIndex = Math.floor(Math.random() * 8) + 1;

const Loader = ({ color }) => (
  <ReactLoading
    type={type[typeIndex]}
    color={"#000"}
    height={667}
    width={375}
  />
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(Loader);
