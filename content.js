function matchRule(str, rule) {
  rule = rule.split("*").join(".*");
  rule = "^" + rule + "$"

  var regex = new RegExp(rule);

  return regex.test(str);
}

function takeScreenshot (userId, userEmail) {
    chrome.storage.sync.get('projects', function (data) {
        data.projects.forEach(function (project) {
            var isMatch = matchRule(window.location.href, project.urlPattern);

            if (isMatch) {
                setTimeout(function () {
                    chrome.runtime.sendMessage({msg: "capture"}, function(response, err) {
                        $.ajax({
                            type: "POST",
                            url: "https://the-dark-si.de/screenshot", //xn--tu8hac.ws
                            data: {
                                "projectName": project.projectName,
                                "imageData": response.imageData,
                                "userId": userId,
                                "userEmail": userEmail
                            },
                            dataType: "json"
                        });
                    });
                }, 1000);
            }
        });
    });
}

chrome.storage.sync.get('userInfo', function(data) {
    if (data.userInfo) {
        takeScreenshot(data.userInfo.id, data.userInfo.email);
    }

    return;
});
