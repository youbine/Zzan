import React, { createContext, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { users } from "./base";

export const Context = createContext({
  userData: {},
  setUserData: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

export const Provider = (props) => {
  const [userData, setUserData] = useState([]);


  const updateItem = (add) => {
    users.doc(localStorage.getItem("id")).update({
      favorite: firebase.firestore.FieldValue.arrayUnion(add),
    });
  };
  const deleteItem = (index) => {
    users.doc(localStorage.getItem("id")).update({
      favorite: firebase.firestore.FieldValue.arrayRemove(
        userData.favorite[index]
      ),
    });
  };

  const value = {
    userData,
    setUserData,
    updateItem,
    deleteItem,
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
