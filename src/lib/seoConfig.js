/**
 * XANZI Tech — SEO & GEO (Generative Engine Optimization) Configuration
 *
 * Strategy Owner: Enterprise B2B SEO + AI Search (GEO)
 * Target: Government, Education, Corporate Enterprise, Growth Startups
 * Geography: South Africa (Pretoria / Gauteng) → Pan-African → Global
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SEMANTIC KEYWORD UNIVERSE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ── CLUSTER 1: TRANSACTIONAL / COMMERCIAL INTENT ────────────────────────────
 *   enterprise software development agency south africa
 *   custom software development company pretoria
 *   software engineering firm johannesburg
 *   bespoke web application development gauteng
 *   hire software engineers south africa
 *   enterprise web platform development agency
 *   react asp.net developers south africa
 *   full stack software development company sa
 *   software agency for government projects south africa
 *   cloud-native application development company
 *
 * ── CLUSTER 2: INDUSTRY-SPECIFIC INTENT ─────────────────────────────────────
 *   govtech software development south africa
 *   government digital transformation agency pretoria
 *   secure government portal development
 *   custom school management system developer
 *   edutech platform development south africa
 *   student information system development
 *   municipal software development
 *   esg reporting platform developer south africa
 *   carbon reporting software africa
 *   waste management analytics platform
 *   corporate intranet portal development
 *   stakeholder portal development enterprise
 *   multi-tenant saas platform development
 *   nonprofit grants management system
 *   popia compliant software development company
 *
 * ── CLUSTER 3: PROBLEM-SOLVING / LONG-TAIL INTENT ───────────────────────────
 *   how to build a scalable multi-tenant portal south africa
 *   popia compliant database architecture developers
 *   supabase row level security enterprise implementation
 *   role-based access control system development
 *   real-time data dashboard development company
 *   how to migrate legacy government system to cloud
 *   secure api development for government south africa
 *   multi-stakeholder reporting platform architecture
 *   mvp development for startups south africa
 *   scalable react dashboard with postgresql backend
 *   docker kubernetes deployment south africa
 *   what is row-level security in supabase
 *   how to implement rbac in asp.net core
 *   enterprise data pipeline development africa
 *   audit log implementation for compliance systems
 */

export const SITE_URL = 'https://xanziteh.co.za';
export const SITE_NAME = 'XANZI Tech';

