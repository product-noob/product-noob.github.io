/**
 * Page Transitions and Navigation
 * Optimized for performance with debounced events and better resource loading
 */

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

let scrollInitialized = false;
let swup = null;

// Initialize page transitions and navigation
document.addEventListener('DOMContentLoaded', () => {
  // Load Swup with preconnect hint
  const swupScript = document.createElement('script');
  swupScript.src = 'https://unpkg.com/swup@3.0.6/dist/swup.umd.js';
  swupScript.async = true;
  swupScript.defer = true;
  swupScript.onload = initSwup;
  document.head.appendChild(swupScript);

  // Add the page loader element
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  document.body.appendChild(loader);

  // Initialize page components and scroll progress
  initializePageComponents();
});

// Initialize scroll progress bar with debouncing
function initScrollProgress() {
  if (scrollInitialized) return;
  scrollInitialized = true;

  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  const updateProgress = debounce(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, 50);

  window.addEventListener('scroll', updateProgress, { passive: true });
}

function initSwup() {
  if (typeof Swup === 'undefined') return;

  swup = new Swup({
    containers: ['#main'],
    cache: true,
    plugins: [],
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([target="_blank"]):not([href^="' + window.location.origin + '/tools/calculator"])',
    skipPopStateHandling(event) {
      return event.state === null;
    }
  });

  // Handle page transitions
  swup.on('willReplaceContent', () => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = '0%';
      progressBar.style.opacity = '1';
    }
    document.documentElement.classList.add('is-animating');
  });

  swup.on('contentReplaced', () => {
    requestAnimationFrame(() => {
      initializePageComponents();
      updateActiveNavItem();
      document.documentElement.classList.remove('is-animating');

      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '100%';
        setTimeout(() => {
          progressBar.style.opacity = '0';
        }, 200);
      }
    });
  });

  // Handle browser back/forward navigation
  window.addEventListener('popstate', (event) => {
    if (event.state && swup) {
      swup.loadPage(event.state.url, { popState: true });
    }
  });

  window.swup = swup;
}

// Initialize only necessary page components
function initializePageComponents() {
  const calculator = document.querySelector('.calculator');

  if (calculator && typeof initCalculator === 'function' && !calculator.dataset.initialized) {
    calculator.dataset.initialized = 'true';

    if (isElementInViewport(calculator)) {
      initCalculator();
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            initCalculator();
            obs.disconnect();
          }
        });
      });
      observer.observe(calculator);
    }
  }

  if (typeof initLazyLoad === 'function' && document.querySelector('img[loading="lazy"]')) {
    initLazyLoad();
  }

  initScrollProgress();

  if (typeof hljs !== 'undefined') {
    const codeBlocks = document.querySelectorAll('pre code:not([data-highlighted])');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hljs.highlightBlock(entry.target);
          entry.target.dataset.highlighted = 'true';
          obs.unobserve(entry.target);
        }
      });
    });

    codeBlocks.forEach(block => observer.observe(block));
  }

  if (typeof ga !== 'undefined') {
    requestIdleCallback(() => {
      ga('send', 'pageview', window.location.pathname);
    });
  }
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Update active navigation item based on current URL
function updateActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.classList.remove('active');

    const linkPath = link.getAttribute('href').replace(/\/$/, '');
    if (
      currentPath === linkPath ||
      currentPath === linkPath + '/' ||
      (linkPath !== '/' && currentPath.startsWith(linkPath)) ||
      (linkPath === '/' && (currentPath === '/' || currentPath === ''))
    ) {
      link.classList.add('active');
    }
  });
}
