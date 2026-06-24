"use client";
import { AlertTriangle, Database, Layers, Target } from "lucide-react";
import { C } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";
import styles from "./home.module.css";

const pains = [
  { icon: <Layers size={22} />,        color: C.red,     title: "14 tools. Zero connection.",               body: `Your team lives in Slack, Notion, HubSpot, QuickBooks, and Greenhouse â€” but none of them talk. Every Monday you're stitching spreadsheets just to answer "how are we doing?"`, wide: true  },
  { icon: <Database size={22} />,      color: C.amber,   title: "The insight is in there. Somewhere.",      body: "You know the data exists. It's buried in dashboards nobody checks and reports nobody reads. Finding it costs you hours every week.",                                           wide: false },
  { icon: <AlertTriangle size={22} />, color: C.red,     title: "By the time you notice, it's a crisis.",  body: "Churn creep. Runway drift. A star employee going quiet. These aren't surprises â€” they're signals you missed because no one was watching all the data at once.",               wide: false },
  { icon: <Target size={22} />,        color: C.primary, title: "You're solving last month's problems.",    body: "Without real-time intelligence, your decisions lag reality by weeks. Opportunities close, risks compound, and leadership keeps asking questions ops can't answer fast enough.", wide: true  },
];

const tools = ["Slack","Notion","HubSpot","QuickBooks","Greenhouse","Zoom","Jira","Stripe","Mixpanel","Salesforce","Workday","Calendly","ClickUp","Pipedrive"];

export default function ProblemSection() {
  return (
    <section className={styles.problemSection}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><SectionHeading label="Sound Familiar?" title={<>Running a Startup Blind<br />Is <span className={styles.gradText}>Expensive</span></>} sub="The average funded startup wastes 12 hours a week chasing data that already exists. That's 3 months a year your leadership team spends on reporting instead of building." /></Reveal>

        <div className={styles.bentoGrid}>
          {/* Card 0 â€” wide */}
          <Reveal delay={0} className={styles.bentoSpan2}>
            <div className={`${styles.bentoCardWhite} ${styles.cardLift}`}>
              <div className={styles.painIconWrap} style={{ background: `${pains[0].color}0C`, border: `1px solid ${pains[0].color}22`, color: pains[0].color }}>{pains[0].icon}</div>
              <h3 className={styles.painH3Lg}>{pains[0].title}</h3>
              <p className={styles.painBody}>{pains[0].body}</p>
            </div>
          </Reveal>
          {/* Card 1 */}
          <Reveal delay={80}>
            <div className={`${styles.bentoCardTinted} ${styles.cardLift}`} style={{ background: `linear-gradient(135deg,${pains[1].color}07,${pains[1].color}03)`, border: `1px solid ${pains[1].color}18` }}>
              <div className={styles.painIconWrapSm} style={{ background: `${pains[1].color}12`, border: `1px solid ${pains[1].color}22`, color: pains[1].color }}>{pains[1].icon}</div>
              <h3 className={styles.painH3Sm}>{pains[1].title}</h3>
              <p className={styles.painBodySm}>{pains[1].body}</p>
            </div>
          </Reveal>
          {/* Card 2 */}
          <Reveal delay={140}>
            <div className={`${styles.bentoCardTinted} ${styles.cardLift}`} style={{ background: `linear-gradient(135deg,${pains[2].color}07,${pains[2].color}03)`, border: `1px solid ${pains[2].color}18` }}>
              <div className={styles.painIconWrapSm} style={{ background: `${pains[2].color}12`, border: `1px solid ${pains[2].color}22`, color: pains[2].color }}>{pains[2].icon}</div>
              <h3 className={styles.painH3Sm}>{pains[2].title}</h3>
              <p className={styles.painBodySm}>{pains[2].body}</p>
            </div>
          </Reveal>
          {/* Card 3 â€” wide */}
          <Reveal delay={200} className={styles.bentoSpan2}>
            <div className={`${styles.bentoCardTinted} ${styles.cardLift}`} style={{ background: "linear-gradient(135deg,rgba(20,184,166,.05),transparent)", border: `1px solid ${C.border}` }}>
              <div className={styles.painIconWrap} style={{ background: `${pains[3].color}0C`, border: `1px solid ${pains[3].color}22`, color: pains[3].color }}>{pains[3].icon}</div>
              <h3 className={styles.painH3Lg}>{pains[3].title}</h3>
              <p className={styles.painBody}>{pains[3].body}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={280}>
          <div className={styles.toolChaosWrap}>
            <p className={styles.toolChaosLabel}>The average startup tool stack</p>
            <div className={styles.toolPills}>
              {tools.map((t, i) => (
                <span key={t} className={styles.toolPill} style={{ transform: `rotate(${(i % 5 - 2) * 1.3}deg)` }}>{t}</span>
              ))}
            </div>
            <div className={styles.toolChaosDivider}>
              <div className={styles.toolChaosLine} />
              <p className={styles.toolChaosText}>No connection. No context. No clarity.</p>
              <div className={styles.toolChaosLine} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