// ─────────────────────────────────────────────────────────────────────────────
// PAGE META — Optimized Title Tags (≤60 chars) & Meta Descriptions (≤155 chars)
// ─────────────────────────────────────────────────────────────────────────────
export const pageMeta = {
  home: {
    title: 'XANZI Tech | Enterprise Software Engineering SA', // 49 chars
    description:
      'Telkom Award-winning engineers building secure, scalable platforms, stakeholder portals & ESG dashboards for government and enterprise in South Africa.', // 151 chars
    canonical: SITE_URL,
    keywords:
      'enterprise software development south africa, custom software agency pretoria, govtech software development, secure digital systems, react asp.net developers gauteng',
    og: {
      type: 'website',
      title: 'XANZI Tech — We Engineer Secure, Scalable Digital Systems',
      description:
        'Not a marketing website agency. We build multi-user platforms, stakeholder portals, ESG dashboards and GovTech systems for ambitious organisations.',
      image: `${SITE_URL}/og-home.png`,
    },
  },

  capabilities: {
    title: 'Systems Engineering Services | XANZI Tech', // 45 chars
    description:
      'We engineer multi-tenant platforms, RBAC portals & data pipelines using ASP.NET, Supabase & React — built POPIA-compliant and cloud-native from day one.', // 153 chars
    canonical: `${SITE_URL}/#capabilities`,
    keywords:
      'systems engineering south africa, multi-tenant platform development, popia compliant software, supabase row level security, react asp.net core development, docker kubernetes deployment',
    og: {
      type: 'website',
      title: 'Systems Engineering — Secure, Scalable Platform Architecture',
      description:
        'From Role-Based Access Control to multi-tenant PostgreSQL architectures — our engineering capability is built for enterprise scale.',
      image: `${SITE_URL}/og-capabilities.png`,
    },
  },

  caseStudy: {
    title: 'ESG Analytics Platform Case Study | XANZI Tech', // 48 chars
    description:
      'How we built a multi-tenant ESG carbon & waste analytics platform connecting municipalities, waste operators and executives with live data pipelines.', // 149 chars
    canonical: `${SITE_URL}/#case-study`,
    keywords:
      'esg analytics platform development, carbon reporting software south africa, waste management dashboard, multi-tenant supabase case study, real-time data ingestion pipeline',
    og: {
      type: 'article',
      title: 'Case Study: Multi-Tenant ESG Carbon & Waste Analytics Platform',
      description:
        'We unified disconnected ESG data across 12+ stakeholders — municipalities, operators and executives — into a single real-time compliance reporting system.',
      image: `${SITE_URL}/og-casestudy.png`,
    },
  },

  contact: {
    title: 'Book a Strategy Session | XANZI Tech', // 38 chars
    description:
      "Ready to engineer your next secure digital system? Book a free discovery call with XANZI Tech — South Africa's enterprise software engineering agency.", // 150 chars
    canonical: `${SITE_URL}/#contact`,
    keywords:
      'hire software engineers south africa, book software discovery call, enterprise software agency consultation, custom platform development inquiry pretoria',
    og: {
      type: 'website',
      title: 'Start Your Project — Book a Free Strategy Session',
      description:
        "Tell us what you're building. We'll map the architecture, timeline and technology in a focused 45-minute discovery call.",
      image: `${SITE_URL}/og-contact.png`,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA.ORG JSON-LD — GEO / AI STRUCTURED DATA BLUEPRINT
//
// Combined @graph:  Organization + LocalBusiness + ProfessionalService
// AI-Signal Purpose: Ensures LLMs (Copilot, Gemini, Perplexity, ChatGPT Search)
//   can unambiguously identify XANZI Tech's:
//   • Entity type (software engineering agency, NOT a marketing firm)
//   • Geographic anchoring (Pretoria, Gauteng, South Africa)
//   • Technical specialisms (stack keywords scraped by AI crawlers)
//   • Awards & credibility signals (Telkom, ABSA)
//   • Service offerings (used for AI "find me an agency that does X" prompts)
// ─────────────────────────────────────────────────────────────────────────────
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'XANZI Tech',
      alternateName: ['XANZI Technology', 'Xanzi Tech South Africa'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og-home.png`,
      description:
        'XANZI Tech is a Pretoria-based enterprise software engineering agency specialising in secure, scalable digital systems, multi-tenant stakeholder portals, GovTech platforms, ESG analytics dashboards, and POPIA-compliant cloud-native applications for governments, educational institutions, and corporate enterprises across South Africa and Africa.',
      foundingDate: '2023',
      priceRange: '$$$$',
      currenciesAccepted: 'ZAR, USD',
      paymentAccepted: 'EFT, Invoice',
      openingHours: 'Mo-Fr 08:00-17:00',

      // ── GEOGRAPHIC SIGNALS (critical for local AI search) ──────────────────
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pretoria',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
        postalCode: '0001',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -25.7479,
        longitude: 28.2293,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Pretoria',
        },
        {
          '@type': 'City',
          name: 'Johannesburg',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Gauteng',
        },
        {
          '@type': 'Country',
          name: 'South Africa',
        },
        {
          '@type': 'Continent',
          name: 'Africa',
        },
      ],
      hasMap: 'https://maps.google.com/?q=Pretoria,Gauteng,South+Africa',

      // ── CONTACT ────────────────────────────────────────────────────────────
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'hello@xanziteh.co.za',
          availableLanguage: ['English', 'Afrikaans'],
          areaServed: 'ZA',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'support@xanziteh.co.za',
          availableLanguage: 'English',
        },
      ],

      // ── SOCIAL PRESENCE ────────────────────────────────────────────────────
      sameAs: [
        'https://www.linkedin.com/company/xanzitech',
        'https://github.com/xanzitech',
        'https://twitter.com/xanzitech',
      ],

      // ── AWARDS & CREDIBILITY (AI reads these for authority scoring) ─────────
      award: [
        'Telkom Innovation Awards 2025 — Winner',
        'ABSA x YEI Emerging Innovators Programme — Graduate',
      ],

      // ── TECHNICAL KNOWLEDGE SIGNALS (explicit for LLM entity extraction) ───
      knowsAbout: [
        'Enterprise Software Engineering',
        'Multi-Tenant Platform Architecture',
        'React Frontend Development',
        'ASP.NET Core C# Backend Development',
        'REST API Design and Development',
        'PostgreSQL Database Architecture',
        'Supabase with Row-Level Security',
        'Role-Based Access Control (RBAC)',
        'POPIA Compliance Engineering',
        'GovTech Digital Transformation',
        'EduTech Platform Development',
        'ESG Analytics and Carbon Reporting Platforms',
        'Real-Time Data Ingestion Pipelines',
        'Stakeholder Portal Development',
        'Docker and Kubernetes Deployment',
        'Vercel Edge Functions',
        'Redis Caching',
        'Data Security and Encryption',
        'Audit Log Systems',
        'Scalable MVP Development',
        'Cloud-Native Application Architecture',
      ],

      // ── SERVICE OFFERINGS (maps to "find me an agency that does X") ─────────
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Enterprise Platform Engineering',
          description:
            'End-to-end design and development of secure, multi-tenant web platforms with role-based access control and real-time data capabilities.',
          areaServed: 'ZA',
        },
        {
          '@type': 'Offer',
          name: 'GovTech & Public Sector Systems',
          description:
            'Custom digital systems for government departments, municipalities and public institutions — POPIA-compliant, secure, and built for long-term scale.',
          areaServed: 'ZA',
        },
        {
          '@type': 'Offer',
          name: 'EduTech Platform Development',
          description:
            'Secure school management systems, student portals, learning management systems and institutional data dashboards for educational organisations.',
          areaServed: 'ZA',
        },
        {
          '@type': 'Offer',
          name: 'ESG & Analytics Dashboards',
          description:
            'Real-time ESG, carbon, and waste analytics platforms with multi-stakeholder portals, data ingestion pipelines and automated compliance reporting.',
          areaServed: ['ZA', 'Africa'],
        },
        {
          '@type': 'Offer',
          name: 'Scalable MVP Development',
          description:
            'Production-ready MVPs for high-growth startups, architected for scale from day one using React, ASP.NET Core, Supabase, and cloud-native infrastructure.',
          areaServed: ['ZA', 'Global'],
        },
        {
          '@type': 'Offer',
          name: 'Security & Compliance Engineering',
          description:
            'POPIA-compliant data architecture, RBAC implementation, Row-Level Security, encryption, and audit log systems for regulated industries.',
          areaServed: 'ZA',
        },
      ],

      // ── NOTABLE WORK ────────────────────────────────────────────────────────
      subjectOf: [
        {
          '@type': 'CreativeWork',
          name: 'Multi-Tenant ESG Carbon & Waste Analytics Platform',
          description:
            'Centralised ESG analytics platform connecting municipalities, waste operators and executives with real-time data ingestion pipelines, role-based dashboards, and automated compliance reporting. Built on Supabase with Row-Level Security, React, and PostgreSQL.',
          keywords:
            'ESG platform, carbon analytics, waste management software, multi-tenant, supabase, row-level security, municipal data dashboard',
          author: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    },

    // ── WEBSITE ENTITY (for sitelinks search box eligibility) ─────────────────
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'XANZI Tech',
      description: 'Enterprise Software Engineering Agency — South Africa',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-ZA',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE SCHEMA GENERATOR
// Used by ArticlePage for per-article structured data
// ─────────────────────────────────────────────────────────────────────────────
export function buildArticleSchema({ slug, title, description, keywords, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/insights/${slug}`,
    headline: title,
    description,
    keywords,
    datePublished,
    dateModified: datePublished,
    inLanguage: 'en-ZA',
    url: `${SITE_URL}/insights/${slug}`,
    author: {
      '@id': `${SITE_URL}/#organization`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'XANZI Tech Insights',
      url: `${SITE_URL}/#insights`,
    },
  };
}
