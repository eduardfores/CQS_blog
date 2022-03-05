function getPosts(fromPost) {
    var s3 = S3ClientFactory.newClient();

    s3.listObjects({ Delimiter: '/posts' }, function (err, data) {
        if (err){ console.log(err, err.stack); }
        else {
            var posts = data.Contents.filter(file => file.Key.startsWith("posts/"));

            var HTMLgenerated = '';
            
            console.log(posts);
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

        }
    });
}