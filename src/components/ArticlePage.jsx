import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import SEOHead from './SEOHead';
import { buildArticleSchema, SITE_URL } from '../lib/seoConfig';

const scrollAfterNav = (navigate, hash) => {
  navigate('/');
  const tryScroll = (attempts = 0) => {
    const el = document.querySelector(hash);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (attempts < 20) {
      setTimeout(() => tryScroll(attempts + 1), 100);
    }
  };
  setTimeout(tryScroll, 200);
};

const articles = {
  'why-institutional-systems-fail': {
    tag: 'Systems Design',
    title: 'Why most institutional systems fail',
    readTime: '5 min read',
    author: 'XANZI Tech',
    hero: 'The biggest failures are not technical. They stem from poor scoping, weak security foundations, and building for today instead of tomorrow.',
    sections: [
      {
        heading: 'The real problem is not code',
        body: 'When an institutional system fails, the natural instinct is to blame the technology. But in our experience, the technology is rarely the root cause. The failures we see most often come down to three things: unclear requirements, a rushed discovery phase, and a mindset that treats software like a one-time purchase rather than a living system.',
      },
      {
        heading: 'Poor scoping kills projects before they start',
        body: 'Most failed systems were doomed before a single line of code was written. When stakeholders skip the discovery process or rush through requirements gathering, you end up with a system that solves yesterday\'s problems. Scoping is not a formality. It is the foundation of every decision that follows, from data modelling to security architecture to the user interface.',
      },
      {
        heading: 'Security as an afterthought',
        body: 'We consistently see organisations bolt security onto a system after it has been built. RBAC is added as a patch. Encryption is only applied to some fields. Audit logs are not implemented at all. In institutional environments where you are handling citizen data, student records, or compliance documents, security cannot be an afterthought. It has to be designed into the architecture from day one.',
      },
      {
        heading: 'Building for today instead of tomorrow',
        body: 'A system that works for 500 users will not necessarily work for 50,000. Yet most institutional platforms are architected for their current load with no thought for growth. We approach every project by asking: what does this system look like in 3 years? What happens when the data volume doubles? What changes when a new department needs access? If the architecture cannot answer those questions, it is already failing.',
      },
      {
        heading: 'The path forward',
        body: 'The organisations that succeed invest time upfront in discovery, treat security as a first-class concern, and build systems designed to evolve. It is not about using the trendiest tech stack. It is about making disciplined engineering decisions that compound over time.',
      },
    ],
  },
  'how-to-design-scalable-dashboards': {
    tag: 'Data & Dashboards',
    title: 'How to design scalable dashboards',
    readTime: '6 min read',
    author: 'XANZI Tech',
    hero: 'Effective dashboards are not about cramming data onto a screen. They are about surfacing the right metrics for the right stakeholders at the right time.',
    sections: [
      {
        heading: 'Dashboards are decision tools, not data dumps',
        body: 'The most common mistake we see is treating dashboards as a place to show every piece of data the system collects. This creates visual noise, confuses stakeholders, and ultimately means the dashboard gets ignored. A good dashboard answers specific questions for a specific audience. Before designing a single widget, ask: who is looking at this, and what decision will they make based on it?',
      },
      {
        heading: 'Design for roles, not for everyone',
        body: 'An executive needs a high-level overview of KPIs and trends. A department head needs operational metrics and drill-down capabilities. A field worker needs task-level status information. When you try to serve all three with one view, you serve none of them well. Role-based dashboards with tailored views create clarity and drive adoption.',
      },
      {
        heading: 'Real-time does not always mean live',
        body: 'Not every metric needs a live WebSocket feed updating every second. In many cases, data refreshed every 5 minutes or even hourly is perfectly adequate. Overengineering real-time capabilities wastes resources and creates infrastructure complexity. Choose your refresh strategy based on how quickly decisions need to be made on that data.',
      },
      {
        heading: 'Performance at scale',
        body: 'When your dataset grows from thousands to millions of rows, naive queries will bring your dashboard to a crawl. Pre-aggregated views, materialised queries, indexed columns, and smart caching strategies are what separate a dashboard that scales from one that collapses. Plan your data layer for the volume you will have in a year, not the volume you have today.',
      },
      {
        heading: 'The visual hierarchy matters',
        body: 'Place the most important information top-left. Use colour intentionally to highlight anomalies, not to decorate. Limit the number of chart types per view. Keep labels readable. These are not aesthetic preferences. They are usability principles that determine whether your dashboard gets used or abandoned.',
      },
    ],
  },
  'security-mistakes-companies-make': {
    tag: 'Security',
    title: 'Security mistakes companies make',
    readTime: '5 min read',
    author: 'XANZI Tech',
    hero: 'From storing secrets in frontend code to skipping row-level policies, these common oversights leave organisations exposed.',
    sections: [
      {
        heading: 'Secrets in frontend code',
        body: 'We have audited codebases where API keys, database connection strings, and even admin credentials were hardcoded into client-side JavaScript. Everything that runs in the browser is visible to anyone with dev tools open. Secrets belong in environment variables on the server, accessed through secure backend endpoints. There are no exceptions.',
      },
      {
        heading: 'Skipping row-level security',
        body: 'If your application relies solely on frontend logic to determine what data a user can see, you have a security hole. A malicious user can bypass your UI and query the API directly. Row-level security policies at the database level ensure that no matter how the data is accessed, each user only sees what they are authorised to see. This is especially critical in multi-tenant systems.',
      },
      {
        heading: 'Authentication without authorisation',
        body: 'Many teams implement login functionality but stop there. Knowing who a user is (authentication) is not the same as controlling what they can do (authorisation). Without proper role-based access control, any logged-in user could potentially access admin functions, modify data they should not touch, or view other users\' information.',
      },
      {
        heading: 'No audit trail',
        body: 'When a security incident occurs, the first question is: what happened and who did it? Without audit logging, you have no answers. Every sensitive operation, including data access, modifications, permission changes, and authentication events, should be logged with timestamps and user context. This is not optional for institutional systems.',
      },
      {
        heading: 'Ignoring POPIA and data regulations',
        body: 'In South Africa, the Protection of Personal Information Act (POPIA) places clear obligations on how organisations collect, store, and process personal data. Yet many systems are built with no consideration for data minimisation, consent management, or the right to deletion. Compliance is not something you add later. It shapes your data model, your retention policies, and your entire system architecture.',
      },
      {
        heading: 'The mindset shift',
        body: 'Security is not a feature you add to a finished product. It is a design principle that influences every architectural choice from the start. The organisations that get this right treat security as a first-class engineering concern, not a checkbox exercise before launch.',
      },
    ],
  },

  // ── CONTENT ROADMAP ARTICLE 1 ─────────────────────────────────────────────
  // Target keywords: POPIA compliant software development, POPIA database
  //   architecture south africa, protection of personal information act
  //   compliance, data privacy engineering, POPIA compliant developers pretoria
  'popia-compliance-database-architecture': {
    tag: 'Compliance & Security',
    title: 'How POPIA compliance shapes your database architecture',
    readTime: '7 min read',
    author: 'XANZI Tech',
    datePublished: '2025-03-10',
    seoDescription:
      'POPIA compliance shapes data models, encryption, and retention policies from day one. Learn how XANZI Tech engineers POPIA-compliant database architecture in South Africa.',
    seoKeywords:
      'POPIA compliant software development, POPIA database architecture south africa, protection of personal information act compliance, data privacy engineering, POPIA compliant developers pretoria',
    hero: 'POPIA compliance is not a checkbox you tick after your system is live. It shapes your data model, retention policies, consent management, and encryption strategy from the very first database migration.',
    sections: [
      {
        heading: 'What POPIA actually demands from your data model',
        body: 'The Protection of Personal Information Act (POPIA) in South Africa imposes clear obligations on how organisations collect, store, process, and delete personal data. But most software teams treat it as a legal concern, not an engineering one. In reality, POPIA compliance starts in your database schema. Every table that stores personal information — names, contact details, ID numbers, health data — must be designed with data minimisation in mind. You should only capture what is necessary, and only retain it for as long as the specific purpose requires. This means your data model needs purpose-scoped fields, consent flags tied to individual records, and explicit retention timestamps that drive automated deletion or anonymisation workflows.',
      },
      {
        heading: 'Encryption: at rest and in transit is non-negotiable',
        body: "POPIA requires appropriate technical measures to protect personal information. In practice, this means Transport Layer Security (TLS) for all data in transit and AES-256 encryption for data at rest for sensitive fields. Encryption extends to backups, export files, and any API payloads that carry personal data. We implement column-level encryption for fields like identity numbers and financial data, so even a database administrator with direct access cannot read that data without the application's encryption keys — stored separately in a secrets manager, never in the codebase.",
      },
      {
        heading: 'Consent management as a first-class data object',
        body: "Under POPIA, consent must be specific, informed, and withdrawable. Your system needs a consent record linked to each data subject — capturing what they consented to, when, and how. A proper POPIA-compliant consent model tracks the purpose of processing, the date of consent, the version of the privacy policy accepted, and a complete audit trail of any changes. When a data subject exercises their right to withdraw consent or request deletion, your system must be able to action that request cleanly across all tables — including audit logs, which may have their own retention rules under the act.",
      },
      {
        heading: 'Role-Based Access Control and data subject rights',
        body: "POPIA grants data subjects the right to access, correct, and delete their personal information. To support these rights at scale, you need Role-Based Access Control (RBAC) that is granular enough to distinguish between a read operation that returns anonymised data and one that returns identifiable personal information. In multi-tenant environments, Row-Level Security (RLS) policies at the database level are essential. If someone bypasses your API and queries the database directly, RLS is the last line of defence preventing unauthorised access to personal data.",
      },
      {
        heading: 'Audit logs: your compliance evidence trail',
        body: 'POPIA requires you to demonstrate compliance — not just claim it. Audit logs are how you prove what data was accessed, by whom, when, and why. Every operation involving personal data should generate an immutable log entry capturing the actor, the action, the affected records, and a timestamp. These logs must be stored separately from your operational database so they cannot be modified or deleted by application-level processes.',
      },
      {
        heading: 'Building POPIA compliance into your development lifecycle',
        body: 'POPIA compliance cannot be retrofitted. The right approach is to conduct a data protection impact assessment before writing a single line of code, define your lawful basis for processing each data type, and encode those decisions directly into your schema design and access control model. At XANZI Tech, POPIA compliance engineering is a core part of our discovery and architecture phase for every project involving personal data — particularly for government, healthcare, and educational clients across South Africa.',
      },
    ],
  },

  // ── CONTENT ROADMAP ARTICLE 2 ─────────────────────────────────────────────
  // Target keywords: supabase row level security enterprise, multi-tenant
  //   database security, RLS policies postgresql, supabase enterprise
  //   architecture, row level security implementation guide
  'row-level-security-supabase-enterprise': {
    tag: 'Security Engineering',
    title: 'Row-Level Security in Supabase: the enterprise implementation guide',
    readTime: '8 min read',
    author: 'XANZI Tech',
    datePublished: '2025-04-22',
    seoDescription:
      'A deep-dive into implementing Row-Level Security (RLS) in Supabase for enterprise multi-tenant platforms. Learn how XANZI Tech secures PostgreSQL backends with RLS policies.',
    seoKeywords:
      'supabase row level security enterprise, RLS policies postgresql, multi-tenant database security supabase, row level security implementation guide, supabase enterprise architecture south africa',
    hero: 'Row-Level Security is not just a Supabase feature. It is the architectural boundary that separates systems where security is enforced from systems where security is merely hoped for.',
    sections: [
      {
        heading: 'Why application-level access control is not enough',
        body: "Most multi-tenant applications enforce data access through application logic — an if statement in a controller, a where clause added by the ORM, a check in a service function. This approach has a fundamental weakness: it assumes the only way data will ever be accessed is through your application code. In production systems, that assumption is routinely broken by direct database queries, migration scripts, admin tools, and third-party integrations. Row-Level Security (RLS) in PostgreSQL — and by extension Supabase — solves this by enforcing access rules at the database engine level, where they cannot be bypassed regardless of how a query originates.",
      },
      {
        heading: 'How RLS policies work in PostgreSQL',
        body: 'When RLS is enabled on a table, every query against that table is automatically filtered by the policies you define. A policy is a SQL expression that evaluates to true or false for each row. If the expression returns false for a given row and the current database user, that row is simply invisible. It does not appear in select results, cannot be updated, and cannot be deleted. In a multi-tenant system, the most common pattern is a permissive select policy that checks whether the tenant_id column on each row matches the tenant context of the authenticated user.',
      },
      {
        heading: 'The XANZI Tech pattern: JWT claims as the security context',
        body: "In Supabase, the authenticated user's JWT (JSON Web Token) is available inside RLS policies via the auth.uid() and auth.jwt() functions. This means your policies can reference the user's role, tenant ID, or department — any custom claims embedded in the JWT. Our standard enterprise pattern stores the tenant_id and user_role as custom JWT claims, then references these in RLS policies rather than joining to a separate permissions table on every query. This is both performant and tamper-resistant: the JWT is signed by your authentication server, so users cannot modify their own claims.",
      },
      {
        heading: 'Practical policy structure for stakeholder portals',
        body: "A stakeholder portal with multiple user roles — say, an executive, a department manager, and a field operator — requires layered policies. The executive might have read access to aggregated data across all departments. The manager sees only their department's records. The operator can read and write only their own submissions. We use a combination of auth.uid() checks for row ownership, JWT claim checks for role and tenant, and helper functions that encapsulate complex permission logic so the policies themselves remain readable and auditable.",
      },
      {
        heading: 'Testing and auditing your RLS policies',
        body: 'RLS policies are security controls and must be tested with the same rigour as application code. We write explicit test cases that impersonate each user role and verify both that permitted queries return the expected data and that forbidden queries return empty results. We also implement audit triggers that log every select, insert, update, and delete on sensitive tables, providing a complete record of what was accessed and when — critical for POPIA compliance and security incident investigation.',
      },
      {
        heading: 'Performance considerations at enterprise scale',
        body: 'A common concern with RLS is performance overhead. In practice, well-designed policies with proper indexes have negligible overhead. The key is to ensure that the columns referenced in your policy expressions — particularly tenant_id and user_id — are indexed. For complex policies that join to permission tables, materialised views or database functions that cache expensive lookups can maintain query performance as your dataset scales. We benchmark RLS-enabled queries as part of our performance testing suite on every enterprise project.',
      },
    ],
  },

  // ── CONTENT ROADMAP ARTICLE 3 ─────────────────────────────────────────────
  // Target keywords: multi-tenant portal architecture, stakeholder portal
  //   development south africa, enterprise SaaS platform architecture,
  //   scalable portal development, role-based portal development
  'multi-tenant-stakeholder-portal-architecture': {
    tag: 'Platform Architecture',
    title: 'Architecting multi-tenant stakeholder portals that scale',
    readTime: '8 min read',
    author: 'XANZI Tech',
    datePublished: '2025-05-14',
    seoDescription:
      'The architectural decisions that separate a multi-tenant stakeholder portal that handles 50 users from one that handles 50,000. A practical guide from XANZI Tech.',
    seoKeywords:
      'multi-tenant portal architecture, stakeholder portal development south africa, enterprise SaaS platform architecture, multi-tenant web application design, scalable portal development, role-based portal development',
    hero: 'The decisions that separate a portal that handles 50 users from one that handles 50,000 are not made in the frontend. They are made in the data model, the access control layer, and the infrastructure design long before a single component is built.',
    sections: [
      {
        heading: 'Defining your tenancy model before writing code',
        body: 'Multi-tenancy means different things in different systems. In a shared database model, all tenants share the same tables and rows are distinguished by a tenant_id column. In a schema-per-tenant model, each tenant gets their own PostgreSQL schema. For most enterprise stakeholder portals — where tenants are organisations like municipalities, departments, or corporate clients — the shared database model with Row-Level Security is the right balance of cost, performance, and isolation. Before writing a single migration, document your tenancy model and how tenant context is propagated through the request lifecycle.',
      },
      {
        heading: 'The access control matrix: roles, permissions, and hierarchy',
        body: 'In a stakeholder portal, not all users are equal. A government portal might have citizens, case workers, supervisors, and administrators. A corporate portal might have analysts, department heads, and executives. Designing the access control matrix before building the UI prevents the most common and expensive type of mid-project rework. We model this as a permissions structure evaluated at both the API layer and the database layer via RLS policies. The API layer handles business logic; the database layer is the security backstop.',
      },
      {
        heading: 'Data ingestion and the real-time pipeline architecture',
        body: 'Enterprise stakeholder portals frequently consume data from multiple upstream sources — ERP systems, IoT sensors, third-party APIs, manual uploads. The architecture for handling this cleanly is a staging layer that receives and validates raw data before it enters your operational database. Edge Functions validate incoming payloads against your data contracts, transform them into your normalised schema, and write to the database transactionally. For real-time dashboards, Supabase Realtime provides live updates without polling.',
      },
      {
        heading: 'Frontend architecture for role-based views',
        body: "Multi-tenant portals with multiple user roles should not be built as a single frontend that shows and hides elements based on role. The correct pattern is role-defined route structures where each user role has a dedicated set of views and components suited to their specific workflows. In React, this means a role-aware router that renders completely different page trees for different roles. The user's role and tenant context should be loaded once on authentication and propagated via context, never re-fetched on every render.",
      },
      {
        heading: 'Scaling beyond the prototype: infrastructure design decisions',
        body: 'A portal built for 50 concurrent users will behave very differently at 5,000. The infrastructure decisions that matter most are: database connection pooling (PgBouncer in Supabase handles this), query optimisation with targeted indexes on high-traffic tables, caching of expensive aggregations with Redis, and CDN distribution of frontend assets. For government and institutional portals that face unpredictable load spikes, autoscaling container orchestration with Kubernetes ensures availability when it matters most.',
      },
      {
        heading: 'Monitoring, alerting, and the operational handover',
        body: 'A portal that cannot be observed cannot be trusted. We instrument every production portal with application performance monitoring that tracks query latency, API response times, error rates, and user session health. For enterprise clients, we provide structured operational runbooks documenting the system architecture, common failure modes, escalation paths, and maintenance procedures — so the client team or a future vendor can own the system without a knowledge gap.',
      },
    ],
  },

  // ── CONTENT ROADMAP ARTICLE 4 ─────────────────────────────────────────────
  // Target keywords: govtech software development south africa, government
  //   digital transformation agency, secure government portal development
  //   pretoria, public sector software procurement, popia compliant govtech
  'govtech-digital-transformation-south-africa': {
    tag: 'GovTech',
    title: 'What government entities must demand from software agencies',
    readTime: '7 min read',
    author: 'XANZI Tech',
    datePublished: '2025-06-03',
    seoDescription:
      'Most GovTech projects fail because of the wrong vendor choice. A guide to what POPIA-compliant, security-first digital transformation requires for South African government entities.',
    seoKeywords:
      'govtech software development south africa, government digital transformation agency pretoria, secure government portal development, public sector software procurement south africa, popia compliant govtech, municipal software development',
    hero: 'Most GovTech projects in South Africa fail not because of budget or technology, but because the procurement process does not ask the right questions. Here is what security-first, POPIA-compliant digital transformation actually requires.',
    sections: [
      {
        heading: 'The procurement gap that kills GovTech projects',
        body: 'Government software procurement in South Africa often prioritises the lowest bid over technical capability. The result is a pattern we see repeatedly: systems that work in the demo but collapse under real load, platforms with no security architecture, codebases with no documentation, and vendors who disappear after final payment. The consequences are not just technical. Failed government systems delay service delivery, expose citizen data, and waste public funds. The solution is not more budget — it is a more rigorous set of requirements from the outset.',
      },
      {
        heading: 'Security requirements that must be non-negotiable',
        body: 'Any software system handling citizen data in South Africa is subject to POPIA (the Protection of Personal Information Act). Government entities procuring software must require evidence of POPIA-compliant architecture — not a letter of compliance, but documentation of how personal data is stored, encrypted, accessed, and deleted. Non-negotiable requirements include: Role-Based Access Control (RBAC) with documented permission matrices, Row-Level Security at the database level, AES-256 encryption for data at rest, TLS for all data in transit, immutable audit logs, and a documented incident response procedure.',
      },
      {
        heading: 'Demanding architecture documentation, not just a demo',
        body: "A demo proves the system works on a good day with clean data. Architecture documentation proves it will work on a bad day at scale. Government entities should require vendors to submit a system architecture document covering: the data model and entity relationships, the access control design, the hosting infrastructure and data residency (particularly relevant for sovereign data requirements in South Africa), the backup and disaster recovery strategy, and the technology choices with justification.",
      },
      {
        heading: 'Scalability: building for the citizens, not the pilot',
        body: 'Government systems often begin as pilots with a few hundred users and then scale to tens of thousands. Systems not architected for this transition become liabilities. Scalability requirements should specify expected user volumes at 1x, 5x, and 10x current need, and vendors should demonstrate how their architecture accommodates growth — whether through horizontal scaling of application containers, database read replicas, or load-balanced API layers.',
      },
      {
        heading: 'Open standards, documentation, and vendor lock-in avoidance',
        body: 'Government entities should retain ownership of their systems. This requires insisting on well-documented REST APIs with published specifications, source code delivered to the client at project completion, database schemas in standard formats, and infrastructure defined as code so the system can be migrated to a new host or maintained by a different team. Proprietary platforms with no export path create long-term risk for public sector organisations accountable to auditors and governance bodies.',
      },
      {
        heading: 'The right questions to ask any software vendor',
        body: 'Before awarding a GovTech contract, ask: How do you implement POPIA compliance in your data architecture? Can you show us your Row-Level Security policies? Where will citizen data be hosted and stored? What is your process for security vulnerability management? How do you handle data subject access requests programmatically? What documentation will be handed over at project completion? A vendor who cannot answer these questions clearly and technically — without marketing language — is not ready to build systems that serve the public.',
      },
    ],
  },

  // ── CONTENT ROADMAP ARTICLE 5 ─────────────────────────────────────────────
  // Target keywords: ESG analytics platform development, carbon reporting
  //   software south africa, waste management analytics, ESG dashboard
  //   developer, real-time data ingestion pipeline, municipal ESG platform
  'esg-analytics-platform-development': {
    tag: 'ESG & Analytics',
    title: 'Engineering real-time ESG and carbon analytics platforms',
    readTime: '9 min read',
    author: 'XANZI Tech',
    datePublished: '2025-06-10',
    seoDescription:
      'How XANZI Tech engineered a multi-tenant ESG carbon and waste analytics platform for municipalities and enterprises in South Africa — architecture, data pipelines, and lessons learned.',
    seoKeywords:
      'ESG analytics platform development, carbon reporting software south africa, waste management analytics platform, ESG dashboard developer, real-time data ingestion pipeline, municipal ESG reporting system, multi-tenant ESG platform',
    hero: 'Connecting municipalities, waste operators and executives to a single live compliance reporting system required solving problems far beyond dashboard design — data fragmentation, stakeholder access control, pipeline reliability, and regulatory reporting accuracy all had to be engineered simultaneously.',
    sections: [
      {
        heading: 'The problem: disconnected data across the ESG value chain',
        body: 'In most organisations, ESG data — carbon emissions, waste volumes, energy consumption, water usage — lives in spreadsheets, siloed departmental systems, and manual report documents. For municipal waste and carbon management, this problem is amplified by the number of stakeholders involved: municipalities that own the mandate, waste operators who execute the collections, logistics providers, and executives who need consolidated KPI visibility. Building a platform that serves all of these stakeholders simultaneously requires a careful architecture design, not just a multi-tab dashboard.',
      },
      {
        heading: 'Data ingestion: designing for heterogeneous sources',
        body: 'The first engineering challenge is the data ingestion layer. Different stakeholders submit data in different formats — some via mobile apps, some via CSV uploads, some via direct API integration from weighbridge systems and vehicle tracking software. Our ingestion architecture uses a staging schema that acts as a quarantine zone: raw data arrives and is validated against defined schemas before it is accepted into the operational database. Invalid records are flagged with descriptive error messages and returned to the submitter for correction, preventing corrupt data from polluting aggregated metrics.',
      },
      {
        heading: 'Multi-tenant architecture with stakeholder-specific access',
        body: "An ESG platform serving municipalities, waste operators, and executives cannot use a single shared view. Each stakeholder class has different data visibility rights. We implement this using a multi-tenant Supabase backend with Row-Level Security policies that enforce data boundaries at the database level. The tenant context is embedded in the authenticated JWT and referenced in every RLS policy. This means a waste operator cannot access another contractor's data even if they reverse-engineer the API.",
      },
      {
        heading: 'Real-time dashboards: choosing the right update strategy',
        body: "Not every metric on an ESG dashboard needs to update in real time. Collection totals that change only when a waste vehicle completes a route do not need WebSocket updates. Over-engineering real-time capabilities wastes infrastructure and creates complexity without business value. We analyse each metric's decision cadence: for operational dashboards used by municipal supervisors monitoring active collections, we use Supabase Realtime for live status updates. For executive KPI views, we use pre-aggregated materialised views refreshed on a schedule and served from a Redis cache.",
      },
      {
        heading: 'Automated compliance reporting pipelines',
        body: 'The highest-value feature of an ESG analytics platform for regulated organisations is automated report generation. Instead of an analyst spending three days compiling a compliance report from disparate sources, the platform generates it on demand from verified, audit-trailed data. We build reporting pipelines that aggregate required metrics, apply regulatory calculation formulas — carbon equivalent conversions, waste diversion rates, landfill avoidance metrics — and produce export-ready PDF and CSV outputs with full data lineage.',
      },
      {
        heading: 'Lessons learned building for South African municipalities',
        body: 'Building ESG platforms for South African municipalities taught us lessons that apply broadly to government data systems. First, data quality at the source is always worse than expected — build for this with robust validation, not by assuming clean input. Second, end users in operational roles need mobile-first interfaces with offline capability, because connectivity is not always reliable in the field. Third, reporting requirements change — build your calculation engine as configurable business logic, not hardcoded formulas, so regulatory updates do not require new development sprints.',
      },
    ],
  },
};

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles[slug];

  if (!article) {
    return (
      <div className="article-page">
        <div className="section__container">
          <div className="article-page__not-found">
            <h1>Article not found</h1>
            <p>The article you are looking for does not exist.</p>
            <Link to="/" className="btn">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="article-page">
      <SEOHead
        title={`${article.title} | XANZI Tech`}
        description={article.seoDescription || article.hero}
        canonical={`${SITE_URL}/insights/${slug}`}
        keywords={article.seoKeywords || ''}
        og={{ type: 'article', title: article.title, description: article.seoDescription || article.hero }}
        schema={buildArticleSchema({
          slug,
          title: article.title,
          description: article.seoDescription || article.hero,
          keywords: article.seoKeywords || '',
          datePublished: article.datePublished || '2025-01-01',
        })}
      />
      <div className="section__container">
        <motion.div
          className="article-page__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/#insights"
            className="article-page__back"
            onClick={(e) => { e.preventDefault(); scrollAfterNav(navigate, '#insights'); }}
          >
            <ArrowLeft size={16} /> Back to Insights
          </a>

          <span className="article-page__tag">{article.tag}</span>
          <h1 className="article-page__title">{article.title}</h1>
          <p className="article-page__hero">{article.hero}</p>

          <div className="article-page__meta">
            <span className="article-page__meta-item">
              <User size={14} /> {article.author}
            </span>
            <span className="article-page__meta-item">
              <Clock size={14} /> {article.readTime}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="article-page__body"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {article.sections.map((section, i) => (
            <div key={i} className="article-page__section">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="article-page__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/#insights"
            className="btn btn--outline"
            onClick={(e) => { e.preventDefault(); scrollAfterNav(navigate, '#insights'); }}
          >
            <ArrowLeft size={14} /> Back to Insights
          </a>
          <a
            href="/#contact"
            className="btn"
            onClick={(e) => { e.preventDefault(); scrollAfterNav(navigate, '#contact'); }}
          >
            Start a Project
          </a>
        </motion.div>
      </div>
    </article>
  );
}

export { articles };
