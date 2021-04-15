import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { browser } from "webextension-polyfill-ts";
import { WhiteListSetting } from "./whiteListSetting";

export const AutoCheckSetting = () => {
  const [disabled, setDisabled] = useState(false);

  function onChange() {
    browser.storage.local.set({ disabledAutoCheck: !disabled }).then();
    setDisabled((prev) => !prev);
  }

  useEffect(() => {
    browser.storage.local.get(["disabledAutoCheck"]).then((ob) => {
      setDisabled(ob.disabledAutoCheck);
    });
  }, []);

  return (
    <>
      <Typography variant="h6">入力文字自動チェック設定</Typography>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
        <ListItemText primary="常に無効" />
        <ListItemSecondaryAction>
          <Switch checked={disabled} onChange={onChange} />
        </ListItemSecondaryAction>
      </ListItem>
      {!disabled && <WhiteListSetting />}
    </>
  );
};
