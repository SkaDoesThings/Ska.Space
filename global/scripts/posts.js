document.addEventListener("DOMContentLoaded", () => {
    // All specific posts
    const contentFiles = {
        "#developing-this-website": "post-content/Developing-This-Website.html",
        "#post-template": "post-content/post-template.html",
        "#bee-movie-script": "post-content/bee-movie-script.html"
    };

    const articleContent = document.getElementById("articleContent");

    const loadContent = async (hash) => {
        const filePath = contentFiles[hash];
        if (filePath) {
            try {
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    articleContent.innerHTML = content;
                    document.title = "Post - " + filePath.replace("post-content/", "").replace(".html", "").split("-").join(" ");
                } else {
                articleContent.innerHTML = errorContent;
                }
            } catch (error) {
                articleContent.innerHTML = errorContent;
            }
        } else {
            articleContent.innerHTML = defaultContent;
            document.title = "Ska.Space - Posts"
        }

        // Make sure the image viewer works for newly loaded images
        const imgs = document.querySelectorAll('.viewable');
        imgs.forEach(img => {
            img.addEventListener('click', function() {
              imageDisplay.style.backgroundImage = 'url(' + img.src + ')';
              imageBackdrop.style.backgroundImage = 'url(' + img.src + ')';
              uiFunction('Viewer');
            });
        });
    };

    window.addEventListener("hashchange", () => {
        loadContent(window.location.hash);
    });
    loadContent(window.location.hash);
});

const defaultContent = `
    <main id="posts"">
        <article> 
            <h1 id="pageTitle">Posts</h1>
            <div id="listBoxes">
                <a href="#developing-this-website">
                    <div>
                        <h1>Developing This Website</h1>
                        <span>August 14th, 2024 &#x2022 Dev</span>
                        <h2>A summary of the different eras and how things have evolved, along with an introduction to the blog section</h2>
                    </div>
                    <img src="post/media/dusk.webp">
                </a>
                <a href="#post-template">
                    <div>
                        <h1>Markdown Testing</h1>
                        <span>August 14th, 2024 &#x2022 Misc</span>
                        <h2>Displays the markdown I use on my website, also serves as good filler</h2>
                    </div>
                    <img src="global/media/banners/sky.webp">
                </a>
                <div id="startHidden">
                    <h1 class="divider">Other Posts</h1>
                    <a href="#bee-movie-script">
                        <div>
                            <h1>Bee Movie Script</h1>
                            <span>December 21st, 2025 &#x2022 Fun</span>
                            <h2>You like jazz too? 🎺</h2>
                        </div>
                        <img src="post/media/beemovie.webp" loading="lazy">
                    </a>
                </div>
            </div>
            <button id="showHiddenItem" onclick="showHiddenItem()">Other Posts</button>
        </article>
    </main>
    `;

const errorContent = `
<main class="centered">
    <span class="loader"></span>
    <p>Failed To Load Post</p>
    <a href="posts.html">Return to Post List</a></main>
`
