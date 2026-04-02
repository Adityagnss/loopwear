const values = [
  { num: "01", title: "Raw Authenticity", desc: "Unfiltered expression. No compromises. Every piece tells a story of genuine street culture." },
  { num: "02", title: "Technical Excellence", desc: "Premium materials meet precision engineering. Built to endure the streets." },
  { num: "03", title: "Minimal Aesthetic", desc: "Less noise, more impact. Clean lines that speak volumes in contemporary fashion." },
  { num: "04", title: "Community First", desc: "Built by the culture, for the culture. Every drop is shaped by our community." },
];

const PhilosophySection = () => (
  <section id="philosophy" className="py-24 px-6">
    <div className="container mx-auto">
      <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">The Manifesto</p>
      <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">Our Philosophy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v) => (
          <div key={v.num} className="border border-border p-8 hover:border-primary/50 transition-colors group">
            <span className="text-primary text-sm font-bold">{v.num}</span>
            <h3 className="text-xl font-black uppercase mt-3 mb-4 group-hover:text-primary transition-colors">{v.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PhilosophySection;
