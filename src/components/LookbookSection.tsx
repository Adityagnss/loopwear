import { useState, useEffect, useRef, useCallback } from "react";
import { Instagram, Play, Pause, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import streetEssential from "@/assets/collection/street-essential.jpg";
import urbanClassic from "@/assets/collection/urban-classic.jpg";
import minimalDrop from "@/assets/collection/minimal-drop.jpg";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const reels = [
  {
    id: "DThLisYAFNs",
    image: streetEssential,
    title: "Street Vibes",
    subtitle: "Vol. 01",
    tag: "EDITORIAL",
    caption: "Raw energy. Unfiltered streets.\nThis is where style lives.",
    accent: "#E8572A",
  },
  {
    id: "DR1ToD9k-Fa",
    image: urbanClassic,
    title: "Drop Day",
    subtitle: "Vol. 02",
    tag: "LOOKBOOK",
    caption: "The rack drops. The culture speaks.\nLimited pieces, unlimited statement.",
    accent: "#5B8CFF",
  },
  {
    id: "DREYZJFE3t8",
    image: minimalDrop,
    title: "Urban Flow",
    subtitle: "Vol. 03",
    tag: "STREET",
    caption: "Clean lines. Dark energy.\nEvery stitch engineered for silence.",
    accent: "#A259FF",
  },
];

const REEL_DURATION = 5500; // ms per slide
const IG_BASE = "https://www.instagram.com/reel/";

/* ─── Animated noise grain ───────────────────────────────────────────────── */
const Grain = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "140px",
    }}
  />
);

