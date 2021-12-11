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
    console.log("find book", firebase.books.find((element) => {
      return element.id === bookId;
    }))

    // console.log("book[id]", firebase.books[bookId])
    // console.log("books", typeof firebase.books)
    // console.log("books keys", Object.keys(firebase.books))
    // console.log("books[10]", firebase.books[10])
    // console.log("pages keys", Object.keys(firebase.books[10].pages))
    // console.log("pages[0]", firebase.books[10].pages[0])
    // console.log("pages[-MqddPfCLGXOHwgBY3My]", firebase.books[10].pages["-MqddPfCLGXOHwgBY3My"])

    template.elements.forEach((el) => {
      const oldInstance = document.getElementById(el.elementId);
      if (oldInstance) {
        oldInstance.remove(); 
      }
      addPageElement(el.parentId, el.elementTag, el.elementId, el.html);
    });
  });

  


  return (
    <div>
      <div id={parentId}></div>
      <br />
      <p>Page number: {pageNumber}</p>
    </div>
  );
};
