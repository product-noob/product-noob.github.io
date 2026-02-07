/**
 * Copy-to-clipboard button for code blocks.
 * Wraps each <pre><code> in a .code-block container and adds a copy button.
 * Loaded globally via BaseLayout.
 */
export function addCopyButtons(): void {
  const codeBlocks = document.querySelectorAll('pre > code');

  codeBlocks.forEach((code) => {
    const pre = code.parentElement;
    if (!pre || pre.dataset.copyInitialized === 'true') return;
    pre.dataset.copyInitialized = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy-button';
    button.textContent = 'Copy';

    button.addEventListener('click', async () => {
      const text = code.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
        button.classList.add('is-copied');
        window.setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
        }, 1500);
      } catch {
        button.textContent = 'Failed';
        window.setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      }
    });

    wrapper.appendChild(button);
  });
}
