import React from "react";
import { Link } from "react-router-dom";

export const Notes = ({ notes, onRemove }) => {
  return (
    <ul className="list-group">
      {notes.map((note) => (
        <Link to={`/books/${note.id}`}>
          <li className="list-group-item note" key={note.id}>
            <div>
              <strong>{note.title}</strong>
              <small>{note.date}</small>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemove(note.id)}
            >
              &times;
            </button>
          </li>
        </Link>
      ))}
    </ul>
  );
};
