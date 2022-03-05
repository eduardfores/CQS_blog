const getPosts = () => {
    var response = s3.listObjectsV2({ Delimiter: '/posts' }).promise();
    return response;
}

function createMenu(fromPost, s3objects) {

    s3objects.then(function (data) {
        var posts = data.Contents.filter(file => file.Key.startsWith("posts/"));
        var HTMLgenerated = '';
            
        for (let i = 0; i < posts.length; i++) {
            let j = i + 1;
            if (fromPost) {
                var post = posts[i].Key.replace("posts/", "");
                HTMLgenerated += '<li><a class="dropdown-item" href="' + post + '">Post' + j + '</a></li>';
            } else {
                HTMLgenerated += '<li><a class="dropdown-item" href="' + posts[i].Key + '">Post' + j + '</a></li>';
            }
        }
        
        document.getElementById("posts_dropdown").innerHTML = HTMLgenerated;
    });
}

function createDashboard(s3objects) {
    s3objects.then(function (data) {
        var posts = data.Contents.filter(file => file.Key.startsWith("posts/"));
        
        console.log(posts);
    });
}