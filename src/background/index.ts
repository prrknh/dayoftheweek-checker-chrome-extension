import { browser } from "webextension-polyfill-ts";

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    type: "normal",
    id: "check",
    title: 'check "%s"',
    contexts: ["selection"],
  });
  browser.storage.local
    .set({ disabledAutoCheck: false, onlyWhiteList: false, whiteList: [] })
    .then();
});

browser.contextMenus.onClicked.addListener((info) => {
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      return browser.tabs.sendMessage(Number(tabs[0].id), {
        message: {
          id: "fromContextMenuWithSelectedText",
          selectedText: info.selectionText,
        },
      });
    });
});
