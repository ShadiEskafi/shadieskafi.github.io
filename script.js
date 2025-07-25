document.getElementById("year").textContent = new Date().getFullYear();

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
});

// التعامل مع الضغط على روابط التنقل
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      scroll.scrollTo(target);
    }
  });
});