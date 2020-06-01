import React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "utils/history";
import { connect } from "react-redux";

import * as Actions from "../../Store/action/index";

import { firebaseAuth } from "../../firebase/firebase-auth";

function Login(props) {
  const dispatch = useDispatch();
  console.log("ActionsActions", Actions);
  const googleLogin = async () => {
    await firebaseAuth.signInWithGoogleSocial();
    history.push("/");
  };

  const facebookLogin = async () => {
    await firebaseAuth.signInWithFacebookSocial();
    history.push("/");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(Actions.ShowLoader());
  };

  return (
    <div className="">
      <div>
        <button onClick={googleLogin}>Google Login</button>
        <button onClick={facebookLogin}>Facebook Login</button>
      </div>

      <div>
        <h2>Email Login</h2>
        <form>
          <input type="text" />
          <input type="password" />
          <button onClick={submitForm}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("Stjkebwfklne", state);
  return {};
};

const mapDispatchToProp = (dispatch) => {
  return {
    showLoader: () => dispatch(Actions.ShowLoader()),
    hideLoader: () => dispatch(Actions.HideLoader()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);
