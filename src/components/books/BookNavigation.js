import React from "react";
import { Route, Switch } from "react-router-dom";
import  {Book} from "./Book";
// import  Book from "./Book";
import { BookList } from "./BookList";
import { Page } from "./Page";

export const BookNavigation = () => {
  // let extraProps = ["Spain", "Russsia","England"]
  return (
    <Switch>
      <Route exact path="/books" component={BookList} />
      {/* <Route
        path="/books/:id"
        render={(props) => <Book {...props} pages={extraProps} />}
      /> */}
      {/* <Route exact path="/books/:id/:pnumber" component={Page} /> */}
      {/* <Route
        path="/books/:id/:pnumber"
        render={(props) => <Page {...props} pages={extraProps} />}
      /> */}



      <Route path="/books/:id" component={Book} />
     
      {/* <Route
        path="/books/:id"
        render={(props) => <Book {...props} pages={extraProps} />}
        // render={(props) => <Book {...props} />}
      /> */}
      {/* <Route path="/books/:id" component={Book} /> */}
    </Switch>
  );
};
