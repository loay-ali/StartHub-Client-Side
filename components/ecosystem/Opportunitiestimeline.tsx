"use client";

import { useEffect, useMemo, useState } from "react";
import { Trophy, Landmark, Rocket, CalendarClock } from "lucide-react";
import { fetchOpportunities, Opportunity, OpportunityType } from "@/lib/opportunities-service";

const PALETTE = ["#e8ab4e", "#3ba7c4", "#b1517a", "#3fa17e", "#7c6fce", "#d97757"];

const TYPE_META: Record<OpportunityType, { label: string; icon: typeof Trophy }> = {
  COMPETITION: { label: "Competition", icon: Trophy },
  GRANT: { label: "Grant", icon: Landmark },
  ACCELERATOR: { label: "Accelerator", icon: Rocket },
  INVESTOR_EVENT: { label: "Investor Event", icon: CalendarClock },
};

// Layout constants — kept fixed so the chevron notches line up regardless
// of how long each opportunity's title is (title is truncated to fit).
const ARROW_WIDTH = 210;
const ARROW_HEIGHT = 56;
const NOTCH_OVERLAP = 32; // ~15% of ARROW_WIDTH, matches the clip-path notch
const DOT_RADIUS = 6;
const LINE_LENGTH = 56;
const CIRCLE_DIAMETER = 84;

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function chevronClipPath(isFirst: boolean) {
  return isFirst
    ? "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)"
    : "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)";
}

export default function OpportunitiesTimeline() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      const data = await fetchOpportunities();
      setOpportunities((prev) => {
        const merged = new Map(prev.map((o) => [o.id, o]));
        data.forEach((o) => merged.set(o.id, o));
        return Array.from(merged.values());
      });
      console.log(opportunities);
    } catch {
      // Non-blocking — section just stays empty/stale instead of breaking the page.
    } finally {
      setIsLoading(false);
    }
  }

  // Poll so new competitions/grants show up on the timeline without a reload.
  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  const sorted = useMemo(
    () =>
      [...opportunities].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      ),
    [opportunities],
  );

  return (
    <section className="relative py-24 px-4 bg-slate-50 dark:bg-[#060a0f] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Opportunities Timeline
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Competitions, grants, and accelerator programs — updated as new ones open.
          </p>
        </div>

        {!isLoading && sorted.length === 0 && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            No opportunities yet.
          </p>
        )}

        <div className="overflow-x-auto scrollbar-none">
          <div
            className="flex items-center min-w-max mx-auto"
            style={{ paddingTop: LINE_LENGTH + CIRCLE_DIAMETER + 12, paddingBottom: LINE_LENGTH + CIRCLE_DIAMETER + 12 }}
          >
            {sorted.map((item, index) => {
              const color = PALETTE[index % PALETTE.length];
              const isUp = index % 2 === 0;
              const isFirst = index === 0;
              const Icon = TYPE_META[item.type].icon;
              const dotAnchor = `calc(50% + ${DOT_RADIUS + 2}px)`;
              const circleAnchor = `calc(50% + ${DOT_RADIUS + 2 + LINE_LENGTH}px)`;
              const label =
                item.status === "CLOSING_SOON" ? `${item.daysLeft}d left` : formatDeadline(item.deadline);

              return (
                <div
                  key={item.id}
                  className="relative flex-shrink-0"
                  style={{
                    width: ARROW_WIDTH,
                    height: ARROW_HEIGHT,
                    marginLeft: isFirst ? 0 : -NOTCH_OVERLAP,
                  }}
                >
                  {/* Chevron / arrow bar */}
                  <div
                    className="absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm font-semibold"
                    style={{ backgroundColor: color, clipPath: chevronClipPath(isFirst) }}
                  >
                    <span className="truncate px-6 max-w-[160px]">{item.title}</span>
                  </div>

                  {/* Type label, same side as the circle, like "Add Text Here" in the reference */}
                  <div
                    className="absolute left-2 flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap"
                    style={isUp ? { bottom: "calc(100% + 10px)" } : { top: "calc(100% + 10px)" }}
                  >
                    <Icon size={12} />
                    {TYPE_META[item.type].label}
                  </div>

                  {/* Node dot at the right tip of the arrow */}
                  <div
                    className="absolute rounded-full ring-2 ring-slate-50 dark:ring-[#060a0f] z-10"
                    style={{
                      backgroundColor: color,
                      width: DOT_RADIUS * 2,
                      height: DOT_RADIUS * 2,
                      right: -DOT_RADIUS,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />

                  {/* Connector line */}
                  <div
                    className="absolute"
                    style={{
                      backgroundColor: color,
                      width: 2,
                      right: -1,
                      height: LINE_LENGTH,
                      ...(isUp ? { bottom: dotAnchor } : { top: dotAnchor }),
                    }}
                  />

                  {/* Date circle */}
                  <div
                    className="absolute rounded-full flex items-center justify-center text-white text-xs font-bold text-center px-2 shadow-md"
                    style={{
                      backgroundColor: color,
                      width: CIRCLE_DIAMETER,
                      height: CIRCLE_DIAMETER,
                      right: -(CIRCLE_DIAMETER / 2 - 1),
                      ...(isUp ? { bottom: circleAnchor } : { top: circleAnchor }),
                    }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}