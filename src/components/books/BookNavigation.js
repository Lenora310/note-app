import React from "react";
import { Route, Switch } from "react-router-dom";
import  Book from "./BookCopy";
import { BookList } from "./BookList";

export const BookNavigation = () => {
  let extraProps = ["Spain", "Russsia","England"]
  return (
    <Switch>
      <Route exact path="/books" component={BookList} />
     
      <Route
        path="/books/:id"
        render={(props) => <Book {...props} pages={extraProps} />}
      />
      {/* <Route path="/books/:id" component={Book} /> */}
    </Switch>
  );
};
