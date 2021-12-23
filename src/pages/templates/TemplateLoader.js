import React, { useState, useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AlertContext } from "../../context/alert/alertContext";
import { addPageElement } from "../../utilities/addPageElement";
import { PARENTID } from "../../context/types";

export const TemplateLoader = () => {
  const { publicTemplates, fetchPublicTemplates } = useContext(FirebaseContext);
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

  return (
    <div>
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

          <Col className="col-8 template-preview">
            <div>
              <div id={PARENTID}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
