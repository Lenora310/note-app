import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { AlertContext } from "../../context/alert/alertContext";
import { FirebaseContext } from "../../context/firebase/firebaseContext";

export const Authentication = () => {
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    // const unsubscribe = auth.
    // console.log("AUTHENT useEffect 1");
    onAuthStateChanged(auth, (currentUser) => {
      firebase.setUser(currentUser);
    });
    // console.log("AUTHENT user", firebase.user);
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert.show("You was successfully logged out", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <div>
      <Button className="btn btn-light" onClick={() => setSignIn(true)}>Sign in</Button>
      <Button className="btn btn-dark" onClick={() => setSignIn(false)}>Sign up</Button>

      {signIn ? <SignIn /> : <SignUp />}

      {firebase.user ? <h1>Hello, {firebase.user.email}</h1> : null}

      <Button className="btn btn-secondary" onClick={logOut}> Sign Out </Button>
    </div>
  );
};
