class SiteManager {
    constructor() {
        this.dataLoader = new DataLoader();
        this.init();
    }

    async init() {
        await this.loadAllData();
        this.renderHomePage();
        this.setupEventListeners();
    }

    // تحميل جميع البيانات
    async loadAllData() {
        await Promise.all([
            this.dataLoader.loadPosts(),
            this.dataLoader.loadProducts()
        ]);
    }

    // عرض محتوى الصفحة الرئيسية
    renderHomePage() {
        this.renderPosts();
        this.renderProducts();
    }

    // عرض المقالات
    renderPosts() {
        const postsContainer = document.getElementById('posts-section-container');
        const featuredPosts = this.dataLoader.getFeaturedPosts(2);

        if (featuredPosts.length === 0) {
            postsContainer.innerHTML = HTMLGenerators.generateEmptyMessage(
                'لا تتوفر مقالات في الوقت الحالي، قريبًا.'
            );
            return;
        }

        const postsHTML = featuredPosts
            .map(post => HTMLGenerators.generatePostHTML(post))
            .join('');

        postsContainer.innerHTML = postsHTML;
    }

    // عرض المنتجات
    renderProducts() {
        const productsContainer = document.getElementById('products-container');
        const featuredProducts = this.dataLoader.getFeaturedProducts(3);

        if (featuredProducts.length === 0) {
            productsContainer.innerHTML = HTMLGenerators.generateEmptyMessage(
                'لا تتوفر منتجات في الوقت الحالي، قريبًا.'
            );
            return;
        }

        const productsHTML = featuredProducts
            .map(product => HTMLGenerators.generateProductHTML(product))
            .join('');

        productsContainer.innerHTML = productsHTML;
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // يمكن إضافة مستمعين للبحث أو التصفية هنا
        this.setupSearchFunctionality();
        this.setupFilterFunctionality();
    }

    // إعداد وظيفة البحث
    setupSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    const searchResults = this.dataLoader.searchPosts(query);
                    this.renderSearchResults(searchResults);
                } else {
                    this.renderPosts();
                }
            });
        }
    }

    // إعداد وظيفة التصفية
    setupFilterFunctionality() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                if (category === 'all') {
                    this.renderProducts();
                } else {
                    const filteredProducts = this.dataLoader.filterProductsByCategory(category);
                    this.renderFilteredProducts(filteredProducts);
                }
            });
        });
    }

    // عرض نتائج البحث
    renderSearchResults(results) {
        const postsContainer = document.getElementById('posts-section-container');

        if (results.length === 0) {
            postsContainer.innerHTML = HTMLGenerators.generateEmptyMessage(
                'لم يتم العثور على نتائج للبحث.'
            );
            return;
        }

        const resultsHTML = results
            .map(post => HTMLGenerators.generatePostHTML(post))
            .join('');

        postsContainer.innerHTML = resultsHTML;
    }

    // عرض المنتجات المصفاة
    renderFilteredProducts(products) {
        const productsContainer = document.getElementById('products-container');

        if (products.length === 0) {
            productsContainer.innerHTML = HTMLGenerators.generateEmptyMessage(
                'لا توجد منتجات في هذه الفئة.'
            );
            return;
        }

        const productsHTML = products
            .map(product => HTMLGenerators.generateProductHTML(product))
            .join('');

        productsContainer.innerHTML = productsHTML;
    }
}