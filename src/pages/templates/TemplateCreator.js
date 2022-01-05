import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { AlertContext } from "../../context/alert/alertContext";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Form } from "../../components/form/Form";
import { addPageElement } from "../../utilities/addPageElement";
import { PARENT_ID } from "../../context/types";

export const TemplateCreator = () => {
  const draftId = 2345; //todo change the constant

  const firebase = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState(false);

  const elementsInit = {
    parentId: PARENT_ID,
    elementTag: "div",
    elementId: draftId,
    html: "",
  };
  const [elements, setElements] = useState([elementsInit]);

  const [id, setId] = useState(100);
  const [selected, setSelected] = useState(draftId);
  const [hovered, setHovered] = useState(draftId);

  const [showParagraphInput, setshowParagraphInput] = useState(false);
  const [showH3input, setshowH3input] = useState(false);

  const prevState = useRef({ selected, hovered });
  useEffect(() => {
    if (elements.length === 0) {
      addElement(
        elementsInit.parentId,
        elementsInit.elementTag,
        elementsInit.elementId,
        elementsInit.html
      );
    }
  }, [elements]);

  useEffect(() => {
    const prevSelEl = document.getElementById(prevState.current.selected);
    const prevSelLayer = document.getElementById(
      prevState.current.selected + "-layer"
    );
    const selEl = document.getElementById(selected);
    const selLayer = document.getElementById(selected + "-layer");

    if (prevSelEl && prevSelLayer) {
      prevSelEl.style.removeProperty("background-color");
      prevSelLayer.style.removeProperty("color");
    }

    selEl.style.backgroundColor = "rgba(0,255,0,0.2)";
    selLayer.style.color = "green";

    prevState.current.selected = selected;
  }, [selected]);

  useEffect(() => {
    const prevHovEl = document.getElementById(prevState.current.hovered);
    const prevHovLayer = document.getElementById(
      prevState.current.hovered + "-layer"
    );
    const hovEl = document.getElementById(hovered);
    const hovLayer = document.getElementById(hovered + "-layer");

    if (prevHovEl && prevHovLayer) {
      prevHovEl.style.removeProperty("border");
      prevHovLayer.style.removeProperty("border");
    }

    hovEl.style.border = "dashed rgba(0,0,255,0.5)";
    hovLayer.style.border = "dashed rgba(0,0,255,0.5)";

    prevState.current.hovered = hovered;
  }, [hovered]);

  const addElement = (parentId, elementTag, elementId, html) => {
    addPageElement(parentId, elementTag, elementId, html);
    setElements([...elements, { parentId, elementTag, elementId, html }]);
  };

  const deleteElement = (event, elementId) => {
    event.stopPropagation();
    document.getElementById(elementId).remove();
    setElements(
      elements.filter(
        (el) => el.elementId !== elementId && el.parentId !== elementId
      )
    );
  };

  const getNewId = () => {
    setId(id + 1);
    return id;
  };

  const addH3Handler = (value) => {
    const elementId = getNewId();
    addElement(draftId, "h3", elementId, value.trim());
    setshowH3input(false);
  };
  const addParagraphHandler = (value) => {
    const elementId = getNewId();
    addElement(draftId, "p", elementId, value.trim());
    setshowParagraphInput(false);
  };
  const saveTemplate = () => {
    firebase
      .addTemplate(title, elements, publish)
      .then(() => {
        alert.show("Template was created", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <div>
      <h1>Create template</h1>
      <h3>{title}</h3>
      <Form saveValue={setTitle} placeholder="Write template title" />
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={() => setPublish(!publish)}
        />
        <label className="form-check-label" for="flexCheckDefault">
          Publish template
        </label>
      </div>
      <Button className="btn-save" onClick={() => saveTemplate()}>
        Save template
      </Button>

      <Container fluid>
        <Row className="template-creator-row">
          <Col className="template-creator-column add-tools">
            <Button
              className="add-tool"
              onClick={() => setshowH3input(!showH3input)}
            >
              Add h3
            </Button>
            {showH3input ? (
              <Form
                id="addH3Form"
                saveValue={addH3Handler}
                placeholder="Write title"
              />
            ) : null}

            <Button
              className="add-tool"
              onClick={() => addElement(draftId, "input", getNewId(), "input")}
            >
              Add input
            </Button>
            <Button
              className="add-tool"
              onClick={() => setshowParagraphInput(!showParagraphInput)}
            >
              Add paragraph
            </Button>
            {showParagraphInput ? (
              <Form
                id="addParagraphForm"
                saveValue={addParagraphHandler}
                placeholder="Write paragraph title"
              />
            ) : null}

            {/* <Button
              className="add-tool"
              onClick={() => addElement(draftId, "p", getNewId(), "paragraph")}
            >
              Add paragraph
            </Button> */}

            <Button
              className="add-tool"
              onClick={() => addElement(draftId, "textarea", getNewId(), "")}
            >
              Add text area
            </Button>
          </Col>

          <Col className="col-8 template-creator-column draft">
            Draft
            <div id={PARENT_ID}>
              <div id={draftId}></div>
            </div>
          </Col>

          <Col className="template-creator-column layers">
            <div className="card">
              <div className="card-header">
                <strong> Layers </strong>
              </div>

              <ul className="list-group list-group-flush">
                {elements.map((el) => (
                  <li
                    className="list-group-item"
                    id={el.elementId + "-layer"}
                    key={el.elementId}
                    onClick={() => {
                      setSelected(el.elementId);
                    }}
                    onMouseEnter={() => {
                      setHovered(el.elementId);
                    }}
                  >
                    {el.elementId === draftId ? (
                      <strong>All elements</strong>
                    ) : (
                      <strong>
                        {el.elementId} &nbsp; {el.elementTag}{" "}
                      </strong>
                    )}

                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={(event) => {
                        deleteElement(event, el.elementId);
                      }}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
