import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { browser } from "webextension-polyfill-ts";

export const EnableButton = () => {
  const [enabled, setEnabled] = useState(false);

  function onChange() {
    browser.storage.local.set({ enableAutoCheck: !enabled }).then();
    setEnabled((prev) => !prev);
  }

  useEffect(() => {
    browser.storage.local.get(["enableAutoCheck"]).then((ob) => {
      setEnabled(ob.enableAutoCheck);
    });
  }, []);

  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Always enable?" />
      <ListItemSecondaryAction>
        <Switch checked={enabled} onChange={onChange} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
