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

export const WhiteListSetting = () => {
  const [onlyWhiteList, setOnlyWhiteList] = useState(false);
  const [whiteList, setWhiteList] = useState<string[]>([]);
  const [hasCurrentPageInWhiteList, setHasCurrentPageInWhiteList] = useState(
    true
  );
  const [currentPageDomain, setCurrentPageDomain] = useState("");

  function onChange() {
    browser.storage.local.set({ onlyWhiteList: !onlyWhiteList }).then();
    setOnlyWhiteList((prev) => !prev);
  }

  useEffect(() => {
    browser.tabs
      .query({ active: true })
      .then((tabs) => {
        if (!tabs[0].url) {
          throw new Error();
        }
        if (tabs[0].url !== "") {
          setCurrentPageDomain(new URL(tabs[0].url).hostname);
        } else {
          setHasCurrentPageInWhiteList(true);
        }
        return new URL(tabs[0].url).hostname;
      })
      .then((hostname) => {
        browser.storage.local.get(["onlyWhiteList", "whiteList"]).then((ob) => {
          setOnlyWhiteList(ob.onlyWhiteList);
          setWhiteList(ob.whiteList);
          setHasCurrentPageInWhiteList(ob.whiteList.indexOf(hostname) > -1);
        });
      })
      .catch((_) => console.error("something wrong happened"));
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
    const removed = whiteList.filter((_, i) => i !== index);
    browser.storage.local.set({ whiteList: removed }).then(() => {
      if (whiteList[index] === currentPageDomain)
        setHasCurrentPageInWhiteList(false);
      setWhiteList(removed);
    });
  }

  function addCurrentPage(): void {
    browser.storage.local
      .set({ whiteList: [currentPageDomain, ...whiteList] })
      .then(() => {
        setWhiteList([currentPageDomain, ...whiteList]);
        setHasCurrentPageInWhiteList(true);
      });
  }

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Only in specific site?" />
        <ListItemSecondaryAction>
          <Switch checked={onlyWhiteList} onChange={onChange} />
        </ListItemSecondaryAction>
      </ListItem>
      {onlyWhiteList && (
        <>
          <ListItem>
            <ListItemIcon />
            {whiteList.length == 0 && (
              <ListItemText primary="(no white site list)" />
            )}
            {whiteList.length > 0 && (
              <FixedSizeList
                height={whiteList.length * 25 + 10}
                width={300}
                itemSize={25}
                itemCount={whiteList.length}
              >
                {showSiteList}
              </FixedSizeList>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon />
            <ListItemText primary="Add current page" />
            <Button
              disabled={hasCurrentPageInWhiteList}
              onClick={addCurrentPage}
            >
              +
            </Button>
          </ListItem>
        </>
      )}
    </>
  );
};
