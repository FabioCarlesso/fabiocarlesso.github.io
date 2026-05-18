const DRAFT_KEY = 'siteDataDraft';
let data = loadInitialData();

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadInitialData() {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) return JSON.parse(draft);
  } catch (e) { /* ignore */ }
  return deepClone(window.SITE_DATA || {});
}

function saveDraft() {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  refreshBanner();
}

function refreshBanner() {
  const banner = document.getElementById('draftBanner');
  if (!banner) return;
  banner.hidden = !localStorage.getItem(DRAFT_KEY);
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.html != null) node.innerHTML = opts.html;
  if (opts.type) node.type = opts.type;
  if (opts.placeholder) node.placeholder = opts.placeholder;
  if (opts.value != null) node.value = opts.value;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  return node;
}

function section(title) {
  const s = el('section', { className: 'admin-section' });
  s.appendChild(el('h2', { text: title }));
  return s;
}

function field(label, control) {
  const wrap = el('label', { className: 'field' });
  wrap.appendChild(el('span', { text: label }));
  wrap.appendChild(control);
  return wrap;
}

function input(value, onChange, placeholder, type = 'text') {
  const i = el('input', { type, value: value || '', placeholder: placeholder || '' });
  i.addEventListener('input', () => { onChange(i.value); saveDraft(); });
  return i;
}

function textarea(value, onChange, rows = 3, placeholder) {
  const t = el('textarea', { value: value || '', placeholder: placeholder || '' });
  t.rows = rows;
  t.addEventListener('input', () => { onChange(t.value); saveDraft(); });
  return t;
}

function addBtn(label, onClick) {
  const b = el('button', { className: 'add-btn', type: 'button', text: label });
  b.addEventListener('click', onClick);
  return b;
}

function removeBtn(onClick) {
  const b = el('button', { className: 'remove', type: 'button', text: '×' });
  b.setAttribute('aria-label', 'Remove');
  b.addEventListener('click', onClick);
  return b;
}

function renderForm() {
  const root = document.getElementById('formRoot');
  root.innerHTML = '';
  root.appendChild(renderProfileSection());
  root.appendChild(renderAboutSection());
  root.appendChild(renderStackSection());
  root.appendChild(renderProjectsSection());
  root.appendChild(renderLinksSection());
  root.appendChild(renderContactsSection());
}

function renderProfileSection() {
  const s = section('Profile');
  data.profile = data.profile || {};
  data.profile.tagline = data.profile.tagline || { en: '', pt: '' };
  data.profile.lead = data.profile.lead || { en: '', pt: '' };
  data.profile.heroLinks = data.profile.heroLinks || [];

  const grid1 = el('div', { className: 'field-grid' });
  grid1.appendChild(field('Name', input(data.profile.name, (v) => { data.profile.name = v; })));
  grid1.appendChild(field('Avatar initials', input(data.profile.avatarInitials, (v) => { data.profile.avatarInitials = v; })));
  s.appendChild(grid1);

  const grid2 = el('div', { className: 'field-grid' });
  grid2.appendChild(field('Tagline (EN)', input(data.profile.tagline.en, (v) => { data.profile.tagline.en = v; })));
  grid2.appendChild(field('Tagline (PT)', input(data.profile.tagline.pt, (v) => { data.profile.tagline.pt = v; })));
  s.appendChild(grid2);

  const grid3 = el('div', { className: 'field-grid' });
  grid3.appendChild(field('Lead (EN)', textarea(data.profile.lead.en, (v) => { data.profile.lead.en = v; }, 2)));
  grid3.appendChild(field('Lead (PT)', textarea(data.profile.lead.pt, (v) => { data.profile.lead.pt = v; }, 2)));
  s.appendChild(grid3);

  s.appendChild(el('h3', { text: 'Hero links' }));
  s.appendChild(renderLinkList(data.profile.heroLinks, renderProfileReplace(s)));
  return s;
}

function renderProfileReplace(currentSection) {
  return () => {
    const fresh = renderProfileSection();
    currentSection.replaceWith(fresh);
  };
}

function renderLinkList(list, rerender) {
  const wrap = el('div', { className: 'repeater' });
  list.forEach((item, idx) => {
    const row = el('div', { className: 'repeater-row' });
    row.appendChild(input(item.icon, (v) => { item.icon = v; }, 'fa-brands fa-github'));
    row.appendChild(input(item.label, (v) => { item.label = v; }, 'Label'));
    row.appendChild(input(item.url, (v) => { item.url = v; }, 'https://...', 'url'));
    row.appendChild(removeBtn(() => { list.splice(idx, 1); saveDraft(); rerender(); }));
    wrap.appendChild(row);
  });
  const add = addBtn('+ Add link', () => {
    list.push({ icon: '', label: '', url: '' });
    saveDraft();
    rerender();
  });
  const container = el('div');
  container.appendChild(wrap);
  container.appendChild(add);
  return container;
}

function renderAboutSection() {
  const s = section('About');
  data.about = data.about || { en: [], pt: [] };

  const grid = el('div', { className: 'field-grid' });
  grid.appendChild(field('Paragraphs (EN) — blank line between each',
    textarea(joinParagraphs(data.about.en), (v) => { data.about.en = splitParagraphs(v); }, 6)));
  grid.appendChild(field('Paragraphs (PT) — blank line between each',
    textarea(joinParagraphs(data.about.pt), (v) => { data.about.pt = splitParagraphs(v); }, 6)));
  s.appendChild(grid);
  return s;
}

