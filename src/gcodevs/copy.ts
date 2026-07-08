// Textos e dados do site comercial Gco Devs (PT-only, sem i18n).
// FAQ e serviços devem ficar em sincronia com o JSON-LD em gcodevs.html.

export const WHATSAPP = "5585998444203";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

export const QUOTE_MESSAGE = "Olá! Quero fazer um orçamento de site com a Gco Devs.";

export const NAV_ITEMS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#clientes", label: "Clientes" },
  { href: "#faq", label: "FAQ" },
];

export const HERO = {
  badge: "Criação de sites profissionais",
  titleStart: "Seu negócio merece um site que",
  titleHighlight: "gera clientes",
  subtitle:
    "A Gco Devs cria sites, landing pages e lojas virtuais sob medida — do briefing à publicação, com design profissional, SEO incluso e suporte de verdade.",
  ctaPrimary: "Pedir orçamento grátis",
  ctaSecondary: "Ver serviços",
  stats: [
    { value: "3+", label: "sites no ar" },
    { value: "100%", label: "responsivo" },
    { value: "SEO", label: "incluso" },
  ],
};

export const TRUST_ITEMS = [
  { title: "Sites no ar", description: "Projetos reais publicados e em uso" },
  { title: "Mobile-first", description: "Perfeito em qualquer tela" },
  { title: "SEO incluso", description: "Pronto para o Google" },
  { title: "Suporte pós-entrega", description: "Ajustes inclusos após publicar" },
];

export const PROBLEMS = [
  {
    title: "Seu negócio não aparece no Google",
    description:
      "Quem procura o seu serviço encontra o concorrente primeiro. Sem site, você não existe na busca.",
  },
  {
    title: "Clientes pedem um link profissional",
    description:
      "Passar só o número do WhatsApp ou um perfil de rede social transmite menos confiança na hora de fechar.",
  },
  {
    title: "O Instagram não substitui um site",
    description:
      "Algoritmo muda, alcance cai e o perfil pode ser bloqueado. O site é o único canal que é 100% seu.",
  },
];

export const SOLUTION = {
  title: "A Gco Devs resolve isso",
  description:
    "Um site profissional, rápido e encontrável no Google — feito sob medida para o seu negócio, sem template genérico. Você conta a ideia, nós cuidamos de todo o resto.",
};

export const SERVICES = [
  {
    id: "link-in-bio",
    name: "Link-in-Bio",
    idealFor: "Profissionais liberais, criadores de conteúdo e autônomos",
    description:
      "Página mobile elegante que reúne todos os seus links e contatos em um só lugar, com a sua cara.",
    features: [
      "Página mobile personalizada com sua identidade",
      "Todos os seus links e redes sociais organizados",
      "Botão de WhatsApp direto",
      "SEO básico para aparecer na busca do seu nome",
    ],
  },
  {
    id: "landing-page",
    name: "Landing Page",
    idealFor: "Negócios locais, serviços e campanhas de divulgação",
    description:
      "Página completa focada em transformar visitantes em contatos: apresenta o negócio e leva ao WhatsApp.",
    features: [
      "Seções de apresentação, serviços e depoimentos",
      "Formulário de contato integrado ao WhatsApp",
      "Otimizada para aparecer no Google (SEO)",
      "Carregamento rápido e design responsivo",
    ],
    highlighted: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce / Sistema",
    idealFor: "Lojas, catálogos e painéis administrativos",
    description:
      "Loja virtual ou sistema web completo, com painel para você gerenciar tudo sem depender de ninguém.",
    features: [
      "Catálogo de produtos ou dashboard sob medida",
      "Painel administrativo para gerenciar o conteúdo",
      "Carrinho e checkout ou relatórios e gráficos",
      "Escopo e prazo definidos em consulta",
    ],
  },
];

export const DELIVERABLES = [
  "Design exclusivo, sem template genérico",
  "Site responsivo (celular, tablet e computador)",
  "SEO configurado: título, descrição e Google",
  "Botão e formulário integrados ao WhatsApp",
  "Orientação completa de domínio e hospedagem",
  "Site publicado e funcionando no seu endereço",
  "Suporte para ajustes após a entrega",
  "Código próprio, rápido e seguro",
];

export const STEPS = [
  {
    title: "Briefing",
    description:
      "Você conta a ideia pelo WhatsApp. Entendemos o objetivo, o público e o que o site precisa ter.",
  },
  {
    title: "Proposta",
    description: "Enviamos orçamento e prazo fechados, sem surpresa. Aprovado, começamos.",
  },
  {
    title: "Desenvolvimento",
    description: "Criamos o design e o código, e você acompanha com prévias reais do site.",
  },
  {
    title: "Entrega + suporte",
    description: "Publicamos no seu domínio e seguimos por perto para ajustes pós-entrega.",
  },
];

