/**
 * Mobile hamburger menu toggle.
 * Manages aria-expanded, .is-open class, and scroll locking.
 * Loaded globally via BaseLayout.
 */
export function initMobileMenu(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>(
    '.header__menu-btn'
  );
  const nav = document.querySelector<HTMLElement>('.header__nav');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded =
      menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('is-open');

    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  });
}
