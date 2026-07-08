import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dois sites no mesmo projeto:
//  - Portfólio (recrutadores): moises.gcodevs.com -> sitemap.xml / robots.txt
//  - Gco Devs (clientes):      gcodevs.com        -> sitemap-gcodevs.xml / robots-gcodevs.txt
//    (o nginx serve estes últimos como /sitemap.xml e /robots.txt no domínio gcodevs.com)
const portfolioUrl = 'https://moises.gcodevs.com';
const gcodevsUrl = 'https://gcodevs.com';
const currentDate = new Date().toISOString();

const portfolioUrls = [
  {
    loc: portfolioUrl,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '1.0',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es` }
    ]
  },
  {
    loc: `${portfolioUrl}/#habilidades`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}/#habilidades` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en#habilidades` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es#habilidades` }
    ]
  },
  {
    loc: `${portfolioUrl}/#experiencia`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.9',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}/#experiencia` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en#experiencia` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es#experiencia` }
    ]
  },
  {
    loc: `${portfolioUrl}/#formacao`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}/#formacao` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en#formacao` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es#formacao` }
    ]
  },
  {
    loc: `${portfolioUrl}/#portfolio`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}/#portfolio` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en#portfolio` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es#portfolio` }
    ]
  },
  {
    loc: `${portfolioUrl}/#contato`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7',
    alternates: [
      { hreflang: 'pt-BR', href: `${portfolioUrl}/#contato` },
      { hreflang: 'en', href: `${portfolioUrl}?lang=en#contato` },
      { hreflang: 'es', href: `${portfolioUrl}?lang=es#contato` }
    ]
  }
];

const gcodevsUrls = [
  { loc: gcodevsUrl, lastmod: currentDate, changefreq: 'monthly', priority: '1.0' },
  { loc: `${gcodevsUrl}/#servicos`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
  { loc: `${gcodevsUrl}/#como-funciona`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
  { loc: `${gcodevsUrl}/#clientes`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
  { loc: `${gcodevsUrl}/#faq`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
  { loc: `${gcodevsUrl}/#orcamento`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' }
];

function generateSitemap(urls) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  urls.forEach(url => {
    sitemap += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;

    if (url.alternates) {
      url.alternates.forEach(alternate => {
        sitemap += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />
`;
      });
    }

    sitemap += `  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

function generateRobotsTxt(siteUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml

# Disallow development files
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.json
Disallow: /*.ts
Disallow: /*.tsx
Disallow: /*.js.map
Disallow: /vite.config.ts
Disallow: /tsconfig.json
Disallow: /package.json
Disallow: /README.md
`;
}

const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// --- Portfólio (moises.gcodevs.com) ---
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap(portfolioUrls));
console.log('✅ Sitemap do portfólio gerado em public/sitemap.xml');

fs.writeFileSync(path.join(publicDir, 'robots.txt'), generateRobotsTxt(portfolioUrl));
console.log('✅ Robots.txt do portfólio gerado em public/robots.txt');

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${portfolioUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✅ Sitemap index gerado em public/sitemap-index.xml');

// --- Gco Devs (gcodevs.com) ---
fs.writeFileSync(path.join(publicDir, 'sitemap-gcodevs.xml'), generateSitemap(gcodevsUrls));
console.log('✅ Sitemap da Gco Devs gerado em public/sitemap-gcodevs.xml');

fs.writeFileSync(path.join(publicDir, 'robots-gcodevs.txt'), generateRobotsTxt(gcodevsUrl));
console.log('✅ Robots.txt da Gco Devs gerado em public/robots-gcodevs.txt');

export { generateSitemap, generateRobotsTxt };
