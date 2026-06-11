import shared from '@/styles/shared.module.scss';
import styles from './About.module.scss';

const STATS = [
  { count: 8.05, decimals: 2, suffix: '', label: 'CGPA · B.Tech CS' },
  { count: 8, decimals: 0, suffix: '+', label: 'Hackathon Wins' },
  { count: 10, decimals: 0, suffix: '+', label: 'Major Projects' },
  { count: 300, decimals: 0, suffix: '+', label: 'Users Served' },
] as const;

/** "Who is Lekh" — developer narrative, comic quote panel and stat counters. */
export function About() {
  return (
    <section id="about">
      <div className={`${shared.eyebrow} reveal`}>01 — Who is Lekh</div>
      <h2 className={`${shared.h2} flip3d`}>
        ENGINEER, <span className={shared.accent}>BUILDER</span> &amp; <span className={shared.accentB}>RESEARCHER</span>
      </h2>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutText}>
          <p className="reveal">
            I'm a <b>Computer Science</b> undergrad at <b>SPIT, Mumbai</b>, with a Minor in <b>Business Analytics from
            IIT Patna</b> (9.5 CGPA). I build full-stack products, distributed systems and AI/ML applications — end to
            end.
          </p>
          <p className="reveal">
            From <b>RAG platforms</b> and real-time collaborative editors to <b>HPC access portals</b> and{' '}
            <b>quantum-optimized ML research</b>, I gravitate toward hard problems where systems, data and people meet —
            and I ship them.
          </p>
          <p className={`${styles.quote} reveal`}>
            "I don't just write code — I ship systems that hold up in production."
          </p>
        </div>

        <div className={`${styles.stats} reveal`}>
          {STATS.map((s) => (
            <div className={styles.stat} key={s.label}>
              <div
                className={`${styles.num} num`}
                data-count={s.count}
                data-decimals={s.decimals}
                data-suffix={s.suffix}
              >
                0
              </div>
              <div className={styles.lbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