/* ─── Sound wave bars (decorative) ──────────────────────────────────────── */
const SoundBars = ({ color, playing }: { color: string; playing: boolean }) => (
  <div className="flex items-end gap-[3px] h-5">
    {[4, 7, 5, 9, 6, 8, 4, 7, 5, 9].map((h, i) => (
      <div
        key={i}
        className="w-[2.5px] rounded-full"
        style={{
          height: playing ? `${h * 2}px` : "4px",
          background: color,
          transition: "height 0.15s ease",
          animation: playing
            ? `soundBar 0.7s ease-in-out ${i * 0.07}s infinite alternate`
            : "none",
          opacity: 0.85,
        }}
      />
    ))}
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
const LookbookSection = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [ticker, setTicker] = useState(0);

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── go to a specific index ── */
  const goTo = useCallback(
    (next: number, dir: "left" | "right" = "right") => {
      if (animating) return;
      setPrev(active);
      setDirection(dir);
      setAnimating(true);
      setActive(next);
      setProgress(0);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 550);
    },
    [active, animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % reels.length, "right");
  }, [active, goTo]);

  const back = useCallback(() => {
    goTo((active - 1 + reels.length) % reels.length, "left");
  }, [active, goTo]);

  /* ── auto-advance with progress bar ── */
  useEffect(() => {
    if (paused) return;
    const step = 100 / (REEL_DURATION / 60);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + step;
      });
    }, 60);
    slideRef.current = setTimeout(next, REEL_DURATION);
    return () => {
      clearInterval(progressRef.current!);
      clearTimeout(slideRef.current!);
    };
  }, [active, paused, next]);

  /* ── marquee ticker ── */
  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 25);
    return () => clearInterval(id);
  }, []);

  const cur = reels[active];
  const prvReel = prev !== null ? reels[prev] : null;

  /* ── slide-in/out transforms ── */
  const enterFrom = direction === "right" ? "translateX(100%)" : "translateX(-100%)";
  const exitTo = direction === "right" ? "translateX(-100%)" : "translateX(100%)";

  const tickerItems = [
    "EDITORIAL LOOKBOOK",
    "WATCH ON INSTAGRAM",
    "NEW DROPS",
    "ENGINEERED MINIMALISM",
    "STREET CULTURE",
    "SEASONAL COLLECTION",
  ];
  const tickerText = Array(10).fill(tickerItems).flat().join("  ·  ");

  return (
    <section id="lookbook" className="py-24 bg-black overflow-hidden">
      <style>{`
        @keyframes soundBar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>

      {/* ── Section header ── */}
      <div className="px-6 container mx-auto mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">
              Editorial
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Look
              <span className="italic text-primary">book</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-muted-foreground text-sm max-w-xs text-left md:text-right leading-relaxed">
              Auto-playing reels. Click the card to watch on Instagram.
            </p>
            <a
              href="https://www.instagram.com/theloopwear_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors group"
            >
              <Instagram size={13} />
              @theloopwear_
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="relative overflow-hidden py-3 mb-10 border-y border-white/[0.06]"
        style={{ background: "#0d0d0d" }}
      >
        <div
          className="flex whitespace-nowrap text-[10px] font-black tracking-[0.4em] text-white/20 select-none"
          style={{
            transform: `translateX(-${(ticker * 0.35) % 700}px)`,
            willChange: "transform",
          }}
        >
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>

      {/* ── Player ── */}
      <div className="px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* ── Main Stage ── */}
          <div className="flex-1 relative overflow-hidden" style={{ minHeight: "560px", borderRadius: "3px" }}>

            {/* Outgoing slide */}
            {prvReel && (
              <div
                key={`prev-${prev}`}
                className="absolute inset-0"
                style={{
                  transform: exitTo,
                  transition: "transform 0.52s cubic-bezier(0.77,0,0.18,1)",
                  zIndex: 1,
                }}
              >
                <img
                  src={prvReel.image}
                  alt={prvReel.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.55)" }}
                />
              </div>
            )}

            {/* Active slide */}
            <div
              key={`cur-${active}`}
              className="absolute inset-0"
              style={{
                transform: animating ? "translateX(0)" : "translateX(0)",
                animation: animating
                  ? `none`
                  : undefined,
                zIndex: 2,
              }}
            >
              {/* slide in */}
              <div
                className="absolute inset-0"
                style={{
                  transform: animating ? "translateX(0)" : undefined,
                  animation: animating
                    ? `slideIn 0.52s cubic-bezier(0.77,0,0.18,1) forwards`
                    : undefined,
                }}
              >
                <style>{`
                  @keyframes slideIn {
                    from { transform: ${enterFrom}; }
                    to   { transform: translateX(0); }
                  }
                `}</style>
                <img
                  src={cur.image}
                  alt={cur.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.45) saturate(1.1)" }}
                />
              </div>

              {/* Gradients */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div
                className="absolute inset-0 z-10 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, ${cur.accent}18 0%, transparent 55%)`,
                }}
              />
              <Grain />

              {/* Progress bars (stories style) */}
              <div className="absolute top-5 left-5 right-5 z-30 flex gap-1.5">
                {reels.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[2.5px] rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    <div
                      className="h-full rounded-full transition-none"
                      style={{
                        background: i === active ? cur.accent : i < active ? "#fff" : "transparent",
                        width:
                          i < active
                            ? "100%"
                            : i === active
                            ? `${progress}%`
                            : "0%",
                        transition: i === active ? "width 0.06s linear" : "none",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Top bar */}
              <div className="absolute top-12 left-5 right-5 z-30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2"
                    style={{ background: cur.accent, borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    TLW
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold leading-none">theloopwear_</p>
                    <p className="text-white/50 text-[10px] mt-0.5">{cur.subtitle}</p>
                  </div>
                  {/* Live playing dot */}
                  <div className="flex items-center gap-1.5 ml-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: cur.accent,
                        animation: "pulseDot 1.2s ease-in-out infinite",
                      }}
                    />
                    <span className="text-[9px] font-black tracking-widest" style={{ color: cur.accent }}>
                      LIVE
                    </span>
                  </div>
                </div>
                <span
                  className="text-[9px] font-black tracking-[0.3em] px-2 py-0.5"
                  style={{ background: cur.accent, color: "#000" }}
                >
                  {cur.tag}
                </span>
              </div>

              {/* Center play icon (decorative) */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(8px)",
                    opacity: paused ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <Play size={22} className="fill-white text-white ml-1" />
                </div>
              </div>

              {/* Bottom content */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 z-30"
                key={`content-${active}`}
                style={{ animation: "fadeUp 0.5s ease 0.15s both" }}
              >
                <h3
                  className="font-black uppercase leading-none mb-3"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
                >
                  {cur.title}
                </h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed whitespace-pre-line">
                  {cur.caption}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <SoundBars color={cur.accent} playing={!paused} />
                    <span className="text-white/40 text-[10px] tracking-wider">Original Audio</span>
                  </div>
                  <a
                    href={`${IG_BASE}${cur.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-2.5 transition-all hover:opacity-80"
                    style={{
                      background: cur.accent,
                      color: "#000",
                      borderRadius: "2px",
                    }}
                  >
                    <Instagram size={12} />
                    Watch Reel
                  </a>
                </div>
              </div>
            </div>

            {/* Prev / Next tap zones */}
            <button
              onClick={back}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-40 flex items-center justify-start pl-3 opacity-0 hover:opacity-100 transition-opacity group"
              aria-label="Previous reel"
            >
              <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-white/50 transition-colors">
                <ChevronLeft size={16} className="text-white" />
              </div>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-40 flex items-center justify-end pr-3 opacity-0 hover:opacity-100 transition-opacity group"
              aria-label="Next reel"
            >
              <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-white/50 transition-colors">
                <ChevronRight size={16} className="text-white" />
              </div>
            </button>

            {/* Pause/Play tap on center */}
            <button
              onClick={() => setPaused((p) => !p)}
              className="absolute inset-0 z-35 cursor-pointer"
              style={{ zIndex: 35, background: "transparent" }}
              aria-label={paused ? "Play" : "Pause"}
            />
          </div>

          {/* ── Sidebar thumbnails ── */}
          <div className="flex lg:flex-col gap-3 lg:w-44">
            {reels.map((r, i) => {
              const isActive = i === active;
              return (
                <button
                  key={r.id}
                  onClick={() => goTo(i, i > active ? "right" : "left")}
                  className="relative overflow-hidden flex-1 lg:flex-none transition-all duration-300 group"
                  style={{
                    height: "100%",
                    minHeight: "120px",
                    maxHeight: "176px",
                    borderRadius: "2px",
                    outline: isActive ? `2px solid ${r.accent}` : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? "scale(1)" : "scale(0.97)",
                    transition: "all 0.35s ease",
                  }}
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    style={{ filter: isActive ? "brightness(0.5)" : "brightness(0.4)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                    }}
                  />
                  {/* Active progress ring */}
                  {isActive && (
                    <div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{
                        background: r.accent,
                        animation: "pulseDot 1.2s ease-in-out infinite",
                      }}
                    />
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span
                      className="text-[9px] font-black tracking-widest block"
                      style={{ color: isActive ? r.accent : "rgba(255,255,255,0.5)" }}
                    >
                      {r.subtitle}
                    </span>
                    <span className="text-white text-xs font-black uppercase leading-tight">
                      {r.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div
          className="mt-4 flex items-center justify-between px-6 py-4 border border-white/[0.07]"
          style={{ background: "#0d0d0d" }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary"
            >
              {paused ? (
                <>
                  <Play size={13} className="fill-current" /> Resume
                </>
              ) : (
                <>
                  <Pause size={13} /> Pause
                </>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: cur.accent,
                  animation: paused ? "none" : "pulseDot 1.2s ease-in-out infinite",
                }}
              />
              <span className="text-white/40 text-xs tracking-wider uppercase">
                {active + 1} / {reels.length} · Auto Loop
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={back} className="p-2 border border-white/10 hover:border-white/30 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} className="p-2 border border-white/10 hover:border-white/30 transition-colors">
              <ChevronRight size={14} />
            </button>
            <a
              href="https://www.instagram.com/theloopwear_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-black tracking-widest uppercase border border-white/10 px-5 py-2 hover:border-primary hover:text-primary transition-all"
            >
              <Instagram size={12} />
              View All
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
