/**
 * This function return all posts saved in the /posts directory from our S3.
 * 
 * @returns data object (json) with posts from S3
 */
const getPosts = () => {
    var response = s3.listObjectsV2({ Delimiter: '/posts' }).promise();
    return response;
}

/**
 * This function create the necessary HTML to create the main menu of website
 *  
 * @param {boolean} fromPost The condition to know where are the page executed true - /post directory || false - / directory
 * @param {json} s3objects The object got in getPorts()
 */
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

/**
 * This funciton generate the HTMl code to create the dashboard with all posts of the blog. 
 * It gets all HTMl file from s3 bucket one by one.
 * 
 * @param {json} s3objects The object got in getPorts()
 */
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

/**
 * This function is used to create the necessary div where we will create the preview post.
 * 
 * @param {number} postNum The number of the post 
 */
function generateDashboardStructure(postNum) {
    var div = document.createElement("div");
        div.setAttribute("class", "post-preview");
        div.setAttribute("id", "post_preview" + postNum );

        document.getElementById("posts_preview").appendChild(div);
}

/**
 * This function get the necessary information from HTML to insert it in the dashboard.
 *  
 * @param {json} object The S3 object 
 * @returns The title, subtitle, creator with data creation 
 */
function getDashboardInfo(object) {
    let bodyStr = object.Body.toString();
    let html = jQuery.parseHTML(bodyStr);
    let title = $(html).find("#main_title");
    let subtitle = $(html).find("#main_subtitle");
    let creator = $(html).find("#main_creator");

    return [title, subtitle, creator];
}

/**
 * This function generate the necessary HTML to show the preview of the post.
 * 
 * @param {string} file The path of the file 
 * @param {number} num The number of the post
 * @param {string} title The main_title of the post
 * @param {string} subtitle The main_subtitle of the post
 * @param {string} creator The main_creator of the post
 * @returns HTML dashboard preview post
 */
function generateDashboardCode(file, num, title, subtitle, creator) {

    var htmlGenerated = '<a href="' + file + '">';
    
    htmlGenerated += '<h2 id="title_post_'+num+'" class="post-title">'+ title[0].innerText +'</h2>';
    
    htmlGenerated += '<h3 id="subtitle_post_' + num + '" class="post-subtitle">' + subtitle[0].innerText + '</h3></a>';
    
    htmlGenerated += '<p id="creator_post_' + num + '" class="post-meta">' + creator[0].innerText + '</p><hr class="my-4" />';

    return htmlGenerated;
}