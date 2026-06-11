import shared from '@/styles/shared.module.scss';
import styles from './Process.module.scss';

const STEPS = [
  { no: '01', title: 'Understand', body: 'First I map your business or goal — where time is leaking, and where AI fits best.' },
  { no: '02', title: 'Build', body: 'Agent or automation designed + built — fast, tested, and plugged into your real workflow.' },
  { no: '03', title: 'Learn', body: "I don't just deliver — I teach you how to run and modify the system yourself, step by step." },
  { no: '04', title: 'Scale', body: 'Once the system runs, we scale it across more brands, more products, more income streams.' },
] as const;

/** "How It Works" — the four-step comic process list. */
export function Process() {
  return (
    <section id="process">
      <div className={`${shared.eyebrow} reveal`}>03 — How It Works</div>
      <h2 className={`${shared.h2} flip3d`}>
        SIMPLE PROCESS, <span className={shared.accent}>SERIOUS</span> RESULTS
      </h2>

      <div className={styles.steps}>
        {STEPS.map((s) => (
          <div className={`${styles.step} reveal`} key={s.no}>
            <div className={styles.no}>{s.no}</div>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
