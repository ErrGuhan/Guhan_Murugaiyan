/**
 * Utility for handling resume download and preview across desktop,
 * mobile browsers, standalone PWAs, and in-app WebViews.
 */

export const RESUME_FILENAME = "Guhan_Murugaiyan_Resume.pdf";
export const RESUME_DOWNLOAD_URL = "/api/download-resume";
export const RESUME_VIEW_URL = "/api/download-resume?view=1";

interface DownloadOptions {
  source?: string;
  onComplete?: () => void;
}

/**
 * Triggers an actual file download with RFC-standard attachment headers,
 * avoiding target="_blank" popup blocker and orphaned tab bugs on mobile.
 * Dispatches the INTEL ACQUIRED (+500 XP) achievement event.
 */
export function triggerResumeDownload(options?: DownloadOptions) {
  if (typeof window === "undefined") return;

  // 1. Dispatch gamified achievement notification
  // Note: AchievementToast listens for this event and plays the success chime once.
  // We explicitly avoid calling playSuccessChime() here to prevent double audio playback.
  window.dispatchEvent(
    new CustomEvent("achievement-unlocked", {
      detail: {
        title: "INTEL ACQUIRED",
        desc: "Guhan's Dossier (Resume) downloaded to your local drive.",
        xp: "+500 XP",
      },
    })
  );

  // 2. Execute download using standard programmatic anchor
  // Omitting target="_blank" is critical for mobile Safari, Chrome, and WebViews
  // so the native download manager takes over without creating an empty blank tab.
  try {
    const link = document.createElement("a");
    link.href = RESUME_DOWNLOAD_URL;
    link.download = RESUME_FILENAME;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 150);
  } catch {
    // Fallback: direct navigation to attachment endpoint
    window.location.href = RESUME_DOWNLOAD_URL;
  }

  if (options?.onComplete) {
    options.onComplete();
  }
}
