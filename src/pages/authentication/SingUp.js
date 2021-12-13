import React, { useContext, useState, useEffect } from "react";
import { AlertContext } from "../../context/alert/alertContext";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
export const SingUp = () => {
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCopyValue, setPasswordCopyValue] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !loginValue.trim() ||
      !passwordValue.trim() ||
      !passwordCopyValue.trim()
    ) {
      alert.show("Fill all fields please");
      return;
    }
    if (passwordValue !== passwordCopyValue) {
      alert.show("Passwords should be the same");
      return;
    }

    firebase
      .addUser(loginValue, passwordValue)
      .then(() => {
        alert.show("User was created", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <form className="sign-up-form" onSubmit={submitHandler}>
      <h1 className="h3 mb-3 fw-normal">Sign up</h1>

      <div className="form-floating">
        <input
          className="form-control"
          id="floatingInput"
          placeholder="login"
          onChange={(event) => setLoginValue(event.target.value)}
        />
        <label htmlFor="floatingInput">Login</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(event) => setPasswordValue(event.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordCopy"
          placeholder="Repeat password"
          onChange={(event) => setPasswordCopyValue(event.target.value)}
        />
        <label htmlFor="floatingPasswordCopy">Repeat password</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};
