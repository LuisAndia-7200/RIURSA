/* ==========================================================================
   GALERÍA — Filtrado accesible por pestañas (patrón ARIA tabs)
   ========================================================================== */
(function () {
  const tablist = document.querySelector('.gallery-filters[role="tablist"]');
  const grid = document.getElementById('gallery-grid');
  const emptyMessage = document.getElementById('gallery-empty');

  if (!tablist || !grid) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const items = Array.from(grid.querySelectorAll('.gallery-item'));

  function activateTab(tab, { focus = true } = {}) {
    const filter = tab.dataset.filter;

    tabs.forEach((t) => {
      const isSelected = t === tab;
      t.classList.toggle('is-active', isSelected);
      t.setAttribute('aria-selected', String(isSelected));
      t.tabIndex = isSelected ? 0 : -1;
    });

    grid.setAttribute('aria-labelledby', tab.id);

    let visibleCount = 0;
    items.forEach((item) => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }

    if (focus) tab.focus();
  }

  tablist.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    activateTab(tab, { focus: false });
  });

  tablist.addEventListener('keydown', (event) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex]);
  });
})();
