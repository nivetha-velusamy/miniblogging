/* ==========================================
   MINIBLOG JAVASCRIPT
========================================== */


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    // Hide all pages
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });


    // Show selected page
    const selectedPage =
        document.getElementById(pageName + "Page");

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }


    // Remove active navigation
    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(function(item) {
        item.classList.remove("active");
    });


    // Make clicked navigation active
    navItems.forEach(function(item) {

        if (item.getAttribute("onclick") ===
            "showPage('" + pageName + "')") {

            item.classList.add("active");
        }

    });
}


/* ================= CREATE POST ================= */

function createPost() {

    const input =
        document.getElementById("postInput");

    const text =
        input.value.trim();


    if (text === "") {
        alert("Please write something first!");
        return;
    }


    addPost(text);

    input.value = "";
}


/* Add post to home */

function addPost(text) {

    const posts =
        document.getElementById("posts");


    const article =
        document.createElement("article");

    article.className = "post";


    article.innerHTML = `

        <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80"
             class="avatar">

        <div class="post-content">

            <div class="post-header">

                <strong>Suchithra</strong>

                <i class="fa-solid fa-circle-check verified"></i>

            </div>

            <p>${escapeHTML(text)}</p>

            <div class="post-actions">

                <span onclick="likePost(this)">
                    <i class="fa-regular fa-heart"></i>
                    <b>0</b>
                </span>

                <span>
                    <i class="fa-regular fa-comment"></i>
                    Comment
                </span>

                <span>
                    <i class="fa-solid fa-retweet"></i>
                    Repost
                </span>

                <span>
                    <i class="fa-regular fa-bookmark"></i>
                    Save
                </span>

                <span onclick="deletePost(this)">
                    <i class="fa-regular fa-trash-can"></i>
                    Delete
                </span>

            </div>

        </div>

    `;


    posts.prepend(article);
}


/* ================= LIKE POST ================= */

function likePost(element) {

    const icon =
        element.querySelector("i");

    const number =
        element.querySelector("b");


    let likes =
        parseInt(number.textContent);


    if (icon.classList.contains("fa-regular")) {

        likes++;

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        element.style.color = "#e0245e";

    } else {

        likes--;

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        element.style.color = "";

    }


    number.textContent = likes;
}


/* ================= DELETE POST ================= */

function deletePost(element) {

    const post =
        element.closest(".post");


    if (confirm("Delete this post?")) {

        post.remove();

    }
}


/* ================= POST MODAL ================= */

function openPostBox() {

    document
        .getElementById("postModal")
        .classList.remove("hidden");

    document
        .getElementById("modalPost")
        .focus();
}


function closePostBox() {

    document
        .getElementById("postModal")
        .classList.add("hidden");

    document
        .getElementById("modalPost")
        .value = "";
}


function createModalPost() {

    const textarea =
        document.getElementById("modalPost");


    const text =
        textarea.value.trim();


    if (text === "") {

        alert("Please write something!");

        return;
    }


    addPost(text);

    closePostBox();

    showPage("home");
}


/* ================= SEND MESSAGE ================= */

function sendMessage() {

    const input =
        document.getElementById("messageInput");


    const text =
        input.value.trim();


    if (text === "") {

        alert("Please type a message!");

        return;
    }


    const container =
        document.querySelector(".messages-container");


    const message =
        document.createElement("div");


    message.className = "message sent";


    message.innerHTML = `
        <strong>Suchithra</strong>
        <p>${escapeHTML(text)}</p>
    `;


    container.appendChild(message);


    input.value = "";
}


/* ================= SETTINGS ================= */

function saveSettings() {

    alert("Your settings have been saved successfully!");
}


/* ================= FOLLOW BUTTONS ================= */

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("follow")) {

        event.target.textContent = "Following";

        event.target.classList.remove("follow");

        event.target.style.background = "green";
    }

});


/* ================= SEARCH ================= */

document.addEventListener("DOMContentLoaded", function() {

    const search =
        document.querySelector(".search");


    search.addEventListener("keyup", function() {

        const value =
            search.value.toLowerCase();


        const posts =
            document.querySelectorAll(".post");


        posts.forEach(function(post) {

            if (post.textContent
                .toLowerCase()
                .includes(value)) {

                post.style.display = "flex";

            } else {

                post.style.display = "none";

            }

        });

    });

});


/* ================= SECURITY ================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}