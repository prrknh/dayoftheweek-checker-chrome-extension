import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const EnableButton = () => {
  const [enabled, setEnabled] = useState(true);

  function onChange() {
    setEnabled((prev) => !prev);
  }

  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleIcon />
      </ListItemIcon>
      <ListItemText primary="enable auto check in input?" />
      <ListItemSecondaryAction>
        <Switch checked={enabled} onChange={onChange} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
