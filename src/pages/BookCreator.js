import React, { useState, useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
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
    fetchTemplates().then(() => {
      console.log("B_Creator templates=", templates);
    });
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
        const newElement = addPageElement(el.parentId, el.elementTag, el.elementId, el.html);
        if(el.elementTag==="input"|| el.elementTag==="textarea"){
          newElement.setAttribute("disabled", true);
        }
      });
    }
  }, [selectedTemplate]);

  const createBook = () => {
    addBook(bookTitle, templates[selectedTemplate])
      .then(() => {
        alert.show("Book was created", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <div>
      <h1 className="instruction"> Choose from your templates </h1>

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

      <h1 className="instruction"> or</h1>
      <Link to={{ pathname: `/template_creator` }}>
        <Button>Create new template</Button>
      </Link>
      <br />
      <br />
      <Link to={{ pathname: `/template_loader` }}>
        <Button>Download public template</Button>
      </Link>

      <h1 className="instruction"> Choose a title for your new book</h1>
      <Form saveValue={setBookTitle} placeholder="Write title" />

      <h2 className="instruction">Title: </h2>
      <h2>{bookTitle}</h2>
      <br />
      <br />

      <Button onClick={createBook}>Create new book</Button>
    </div>
  );
};
