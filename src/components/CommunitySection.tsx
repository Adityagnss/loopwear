const CommunitySection = () => (
  <section id="community" className="py-24 px-6">
    <div className="container mx-auto text-center">
      <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">Global Movement</p>
      <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Join the Community</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
        Be part of a movement that's redefining streetwear culture. Connect with like-minded individuals who share the same vision.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://www.instagram.com/theloopwear_/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          Follow @theloopwear_
        </a>
        <a
          href="https://wa.me/919676082195?text=Hi%20I%20want%20to%20join%20The%20Loopwear%20community"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-muted-foreground/30 text-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase hover:bg-secondary transition-colors"
        >
          Join via WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default CommunitySection;
