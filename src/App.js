import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { TemplateCreator } from "./pages/TemplateCreator";
import { Navbar } from "./components/Navbar";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";
import { BookNavigation } from "./components/books/BookNavigation";
import { BookCreator } from "./pages/BookCreator";

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Switch>
              <Route path={"/"} exact component={Home} />
              <Route path={"/template_creator"} component={TemplateCreator} />
              <Route path={"/books"} component={BookNavigation} />
              <Route path={"/book_creator"} component={BookCreator} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
