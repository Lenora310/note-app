import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
    <div className="navbar-brand">Note App</div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>
          Books
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/template_creator">
          Create template
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/template_loader">
          Download template
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/authentication">
          Authentication
        </NavLink>
      </li>
    </ul>
  </nav>
);
