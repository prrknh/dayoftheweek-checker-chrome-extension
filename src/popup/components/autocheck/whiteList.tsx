import React, { useEffect, useState } from "react";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { browser } from "webextension-polyfill-ts";
import { FixedSizeList, ListChildComponentProps } from "react-window";

export const WhiteList = () => {
  const [enabled, setEnabled] = useState(false);
  const [whiteList, setWhiteList] = useState<string[]>([]);

  function onChange() {
    browser.storage.local.set({ enableAutoCheck: !enabled }).then();
    setEnabled((prev) => !prev);
  }

  useEffect(() => {
    console.log("effect");
    browser.storage.local
      .get(["enableAutoCheck", "whiteSiteList"])
      .then((ob) => {
        setEnabled(ob.enableAutoCheck);
        // setWhiteList(ob.whiteSiteList);
        setWhiteList(["a", "b", "c"]);
      });
  }, []);

  function showSiteList(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem button key={index} style={style}>
        <ListItemText primary={whiteList[index]} />
        <Button onClick={(_) => remove(index)}>☓</Button>
      </ListItem>
    );
  }
  function remove(index: number): void {
    setWhiteList(whiteList.filter((_, i) => i !== index));
  }

  function addCurrentPage(): void {
    setWhiteList(["hoge", ...whiteList]);
    return;
  }

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Only in specific site?" />
        <ListItemSecondaryAction>
          <Switch checked={enabled} onChange={onChange} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon />
        <FixedSizeList
          height={100}
          width={300}
          itemSize={46}
          itemCount={whiteList.length}
        >
          {showSiteList}
        </FixedSizeList>
      </ListItem>
      <ListItem>
        <ListItemIcon />
        <ListItemText primary="Add current page" />
        <Button onClick={addCurrentPage}>+</Button>
      </ListItem>
    </>
  );
};
