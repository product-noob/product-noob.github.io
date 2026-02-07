/**
 * Blog post reading progress bar.
 * Calculates scroll progress relative to the article content area
 * and sets the width of #reading-progress accordingly.
 */
export function initReadingProgress(): void {
  const article = document.querySelector('.blog-post__content');
  const progressBar = document.getElementById('reading-progress');

  if (!article || !progressBar) return;

  function update(): void {
    const rect = article!.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const articleHeight = rect.height;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    const start = articleTop - windowHeight;
    const end = articleTop + articleHeight - windowHeight;

    let progress = 0;
    if (scrollTop > start) {
      progress = Math.min(
        100,
        Math.max(0, ((scrollTop - start) / (end - start)) * 100)
      );
    }

    progressBar!.style.width = `${progress}%`;
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  });

  update();
}
