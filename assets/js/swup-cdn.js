// CDN version of Swup and its plugins for smooth page transitions
document.addEventListener('DOMContentLoaded', function () {
  const swupScript = document.createElement('script');
  swupScript.src = 'https://unpkg.com/swup@3.0.6/dist/swup.umd.js';
  swupScript.async = true;

  swupScript.onerror = function () {
    console.warn('Failed to load Swup from CDN. Falling back to basic navigation.');
    initBasicNavigation();
  };

  swupScript.onload = function () {
    try {
      initSwup();
    } catch (error) {
      console.error('Error initializing Swup:', error);
      initBasicNavigation();
    }
  };

  document.body.appendChild(swupScript);

  // Optional: add a page loader
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  document.body.appendChild(loader);
});

function initBasicNavigation() {
  updateActiveNavItem();

  document.querySelectorAll('a[href^="' + window.location.origin + '"]:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function () {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.opacity = '1';
      }
    });
  });
}

function initSwup() {
  if (typeof Swup === 'undefined') {
    throw new Error('Swup is not defined');
  }

  const swup = new Swup({
    containers: ['#main'],
    cache: true,
    plugins: [],
    linkSelector:
      'a[href^="' + window.location.origin + '"]:not([target="_blank"]):not([href^="' + window.location.origin + '/tools/calculator"])',
    skipPopStateHandling: event => event.state === null
  });

  // When new content replaces old content
  swup.on('content:replace', () => {
    try {
      if (typeof initCalculator === 'function') {
        initCalculator();
      }

      document.querySelectorAll('img[data-src]').forEach(img => {
        if (typeof lazyLoad === 'function') {
          lazyLoad(img);
        }
      });

      reinitializeScripts();
    } catch (error) {
      console.error('Error during content replacement:', error);
    }
  });

  // On navigation start
  swup.on('transition:start', () => {
    try {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.opacity = '1';
      }
    } catch (error) {
      console.error('Error during transition start:', error);
    }
  });

  // On navigation end
  swup.on('transition:end', () => {
    try {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '100%';
        setTimeout(() => {
          progressBar.style.opacity = '0';
        }, 200);
      }
    } catch (error) {
      console.error('Error during transition end:', error);
    }
  });

  window.swup = swup;
}

function reinitializeScripts() {
  try {
    if (typeof initLazyLoad === 'function') {
      initLazyLoad();
    }

    if (document.querySelector('#progress-bar')) {
      initScrollProgress();
    }

    if (document.querySelectorAll('pre code').length > 0 && typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
    }

    if (typeof ga !== 'undefined') {
      ga('set', 'page', window.location.pathname);
      ga('send', 'pageview');
    }
  } catch (error) {
    console.error('Error reinitializing scripts:', error);
  }
}

function updateActiveNavItem() {
  try {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPath = link.getAttribute('href').replace(/\/$/, '');
      if (
        currentPath === linkPath ||
        currentPath === linkPath + '/' ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))
      ) {
        link.classList.add('active');
      }

      if (linkPath === '/' && (currentPath === '/' || currentPath === '')) {
        link.classList.add('active');
      }
    });
  } catch (error) {
    console.error('Error updating active nav item:', error);
  }
}
