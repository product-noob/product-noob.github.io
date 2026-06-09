/**
 * CTA click tracking. Delegates from document; fires `cta_click`
 * to gtag for any element (or ancestor) carrying `data-track`.
 * Loaded globally via BaseLayout.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function initCtaTracking(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;

    const el = target.closest<HTMLElement>('[data-track]');
    if (!el) return;

    const ctaId = el.dataset.track;
    if (!ctaId) return;

    const gtag = window.gtag;
    if (typeof gtag !== 'function') return;

    gtag('event', 'cta_click', {
      cta_id: ctaId,
      cta_location: el.dataset.trackLocation ?? 'unknown',
      cta_href: el.getAttribute('href') ?? undefined,
    });
  });
}
