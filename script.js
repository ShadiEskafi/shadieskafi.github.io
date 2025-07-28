document.getElementById("year").textContent = new Date().getFullYear();


// تحميل المقالات بشكل تلقائي من ملف ال JSON

window.addEventListener("load", () => {
  loadHomePosts();
})

async function loadHomePosts() {
  try {
    const response = await fetch("./data/posts.json");
    const data = await response.json();
    const posts = data.posts;

    const postsContainer = document.getElementById("posts-section-container");
    const showMoreButton = document.getElementById("show-all-posts");

    if (!postsContainer) {
      console.error("لم يتم العثور على عنصر عرض المقالات");
      return;
    }

    if (!posts || posts.length === 0) {
      postsContainer.innerHTML = `<h1 class="section-hint">لا تتوفر مقالات في الوقت الحالي، قريبًا.</h1>`;
      if (showMoreButton) showMoreButton.style.display = 'none';
      return;
    }

    // نعرض أول 3 مقالات فقط
    const limitedPosts = posts.slice(0, 3);
    const postsHTML = limitedPosts.map(post => createPostHTML(post)).join('');
    postsContainer.innerHTML = postsHTML;

    // إذا في أكثر من 3 مقالات، نظهر الزر
    if (showMoreButton) {
      showMoreButton.style.display = posts.length > 3 ? 'block' : 'none';
    }

    postsContainer.innerHTML = postsHTML;

  } catch (error) {
    console.error("حدث خطأ أثناء تحميل المقالات: ", error);
  }
}

function createPostHTML(post) {
  return `
    <div class="post" onclick="window.location.href='./posts/${post.url}'">
      <div id="post-img-container">
        <img src="${post.image}" alt="صورة ${post.title}" />
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