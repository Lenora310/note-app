import React, {useState, useContext, useEffect } from "react";
import { Page } from "./Page";
import Modal from "react-bootstrap/Modal";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PageForm } from "../form/PageForm";
import { Button } from "react-bootstrap";

export const Book = (props) => {
  const firebase = useContext(FirebaseContext);
  const { addBookPage } = useContext(FirebaseContext);

  const [id] = useState(props.match.params.id);

  const [pages, setPages] = useState(
    firebase.books.find((element) => {
      return element.id === id;
    }).pages
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const previousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== Object.keys(pages).length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const addPage = () => {
    addBookPage(id);

    setPages(
      firebase.books.find((element) => {
        return element.id === id;
      }).pages
    );

    // setCurrentPage(Object.keys(pages).length);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  // console.log("pages DO addPage:", pages);
  // console.log("pages PO addPage:", pages);
  // console.log("pages total:", pages);
  // console.log("currentPage:", currentPage);

  // console.log("pages,length:", pages.length);
  // console.log("FB", firebase);

  // const { loading, notes, fetchNotes, removeNote, books, fetchBooks } =
  //   useContext(FirebaseContext);

  // useEffect(() => {

  //   firebase.fetchBooks();
  //   //eslint-disable-next-line
  // });

  // useEffect(() => {
  //   console.log("pages,length:", Object.keys(pages).length);
  //   setCurrentPage(Object.keys(pages).length);
  //   //eslint-disable-next-line
  // }, firebase.books);

  // useEffect(() => {
  //   fetchNotes();
  //   fetchBooks();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <h1>I am a book with id {id} </h1>

      <br />
      <Button onClick={previousPage}>Previous</Button>
      <br />
      <br />

      <Page pageNumber={currentPage} bookId={id} />

      <br />
      <br />
      <Button onClick={nextPage}>Next</Button>
      <br />
      <br />
      <Button onClick={addPage}>Add new page</Button>

      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Create a new page!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PageForm bookId={id}></PageForm>
          {/* <form onSubmit={handleSubmit}>
              <input value={state.modalInput} onChange={handleModalInputChange}/>
              <button type="submit">Submit</button>
          </form> */}
        </Modal.Body>

        <Modal.Footer>
          <button variant="secondary" onClick={hideModal}>
            Close
          </button>
          {/* <button variant="primary" onClick={saveNewPage}>
            Save Changes
          </button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};