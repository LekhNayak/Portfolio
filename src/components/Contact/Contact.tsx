import { PROFILE } from '@/data/profile';
import shared from '@/styles/shared.module.scss';
import styles from './Contact.module.scss';

/** "Let's Build Something Amazing" — collaboration CTA + dev social links. */
export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`${shared.eyebrow} ${styles.eyebrowCenter} reveal`}>06 — Let's Connect</div>
      <h2 className={`${shared.h2} ${styles.h2Center} flip3d`}>
        LET'S BUILD SOMETHING <span className={shared.accent}>AMAZING</span>
      </h2>
      <p className={`${styles.contactSub} reveal`}>
        Open to <b>collaborations, research, internships</b> and <b>software engineering</b> opportunities. If you're
        building something ambitious, let's talk.
      </p>

      <div className={`${styles.megaCta} reveal`}>
        <a className={`${shared.btn} ${shared.btnPrimary} hoverable magnetic`} data-label="SAY HI!" href={PROFILE.links.email}>
          <span className={shared.dot} /> Email Me
        </a>
        <a
          className={`${shared.btn} ${shared.btnGhost} hoverable magnetic`}
          data-label="GRAB IT!"
          href={PROFILE.links.resume}
          target="_blank"
          rel="noopener"
        >
          View Resume ↗
        </a>
      </div>

      <div className={`${styles.socialRow} reveal js-social`}>
        <a className={`${styles.social} ${styles.gh} hoverable`} href={PROFILE.links.github} target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
          </svg>
          GitHub
        </a>

        <a
          className={`${styles.social} ${styles.li} hoverable`}
          href={PROFILE.links.linkedin}
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>

        <a className={`${styles.social} ${styles.em} hoverable`} href={PROFILE.links.email}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M3 6l9 6 9-6" />
          </svg>
          Email
        </a>
      </div>
    </section>
  );
}
