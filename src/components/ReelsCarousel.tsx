import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Instagram, ExternalLink, Play } from "lucide-react";

// Swiper core CSS (must import)
import "swiper/css";
import "swiper/css/navigation";

import streetEssential from "@/assets/collection/street-essential.jpg";
import urbanClassic from "@/assets/collection/urban-classic.jpg";
import minimalDrop from "@/assets/collection/minimal-drop.jpg";
import premiumEdit from "@/assets/collection/premium-edit.jpg";

/* ─── Reel data ─────────────────────────────────────────────────────────── */
const REELS = [
  {
    id: "DWTOfwyiKlk",
    image: premiumEdit,
    title: "Premium Edit",
    tag: "EXCLUSIVE",
    accent: "#E8572A",
    url: "https://www.instagram.com/reel/DWTOfwyiKlk/",
  },
  {
    id: "DThLisYAFNs",
    image: streetEssential,
    title: "Street Vibes",
    tag: "EDITORIAL",
    accent: "#A259FF",
    url: "https://www.instagram.com/reel/DThLisYAFNs/",
  },
  {
    id: "DREYZJFE3t8",
    image: minimalDrop,
    title: "Urban Flow",
    tag: "STREET",
    accent: "#5B8CFF",
    url: "https://www.instagram.com/reel/DREYZJFE3t8/",
  },
  {
    id: "DQn514dErHx",
    image: urbanClassic,
    title: "Drop Day",
    tag: "LOOKBOOK",
    accent: "#22C55E",
    url: "https://www.instagram.com/reel/DQn514dErHx/",
  },
  {
    id: "DR1ToD9k-Fa",
    image: streetEssential,
    title: "Street Essential",
    tag: "NEW DROP",
    accent: "#F59E0B",
    url: "https://www.instagram.com/reel/DR1ToD9k-Fa/",
  },
];

/* ─── Instagram embed URL (append ?autoplay=1 for attempt) ──────────────── */
const embedUrl = (id: string) =>
  `https://www.instagram.com/reel/${id}/embed/?autoplay=1`;

/* ─── Single reel slide ─────────────────────────────────────────────────── */
const ReelSlide = ({
  reel,
  isActive,
}: {
  reel: (typeof REELS)[0];
  isActive: boolean;
}) => {
  // Every time this slide becomes active, bump the key to force-remount the
  // iframe — Instagram then re-initialises and fires autoplay.
  const [iframeKey, setIframeKey] = useState(0);
  const prevActive = useRef(false);

  useEffect(() => {
    if (isActive && !prevActive.current) {
      setIframeKey((k) => k + 1);
    }
    prevActive.current = isActive;
  }, [isActive]);

  return (
    <div
      className="relative select-none"
      style={{
        /* Phone-frame proportions */
        width: "100%",
        aspectRatio: "9/16",
        maxWidth: "340px",
        margin: "0 auto",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease",
        transform: isActive ? "scale(1)" : "scale(0.88)",
        opacity: isActive ? 1 : 0.55,
      }}
    >
      {/* ── Phone chrome ── */}
      <div
        className="w-full h-full overflow-hidden relative"
        style={{
          borderRadius: "28px",
          border: isActive
            ? `2.5px solid ${reel.accent}`
            : "2.5px solid rgba(255,255,255,0.08)",
          boxShadow: isActive
            ? `0 0 0 1px ${reel.accent}44, 0 32px 80px rgba(0,0,0,0.85)`
            : "0 16px 40px rgba(0,0,0,0.6)",
          background: "#0a0a0a",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          style={{
            width: "90px",
            height: "22px",
            background: "#0a0a0a",
            borderRadius: "0 0 16px 16px",
          }}
        >
          <div
            className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "#1a1a1a" }}
          />
        </div>

        {isActive ? (
          /* ── ACTIVE: real Instagram embed iframe ── */
          <iframe
            key={iframeKey}
            src={embedUrl(reel.id)}
            className="w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
            title={`Reel: ${reel.title}`}
            style={{ display: "block" }}
          />
        ) : (
          /* ── INACTIVE: styled collection thumbnail ── */
          <>
            <img
              src={reel.image}
              alt={reel.title}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.45) saturate(0.9)" }}
            />
            {/* Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)",
              }}
            />
            {/* Color tint */}
            <div
              className="absolute inset-0"
              style={{ background: `${reel.accent}15` }}
            />
            {/* IG account top bar */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black"
                  style={{ background: reel.accent, color: "#000" }}
                >
                  TL
                </div>
                <span className="text-white text-[10px] font-bold">theloopwear_</span>
              </div>
              <span
                className="text-[8px] font-black tracking-widest px-2 py-0.5"
                style={{ background: reel.accent, color: "#000", borderRadius: "2px" }}
              >
                {reel.tag}
              </span>
            </div>
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
              >
                <Play size={20} className="fill-white text-white ml-1" />
              </div>
            </div>
            {/* Bottom title */}
            <div className="absolute bottom-6 left-4 right-4 z-10">
              <p className="text-white font-black uppercase text-base leading-tight tracking-tight">
                {reel.title}
              </p>
              <p className="text-white/50 text-[10px] mt-1 tracking-wider">@theloopwear_</p>
            </div>
            {/* Home indicator */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: "72px", height: "4px", background: "rgba(255,255,255,0.2)" }}
            />
          </>
        )}

        {/* Active glow rim */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[26px]"
            style={{
              boxShadow: `inset 0 0 0 1px ${reel.accent}40`,
            }}
          />
        )}
      </div>

      {/* Accent label below the phone */}
      <div
        className="absolute -bottom-8 left-0 right-0 flex justify-center transition-opacity duration-300"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase hover:opacity-75 transition-opacity"
          style={{ color: reel.accent }}
        >
          <Instagram size={10} />
          Open on Instagram
          <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
};

