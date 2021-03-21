chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    type: "normal",
    id: "check",
    title: "check %s",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  switch (info.menuItemId) {
    case "check":
      console.log(info.selectionText);
      break;
  }
});
