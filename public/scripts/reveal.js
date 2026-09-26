/** Scroll reveal: sections fade and rise into place once; groups stagger their children. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('[data-reveal], [data-reveal-group] > *')];
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    [...group.children].forEach((child, index) => child.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`));
  });
  // Content above the fold shows at once; only what's below waits for the scroll.
  const below = targets.filter(el => el.getBoundingClientRect().top > innerHeight * 0.92);
  if (!below.length) return;
  document.documentElement.classList.add('reveal-ready');
  below.forEach(el => el.classList.add('reveal-pending'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      // The reveal transition exists only while animating, so hover transitions (topic and FAQ cards) stay their own.
      el.classList.add('reveal-animating');
      requestAnimationFrame(() => el.classList.remove('reveal-pending'));
      const delay = parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0;
      setTimeout(() => el.classList.remove('reveal-animating'), delay + 1000);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  below.forEach(el => observer.observe(el));
})();
