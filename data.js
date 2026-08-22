window.SITE_DATA = {
  profile: {
    name: "Fabio Carlesso",
    avatarInitials: "FC",
    tagline: {
      en: "Software Engineer · Java · Python · Cloud",
      pt: "Engenheiro de Software · Java · Python · Cloud"
    },
    lead: {
      en: "Building reliable backends and clean APIs from Foz do Iguaçu, Brazil.",
      pt: "Construindo backends confiáveis e APIs limpas a partir de Foz do Iguaçu, Brasil."
    },
    heroLinks: [
      { icon: "fa-brands fa-github", label: "GitHub", url: "https://github.com/FabioCarlesso" },
      { icon: "fa-brands fa-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/fabio-carlesso/" },
      { icon: "fa-solid fa-globe", label: "fabiocarlesso.com", url: "https://fabiocarlesso.com" }
    ]
  },
  about: {
    en: [
      "Software engineer with a Computer Science degree (2013) and a postgraduate in Data Science & Big Data (2022). I work with development in Java and Python and project monitoring using agile practices.",
      "Certified Java Technology Specialist (2016), EXIN Agile Scrum Foundation (2019) and AWS Certified Cloud Practitioner (2023)."
    ],
    pt: [
      "Engenheiro de software formado em Ciência da Computação (2013) e pós-graduado em Data Science & Big Data (2022). Atuo com desenvolvimento em Java e Python e acompanhamento de projetos com práticas ágeis.",
      "Especialista certificado em Tecnologia Java (2016), EXIN Agile Scrum Foundation (2019) e AWS Certified Cloud Practitioner (2023)."
    ]
  },
  stack: [
    { title: { en: "Languages", pt: "Linguagens" }, items: ["Java", "Kotlin", "Python", "TypeScript"] },
    { title: { en: "Frameworks", pt: "Frameworks" }, items: ["Spring Boot", "Angular", "React"] },
    { title: { en: "Cloud & DevOps", pt: "Cloud & DevOps" }, items: ["AWS", "Docker", "Git", "GitHub Actions"] },
    { title: { en: "Practices", pt: "Práticas" }, items: ["Scrum", "Design Patterns", "REST APIs"] }
  ],
  projects: [
    {
      name: "FightOssStreak",
      icon: "fa-solid fa-hand-fist",
      live: { url: "https://fos.fabiocarlesso.com", label: "fos.fabiocarlesso.com" },
      description: {
        en: "Review and retention tool for what is learned on the mat, with gamification — skill tree, concept quizzes, drill logging, streak and spaced repetition. Monorepo with a Spring Boot API and a React web app.",
        pt: "Ferramenta de revisão e retenção do que é aprendido no tatame, com gamificação — árvore de currículo, quiz conceitual, registro de drill, streak e repetição espaçada. Monorepo com API Spring Boot e web em React."
      },
      chips: ["Java 21", "Spring Boot 3.4", "React 18", "Vite", "PostgreSQL", "Docker"],
      links: [
        { icon: "fa-brands fa-github", label: "Repository", url: "https://github.com/FabioCarlesso/FightOssStreak" }
      ]
    },
    {
      name: "Carlesso Pilates",
      icon: "fa-solid fa-person-running",
      live: { url: "https://app.carlessopilates.com.br", label: "app.carlessopilates.com.br" },
      description: {
        en: "REST API and admin UI for pilates studio management: patients, clinical records, payment plans, billing, class generation and reports. Backend in Spring Boot 3 / Java 21, frontend in Angular 22.",
        pt: "API REST e UI administrativa para gestão de studio de pilates: pacientes, prontuário clínico, planos de pagamento, cobranças, geração de aulas e relatórios. Backend em Spring Boot 3 / Java 21, frontend em Angular 22."
      },
      chips: ["Java 21", "Spring Boot 3.4", "Angular 22", "PostgreSQL 16", "JWT"],
      links: [
        { icon: "fa-solid fa-server", label: "API", url: "https://github.com/FabioCarlesso/carlessopilatesapi" },
        { icon: "fa-solid fa-display", label: "Frontend", url: "https://github.com/FabioCarlesso/carlessopilatesfe" }
      ]
    },
    {
      name: "GoalFather",
      icon: "fa-solid fa-shield-halved",
      description: {
        en: "Elifoot-style football manager — line-up, tactics, transfer market, finances and a simulated league. Kotlin/Spring Boot backend with a React frontend; a study project on idiomatic Kotlin and clean architecture, in development.",
        pt: "Manager de futebol no estilo Elifoot — escalação, táticas, mercado, finanças e campeonato simulado. Backend em Kotlin/Spring Boot com frontend em React; projeto de estudo de Kotlin idiomático e arquitetura limpa, em desenvolvimento."
      },
      chips: ["Kotlin", "Spring Boot", "React", "TypeScript", "Vite"],
      links: [
        { icon: "fa-brands fa-github", label: "Repository", url: "https://github.com/FabioCarlesso/goalfather" }
      ]
    },
    {
      name: "Goodfunds",
      icon: "fa-solid fa-wallet",
      description: {
        en: "Personal finance tracker: income and expenses, credit card PDF statement import with automatic parsing, per-category budgets and monthly reports with spending forecasts.",
        pt: "Controle financeiro pessoal: receitas e despesas, importação de faturas de cartão em PDF com parse automático, orçamento por categoria e relatórios mensais com estimativas de gasto."
      },
      chips: ["Java 17", "Spring Boot 3", "JWT", "React", "Tailwind", "PostgreSQL 16"],
      links: [
        { icon: "fa-brands fa-github", label: "Repository", url: "https://github.com/FabioCarlesso/goodfunds" }
      ]
    },
    {
      name: "Cartola Odds",
      icon: "fa-solid fa-futbol",
      description: {
        en: "Tool to help build a Cartola FC team based on data and probabilities. Java API with a TypeScript frontend.",
        pt: "Ferramenta para montar um time do Cartola FC com base em dados e probabilidades. API em Java com frontend em TypeScript."
      },
      chips: ["Java", "TypeScript", "REST"],
      links: [
        { icon: "fa-solid fa-server", label: "API", url: "https://github.com/FabioCarlesso/cartolaoddsapi" },
        { icon: "fa-solid fa-display", label: "Frontend", url: "https://github.com/FabioCarlesso/cartolaoddsfe" }
      ]
    },
    {
      name: "Design Patterns",
      icon: "fa-solid fa-shapes",
      description: {
        en: "Practical implementations of classic design patterns in Java — study repository.",
        pt: "Implementações práticas de design patterns clássicos em Java — repositório de estudos."
      },
      chips: ["Java", "OOP", "Patterns"],
      links: [
        { icon: "fa-brands fa-github", label: "Repository", url: "https://github.com/FabioCarlesso/DesignPatterns" }
      ]
    }
  ],
  links: [
    { icon: "fa-solid fa-wand-magic-sparkles", label: "Prompt Finction", url: "https://fabiocarlesso.github.io/prompt-finction/" },
    { icon: "fa-solid fa-trophy", label: "Brag Matrix", url: "https://fabiocarlesso.github.io/brag-matrix/" },
    { icon: "fa-solid fa-futbol", label: "Cartola Garela AFC", url: "https://fabiocarlesso.github.io/cartola-garela-afc/" }
  ],
  contacts: [
    { icon: "fa-brands fa-github", label: "github.com/FabioCarlesso", url: "https://github.com/FabioCarlesso" },
    { icon: "fa-brands fa-linkedin", label: "linkedin.com/in/fabio-carlesso", url: "https://www.linkedin.com/in/fabio-carlesso/" },
    { icon: "fa-solid fa-globe", label: "fabiocarlesso.com", url: "https://fabiocarlesso.com" }
  ]
};
