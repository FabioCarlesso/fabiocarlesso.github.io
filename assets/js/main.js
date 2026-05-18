const translations = {
  en: {
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.tagline': 'Software Engineer · Java · Python · Cloud',
    'hero.lead': 'Building reliable backends and clean APIs from Foz do Iguaçu, Brazil.',
    'about.title': 'About',
    'about.p1': 'Software engineer with a Computer Science degree (2013) and a postgraduate in Data Science & Big Data (2022). I work with development in Java and Python and project monitoring using agile practices.',
    'about.p2': 'Certified Java Technology Specialist (2016), EXIN Agile Scrum Foundation (2019) and AWS Certified Cloud Practitioner (2023).',
    'stack.title': 'Stack',
    'stack.languages': 'Languages',
    'stack.frameworks': 'Frameworks',
    'stack.cloud': 'Cloud & DevOps',
    'stack.practices': 'Practices',
    'projects.title': 'Featured projects',
    'projects.pilates': 'REST API and admin UI for pilates studio management. Backend in Spring Boot 3 / Java 21, frontend in Angular 19.',
    'projects.cartola': 'Tool to help build a Cartola FC team based on data and probabilities. Java API with a TypeScript frontend.',
    'projects.patterns': 'Practical implementations of classic design patterns in Java — study repository.',
    'projects.api': 'API',
    'projects.frontend': 'Frontend',
    'projects.repo': 'Repository',
    'contact.title': 'Contact',
    'contact.lead': 'Open to chat about backend, cloud, agile and side projects.',
    'footer.source': 'Source'
  },
  pt: {
    'nav.about': 'Sobre',
    'nav.stack': 'Stack',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'hero.tagline': 'Engenheiro de Software · Java · Python · Cloud',
    'hero.lead': 'Construindo backends confiáveis e APIs limpas a partir de Foz do Iguaçu, Brasil.',
    'about.title': 'Sobre',
    'about.p1': 'Engenheiro de software formado em Ciência da Computação (2013) e pós-graduado em Data Science & Big Data (2022). Atuo com desenvolvimento em Java e Python e acompanhamento de projetos com práticas ágeis.',
    'about.p2': 'Especialista certificado em Tecnologia Java (2016), EXIN Agile Scrum Foundation (2019) e AWS Certified Cloud Practitioner (2023).',
    'stack.title': 'Stack',
    'stack.languages': 'Linguagens',
    'stack.frameworks': 'Frameworks',
    'stack.cloud': 'Cloud & DevOps',
    'stack.practices': 'Práticas',
    'projects.title': 'Projetos em destaque',
    'projects.pilates': 'API REST e UI administrativa para gestão de studio de pilates. Backend em Spring Boot 3 / Java 21, frontend em Angular 19.',
    'projects.cartola': 'Ferramenta para montar um time do Cartola FC com base em dados e probabilidades. API em Java com frontend em TypeScript.',
    'projects.patterns': 'Implementações práticas de design patterns clássicos em Java — repositório de estudos.',
    'projects.api': 'API',
    'projects.frontend': 'Frontend',
    'projects.repo': 'Repositório',
    'contact.title': 'Contato',
    'contact.lead': 'Aberto a conversar sobre backend, cloud, ágil e side projects.',
    'footer.source': 'Código-fonte'
  }
};

function applyLang(lang) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang] && translations[lang][key];
    if (value) el.textContent = value;
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'en' ? 'PT' : 'EN';
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

document.addEventListener('DOMContentLoaded', () => {
  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) { /* ignore */ }
  applyLang(lang);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
      applyLang(current === 'en' ? 'pt' : 'en');
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
