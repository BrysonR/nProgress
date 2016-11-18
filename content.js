chrome.storage.sync.get(function (data) {
    data.projects.forEach(function (project) {
        if (project.urlPattern === window.location.href) {
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
