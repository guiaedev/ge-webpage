(() => {
  const dialog = document.querySelector('#booking-dialog');
  if (!dialog) return;
  const status = dialog.querySelector('.booking-status');
  const contact = dialog.querySelector('.booking-contact');
  const direct = dialog.querySelector('.booking-direct');
  const tablist = dialog.querySelector('.booking-tabs');
  const tabs = [...dialog.querySelectorAll('[role=tab]')];
  const copy = [...dialog.querySelectorAll('[data-copy-first]')];
  const parse = value => {
    try {
      const candidate = new URL(value);
      if (candidate.protocol === 'https:' && candidate.hostname === 'cal.com' && candidate.pathname !== '/' && !candidate.username && !candidate.password) return candidate;
    } catch { /* No event configured yet; show the contact option. */ }
  };
  // One Cal.com event per tab; each calendar loads the first time its tab is shown.
  const calendars = {
    first: {url: parse(dialog.dataset.urlFirst), panel: dialog.querySelector('#cal-first')},
    followup: {url: parse(dialog.dataset.urlFollowup), panel: dialog.querySelector('#cal-followup')},
  };
  const available = Object.keys(calendars).filter(key => calendars[key].url);
  const STORAGE_KEY = 'ge-booking-tab';
  const remembered = () => { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } };
  const remember = key => { try { localStorage.setItem(STORAGE_KEY, key); } catch { /* Storage unavailable; the choice just isn't kept. */ } };
  let active;
  let trigger;
  let previousOverflow;

  const fail = key => {
    if (key !== active) return;
    status.textContent = 'El calendario está tardando en cargar. Puedes abrirlo en otra pestaña o contactar al equipo.';
    contact.hidden = false;
    contact.querySelector('p').hidden = true;
  };
  const ensureLoader = () => {
    // Cal's official loader snippet (namespaced queue); embed.js is fetched only after someone opens booking.
    (function (C, A, L) { const p = (a, ar) => { a.q.push(ar); }; const d = C.document; C.Cal = C.Cal || function () { const cal = C.Cal; const ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; const s = d.createElement('script'); s.src = A; s.onerror = () => fail(active); d.head.appendChild(s); cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
  };
  const loadCalendar = key => {
    const entry = calendars[key];
    if (entry.started) return;
    entry.started = true;
    ensureLoader();
    const namespace = `booking-${key}`;
    window.Cal('init', namespace, {origin: 'https://app.cal.com'});
    const cal = window.Cal.ns[namespace];
    entry.timer = setTimeout(() => fail(key), 15000);
    cal('on', {action: 'linkReady', callback: () => {
      clearTimeout(entry.timer);
      entry.ready = true;
      if (key === active) status.textContent = '';
    }});
    cal('inline', {elementOrSelector: `#${entry.panel.id}`, calLink: entry.url.pathname.replace(/^\//, ''), config: {layout: 'month_view', theme: 'light', locale: 'es'}});
    cal('ui', {theme: 'light', hideEventTypeDetails: false, layout: 'month_view', cssVarsPerTheme: {light: {'cal-brand': '#161616', 'cal-bg': '#faf7f0', 'cal-bg-muted': '#f3eee4', 'cal-border-subtle': '#e6dccb', 'cal-border': '#ddd3c3'}}});
  };
  const select = (key, {focus = false} = {}) => {
    if (!calendars[key]?.url) key = available[0];
    active = key;
    tabs.forEach(tab => {
      const selected = tab.dataset.tab === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    Object.entries(calendars).forEach(([name, entry]) => { entry.panel.hidden = name !== key; });
    copy.forEach(node => { node.textContent = key === 'followup' ? node.dataset.copyFollowup : node.dataset.copyFirst; });
    const entry = calendars[key];
    contact.hidden = true;
    direct.hidden = false;
    direct.href = entry.url.href;
    status.textContent = entry.ready ? '' : 'Cargando horarios disponibles…';
    loadCalendar(key);
    remember(key);
  };

  tabs.forEach(tab => tab.addEventListener('click', () => select(tab.dataset.tab)));
  tablist.addEventListener('keydown', event => {
    const index = tabs.findIndex(tab => tab.dataset.tab === active);
    const next = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(tabs[(next + tabs.length) % tabs.length].dataset.tab, {focus: true});
  });

  document.querySelectorAll('[data-booking]').forEach(button => {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'booking-dialog');
    button.addEventListener('click', event => {
      event.preventDefault();
      document.querySelectorAll('dialog[open]').forEach(other => other.close());
      trigger = button.closest('dialog') ? document.querySelector('.hero-actions [data-booking]') : button;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const hasCalendar = available.length > 0;
      dialog.classList.toggle('has-calendar', hasCalendar);
      dialog.querySelector('.booking-lead').hidden = !hasCalendar;
      tablist.hidden = available.length < 2;
      dialog.showModal();
      // A button can name its tab (the hero's "primera sesión"); otherwise reopen the last one used.
      if (hasCalendar) select(button.dataset.bookingTab || remembered() || 'first');
    });
  });
  // The modal closes itself, so its × works on pages without the home page's dialog script.
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    requestAnimationFrame(() => trigger?.focus());
  });
})();
