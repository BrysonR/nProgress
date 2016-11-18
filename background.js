chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.windows.getCurrent(function (window) {
        if (window.focused) {
            chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
                sendResponse({imageData: dataUrl});
            });
        }
    });

    return true;
});