function joinParagraphs(arr) {
  return (arr || []).join('\n\n');
}
function splitParagraphs(str) {
  return str.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function renderStackSection() {
  const s = section('Stack');
  data.stack = data.stack || [];
  const rerender = () => { const fresh = renderStackSection(); s.replaceWith(fresh); };

  const list = el('div', { className: 'repeater' });
  data.stack.forEach((group, idx) => {
    group.title = group.title || { en: '', pt: '' };
    group.items = group.items || [];

    const card = el('div', { className: 'card' });
    const head = el('div', { className: 'card-head' });
    head.appendChild(input(group.title.en, (v) => { group.title.en = v; }, 'Title (EN)'));
    head.appendChild(input(group.title.pt, (v) => { group.title.pt = v; }, 'Title (PT)'));
    head.appendChild(removeBtn(() => { data.stack.splice(idx, 1); saveDraft(); rerender(); }));
    card.appendChild(head);
    card.appendChild(field('Items (comma-separated)',
      input(group.items.join(', '), (v) => { group.items = splitCsv(v); }, 'Java, Python, ...')));
    list.appendChild(card);
  });
  s.appendChild(list);
  s.appendChild(addBtn('+ Add group', () => {
    data.stack.push({ title: { en: '', pt: '' }, items: [] });
    saveDraft();
    rerender();
  }));
  return s;
}

function splitCsv(str) {
  return str.split(',').map((s) => s.trim()).filter(Boolean);
}

function renderProjectsSection() {
  const s = section('Projects');
  data.projects = data.projects || [];
  const rerender = () => { const fresh = renderProjectsSection(); s.replaceWith(fresh); };

  data.projects.forEach((project, idx) => {
    project.description = project.description || { en: '', pt: '' };
    project.chips = project.chips || [];
    project.links = project.links || [];

    const card = el('div', { className: 'card' });
    const head = el('div', { className: 'card-head' });
    head.appendChild(input(project.name, (v) => { project.name = v; }, 'Project name'));
    head.appendChild(removeBtn(() => { data.projects.splice(idx, 1); saveDraft(); rerender(); }));
    card.appendChild(head);

    card.appendChild(field('Icon', input(project.icon, (v) => { project.icon = v; }, 'fa-solid fa-shapes')));

    const descGrid = el('div', { className: 'field-grid' });
    descGrid.appendChild(field('Description (EN)', textarea(project.description.en, (v) => { project.description.en = v; }, 3)));
    descGrid.appendChild(field('Description (PT)', textarea(project.description.pt, (v) => { project.description.pt = v; }, 3)));
    card.appendChild(descGrid);

    card.appendChild(field('Chips (comma-separated)',
      input(project.chips.join(', '), (v) => { project.chips = splitCsv(v); }, 'Java, REST, ...')));

    const sub = el('div', { className: 'card-sub' });
    sub.appendChild(el('h4', { text: 'Links' }));
    sub.appendChild(renderLinkList(project.links, rerender));
    card.appendChild(sub);

    s.appendChild(card);
  });

  s.appendChild(addBtn('+ Add project', () => {
    data.projects.push({
      name: '',
      icon: '',
      description: { en: '', pt: '' },
      chips: [],
      links: []
    });
    saveDraft();
    rerender();
  }));
  return s;
}

function renderLinksSection() {
  const s = section('Related links');
  data.links = data.links || [];
  const rerender = () => { const fresh = renderLinksSection(); s.replaceWith(fresh); };
  s.appendChild(renderLinkList(data.links, rerender));
  return s;
}

function renderContactsSection() {
  const s = section('Contacts');
  data.contacts = data.contacts || [];
  const rerender = () => { const fresh = renderContactsSection(); s.replaceWith(fresh); };
  s.appendChild(renderLinkList(data.contacts, rerender));
  return s;
}

function formatExport(obj) {
  return 'window.SITE_DATA = ' + JSON.stringify(obj, null, 2) + ';\n';
}

function openExport() {
  const content = formatExport(data);
  document.getElementById('exportContent').value = content;
  document.getElementById('exportModal').hidden = false;
}

function closeExport() {
  document.getElementById('exportModal').hidden = true;
}

function copyExport() {
  const textarea = document.getElementById('exportContent');
  textarea.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textarea.value).catch(() => {});
    ok = true;
  }
  const btn = document.getElementById('copyExport');
  const original = btn.innerHTML;
  btn.innerHTML = ok ? '<i class="fa-solid fa-check"></i> Copied' : '<i class="fa-solid fa-xmark"></i> Failed';
  setTimeout(() => { btn.innerHTML = original; }, 1600);
}

function downloadExport() {
  const blob = new Blob([document.getElementById('exportContent').value], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function resetDraft() {
  if (!confirm('Discard local edits and reload from data.js?')) return;
  try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ }
  data = deepClone(window.SITE_DATA || {});
  renderForm();
  refreshBanner();
}

document.addEventListener('DOMContentLoaded', () => {
  renderForm();
  refreshBanner();
  document.getElementById('exportBtn').addEventListener('click', openExport);
  document.getElementById('resetBtn').addEventListener('click', resetDraft);
  document.getElementById('closeExport').addEventListener('click', closeExport);
  document.getElementById('copyExport').addEventListener('click', copyExport);
  document.getElementById('downloadExport').addEventListener('click', downloadExport);
  document.getElementById('exportModal').addEventListener('click', (e) => {
    if (e.target.id === 'exportModal') closeExport();
  });
});
