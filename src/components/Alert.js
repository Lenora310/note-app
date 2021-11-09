import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";

export const Alert = () => {
  // const alert=useContext(AlertContext) //получаем объект с ключами show, hide и alert,
  //поэтому можно написать по-другому(как ниже) и сразу rozbalit объект по ключам

  const { alert, hide } = useContext(AlertContext); 
  if (!alert.visible) {
    return null;
  }

  return (
    <div className={`alert alert-${alert.type || "warning"} alert-dismissible`}>
      <strong>Holy guacamole!</strong>
      &nbsp;{alert.text}
      <button onClick={hide} type="button" className="close" aria-label="Close">
        <span areia-hidden="true">&times;</span>
      </button>
    </div>
  );
};
