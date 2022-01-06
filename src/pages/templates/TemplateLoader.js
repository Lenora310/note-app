import React, { useState, useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Col, Container, Row } from "react-bootstrap";
import { AlertContext } from "../../context/alert/alertContext";
import { addPageElement } from "../../utilities/addPageElement";
import { PARENT_ID } from "../../context/types";

export const TemplateLoader = () => {
  const { publicTemplates, fetchPublicTemplates, downloadPublicTemplate } =
    useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchPublicTemplates();
    // eslint-disable-next-line
  }, []);

  const prevState = useRef({ selected });


  useEffect(() => {
    const prevSelEl = document.getElementById(prevState.current.selected);
    if (prevSelEl) {
      prevSelEl.classList.remove("active");
    }
    const selEl = document.getElementById(selected);
    if (selEl) {
      selEl.classList.add("active");
    }
    prevState.current.selected = selected;
  }, [selected]);

  useEffect(() => {
    if (selected) {
      const parent = document.getElementById(PARENT_ID);
      while (parent.firstChild) {
        parent.firstChild.remove();
      }

      publicTemplates[selected].elements.forEach((el) => {
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
  }, [selected]);
  const downloadTemplate = () => {
    if(!selected){
      alert.show("Please select template");
      return;
    }
    downloadPublicTemplate(selected)
      .then(() => {
        alert.show("Template was successfully downloaded", "success");
      })
      .catch((e) => {
        console.log(e);
        alert.show(`Something went wrong: ${e.message}`, "danger");
      });
  };

  return (
    <div>
      <h1>Download public template</h1>
      <Container fluid>
        <Row>
          <Col className="public-templates-list">
            <div className="list-group" role="tablist">
              {Object.keys(publicTemplates).map((id) => (
                <button
                  key={id}
                  id={id}
                  type="button"
                  className="list-group-item list-group-item-action"
                  role="tab"
                  data-bs-toggle="list"
                  onClick={() => setSelected(id)}
                >
                  {publicTemplates[id].title}
                </button>
              ))}
            </div>
          </Col>

          <Col className="col-8 template-preview-column">
            <div>
              {selected ? (
                <div>
                  <h3 className="text-info">Overview</h3>
                  <h2>{publicTemplates[selected].title}</h2>
                </div>
              ) : null}

              <div className="template-preview" id={PARENT_ID}></div>
            </div>
          </Col>
        </Row>
      </Container>
      <button type="button" className="btn btn-primary" onClick={downloadTemplate}>Download template</button>
    </div>
  );
};
