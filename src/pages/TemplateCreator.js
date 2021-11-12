import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export const TemplateCreator = () => {
  const draftId = 2345;

  const [elements, setElements] = useState([
    { parentId: 0, elementTag: "div", elementId: draftId, html: "div element" },
  ]);
  const [id, setId] = useState(100);
  const [color, setColor] = useState("white");
  const [selected, setSelected] = useState("");
  const [hovered, setHovered] = useState("");
  console.log("rendering...");
  // console.log("rendering... elements=", elements);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
  if (selected) {
    let el = document.styleSheets[0].cssRules[0].style;
    el.removeProperty("background-color");
    // console.log("document=", document.styleSheets);
    // console.log("el=", el);

    // let styles = `#${selected} { color: red }`;
    let element = document.getElementById(selected);
    console.log("element=", element);
    element.style.backgroundColor = "red";

    // let css = document.createElement("style");
    // // css.type = "text/css";

    // // if (css.styleSheet) css.styleSheet.cssText = styles;
    // // else
    // css.appendChild(document.createTextNode(styles));

    // /* Append style to the tag name */
    // element.appendChild(css);
  }
  }, [selected]);

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
  // const changeColor = () => {
  //   // if(color==="white"){
  //   //   setColor("black")
  //   // } else {
  //   //   setColor("white")
  //   // }
  //   const newColor = color === "white" ? "green" : "white";
  //   // console.log(newColor);
  //   setColor(newColor);
  // };

  // const changeColor = (id) => {
  //   setSelected(id);
  // };
  // const changeHoverColor = (id) => {
  //   setHovered(id);
  // };

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
              <li id={el.elementId+"-layer"} key={el.elementId}>
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






            {/* {elements.map((el) => (
              <li id={el.elementId+"-layer"} key={el.elementId}>
                <p
                  style={{
                    color:
                      selected === el.elementId
                        ? "green"
                        : hovered === el.elementId
                        ? "blue"
                        : "",
                  }}
                  onClick={() => changeColor(el.elementId)}
                  onMouseEnter={() => changeHoverColor(el.elementId)}
                  // onMouseLeave={() => changeHoverColor(el.elementId)}
                >
                  <strong>
                    {el.elementId} &nbsp; {el.html}{" "}
                  </strong>
                </p>
              </li>
              // <p>
              //  {el.elementId} &nbsp; {el.html}
              //</p>
              //</div>
            ))} */}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
