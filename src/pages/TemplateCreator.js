import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Form } from "../components/form/Form";
// import Collapse from 'react-bootstrap/Collapse'
// import { Collapse } from bootstrap

export const TemplateCreator = () => {
  const draftId = 2345; //todo change the constant

  const firebase = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [elements, setElements] = useState([
    { parentId: 0, elementTag: "div", elementId: draftId, html: "div element" },
  ]);
  const [id, setId] = useState(100);
  const [selected, setSelected] = useState(draftId);
  const [hovered, setHovered] = useState(draftId);
  console.log("rendering...");
  // console.log("rendering... elements=", elements);

  const [showH3input, setshowH3input] = useState(false);
  const [showH1input, setshowH1input] = useState(false);

  const prevState = useRef({ selected, hovered });

  useEffect(() => {
    const prevSelEl = document.getElementById(prevState.current.selected);
    const prevSelLayer = document.getElementById(
      prevState.current.selected + "-layer"
    );
    const selEl = document.getElementById(selected);
    const selLayer = document.getElementById(selected + "-layer");

    prevSelEl.style.removeProperty("background-color");
    prevSelLayer.style.removeProperty("color");

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

    prevHovEl.removeAttribute("style.border");
    prevHovLayer.removeAttribute("style.border");

    prevHovEl.style.removeProperty("border");
    prevHovLayer.style.removeProperty("border");

    hovEl.style.border = "dashed rgba(0,0,255,0.5)";
    hovLayer.style.border = "dashed rgba(0,0,255,0.5)";

    prevState.current.hovered = hovered;
  }, [hovered]);

  // useEffect(() => {
  //   // const prevHovEl = document.getElementById(prevState.current.hovered);
  //   // const prevHovLayer = document.getElementById(
  //   //   prevState.current.hovered + "-layer"
  //   // );
  //   // const hovEl = document.getElementById(hovered);
  //   // const hovLayer = document.getElementById(hovered + "-layer");
  //   // prevHovEl.removeAttribute("style.border");
  //   // prevHovLayer.removeAttribute("style.border");
  //   // prevHovEl.style.removeProperty("border");
  //   // prevHovLayer.style.removeProperty("border");
  //   // hovEl.style.border = "dashed rgba(0,0,255,0.5)";
  //   // hovLayer.style.border = "dashed rgba(0,0,255,0.5)";
  //   // prevState.current.hovered = hovered;
  // }, [elements]);

  function addElement(parentId, elementTag, elementId, html) {
    let parentElement = document.getElementById(parentId);
    let elementToAdd = document.createElement(elementTag);
    elementToAdd.setAttribute("id", elementId);
    elementToAdd.innerHTML = html;
    parentElement.appendChild(elementToAdd);

    setElements([...elements, { parentId, elementTag, elementId, html }]);
  }

  const getNewId = () => {
    setId(id + 1);
    return id;
  };

  const addH1Handler = (value) => {
    const elementId = getNewId();
    addElement(draftId, "h1", elementId, value.trim());
    setshowH1input(false);
  };
  const addH3Handler = (value) => {
    const elementId = getNewId();
    addElement(draftId, "h3", elementId, value.trim());
    setshowH3input(false);
  };
  const saveTemplate = () => {
    firebase
      .addTemplate(title, elements)
      .then(() => {
        alert.show("Template was created", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <div>
      <h3>{title}</h3>
      <Form
        saveValue={setTitle}
        placeholder="Write template title"
      />
      <Button onClick={() => saveTemplate()}>Save template</Button>

      <Container fluid>
        <Row className="template-creator-row">
          <Col className="template-creator-column add-tools">
            <Button onClick={() => setshowH1input(!showH1input)}>Add h1</Button>
            {showH1input ? (
              <Form
                id="addH1Form"
                saveValue={addH1Handler}
                placeholder="Write title"
              />
            ) : null}

            <Button
              onClick={() => addElement(draftId, "input", getNewId(), "input")}
            >
              Add input
            </Button>
            <Button onClick={() => setshowH3input(!showH3input)}>Add h3</Button>
            {showH3input ? (
              <Form
                id="addH3Form"
                saveValue={addH3Handler}
                placeholder="Write h3 title"
              />
            ) : null}

            <Button
              onClick={() => addElement(draftId, "p", getNewId(), "paragraph")}
            >
              Add paragraph
            </Button>
          </Col>

          <Col className="col-8 template-creator-column draft">
            Draft
            <div id={draftId}></div>
          </Col>

          <Col className="template-creator-column layers">
            <div className="card">
              <div class="card-header">
                <strong> Layers </strong>
              </div>

              <ul className="list-group list-group-flush">
                {elements.map((el) => (
                  <li
                    className="list-group-item"
                    id={el.elementId + "-layer"}
                    key={el.elementId}
                    onClick={() => setSelected(el.elementId)}
                    onMouseEnter={() => setHovered(el.elementId)}
                  >
                    <p>
                      <strong>
                        {el.elementId} &nbsp; {el.html}{" "}
                      </strong>
                    </p>
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
