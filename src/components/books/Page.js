import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PARENTID } from "../../context/types";
import { addPageElement } from "../../utilities/addPageElement";

export const Page = ({ bookId, pageNumber }) => {
  const firebase = useContext(FirebaseContext);
  //   const [pages, ] = useState(firebase.books.find((element)=>{return element.id ===bookId}).pages);
  const [template] = useState(
    firebase.books.find((element) => {
      return element.id === bookId;
    }).template
  );

  const parentId = PARENTID;

  const saveInputValue = (inputId) => {};

  useEffect(() => {
    template.elements.forEach((el) => {
      const oldInstance = document.getElementById(el.elementId);
      if (oldInstance) {
        oldInstance.remove(); //.parentNode.removeChild(toRemove);
      }

      addPageElement(el.parentId, el.elementTag, el.elementId, el.html);
      // if (el.elementTag === "input") {
      //   // el.onsubmit = function () {
      //   //   _gaq.push(["_linkByPost", this]);
      //   // };
      //   // document.getElementById(el.elementId).value = "hello";
      // }
    });
    // document.getElementById(PARENTID).value = "QWAQWA";
  });


  return (
    <div>
      <div id={parentId}></div>
      <br />
      <p>Page number: {pageNumber}</p>
    </div>
  );
};
