chrome.runtime.sendMessage({msg: "capture"}, function(response, err) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/image",
        data: {
            "project": "BrysonReynolds.com",
            "imageData": response.imageData
        },
        dataType: "json"
    });
});
