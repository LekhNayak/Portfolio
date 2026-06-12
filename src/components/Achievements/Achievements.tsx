import { ACHIEVEMENTS } from '@/data/achievements';
import { AchievementIcon } from './AchievementIcon';
import shared from '@/styles/shared.module.scss';
import styles from './Achievements.module.scss';

const RANK_CLASS = { win: '', second: 'rankBlue', finalist: 'rankYellow' } as const;

/**
 * Achievement badges that burst into view (`badge-pop`, handled by
 * `useShowcaseAnimations`) and react to hover with a comic impact shift.
 */
export function Achievements() {
  return (
    <section id="achievements">
      <div className={`${shared.eyebrow} reveal`}>04 — Achievements</div>
      <h2 className={`${shared.h2} flip3d`}>
        HACKATHONS &amp; <span className={shared.accent}>AWARDS</span>
      </h2>

      <div className={styles.grid}>
        {ACHIEVEMENTS.map((a) => (
          <div className={`${styles.badge} badge-pop hoverable`} key={a.title}>
            <span className={styles.glyph} aria-hidden="true">
              <AchievementIcon name={a.icon} />
            </span>
            <div className={`${styles.rank} ${styles[RANK_CLASS[a.rankType]] ?? ''}`}>{a.rank}</div>
            <div className={styles.title}>{a.title}</div>
            <div className={styles.detail}>{a.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
