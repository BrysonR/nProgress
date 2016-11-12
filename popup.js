var queryInfo = {
  active: true,
  currentWindow: true
};

chrome.tabs.query(queryInfo, function (tab) {
  chrome.tabs.captureVisibleTab(function (tab) {
    debugger;
  })
})
