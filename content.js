function matchRule(str, rule) {
  rule = rule.split("*").join(".*");
  rule = "^" + rule + "$"

  var regex = new RegExp(rule);

  return regex.test(str);
}

chrome.storage.sync.get(function (data) {
    data.projects.forEach(function (project) {
        var isMatch = matchRule(window.location.href, project.urlPattern);

        if (isMatch) {
            chrome.runtime.sendMessage({msg: "capture"}, function(response, err) {
                $.ajax({
                    type: "POST",
                    url: "http://📷📸📷.ws:3000/image", //xn--tu8hac.ws
                    data: {
                        "project": project.projectName,
                        "imageData": response.imageData
                    },
                    dataType: "json"
                });
            });
        }
    });
});
