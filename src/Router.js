import React, { useEffect, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

import * as Actions from "Store/action/index";
import { penguinGA } from "utils/ga";
import history from "utils/history";
import * as STORAGE from "utils/storage";
import Loader from "components/loader";
import ErrorBoundary from "components/pages/error/errorBoundary";

const Login = React.lazy(() => import("modules/Login"));
const Dashboard = React.lazy(() => import("modules/Dashboard"));
const Error404 = React.lazy(() => import("components/pages/error404"));

function AppRouter(props) {
  const dispatch = useDispatch();

  const isLoggedIn = STORAGE.isLoggedIn();
  useEffect(() => {
    penguinGA.initializeGa();
    penguinGA.trackPage();
    dispatch(Actions.LoadInit());
  }, []);

  const fallback = (
    <div
      style={{
        background: "#850aff",
        color: "#fff",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{
          // height: "100px",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "20rem",
        }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />

            {/* <PrivateRoute
              exact
              path="/author-profile"
              component={AuthProfile}
              isLoggedIn={isLoggedIn}
            /> */}
            <Route path="*" exact={true} component={Error404} />
          </Switch>
        </Router>
        <Loader></Loader>
      </ErrorBoundary>
    </Suspense>
  );
}

const PrivateRoute = React.memo(
  ({ component: Component, isLoggedIn, ...props }) => {
    return (
      <Route
        {...props}
        render={(props) => {
          if (props.path === "/login") {
            return isLoggedIn ? (
              (window.location.href = "/")
            ) : (
              <Component {...props} />
            );
          } else {
            return isLoggedIn ? (
              <Component {...props} />
            ) : (
              (window.location.href = "/login")
            );
          }
        }}
      />
    );
  }
);

const mapStateToProps = (state) => {
  console.log("statestatestatestate", state);
  return {};
};

const mapDispatchToProp = (dispatch) => {
  return {
    showLoader: () => dispatch(Actions.ShowLoader()),
    hideLoader: () => dispatch(Actions.HideLoader()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(AppRouter);
