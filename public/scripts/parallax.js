/** Decorative scroll depth. No continuous animation loop or layout-affecting writes. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  // The hero painting drifts at a fraction of the scroll; the team and footer paintings shift as they
  // pass the viewport centre, and the footer's foreground plants move the other way so they read as nearer.
  const layers = [...document.querySelectorAll('.hero, .team-section, .about-hero, .site-footer')]
    .map(section => ({
      section,
      hero: section.classList.contains('hero'),
      art: section.querySelector('picture'),
      leaves: [...section.querySelectorAll('.footer-overlap-leaf, .footer-overlap-branch')],
      visible: true,
    }))
    .filter(layer => layer.art);
  let frame = 0;
  let enabled = false;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
  function render() {
    frame = 0;
    if (!enabled) return;
    // Read layout first, then update only compositor transforms.
    const updates = layers.filter(layer => layer.visible).map(layer => {
      const rect = layer.section.getBoundingClientRect();
      // The phone hero keeps still: its small art carries its own fade and would show a hard edge.
      if (layer.hero) return { ...layer, offset: mobile.matches ? 0 : clamp(-rect.top * 0.15, 70) };
      const distance = innerHeight / 2 - (rect.top + rect.height / 2);
      return { ...layer, offset: clamp(distance * (mobile.matches ? 0.045 : 0.12), mobile.matches ? 14 : 36) };
    });
    updates.forEach(({ art, leaves, offset }) => {
      // Plants only ever rise: moving down would extend the page below the footer.
      leaves.forEach((leaf, index) => leaf.style.setProperty('--leaf-y', `${Math.min(0, -offset * (index ? .45 : .7)).toFixed(2)}px`));
      art.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });
  }
  function schedule() {
    if (enabled && !frame && !document.hidden) frame = requestAnimationFrame(render);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const layer = layers.find(item => item.section === entry.target);
      if (layer) layer.visible = entry.isIntersecting;
    });
    schedule();
  }, { rootMargin: '80px' });
  function configure() {
    enabled = !preference.matches;
    cancelAnimationFrame(frame);
    frame = 0;
    layers.forEach(({ section, art, leaves }) => {
      if (!enabled) leaves.forEach(leaf => leaf.style.removeProperty('--leaf-y'));
      section.classList.toggle('parallax-enabled', enabled);
      if (!enabled) art.style.removeProperty('transform');
    });
    if (enabled) {
      layers.forEach(({ section }) => observer.observe(section));
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      schedule();
    } else {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  }
  preference.addEventListener('change', configure);
  mobile.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('pageshow', schedule);
  configure();
})();
