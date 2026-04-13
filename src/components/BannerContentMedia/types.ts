export type BannerContentMediaProps = {
  url: string;
  isVideo: boolean;
  /** Poster while video loads (optional). */
  posterUrl?: string | null;
  /** When true, video shows native controls (e.g. admin preview). */
  showVideoControls?: boolean;
  /**
   * `cover` — full-bleed home hero (default before).
   * `contain` — admin preview / full image visible.
   */
  fit?: "cover" | "contain";
};
