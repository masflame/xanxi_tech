/**
 * SEOHead — Dynamic meta tag manager for XANZI Tech
 *
 * GEO (Generative Engine Optimization) Notes:
 * ─────────────────────────────────────────────
 * AI models (Copilot Search, Gemini, Perplexity, ChatGPT Search) crawl pages
 * and extract structured signals. This component injects:
 *
 *  1. Standard SEO meta tags (title, description, canonical, keywords)
 *  2. Open Graph tags (social sharing previews)
 *  3. Twitter Card tags
 *  4. Schema.org JSON-LD (machine-readable entity data for AI scrapers)
 *
 * AI Entity Optimization Recommendations (applied site-wide):
 * ─────────────────────────────────────────────────────────────
 *  • Use H1-H3 headers that contain exact entity keywords
 *    (e.g. "Enterprise Software Engineering Agency — South Africa")
 *    NOT vague headings like "What We Do"
 *
 *  • Lead every section with a declarative sentence:
 *    "XANZI Tech is a Pretoria-based software engineering firm..."
 *    LLMs weight early, direct sentences most heavily for entity extraction.
 *
 *  • Use explicit lists (ul/ol) for capabilities, tech stack, and awards.
 *    LLMs parse bullet lists into clean structured data far better than prose.
 *
 *  • Repeat geographic + entity terms naturally every ~200 words:
 *    "software engineering agency", "South Africa", "Pretoria", "Gauteng",
 *    "POPIA compliant", "enterprise platform"
 *
 *  • Avoid abbreviations without expansion on first use:
 *    Write "Role-Based Access Control (RBAC)" not just "RBAC".
 *    LLMs map concepts to knowledge graphs — expanded terms help disambiguation.
 *
 *  • Alt text on every image must describe the technical content:
 *    "ESG carbon analytics dashboard showing real-time waste data by municipality"
 *    NOT "dashboard screenshot"
 */
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  og = {},
  schema = null,
  noindex = false,
}) {
  const siteName = 'XANZI Tech';
  const defaultOgImage = 'https://xanziteh.co.za/og-home.png';

  return (
    <Helmet>
      {/* ── Core SEO ──────────────────────────────────────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Geographic & Language Signals ─────────────────────────────────── */}
      <meta name="language" content="en-ZA" />
      <meta name="geo.region" content="ZA-GP" />
      <meta name="geo.placename" content="Pretoria, Gauteng, South Africa" />
      <meta name="geo.position" content="-25.7479;28.2293" />
      <meta name="ICBM" content="-25.7479, 28.2293" />

      {/* ── Open Graph ────────────────────────────────────────────────────── */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={og.type || 'website'} />
      <meta property="og:title" content={og.title || title} />
      <meta property="og:description" content={og.description || description} />
      <meta property="og:image" content={og.image || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_ZA" />

      {/* ── Twitter Card ──────────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@xanzitech" />
      <meta name="twitter:title" content={og.title || title} />
      <meta name="twitter:description" content={og.description || description} />
      <meta name="twitter:image" content={og.image || defaultOgImage} />

      {/* ── Schema.org JSON-LD (AI / GEO structured data) ─────────────────── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema, null, 0)}
        </script>
      )}
    </Helmet>
  );
}
