class DataLoader {
  constructor() {
    this.posts = [];
    this.products = [];
  }

  // تحميل المقالات
  async loadPosts() {
    try {
      const response = await fetch('./data/posts.json');
      const data = await response.json();
      this.posts = data.posts;
      return this.posts;
    } catch (error) {
      console.error('خطأ في تحميل المقالات:', error);
      return [];
    }
  }

  // تحميل المنتجات
  async loadProducts() {
    try {
      const response = await fetch('./data/products.json');
      const data = await response.json();
      this.products = data.products;
      return this.products;
    } catch (error) {
      console.error('خطأ في تحميل المنتجات:', error);
      return [];
    }
  }

    // الحصول على المقالات المميزة
    getFeaturedPosts(limit = 2) {
      return this.posts.filter(post => post.featured).slice(0, limit);
    }

    // الحصول على المنتجات المميزة
    getFeaturedProducts(limit = 3) {
      return this.products.filter(product => product.featured).slice(0, limit);
    }

    // البحث في المقالات
    searchPosts(query) {
      return this.posts.filter(post => 
        post.title.includes(query) || 
        post.description.includes(query)
      );
    }

    // تصفية المنتجات حسب الفئة
    filterProductsByCategory(category) {
      return this.products.filter(product => product.category === category);
    }
}