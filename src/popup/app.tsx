import React from "react";
import ReactDOM from "react-dom";
import { List } from "@material-ui/core";
import { EnableButton } from "./components/enableButton";

const App = () => {
  return (
    <div>
      <List>
        <EnableButton />
      </List>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
