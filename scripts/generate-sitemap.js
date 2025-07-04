import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://moiseseduardo.dev';
const currentDate = new Date().toISOString();

const urls = [
  {
    loc: siteUrl,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '1.0',
    alternates: [
      { hreflang: 'pt-BR', href: `${siteUrl}` },
      { hreflang: 'en', href: `${siteUrl}?lang=en` },
      { hreflang: 'es', href: `${siteUrl}?lang=es` }
    ]
  },
  {
    loc: `${siteUrl}/#habilidades`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'pt-BR', href: `${siteUrl}/#habilidades` },
      { hreflang: 'en', href: `${siteUrl}?lang=en#habilidades` },
      { hreflang: 'es', href: `${siteUrl}?lang=es#habilidades` }
    ]
  },
  {
    loc: `${siteUrl}/#portfolio`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9',
    alternates: [
      { hreflang: 'pt-BR', href: `${siteUrl}/#portfolio` },
      { hreflang: 'en', href: `${siteUrl}?lang=en#portfolio` },
      { hreflang: 'es', href: `${siteUrl}?lang=es#portfolio` }
    ]
  },
  {
    loc: `${siteUrl}/#contato`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7',
    alternates: [
      { hreflang: 'pt-BR', href: `${siteUrl}/#contato` },
      { hreflang: 'en', href: `${siteUrl}?lang=en#contato` },
      { hreflang: 'es', href: `${siteUrl}?lang=es#contato` }
    ]
  }
];

function generateSitemap() {
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

function generateRobotsTxt() {
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

// Gerar sitemap
const sitemapContent = generateSitemap();
const publicDir = path.join(__dirname, '..', 'public');

// Criar diretório public se não existir
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Escrever sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log('✅ Sitemap gerado com sucesso em public/sitemap.xml');

// Gerar robots.txt
const robotsContent = generateRobotsTxt();
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
console.log('✅ Robots.txt gerado com sucesso em public/robots.txt');

// Gerar sitemap index se necessário
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✅ Sitemap index gerado com sucesso em public/sitemap-index.xml');

export { generateSitemap, generateRobotsTxt }; 