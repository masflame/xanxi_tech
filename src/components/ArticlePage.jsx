import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';

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
