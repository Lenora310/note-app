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

  // const [user, setUser] = useState({});

  useEffect(() => {
    // const unsubscribe = auth.
    console.log("AUTHENT useEffect 1")
    onAuthStateChanged(auth, (currentUser) => {
      firebase.setUser(currentUser)
    //  
    });
    firebase.fetchUsers().then(()=>{
         console.log("AUTHENT users", firebase.users)
      })
    //   firebase.fetchBooks().then(()=>{
    //     // console.log("AUTHENT ", firebase.users)
    //  })
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
  // console.log("auth=", auth)

  return (
    <div>
      <Button onClick={() => setSignIn(true)}>Sign in</Button>
      <Button onClick={() => setSignIn(false)}>Sign up</Button>

      {signIn ? <SignIn /> : <SignUp />}

      <h1>Hello, {firebase.user?.email}</h1>

      <Button onClick={logOut}> Sign Out </Button>
    </div>
  );
};
