import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_LINK = "https://wa.me/919676082195?text=Hi%20I%20want%20to%20order%20from%20The%20Loopwear";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium streetwear" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Side text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase writing-mode-vertical"
           style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          EST. 2024 — PREMIUM STREETWEAR
        </p>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
        <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-6">
          Premium Streetwear
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.9] mb-4">
          Engineered
        </h1>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.9] text-primary italic mb-8">
          Minimalism
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
          Where street culture meets premium craftsmanship. Redefining the boundaries of contemporary fashion.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase flex items-center gap-3 hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            Order Collection →
          </a>
          <button
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-muted-foreground/30 text-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase hover:bg-secondary transition-colors"
          >
            Explore Collection
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-0.5 h-8 bg-primary rounded-full animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
