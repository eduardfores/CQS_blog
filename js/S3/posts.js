const getPosts = () => {
    var response = s3.listObjectsV2({ Delimiter: '/posts' }).promise();
    return response;
}

function createMenu(fromPost, s3objects) {

    s3objects.then(function (data) {
        var posts = data.Contents.filter(file => file.Key.startsWith("posts/"));
        var HTMLgenerated = '';
            
        for (let i = 0; i < posts.length; i++) {
            if (fromPost) {
                var post = posts[i].Key.replace("posts/", "");
                HTMLgenerated += '<li><a class="dropdown-item" href="' + post + '">' + post.replace(".html", "").replace("_", " ") + '</a></li>';
            } else {
                HTMLgenerated += '<li><a class="dropdown-item" href="' + posts[i].Key + '">' + posts[i].Key.replace("posts/", "").replace(".html", "").replaceAll("_", " ") + '</a></li>';
            }
        }
        
        document.getElementById("posts_dropdown").innerHTML = HTMLgenerated;
    });
}

function createDashboard(s3objects) {
    s3objects.then(function (data) {
        var posts = data.Contents.filter(file => file.Key.startsWith("posts/"));

        for (let i = 0; i < posts.length; i++) {
            var object = s3.getObject({ Key: posts[i].Key }).promise();

            generateDashboardStructure(i + 1);

            object.then(function (data) {
                var [title, subtitle, creator] = getDashboardInfo(data);
                document.getElementById("post_preview"+ (i+1)).innerHTML = generateDashboardCode(posts[i].Key, i + 1, title, subtitle, creator);
            });
        }
    });
}

function generateDashboardStructure(postNum) {
    var div = document.createElement("div");
        div.setAttribute("class", "post-preview");
        div.setAttribute("id", "post_preview" + postNum );

        document.getElementById("posts_preview").appendChild(div);
}

function getDashboardInfo(object) {
    let bodyStr = object.Body.toString();
    let html = jQuery.parseHTML(bodyStr);
    let title = $(html).find("#main_title");
    let subtitle = $(html).find("#main_subtitle");
    let creator = $(html).find("#main_creator");

    return [title, subtitle, creator];
}

function generateDashboardCode(file, num, title, subtitle, creator) {

    var htmlGenerated = '<a href="' + file + '">';
    
    htmlGenerated += '<h2 id="title_post_'+num+'" class="post-title">'+ title[0].innerText +'</h2>';
    
    htmlGenerated += '<h3 id="subtitle_post_' + num + '" class="post-subtitle">' + subtitle[0].innerText + '</h3></a>';
    
    htmlGenerated += '<p id="creator_post_' + num + '" class="post-meta">' + creator[0].innerText + '</p><hr class="my-4" />';

    return htmlGenerated;
}