function getContent() {
    console.log('Retrieving content...')
    fetch('/data').then(response => response.text()).then(responseText => JSON.parse(responseText)).then(dat =>{
        var badge = document.getElementById("badge");
        //badge.innerHTML = '<ol id="posts-list" class="hfeed">';
        var badgeStr = '<ol id="posts-list" class="hfeed">';
        //document.getElementById('comment-container').innerText = response.text();
        for (let comment_obj of dat){
            var name = comment_obj.name;
            var comment = comment_obj.comment;
            var score = comment_obj.score;
            var timestamp = comment_obj.timestamp;
            var date = new Date(timestamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            badgeStr += '<li><article id="comment_" class="hentry">' + '<footer class="post-info">'+ '<div class="published">'+formattedTime+'</div>'+'<address class="author">'+'By '+ name+'</address>'+'</footer>'+'<div class="entry-content">'+'<p>'+comment+'</p>'+'</div>'+'</article></li>';
        }
        badge.innerHTML = badgeStr + '</ol>';
    });
}

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile()
    console.log("User is " + JSON.stringify(profile));
    var element = document.querySelector("#content");
    element.innerText = profile.getName();
    var image = document.createElement('img')
    image.setAttribute('src', googleUser.getImageUrl())
    element.append(image)
}

function signOut(){
    gapi.auth2.getAuthInstance().signOut().then(function() {
    console.log('user signed out')
    })
}



    