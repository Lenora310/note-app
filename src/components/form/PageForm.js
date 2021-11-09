import React, { useState, useContext } from "react";
import { AlertContext } from "../../context/alert/alertContext";
import { FirebaseContext } from "../../context/firebase/firebaseContext";

export const PageForm = ({bookId}) => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
        firebase.addPage(bookId, value.trim()).then( () => {
            alert.show("Page was added", "success");
        }).catch( () => {
          alert.show("Something went wrong", "danger");
        })
    } else {
      alert.show("Enter text");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Write page title"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      </div>
    </form>
  );
};
