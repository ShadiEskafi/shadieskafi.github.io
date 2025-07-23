class HTMLGenerators {
  // إنشاء HTML للمقال
  static generatePostHTML(post) {
    return `
      <div class="post" onclick="window.location.href='${post.url}'">
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

  // إنشاء HTML للمنتج
  static generateProductHTML(product) {
    return `
      <div class="product">
        <div id="product-img-container">
          <img src="${product.image}" alt="صورة ${product.title}">
        </div>
        <div id="product-body">
          <p id="product-title">${product.title}</p>
          <p id="product-desc">${product.description}</p>
        </div>
        <div id="product-footer">
          <p id="product-price">${product.price}</p>
          <a href="${product.downloadUrl}" id="product-action">
            <p>حمل المنتج</p>
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
          </a>
        </div>
      </div>
    `;
  }

  // إنشاء رسالة عدم وجود محتوى
  static generateEmptyMessage(message) {
    return `<h1 class="section-hint">${message}</h1>`;
  }

  // إنشاء رسالة تحميل
  static generateLoadingMessage(message) {
    return `
      <div class="loading-container">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>${message}</p>
      </div>
    `;
  }
}