import React from "react";
import { Route, Switch } from "react-router-dom";
import { Book } from "./Book";
import { BookList } from "./BookList";
import { Page } from "./Page";

export const BookNavigation = () => {
  return (
    <Switch>
      <Route exact path="/books" component={BookList} />
      <Route path="/books/:id" component={Book} />
    </Switch>
  );
};
