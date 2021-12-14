import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { AlertContext } from "../../context/alert/alertContext";


export const Authentication = () => {
  const alert = useContext(AlertContext)
  ;
  const [signIn, setSignIn] = useState(false);

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logOut = () => {
    signOut(auth).then(() => {
      alert.show("You was successfully logged out", "success");
    })
    .catch(() => {
      alert.show("Something went wrong", "danger");
    });
  };
  

  return (
    <div>
      <Button onClick={() => setSignIn(true)}>Sign in</Button>
      <Button onClick={() => setSignIn(false)}>Sign up</Button>

      {signIn ? <SignIn /> : <SignUp />}

      <h1>Hello, {user?.email}</h1>

      <Button onClick={logOut}> Sign Out </Button>
    </div>
  );
};
