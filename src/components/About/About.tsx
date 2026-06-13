import { AboutStats } from './AboutStats';
import shared from '@/styles/shared.module.scss';
import styles from './About.module.scss';

/** "Who is Lekh" — casual intro + the four draggable / mergeable stat cards. */
export function About() {
  return (
    <section id="about">
      <div className={`${shared.eyebrow} reveal`}>01 — Who is Lekh</div>
      <h2 className={`${shared.h2} flip3d`}>
        4TH-YEAR CS STUDENT, <span className={shared.accent}>PROFESSIONAL</span>{' '}
        <span className={shared.accentB}>OVERTHINKER</span>
      </h2>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutText}>
          <p className="reveal">
            Hi! I'm a <b>4th-year B.Tech CSE student</b> who stumbled into engineering and now does coding (kinda). On
            paper it's a degree; in practice it's one very long debugging session.
          </p>
          <p className="reveal">
            My PC and I have been through more together than most people go through in a relationship; late nights,
            crashes, the occasional breakdown (mostly mine). Somehow we keep <b>running</b>.
          </p>
          <p className="reveal">
            When I'm not fighting my own code, I'm building <b>full-stack products</b>,  or jumping into a{' '}
            <b>debate or case study</b> to feel smart again.
          </p>
        </div>

        <AboutStats />
      </div>
    </section>
  );
}
