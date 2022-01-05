import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/alert/alertContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Button } from "react-bootstrap";

export const SignIn = () => {
  const alert = useContext(AlertContext);

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const signIn = (event) => {
    event.preventDefault();

    if (!loginValue.trim() || !passwordValue) {
      alert.show("Fill all fields please");
      return;
    }

    signInWithEmailAndPassword(auth, loginValue, passwordValue)
      .then(() => {
        alert.show("You have successfully logged in", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <form className="sign-in-form" onSubmit={signIn}>
      <h1 className="h1 mb-3 fw-normal">Sign in</h1>

      <div className="form-floating">
        <input
          className="form-control"
          id="floatingInputSignIn"
          placeholder="login"
          onChange={(event) => setLoginValue(event.target.value)}
        />
        <label htmlFor="floatingInputSignIn">Login</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordSignIn"
          placeholder="Password"
          onChange={(event) => setPasswordValue(event.target.value)}
        />
        <label htmlFor="floatingPasswordSignIn">Password</label>
      </div>

      {/* <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div> */}
      <button className="w-100 btn btn-lg btn-primary sign" type="submit">
        Sign in
      </button>
    </form>
  );
};
