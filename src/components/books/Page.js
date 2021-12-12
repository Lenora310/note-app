import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PARENTID } from "../../context/types";
import { addPageElement } from "../../utilities/addPageElement";

export const Page = ({ bookId, pageId }) => {
  const firebase = useContext(FirebaseContext);
  //   const [pages, ] = useState(firebase.books.find((element)=>{return element.id ===bookId}).pages);
  const [template] = useState(firebase.books[bookId].template);

  const parentId = PARENTID;

  const saveInputValue = (event) => {
    firebase.addPageValue(bookId, pageId, event.target.id, event.target.value);
  };

  useEffect(() => {
    template.elements.forEach((el) => {
      const oldInstance = document.getElementById(el.elementId);
      if (oldInstance) {
        oldInstance.remove();
      }
      addPageElement(el.parentId, el.elementTag, el.elementId, el.html);
      if (el.elementTag === "input" || el.elementTag === "textarea" ) {
        document.getElementById(el.elementId).onchange = saveInputValue;
      }
    });
    Object.keys(firebase.books[bookId].pages[pageId].values).forEach(
      (elementId) => {
        const elementToFill = document.getElementById(elementId);
        if (elementToFill) {
          elementToFill.value =
            firebase.books[bookId].pages[pageId].values[elementId];
        }
      }
    );
  });

  return (
    <div>
      <div id={parentId}></div>
    </div>
  );
};
