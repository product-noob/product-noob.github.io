/**
 * Blog TOC sidebar scroll-spy.
 * - Tracks which heading is closest to the top of the viewport.
 * - Moves the vertical track indicator to match the active TOC link.
 * - Smooth-scrolls on TOC link click.
 */
export function initBlogToc(): void {
  const toc = document.querySelector<HTMLElement>('.blog-toc');
  if (!toc) return;

  const indicator = toc.querySelector<HTMLElement>('.blog-toc__track-indicator');
  const items = toc.querySelector<HTMLElement>('.blog-toc__items');
  const links = Array.from(
    toc.querySelectorAll<HTMLAnchorElement>('.blog-toc__link[data-toc-link]')
  );
  const topLink = toc.querySelector<HTMLAnchorElement>('[data-toc-top]');
  if (!indicator || !items || !topLink) return;

  const headings = links
    .map((link) => {
      const slug = link.dataset.tocLink;
      if (!slug) return null;
      const el = document.getElementById(slug);
      return el ? { link, el } : null;
    })
    .filter((x): x is { link: HTMLAnchorElement; el: HTMLElement } => x !== null);

  if (headings.length === 0) {
    moveIndicatorTo(topLink);
    return;
  }

  function moveIndicatorTo(link: HTMLElement): void {
    const itemsRect = items!.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const top = linkRect.top - itemsRect.top;
    indicator!.style.transform = `translateY(${top}px)`;
    indicator!.style.height = `${linkRect.height}px`;
  }

  function setActive(link: HTMLAnchorElement): void {
    if (link.classList.contains('is-active')) return;
    toc!.querySelectorAll('.blog-toc__link.is-active').forEach((el) =>
      el.classList.remove('is-active')
    );
    link.classList.add('is-active');
    moveIndicatorTo(link);
    scrollActiveIntoView(link);
  }

  function scrollActiveIntoView(link: HTMLElement): void {
    // Only scroll the TOC's internal overflow, not the page.
    const tocRect = toc!.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const padding = 24;
    if (linkRect.top < tocRect.top + padding) {
      toc!.scrollBy({
        top: linkRect.top - tocRect.top - padding,
        behavior: 'smooth',
      });
    } else if (linkRect.bottom > tocRect.bottom - padding) {
      toc!.scrollBy({
        top: linkRect.bottom - tocRect.bottom + padding,
        behavior: 'smooth',
      });
    }
  }

  function update(): void {
    const scrollY = window.scrollY;
    // Top of page: highlight "Top"
    if (scrollY < 80) {
      setActive(topLink!);
      return;
    }

    // Find the last heading whose top is above a small offset from viewport top.
    const offset = 120;
    let current = headings[0]!.link;
    for (const { link, el } of headings) {
      const top = el.getBoundingClientRect().top;
      if (top <= offset) {
        current = link;
      } else {
        break;
      }
    }
    setActive(current);
  }

  let ticking = false;
  function onScroll(): void {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => moveIndicatorTo(
    toc!.querySelector<HTMLElement>('.blog-toc__link.is-active') ?? topLink!
  ));

  // Smooth scroll on click
  toc.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>('a.blog-toc__link');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  update();
}
