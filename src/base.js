import firebase from "firebase/compat/app"
import { getDatabase } from "firebase/database";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwB18lZrrtt1vLgohhnzVr0ywtOE4SWHY",
  authDomain: "zzan-53b03.firebaseapp.com",
  databaseURL: "https://zzan-53b03-default-rtdb.firebaseio.com",
  projectId: "zzan-53b03",
  storageBucket: "zzan-53b03.appspot.com",
  messagingSenderId: "1037079986705",
  appId: "1:1037079986705:web:bc66c081f3e11f8704e7b0",
  measurementId: "G-PKHN4CN6WR",
};
firebase.initializeApp(firebaseConfig);

export const dbStore = firebase.firestore();
export const db = getDatabase();
export const users = dbStore.collection("users");