const STATIC_LABELS = {
  en: {
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.live': 'Live',
    'nav.projects': 'Projects',
    'nav.links': 'Links',
    'nav.contact': 'Contact',
    'about.title': 'About',
    'stack.title': 'Stack',
    'live.title': 'Live in production',
    'live.lead': 'Open source on GitHub and running in production — click through to use the real app.',
    'live.badge': 'Live',
    'projects.title': 'Other projects',
    'links.title': 'Related links',
    'contact.title': 'Contact',
    'contact.lead': 'Open to chat about backend, cloud, agile and side projects.',
    'footer.source': 'Source'
  },
  pt: {
    'nav.about': 'Sobre',
    'nav.stack': 'Stack',
    'nav.live': 'No ar',
    'nav.projects': 'Projetos',
    'nav.links': 'Links',
    'nav.contact': 'Contato',
    'about.title': 'Sobre',
    'stack.title': 'Stack',
    'live.title': 'Em produção',
    'live.lead': 'Código aberto no GitHub e rodando em produção — clique e use o app de verdade.',
    'live.badge': 'No ar',
    'projects.title': 'Outros projetos',
    'links.title': 'Links relacionados',
    'contact.title': 'Contato',
    'contact.lead': 'Aberto a conversar sobre backend, cloud, ágil e side projects.',
    'footer.source': 'Código-fonte'
  }
};

function pickLang(value, lang) {
  if (value && typeof value === 'object' && (value.en || value.pt)) {
    return value[lang] || value.en || value.pt || '';
  }
  return value || '';
}

function t(lang, key) {
  const dict = STATIC_LABELS[lang] || STATIC_LABELS.en;
  return dict[key] || STATIC_LABELS.en[key] || '';
}

function liveLabel(live) {
  if (live.label) return live.label;
  try {
    return new URL(live.url).hostname;
  } catch (e) {
    return live.url;
  }
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.href) node.href = opts.href;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  }
  return node;
}

function fa(iconClass) {
  const i = document.createElement('i');
  i.className = iconClass || '';
  i.setAttribute('aria-hidden', 'true');
  return i;
}

function externalLink(url, iconClass, label) {
  const a = el('a', { href: url, attrs: { target: '_blank', rel: 'noopener' } });
  if (iconClass) {
    a.appendChild(fa(iconClass));
    a.appendChild(document.createTextNode(' '));
  }
  if (label) a.appendChild(document.createTextNode(label));
  return a;
}

function renderHero(data, lang) {
  const initials = data.profile.avatarInitials || 'FC';
  document.getElementById('brandMark').textContent = initials;
  document.getElementById('brandName').textContent = data.profile.name || '';
  document.getElementById('heroAvatar').textContent = initials;
  document.getElementById('heroName').textContent = data.profile.name || '';
  document.getElementById('heroTagline').textContent = pickLang(data.profile.tagline, lang);
  document.getElementById('heroLead').textContent = pickLang(data.profile.lead, lang);
  document.title = `${data.profile.name || 'Portfolio'} — Software Engineer`;

  const container = document.getElementById('heroLinks');
  container.innerHTML = '';
  (data.profile.heroLinks || []).forEach((link) => {
    container.appendChild(externalLink(link.url, link.icon, link.label));
  });
}

function renderAbout(data, lang) {
  const container = document.getElementById('aboutBody');
  container.innerHTML = '';
  const paragraphs = (data.about && data.about[lang]) || data.about.en || [];
  paragraphs.forEach((text) => {
    container.appendChild(el('p', { text }));
  });
}

function renderStack(data, lang) {
  const container = document.getElementById('stackGroups');
  container.innerHTML = '';
  (data.stack || []).forEach((group) => {
    const groupEl = el('div', { className: 'stack-group' });
    groupEl.appendChild(el('h3', { text: pickLang(group.title, lang) }));
    const ul = el('ul', { className: 'chips' });
    (group.items || []).forEach((item) => ul.appendChild(el('li', { text: item })));
    groupEl.appendChild(ul);
    container.appendChild(groupEl);
  });
}

function isLive(project) {
  return Boolean(project && project.live && project.live.url);
}