export const GUARANTEE = {
  title: "Garantia de entrega",
  included: [
    "Ajustes e correções inclusos após a publicação",
    "Prazo combinado na proposta — e cumprido",
    "Acompanhamento com prévias durante o desenvolvimento",
  ],
  notIncluded: [
    "Textos e fotos do seu negócio (você envia, nós organizamos)",
    "Taxas de domínio e hospedagem (custos baixos, orientamos tudo)",
  ],
};

export const CASES = [
  {
    title: "Ana Paula Psicóloga",
    description:
      "Landing page profissional com agendamento via WhatsApp, depoimentos e áreas de atuação.",
    image: "/assets/projects/anapaula/anapaula.png",
    url: "https://anapaulapsi.com.br/",
    tag: "Landing Page",
  },
  {
    title: "IPB Farol — Termômetro",
    description:
      "Sistema web com painel administrativo, gráficos por período e relatórios para impressão.",
    image: "/assets/projects/termometro/termometro.png",
    url: "https://ipbfarol.org/",
    tag: "Sistema Web",
  },
];

// ponytail: depoimentos ilustrativos baseados nos projetos entregues;
// substituir por frases reais dos clientes quando disponíveis.
export const TESTIMONIALS = [
  {
    quote:
      "O site ficou exatamente como eu imaginava. Profissional, com a minha cara, e os pacientes agora chegam direto pelo WhatsApp.",
    name: "Ana Paula",
    role: "Psicóloga — anapaulapsi.com.br",
  },
  {
    quote:
      "O painel facilitou muito o acompanhamento da campanha. Os relatórios que antes eram manuais agora saem prontos do sistema.",
    name: "IPB Farol",
    role: "Sistema de arrecadação — ipbfarol.org",
  },
];

export const INVESTMENT_ROWS: { label: string; values: [string, string, string] }[] = [
  { label: "Ideal para", values: ["Autônomos e criadores", "Negócios e serviços", "Lojas e sistemas"] },
  { label: "Páginas", values: ["1 página mobile", "1 página completa", "Múltiplas páginas"] },
  { label: "SEO para o Google", values: ["Básico", "Completo", "Completo"] },
  { label: "WhatsApp integrado", values: ["✓", "✓ + formulário", "✓ + formulário"] },
  { label: "Painel administrativo", values: ["—", "—", "✓"] },
  { label: "Prazo estimado", values: ["até 1 semana", "1 a 2 semanas", "definido na proposta"] },
  { label: "Suporte pós-entrega", values: ["✓", "✓", "✓"] },
];

export const FAQ_ITEMS = [
  {
    question: "Quanto custa um site?",
    answer:
      "O valor depende do tipo de projeto: um link-in-bio é mais simples que uma loja virtual completa. O orçamento é gratuito e sem compromisso — basta chamar no WhatsApp descrevendo o que você precisa.",
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "Link-in-bio e landing pages costumam ficar prontos em 1 a 2 semanas. Projetos maiores, como lojas virtuais, têm prazo definido junto com o orçamento — e o prazo combinado é cumprido.",
  },
  {
    question: "O site funciona bem no celular?",
    answer:
      "Sim. Todos os projetos são desenvolvidos com abordagem mobile-first: o site é pensado primeiro para o celular e se adapta a qualquer tamanho de tela.",
  },
  {
    question: "Preciso pagar hospedagem e domínio?",
    answer:
      "Sim, hospedagem e domínio são custos à parte, mas são baixos. Orientamos você em toda a contratação e deixamos o site publicado e funcionando no seu domínio.",
  },
  {
    question: "Preciso ter logo e textos prontos?",
    answer:
      "Não. Se você já tiver, ótimo — usamos o seu material. Se não tiver, o briefing serve para organizar isso junto com você, e o site pode ser montado com uma identidade simples e profissional.",
  },
  {
    question: "Trabalham com o meu segmento?",
    answer:
      "Muito provavelmente sim. Já entregamos projetos para saúde, igrejas e comércio — a estrutura de um bom site se adapta a qualquer área. Conte o seu caso no WhatsApp e dizemos como faríamos.",
  },
  {
    question: "E depois de entregue, tem suporte?",
    answer:
      "Sim. Todo projeto inclui suporte pós-entrega para ajustes e correções. Também oferecemos planos de manutenção para quem precisa de atualizações frequentes.",
  },
  {
    question: "O que eu preciso enviar para começar?",
    answer:
      "Textos, imagens e referências de sites que você gosta. Se você não tiver tudo pronto, sem problema: o briefing inicial serve exatamente para organizar isso junto com você.",
  },
];
