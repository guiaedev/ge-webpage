/** Decorative scroll depth. No continuous animation loop or layout-affecting writes. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  const layers = [...document.querySelectorAll('.hero, .site-footer')]
    .map(section => ({ section, art: section.querySelector('picture'), leaves: [...section.querySelectorAll('.edge-leaf')], visible: true }))
    .filter(layer => layer.art);
  let frame = 0;
  let enabled = false;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
  function render() {
    frame = 0;
    if (!enabled) return;
    const limit = mobile.matches ? 14 : 36;
    const speed = mobile.matches ? 0.045 : 0.12;
    // Read layout first, then update only compositor transforms.
    const updates = layers.filter(layer => layer.visible).map(layer => {
      const rect = layer.section.getBoundingClientRect();
      const distance = layer.section.classList.contains('hero')
        ? -rect.top
        : innerHeight / 2 - (rect.top + rect.height / 2);
      return { art: layer.art, leaves: layer.leaves, offset: clamp(distance * speed, limit) };
    });
    updates.forEach(({ art, leaves, offset }) => {
      leaves.forEach((leaf, index) => leaf.style.setProperty('--leaf-y', `${(-offset * (index ? .45 : .7)).toFixed(2)}px`));
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

// Pointer depth is isolated on the hero image so it composes with scroll parallax.
(() => {
  const hero = document.querySelector('.hero');
  const art = hero?.querySelector('img');
  if (!hero || !art) return;
  const allowed = matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
  let frame = 0;
  let x = 0, y = 0;
  const apply = () => {
    frame = 0;
    art.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
    art.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
  };
  const move = event => {
    const rect = hero.getBoundingClientRect();
    x = ((event.clientX - rect.left) / rect.width - .5) * 8;
    y = ((event.clientY - rect.top) / rect.height - .5) * 5;
    if (!frame) frame = requestAnimationFrame(apply);
  };
  const reset = () => { x = 0; y = 0; cancelAnimationFrame(frame); apply(); };
  const configure = () => {
    hero.removeEventListener('pointermove', move);
    hero.removeEventListener('pointerleave', reset);
    reset();
    if (allowed.matches) {
      hero.addEventListener('pointermove', move, { passive: true });
      hero.addEventListener('pointerleave', reset);
    }
  };
  allowed.addEventListener('change', configure);
  configure();
})();
