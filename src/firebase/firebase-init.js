import * as firebase from "firebase";
import FIREBASE_CONFIG from "../config/firebase-config";

export const intializeFirebase = () => {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    console.log("firebase initialized successfully", firebase);
  } catch (err) {
    console.error("Error while initializing firebase", err);
  }
};
