import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/alert/alertContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export const SignUp = () => {
  const alert = useContext(AlertContext);

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCopyValue, setPasswordCopyValue] = useState("");

  const signUp = (event) => {
    event.preventDefault();

    if (!loginValue.trim() || !passwordValue || !passwordCopyValue) {
      alert.show("Fill all fields please");
      return;
    }
    if (passwordValue !== passwordCopyValue) {
      alert.show("Passwords should be the same");
      return;
    }

    createUserWithEmailAndPassword(auth, loginValue, passwordValue)
      .then(() => {
        alert.show("User was created", "success");
      })
      .catch((e) => {
        console.log(e);
        alert.show(`Something went wrong: ${e.message}`, "danger");
      });
  };

  return (
    <form className="sign-up-form" onSubmit={signUp}>
      <h1 className="h3 mb-3 fw-normal">Sign up</h1>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInputSignUp"
          placeholder="login"
          onChange={(event) => setLoginValue(event.target.value)}
        />
        <label htmlFor="floatingInputSignUp">Email</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordSignUp"
          placeholder="Password"
          onChange={(event) => setPasswordValue(event.target.value)}
        />
        <label htmlFor="floatingPasswordSignUp">Password</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPasswordCopySignUp"
          placeholder="Repeat password"
          onChange={(event) => setPasswordCopyValue(event.target.value)}
        />
        <label htmlFor="floatingPasswordCopySignUp">Repeat password</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};
