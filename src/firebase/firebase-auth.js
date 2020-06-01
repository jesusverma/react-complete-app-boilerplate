import * as firebase from "firebase";

class FirebaseAuth {
  constructor() {
    this.GOOGLE_AUTH_PROVIDER = new firebase.auth.GoogleAuthProvider();
    this.FACEBOOK_AUTH_PROVIDER = new firebase.auth.FacebookAuthProvider();
  }

  createUser = async (email, password) => {
    let reateUserResp;
    try {
      reateUserResp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("createUser error", err);
      return { success: false, msg: err?.message };
    }

    return { success: true, data: reateUserResp };
  };

  signInWithEmailAndPassword = async (email, password) => {
    let signInWithEmailAndPasswordResp;
    try {
      signInWithEmailAndPasswordResp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("signInWithEmailAndPassword err", err);
      return { success: false, msg: err?.message };
    }
    return { success: true, data: signInWithEmailAndPasswordResp };
  };

  signInWithGoogleSocial = async () => {
    let signInWithGoogleSocialResp;
    try {
      signInWithGoogleSocialResp = await firebase
        .auth()
        .signInWithPopup(this.GOOGLE_AUTH_PROVIDER);
    } catch (err) {
      console.log("signInWithGoogleSocial err", err);
      return { success: false, msg: err?.message };
    }
    return { success: true, data: signInWithGoogleSocialResp };
  };

  signInWithFacebookSocial = async () => {
    let signInWithFacebookSocialResp;
    try {
      signInWithFacebookSocialResp = await firebase
        .auth()
        .signInWithPopup(this.FACEBOOK_AUTH_PROVIDER);
      console.log("signInWithFacebookSocialResp", signInWithFacebookSocialResp);
    } catch (err) {
      console.log("signInWithFacebookSocial err", err);
      return { success: false, msg: err?.message };
    }
    return { success: true, data: signInWithFacebookSocialResp };
  };
}

export const firebaseAuth = new FirebaseAuth();
