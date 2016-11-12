chrome.runtime.sendMessage({msg: "capture"}, function(response, err) {
    $.ajax({
        type: "POST",
        url: "http://📷📸📷.ws:3000/image", //xn--tu8hac.ws
        data: {
            "project": "BrysonReynolds.com",
            "imageData": response.imageData
        },
        dataType: "json"
    });
});
