function matchRule(str, rule) {
  rule = rule.split("*").join(".*");
  rule = "^" + rule + "$"

  var regex = new RegExp(rule);

  return regex.test(str);
}

function getRandomToken() {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

chrome.storage.sync.get('userId', function(items) {
    var userId = items.userId;
    if (userId) {
        takeScreenshot(userId);
    } else {
        userId = getRandomToken();
        chrome.storage.sync.set({userId: userId}, function() {
            takeScreenshot(userId);
        });
    }
});

function takeScreenshot (userId) {
    chrome.storage.sync.get('projects', function (data) {
        data.projects.forEach(function (project) {
            var isMatch = matchRule(window.location.href, project.urlPattern);

            if (isMatch) {
                setTimeout(function () {
                    chrome.runtime.sendMessage({msg: "capture"}, function(response, err) {
                        $.ajax({
                            type: "POST",
                            url: "https://the-dark-side/screenshot", //xn--tu8hac.ws
                            data: {
                                "projectName": project.projectName,
                                "imageData": response.imageData,
                                "userId": userId
                            },
                            dataType: "json"
                        });
                    });
                }, 1000);
            }
        });
    });
}
