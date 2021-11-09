import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export const About = () => {
  const [elements, setElements] = useState([]);
  const [id, setId] =useState(100);

  function addElement(parentId, elementTag, elementId, html) {
    let parentElement = document.getElementById(parentId);
    let elementToAdd = document.createElement(elementTag);
    elementToAdd.setAttribute("id", elementId);
    elementToAdd.innerHTML = html;
    parentElement.appendChild(elementToAdd);

    setElements([...elements, {elementId, html }]);
  
  }
  const getNewId = () => {
    setId(id+1);
    return id;
  }

  return (
    <Container fluid>
      <Row className="template-creator-row">
        <Col className="template-creator-column">
          <Button
            onClick={() => addElement(234567, "h1", getNewId(), "random text")}
          >
            Add h1
          </Button>
          <Button onClick={() => addElement(234567, "input", getNewId(), "input")}>
            Add input
          </Button>
          <Button onClick={() => addElement(234567, "h3", getNewId(), "h3")}>
            Add h3
          </Button>
        </Col>

        <Col className="template-creator-column">
          Draft
          <div id="234567"></div>
        </Col>

        <Col className="template-creator-column">
          Layers
          {elements.map((el) => (
            <p>
              {el.elementId} &nbsp; {el.html}
            </p>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
