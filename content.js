function matchRule(str, rule) {
  rule = rule.split("*").join(".*");
  rule = "^" + rule + "$"

  var regex = new RegExp(rule);

  return regex.test(str);
}

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        takeScreenshot(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            takeScreenshot(userid);
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
                            url: "https://the-dark-si.de/image", //xn--tu8hac.ws
                            data: {
                                "project": project.projectName,
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
