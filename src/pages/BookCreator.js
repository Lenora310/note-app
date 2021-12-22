import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "../components/form/Form";
import { AlertContext } from "../context/alert/alertContext";

export const BookCreator = () => {
  const { templates, fetchTemplates, addBook, user } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const [templateId, setTemplateId] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line
  }, []);

  const chooseTemplate = (id) => {
    setTemplateId(id);
  };
  const createBook = () => {
    addBook(user.uid, bookTitle, templates.find(el => el.id===templateId))
      .then(() => {
        alert.show("Book was created", "success");
      })
      .catch(() => {
        alert.show("Something went wrong", "danger");
      });
  };

  return (
    <div>
      <h1 className="instruction"> Choose template </h1>

      <div className="list-group" role="tablist">
        {templates.map((template) => (
          <button
          key={template.id}
            type="button"
            className="list-group-item list-group-item-action"
            role="tab"
            data-bs-toggle="list"
            onClick={() => chooseTemplate(template.id)}
          >
            {template.title}
          </button>
        ))}
      </div>

      <h1 className="instruction"> or</h1>
      <Link to={{ pathname: `/template_creator` }}>
        <Button>Create new template</Button>
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
