chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
        sendResponse({imageData: dataUrl});
    });
    return true;
});
