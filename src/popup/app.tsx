import React from "react";
import ReactDOM from "react-dom";
import { List } from "@material-ui/core";
import { EnableButton } from "./components/enableButton";
import { Header } from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 50 }}>
        <List>
          <EnableButton />
        </List>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
