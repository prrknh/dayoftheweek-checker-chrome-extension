import React from "react";
import ReactDOM from "react-dom";
import { List, Typography } from "@material-ui/core";
import { EnableButton } from "./components/autocheck/enableButton";
import { Header } from "./components/header";
import { WhiteList } from "./components/autocheck/whiteList";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 50 }}>
        <List>
          <Typography variant="h6">Auto Check Setting</Typography>
          <EnableButton />
          <WhiteList />
        </List>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
