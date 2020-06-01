import React, { Component, Fragment } from "react";

class Error404 extends React.Component {
  state = {};

  render() {
    return (
      <div
        style={{
          background: "#850aff",
          color: "#fff",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            // height: "100px",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "14rem",
          }}
        >
          <div
            style={{
              fontSize: "5rem",
            }}
          >
            Oh No...
          </div>
          <div
            style={{
              fontSize: "2rem",
            }}
          >
            The page you're looking for doesn't exist
          </div>
          <div
            style={{
              fontSize: "2rem",
            }}
          >
            <a href="/">Return to Home Page</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
