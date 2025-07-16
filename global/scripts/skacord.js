
document.addEventListener("DOMContentLoaded", () => {
    // Reference list of all specific channels
    const contentFiles = {
        "#guidelines": "page/Guidelines.html",
        "#support": "page/Support.html"
    };

    // Static page div that updates with each channel
    const articleContent = document.getElementById("articleContent");

    const loadContent = async (hash) => {
        // Remove active channels on the sidebar
        const channelList = document.querySelector('#channels');
        const channels = channelList.querySelectorAll('a');
        channels.forEach(channel => {
            channel.style.backgroundColor = "";
        });

        // Content loading, show loader
        document.getElementById('articleContent').style.display = "none";
        document.getElementById('channelLoading').style.display = "block";
        
        // Grab specific channel from list
        const filePath = contentFiles[hash];
        if (filePath) {
            try {
                // Fetch the HTML content inside the channel
                const response = await fetch(filePath);
                if (response.ok) {
                    // Update the content on the static page
                    const content = await response.text();
                    articleContent.innerHTML = content;
                    // Update the page titlebar
                    document.title = "GreatlyGaming - " + filePath.replace("page/", "").replace(".html", "").split("-").join(" ");
                    // Display active channel on the sidebar
                    selected = ("c-" + filePath.replace("page/", "").replace(".html", "").split("-").join(" "))
                    document.getElementById(selected).style.backgroundColor = "var(--tertiary-color)";
                } else {
                    // Display error page if response failed
                    articleContent.innerHTML = errorContent;
                }
            } catch (error) {
                // Display error page if code failed
                articleContent.innerHTML = errorContent;
                console.log("Content Error: " + error);
            }
        } else {
            // Display welcome page if no specific # address was mentioned, no extra bandwith used 
            articleContent.innerHTML = defaultContent;
            document.title = "GreatlyGaming - Welcome"
            document.getElementById('c-Welcome').style.backgroundColor = "var(--tertiary-color)";
        }

        //Content finished loading, remove loader
        document.getElementById('channelLoading').style.display = "none";
        document.getElementById('articleContent').style.display = "block";

        // Make sure the image viewer works for newly loaded images
        const imgs = document.querySelectorAll('.viewable');
        imgs.forEach(img => {
            img.addEventListener('click', function() {
                imageDisplay.style.backgroundImage = 'url(' + img.src + ')';
                imageBackdrop.style.backgroundImage = 'url(' + img.src + ')';
                uiFunction('Viewer');
            });
        });
    }

    // Run content loader
    window.addEventListener("hashchange", () => {
        loadContent(window.location.hash);
    });
    loadContent(window.location.hash);
});

//Make nav a bouncy
document.querySelectorAll('a').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 300); // Reset after animation
  });
});

const defaultContent = `
    <div id="bannerContainer" class="placeholderGalleon">
	<div id="bannerMain" onclick="backgroundViewer('../global/media/banners/sky.webp')">
		<div class="bannerContent bannerLogo centered">
			<img src="../global/media/images/glogo.webp" class="mainImage vertical">
			<span class="mainText">GreatlyGaming</span>
			<h2>Gaming is great, and so are you</h2>
		</div>
	</div>
	<a href="https://discord.gg/EcTssJF5Md" target="_blank"><button class="bannerButton bannerButtonAnimate" id="servers"><img src="../global/images/galleon/ggarc.png" class="necoArc">Join Today!</button></a>
</div>

<article>
	<div class="columnContainer">
		<article>
			<h1 class="centered offMobile">Welcome</h1>
			<h2 class="centeredMobile">You've crossed paths with a laid-back community founded in 2016 that connects people who enjoy the digital world of gaming, anime, tech, VR, and more!</h2>
			<div class="centered">
				<button class="inviteButton mainJoinDiscord" onclick="window.open('https://discord.gg/EcTssJF5Md', '_blank');">Discord</button>
				<button class="inviteButton mainJoinSteam" onclick="window.open('https://steamcommunity.com/groups/GreatlyGaming', '_blank');">Steam</button>
			</div>
		</article>
		<article class="brieflyHidden">
			<img src="../global/images/galleon/disPromo.webp" class="viewable">
		</article>
	</div><br>
	<div class="bubbleList centered"> 
		<div><span>👋 Discuss</span><p>Talk about whatever suits your interests, there will always be a place for it</p></div>
		<div><span>😺 Explore</span><p>Countless roles, colors, and emojis to express yourself best</p></div>
		<div><span>📩 Expand</span><p>A design that is always reinterated on to discover what's best</p></div>
		<div><span>🚀 Enjoy</span><p>Power up with bots, movie / game nights, and even Minecraft servers!</div>
	</div><br>
</article><br>

<img src="../global/media/icons/emotes/sailboat.webp" class="sailImage viewable">
    `;

const errorContent = `
<main class="centered">
    <span class="loader"></span>
    <p>Failed To Load Post</p>
    <a href="posts.html">Return to Post List</a></main>
`