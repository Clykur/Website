/** Subtle attention cue when chat opens proactively (respects reduced motion). */

let audioContext: AudioContext | null = null;
let unlockInstalled = false;
let pendingAttentionAfterUnlock = false;

export function prefersReducedSensory(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

async function getAudioContext(): Promise<AudioContext | null> {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;

  if (!audioContext) {
    audioContext = new Ctx();
  }

  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch {
      return null;
    }
  }

  return audioContext.state === "running" ? audioContext : null;
}

function playAttentionTone(ctx: AudioContext): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(660, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
  osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.22);

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function vibrateAttention(): void {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([40, 60, 40, 60, 40]);
    }
  } catch {
    /* ignore */
  }
}

function fireSyncedAttention(): void {
  void getAudioContext().then((ctx) => {
    if (ctx) {
      vibrateAttention();
      playAttentionTone(ctx);
    } else {
      pendingAttentionAfterUnlock = true;
    }
  });
}

/** Call once from chat widget mount. Unlocks audio after first user gesture (browser policy). */
export function installChatAttentionUnlock(): () => void {
  if (typeof window === "undefined" || unlockInstalled) return () => {};
  unlockInstalled = true;

  const onUnlock = () => {
    if (!pendingAttentionAfterUnlock) return;
    pendingAttentionAfterUnlock = false;
    fireSyncedAttention();
  };

  window.addEventListener("pointerdown", onUnlock, { passive: true });
  window.addEventListener("keydown", onUnlock);
  window.addEventListener("touchstart", onUnlock, { passive: true });

  return () => {
    window.removeEventListener("pointerdown", onUnlock);
    window.removeEventListener("keydown", onUnlock);
    window.removeEventListener("touchstart", onUnlock);
  };
}

/** Vibration + sound together when audio is allowed. */
export function playChatOpenAttentionSynced(): void {
  if (typeof window === "undefined") return;
  if (prefersReducedSensory()) return;
  fireSyncedAttention();
}
