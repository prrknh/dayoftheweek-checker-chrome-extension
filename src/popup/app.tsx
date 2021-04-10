import React from "react";
import ReactDOM from "react-dom";
import { List } from "@material-ui/core";
import { AutoCheckSetting } from "./components/autoCheckSetting";
import { Header } from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 50 }}>
        <List>
          <AutoCheckSetting />
        </List>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
