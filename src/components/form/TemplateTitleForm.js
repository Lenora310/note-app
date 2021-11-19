import React, { useState, useContext } from "react";
import { AlertContext } from "../../context/alert/alertContext";
// import { FirebaseContext } from "../../context/firebase/firebaseContext";


export const TemplateTitleForm = ({saveValue, placeholder}) => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
//   const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
        saveValue(value.trim());
    } else {
      alert.show("Enter text");
    }
    setValue("")
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      </div>
    </form>
  );
};
