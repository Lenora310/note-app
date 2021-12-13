import React, { useContext, useState, useEffect } from "react";
export const SingIn = () => {
    const submitHandler = () => {};
    return(

        <form className="sign-in-form">
        <h1 className="h3 mb-3 fw-normal">Sign in</h1>

        <div className="form-floating">
          <input
            className="form-control"
            id="floatingInput"
            placeholder="login"
          />
          <label htmlFor="floatingInput">Login</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>

    )
}