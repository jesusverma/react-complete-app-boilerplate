import React, { Component, Fragment } from "react";
import "./error.css";
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidUpdate() {
    window.onload = function () {
      document.querySelector(".cont_principal").className =
        "cont_principal cont_error_active";
    };
  }

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    return hasError ? (
      <div class="cont_principal">
        <div
          class="cont_error"
          style={{
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#9294ae",
            }}
          >
            Oops
          </h1>
          <p>
            {" "}
            These are our sins and we are working like hell for you. Please try
            again after sometime.
          </p>
        </div>
        <div class="cont_aura_1"></div>
        <div class="cont_aura_2"></div>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
