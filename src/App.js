import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Books } from "./pages/Books";
import { TemplateCreator } from "./pages/templates/TemplateCreator";
import { Navbar } from "./components/Navbar";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";
import { BookNavigation } from "./components/books/BookNavigation";
import { BookCreator } from "./pages/BookCreator";
import { Authentication } from "./pages/authentication/Authentication";
import { TemplateLoader } from "./pages/templates/TemplateLoader";

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Switch>
              <Route path={"/"} exact component={Books} />
              <Route path={"/template_creator"} component={TemplateCreator} />
              <Route path={"/books"} component={BookNavigation} />
              <Route path={"/book_creator"} component={BookCreator} />
              <Route path={"/authentication"} component={Authentication} />
              <Route path={"/template_loader"} component={TemplateLoader} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
