import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { SingIn } from "./SingIn";
import { SingUp } from "./SingUp";
export const Authentication = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div>
      <Button onClick={() => setSignIn(true)}>Sing in</Button>
      <Button onClick={() => setSignIn(false)}>Sing up</Button>
      {/* <ul>
        <li className="list-group-item book">
          
        </li>
        <li className="list-group-item book">
         
        </li>
      </ul> */}

      {signIn ? <SingIn /> : <SingUp />}
    </div>
  );
};
