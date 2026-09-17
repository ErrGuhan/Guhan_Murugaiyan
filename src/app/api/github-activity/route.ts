import { NextResponse } from "next/server";

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    commits?: { message: string }[];
    size?: number;
  };
}

interface ActivityData {
  commitsThisMonth: number;
  totalRecentEvents: number;
  lastActive: string | null;
  weekActivity: number[]; // last 7 days, index 0 = 6 days ago, index 6 = today
}

export async function GET(): Promise<NextResponse<ActivityData | { error: string }>> {
  try {
    const res = await fetch(
      "https://api.github.com/users/ErrGuhan/events/public?per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "guhan-portfolio/1.0",
        },
        // Next.js 16 fetch cache with 1-hour revalidation
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with ${res.status}` },
        { status: res.status }
      );
    }

    const events: GitHubEvent[] = await res.json();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let commitsThisMonth = 0;
    let lastActive: string | null = null;

    // Build 7-day activity buckets
    const weekActivity = new Array(7).fill(0);

    for (const event of events) {
      const eventDate = new Date(event.created_at);

      // Last active date from most recent event
      if (!lastActive && event.created_at) {
        lastActive = event.created_at;
      }

      // Count commits this month (PushEvent)
      if (event.type === "PushEvent" && eventDate >= startOfMonth) {
        const size = event.payload?.size ?? event.payload?.commits?.length ?? 0;
        commitsThisMonth += size;
      }

      // 7-day bucket: day 0 = 6 days ago, day 6 = today
      const diffMs = now.getTime() - eventDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < 7) {
        weekActivity[6 - diffDays] += 1;
      }
    }

    return NextResponse.json({
      commitsThisMonth,
      totalRecentEvents: events.length,
      lastActive,
      weekActivity,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    );
  }
}
