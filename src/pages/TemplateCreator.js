import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export const TemplateCreator = () => {
  const draftId = 2345;

  const [elements, setElements] = useState([
    { parentId: 0, elementTag: "div", elementId: draftId, html: "div element" },
  ]);
  const [id, setId] = useState(100);
  const [selected, setSelected] = useState(draftId);
  const [hovered, setHovered] = useState(draftId);
  console.log("rendering...");
  // console.log("rendering... elements=", elements);

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

    selEl.style.backgroundColor = "green";
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

    hovEl.style.border = "dashed blue";
    hovLayer.style.border = "dashed blue";

    prevState.current.hovered = hovered;
  }, [hovered]);

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

  return (
    <Container fluid>
      <Row className="template-creator-row">
        <Col className="template-creator-column">
          <Button
            onClick={() => addElement(draftId, "h1", getNewId(), "random text")}
          >
            Add h1
          </Button>
          <Button
            onClick={() => addElement(draftId, "input", getNewId(), "input")}
          >
            Add input
          </Button>
          <Button onClick={() => addElement(draftId, "h3", getNewId(), "h3")}>
            Add h3
          </Button>
        </Col>

        <Col className="template-creator-column">
          Draft
          <div id={draftId}></div>
        </Col>

        <Col className="template-creator-column">
          <strong> Layers </strong>
          <ul>
            {elements.map((el) => (
              <li id={el.elementId + "-layer"} key={el.elementId}>
                <p
                  onClick={() => setSelected(el.elementId)}
                  onMouseEnter={() => setHovered(el.elementId)}
                >
                  <strong>
                    {el.elementId} &nbsp; {el.html}{" "}
                  </strong>
                </p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
