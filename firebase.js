import { FadeInFromBottomAndroidSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";
import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6smWnDa-VOiJ3-SPkuTVsp6DX2aGwBCA",
  authDomain: "signal-clone-app-7092b.firebaseapp.com",
  projectId: "signal-clone-app-7092b",
  storageBucket: "signal-clone-app-7092b.appspot.com",
  messagingSenderId: "943240392493",
  appId: "1:943240392493:web:83ac95c0783c7b3ed0ada4",
  measurementId: "G-LXPPSVTMN6",
};

let app;

if (firebase.apps.length === 0) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
