"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface ActivityData {
  commitsThisMonth: number;
  totalRecentEvents: number;
  lastActive: string | null;
  weekActivity: number[];
}

function formatLastActive(iso: string | null): string {
  if (!iso) return "Recently";
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function GitHubActivityWidget() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<ActivityData>;
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const maxBar = data ? Math.max(...data.weekActivity, 1) : 1;
  const dayLabels = ["6d", "5d", "4d", "3d", "2d", "1d", "Now"];

  return (
    <div className="comic-card mt-4 p-4 rounded-2xl bg-[#0F0F14] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#FFE600] uppercase tracking-widest font-black block leading-none">
              GITHUB ACTIVITY
            </span>
            <span className="text-[9px] font-mono text-neutral-500 font-bold block mt-0.5">
              ErrGuhan · PUBLIC REPOS
            </span>
          </div>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#13131A] border-[1.5px] border-black text-[9px] font-mono font-black text-[#00E676] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
          LIVE
        </div>
      </div>

      {loading ? (
        /* Skeleton loader */
        <div className="space-y-2 animate-pulse">
          <div className="h-3 w-3/4 bg-[#1C1C26] rounded" />
          <div className="h-3 w-1/2 bg-[#1C1C26] rounded" />
          <div className="flex items-end gap-1 h-10 mt-3">
            {[40, 70, 30, 90, 55, 80, 65].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#1C1C26] rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      ) : error || !data ? (
        /* Error / fallback */
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00E676]" />
          GitHub: Active · ErrGuhan
        </div>
      ) : (
        <div className="space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black text-center">
              <span className="text-[#FFE600] font-mono font-black text-sm block leading-none">
                {data.commitsThisMonth}
              </span>
              <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider mt-0.5 block">
                COMMITS/MO
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black text-center">
              <span className="text-[#00F0FF] font-mono font-black text-sm block leading-none">
                {data.totalRecentEvents}
              </span>
              <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider mt-0.5 block">
                RECENT OPS
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black text-center">
              <span className="text-[#00E676] font-mono font-black text-[11px] block leading-none">
                {formatLastActive(data.lastActive)}
              </span>
              <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider mt-0.5 block">
                LAST PUSH
              </span>
            </div>
          </div>

          {/* 7-day activity bar chart */}
          <div>
            <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider">
              7-DAY ACTIVITY
            </span>
            <div className="flex items-end gap-1 h-12 mt-1.5">
              {data.weekActivity.map((count, i) => {
                const heightPct = Math.max(8, (count / maxBar) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-sm transition-all duration-500"
                      style={{
                        height: `${heightPct}%`,
                        background:
                          i === 6
                            ? "#FFE600"
                            : count > 0
                            ? "#00F0FF"
                            : "#1C1C26",
                        boxShadow:
                          i === 6 && count > 0
                            ? "0 0 4px rgba(255,230,0,0.6)"
                            : "none",
                      }}
                    />
                    <span className="text-[7px] font-mono text-neutral-600 font-bold">
                      {dayLabels[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/ErrGuhan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-black text-neutral-400 hover:text-[#FFE600] transition-colors uppercase tracking-wider"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            github.com/ErrGuhan ↗
          </a>
        </div>
      )}
    </div>
  );
}