/* ─── Main carousel section ─────────────────────────────────────────────── */
const ReelsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Resolve real index accounting for Swiper's loop clones
  const realIndex = (idx: number) => ((idx % REELS.length) + REELS.length) % REELS.length;

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(realIndex(swiper.realIndex));
  }, []);

  return (
    <section className="py-24 bg-card overflow-hidden" id="reels">
      <style>{`
        /* Hide Swiper's built-in nav arrows (we use custom ones) */
        .tlw-reels .swiper-button-next,
        .tlw-reels .swiper-button-prev { display: none; }

        /* Smooth slide scale via CSS transition above */
        .tlw-reels .swiper-slide {
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1),
                      opacity  0.45s ease;
        }

        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.6); }
        }
      `}</style>

      <div className="container mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">
              Behind The Scenes
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
              Watch Our<br />
              <span className="text-primary italic">Reels</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed md:text-right">
              Experience the vibe. Swipe through our latest drops and street style content.
            </p>
            <a
              href="https://www.instagram.com/theloopwear_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white/50 hover:text-primary transition-colors group"
            >
              <Instagram size={13} />
              @theloopwear_
              <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── Swiper carousel ── */}
        <div className="relative tlw-reels">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1.35}
            centeredSlides
            loop
            speed={600}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640:  { slidesPerView: 1.6 },
              768:  { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.8 },
              1280: { slidesPerView: 3.2 },
            }}
            onSwiper={(s) => { swiperRef.current = s; }}
            onSlideChange={handleSlideChange}
            onRealIndexChange={handleSlideChange}
            className="pb-14"
          >
            {REELS.map((reel, i) => (
              <SwiperSlide key={reel.id}>
                <ReelSlide reel={reel} isActive={i === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Custom prev/next arrows ── */}
          <button
            ref={prevBtnRef}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 -translate-x-1"
            aria-label="Previous reel"
            style={{
              width: "44px",
              height: "44px",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = REELS[activeIndex].accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <ChevronLeft size={18} className="text-white" />
          </button>

          <button
            ref={nextBtnRef}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 translate-x-1"
            aria-label="Next reel"
            style={{
              width: "44px",
              height: "44px",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = REELS[activeIndex].accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {REELS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to reel ${i + 1}`}
              style={{
                width: i === activeIndex ? "32px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background: i === activeIndex ? r.accent : "rgba(255,255,255,0.2)",
                transition: "all 0.35s ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="mt-10 flex items-center justify-between px-6 py-4 border border-white/[0.07]"
          style={{ background: "#0d0d0d" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: REELS[activeIndex].accent,
                animation: "pulseDot 1.4s ease-in-out infinite",
              }}
            />
            <span className="text-white/40 text-xs tracking-wider uppercase">
              Auto Loop · {activeIndex + 1} / {REELS.length}
            </span>
          </div>
          <a
            href="https://www.instagram.com/theloopwear_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-black tracking-widest uppercase border border-white/10 px-5 py-2.5 hover:border-primary hover:text-primary transition-all duration-200"
          >
            <Instagram size={12} />
            View All On Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReelsCarousel;
