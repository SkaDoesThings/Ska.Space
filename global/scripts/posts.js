document.addEventListener("DOMContentLoaded", () => {
    // Directory of each article and its corresponding file path + url
    const article_files = {
        "": "articles/article-list.html",
        "#developing-this-website": "articles/Developing-This-Website.html",
        "#markdown-testing": "articles/Markdown-Testing.html",
        "#bee-movie-script": "articles/Bee-Movie-Script.html"
    };

    // Prepare to modify the div with new html content
    const article_list = document.getElementById("articleList");
    const article_viewer = document.getElementById("articleViewer");
    const article_content = document.getElementById("articleContent");


    // Attempt to load the url's file path
    const load_content = async (hash) => {
        const file_path = article_files[hash];

        // Simulate normal full-page changing by using manual animations
        // Going to list page
        if (file_path == "articles/article-list.html") {
            // Run animation
            article_list.classList.add('fadeOut');
            article_viewer.classList.add('fadeIn');
            setTimeout(function(){
                article_list.style.display = "block";
                article_viewer.style.display = "none";
                article_viewer.classList.remove('fadeIn');
            }, 150);
        } 
        // Going to specific post
        else {
            // Reset article to default state (loader) until content loaded
            // ^ This location fixes abrupt unload as user leaves article
            article_content.innerHTML = loading;
            // Run animation
            article_viewer.classList.add('fadeOut');
            article_list.classList.add('fadeIn');
            setTimeout(function(){
                article_list.style.display = "none";
                article_viewer.style.display = "block";
                article_list.classList.remove('fadeIn');
            }, 150);
        }
        
        // Check if post exists
        if (file_path) {
            const response = await fetch (file_path);
            // Post was found, extract the html content!
            if(response.ok) {
                const content = await response.text();

                // Going to list page
                if (file_path == "articles/article-list.html") {
                    article_list.innerHTML = content;
                    document.title = "Ska.Space - Posts";
                } 
                // Going to specific post
                else {
                    article_content.innerHTML = content;
                    // Fancy way to remove all of the technical parts of the article_files directory for the page title
                    document.title = "Post - " + file_path.replace("articles/", "").replace(".html", "").split("-").join(" ");
                }

                // Patch to make sure the image viewer works for newly loaded images
                const imgs = document.querySelectorAll('.viewable');
                imgs.forEach(img => {
                    img.addEventListener('click', function() {
                    imageDisplay.style.backgroundImage = 'url(' + img.src + ')';
                    imageBackdrop.style.backgroundImage = 'url(' + img.src + ')';
                    uiFunction('Viewer');
                    });
                });
            }
            // For some reason the post could not load
            else {
                article_content.innerHTML = error_content;
                document.title = "Ska.Space - Failed To Load Post";
            }
        }
        // No post exists, show default content
        else {
            article_content.innerHTML = default_content;
            document.title = "Ska.Space - Unknown Post";
        }
    };

    // Whatever the result was, update the page with it 
    window.addEventListener("hashchange", () => { 
        load_content(window.location.hash);
    });
    load_content(window.location.hash);
});

const default_content = `
    <p>This post does not exist</p>
    <a href="posts.html">Return to Post List</a></main>
`

const error_content = `
    <p>Failed to load post!</p>
    <a href="posts.html">Return to Post List</a></main>
`

const loading = `
    <span class="loader"></span><br><br>
`