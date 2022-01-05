import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PARENT_ID } from "../../context/types";
import { addPageElement } from "../../utilities/addPageElement";

export const Page = ({ bookId, pageId }) => {
  const firebase = useContext(FirebaseContext);
  const [template] = useState(firebase.books[bookId].template);

  const saveInputValue = (event) => {
    firebase.addPageValue(bookId, pageId, event.target.id, event.target.value);
  };

  useEffect(() => {
    const parent = document.getElementById(PARENT_ID);
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    template.elements.forEach((el) => {
      addPageElement(el.parentId, el.elementTag, el.elementId, el.html);
      if (el.elementTag === "input" || el.elementTag === "textarea") {
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
      <div className="book-page" id={PARENT_ID}></div>
    </div>
  );
};