function liveBadge(lang) {
  const badge = el('span', { className: 'live-badge' });
  badge.appendChild(el('span', { className: 'live-dot', attrs: { 'aria-hidden': 'true' } }));
  badge.appendChild(document.createTextNode(t(lang, 'live.badge')));
  return badge;
}

function projectCard(project, lang) {
  const live = isLive(project);
  const article = el('article', { className: live ? 'project is-live' : 'project' });

  const header = el('header');
  const iconWrap = el('span', { className: 'project-icon' });
  iconWrap.appendChild(fa(project.icon));
  header.appendChild(iconWrap);
  header.appendChild(el('h3', { text: project.name || '' }));
  if (live) header.appendChild(liveBadge(lang));
  article.appendChild(header);

  article.appendChild(el('p', { text: pickLang(project.description, lang) }));

  const chips = el('ul', { className: 'chips small' });
  (project.chips || []).forEach((c) => chips.appendChild(el('li', { text: c })));
  article.appendChild(chips);

  const footer = el('footer');
  if (live) {
    const cta = externalLink(project.live.url, 'fa-solid fa-arrow-up-right-from-square', liveLabel(project.live));
    cta.className = 'project-cta';
    footer.appendChild(cta);
  }
  (project.links || []).forEach((link) => {
    footer.appendChild(externalLink(link.url, link.icon, pickLang(link.label, lang)));
  });
  if (footer.childNodes.length) article.appendChild(footer);

  return article;
}

function renderProjects(data, lang) {
  const all = data.projects || [];
  const live = all.filter(isLive);
  const rest = all.filter((project) => !isLive(project));

  const liveList = document.getElementById('liveList');
  if (liveList) {
    liveList.innerHTML = '';
    live.forEach((project) => liveList.appendChild(projectCard(project, lang)));
  }
  const liveSection = document.getElementById('live');
  if (liveSection) liveSection.hidden = live.length === 0;
  const liveNav = document.querySelector('.nav a[href="#live"]');
  if (liveNav) liveNav.hidden = live.length === 0;

  const container = document.getElementById('projectsList');
  container.innerHTML = '';
  rest.forEach((project) => container.appendChild(projectCard(project, lang)));

  const projectsSection = document.getElementById('projects');
  if (projectsSection) projectsSection.hidden = rest.length === 0;
}

function renderLinks(data) {
  const container = document.getElementById('linksList');
  if (!container) return;
  container.innerHTML = '';
  (data.links || []).forEach((link) => {
    const card = el('a', { className: 'link-card', href: link.url, attrs: { target: '_blank', rel: 'noopener' } });
    const iconWrap = el('span', { className: 'link-card-icon' });
    iconWrap.appendChild(fa(link.icon));
    card.appendChild(iconWrap);
    card.appendChild(el('span', { className: 'link-card-label', text: link.label || link.url }));
    container.appendChild(card);
  });
}

function renderContacts(data) {
  const container = document.getElementById('contactList');
  container.innerHTML = '';
  (data.contacts || []).forEach((contact) => {
    const li = el('li');
    li.appendChild(externalLink(contact.url, contact.icon, contact.label));
    container.appendChild(li);
  });
}

function applyStaticLabels(lang) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    const value = STATIC_LABELS[lang] && STATIC_LABELS[lang][key];
    if (value) node.textContent = value;
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'en' ? 'PT' : 'EN';
}

function applyLang(lang, data) {
  applyStaticLabels(lang);
  if (data) {
    renderHero(data, lang);
    renderAbout(data, lang);
    renderStack(data, lang);
    renderProjects(data, lang);
    renderLinks(data);
    renderContacts(data);
  }
  try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.classList.toggle('fa-moon', theme === 'light');
    icon.classList.toggle('fa-sun', theme === 'dark');
  }
  try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
}

function loadSiteData() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('draft') === '1') {
    try {
      const draft = localStorage.getItem('siteDataDraft');
      if (draft) return JSON.parse(draft);
    } catch (e) { /* fall through */ }
  }
  return window.SITE_DATA || null;
}

document.addEventListener('DOMContentLoaded', () => {
  const data = loadSiteData();

  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) { /* ignore */ }
  applyLang(lang, data);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
      applyLang(current === 'en' ? 'pt' : 'en', data);
    });
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(currentTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
