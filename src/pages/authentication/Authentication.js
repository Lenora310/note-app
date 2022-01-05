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
    onAuthStateChanged(auth, (currentUser) => {
      firebase.setUser(currentUser);
    });
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
      {firebase.user ? (
        <div>
          <h2>Hello, {firebase.user.email}</h2>

          <button className="btn btn-secondary" onClick={logOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          {/* <ul className="nav nav-tabs">
            <li className="active">
              <a data-toggle="tab" href="#signIn">
                Sign in
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#signUp">
                Sign up
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div id="signIn" className="tab-pane fade in active">
              <SignIn />
            </div>
            <div id="signUp" className="tab-pane fade">
              <SignUp />
            </div>
          </div> */}

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
