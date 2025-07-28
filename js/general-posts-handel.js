window.addEventListener("load", () => {
    renderAllPosts();
});


async function renderAllPosts() {
    const response = await fetch('./../data/posts.json');
    const data = await response.json();
    const posts = data.posts;

    const container = document.getElementById('posts-section-container');
    if (!container) return;

    if (!posts || posts.length === 0) {
        container.innerHTML = `<h1 class="section-hint">لا تتوفر مقالات في الوقت الحالي، قريبًا.</h1>`;
        return;
    }

    const html = posts.map(post => createPostHTML(post)).join('');
    container.innerHTML = html;
}

function createPostHTML(post) {
    return `
    <div class="post" onclick="window.location.href='${post.url}'" data-aos="fade-up" data-aos-duration="600" >
          <div id="post-img-container">
            <img src="./.${post.image}" alt="صورة ${post.title}" />
          </div>
          <div id="post-body">
            <div id="post-info">
              <div id="post-tag">
                <i class="${post.tag.icon}"></i>
                <p>${post.tag.name}</p>
              </div>
              <div id="post-title">${post.title}</div>
              <div id="post-date">${post.date}</div>
            </div>
            <i class="fa-solid fa-caret-left" id="left-arrow"></i>
          </div>
        </div>
  `;
}