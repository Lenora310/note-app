import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    onAuthStateChanged(auth, (currentUser) => {
      firebase.setUser(currentUser);
    });
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert.show("You was successfully logged out", "success");
      })
      .catch((e) => {
        console.log(e);
        alert.show(`Something went wrong: ${e.message}`, "danger");
      });
  };

  return (
    <div className="authentication">
      {firebase.user ? (
        <div>
          <div className="information">
            <h2>Hello, {firebase.user.email}</h2>
            <h3>
              Welcome! To start creating your own notes, go to the book page.
            </h3>

            <button className="btn btn-primary">
              <Link className="book-link" to={{ pathname: `/books` }}>Go to books</Link>
            </button>
          </div>

          <button className="btn btn-secondary sign-out" onClick={logOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-light" onClick={() => setSignIn(true)}>
            Sign in
          </button>
          <button className="btn btn-light" onClick={() => setSignIn(false)}>
            Sign up
          </button>

          {signIn ? <SignIn /> : <SignUp />}
        </div>
      )}
    </div>
  );
};
