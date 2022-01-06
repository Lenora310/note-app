import React, { useState, useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "../components/form/Form";
import { AlertContext } from "../context/alert/alertContext";
import { PARENT_ID } from "../context/types";
import { addPageElement } from "../utilities/addPageElement";

export const BookCreator = () => {
  const { templates, fetchTemplates, addBook } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [bookTitle, setBookTitle] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const prevState = useRef({ selectedTemplate });

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const prevSelEl = document.getElementById(
      prevState.current.selectedTemplate
    );
    if (prevSelEl) {
      prevSelEl.classList.remove("active");
    }
    const selEl = document.getElementById(selectedTemplate);
    if (selEl) {
      selEl.classList.add("active");
    }
    prevState.current.selectedTemplate = selectedTemplate;
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedTemplate) {
      const parent = document.getElementById(PARENT_ID);
      while (parent.firstChild) {
        parent.firstChild.remove();
      }

      templates[selectedTemplate].elements.forEach((el) => {
        const newElement = addPageElement(
          el.parentId,
          el.elementTag,
          el.elementId,
          el.html
        );
        if (el.elementTag === "input" || el.elementTag === "textarea") {
          newElement.setAttribute("disabled", true);
        }
      });
    }
  }, [selectedTemplate]);

  const createBook = () => {
    if (!selectedTemplate || !bookTitle) {
      alert.show("Please select template and write title");
      return;
    }
    addBook(bookTitle, templates[selectedTemplate])
      .then(() => {
        alert.show("Book was created", "success");
      })
      .catch((e) => {
        console.log(e);
        alert.show(`Something went wrong: ${e.message}`, "danger");
      });
  };

  return (
    <div>
      <Link to={{ pathname: `/books` }}>
        <button type="button" className="btn btn-secondary">
          Back to your books
        </button>
      </Link>

      <h1 className=""> Book creation</h1>

      <h2 className="text-info"> Choose from your templates </h2>

      <Container fluid>
        <Row>
          <Col className="public-templates-list">
            <div className="list-group" role="tablist">
              {Object.keys(templates).map((id) => (
                <button
                  key={id}
                  id={id}
                  type="button"
                  className="list-group-item list-group-item-action"
                  role="tab"
                  data-bs-toggle="list"
                  onClick={() => setSelectedTemplate(id)}
                >
                  {templates[id].title}
                </button>
              ))}
            </div>
          </Col>

          <Col className="col-8 template-preview">
            <div>
              <div id={PARENT_ID}></div>
            </div>
          </Col>
        </Row>
      </Container>

      <h2 className="text-info"> or</h2>
      <Link to={{ pathname: `/template_creator` }}>
        <button type="button" className="btn btn-primary">
          Create new template
        </button>
      </Link>

      <Link to={{ pathname: `/template_loader` }}>
        <button type="button" className="btn btn-primary">
          Download public template
        </button>
      </Link>

      <h2 className="text-info"> Choose a title for your new book</h2>
      <Form saveValue={setBookTitle} placeholder="Write title" />

      <h2 className="text-info">Title: </h2>
      <h2>{bookTitle}</h2>

      <button type="button" className="btn btn-primary" onClick={createBook}>
        Create new book
      </button>
    </div>
  );
};
