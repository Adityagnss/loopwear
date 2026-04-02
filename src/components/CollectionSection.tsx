import streetEssential from "@/assets/collection/street-essential.jpg";
import urbanClassic from "@/assets/collection/urban-classic.jpg";
import minimalDrop from "@/assets/collection/minimal-drop.jpg";
import premiumEdit from "@/assets/collection/premium-edit.jpg";

const WHATSAPP_LINK = "https://wa.me/919676082195?text=Hi%20I%20want%20to%20order%20from%20The%20Loopwear";

const instagramPosts = [
  { image: streetEssential, title: "Street Essential" },
  { image: urbanClassic, title: "Urban Classic" },
  { image: minimalDrop, title: "Minimal Drop" },
  { image: premiumEdit, title: "Premium Edit" },
];

const CollectionSection = () => (
  <section id="collection" className="py-24 px-6">
    <div className="container mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">@theloopwear_</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase">Our Collection</h2>
        </div>
        <a
          href="https://www.instagram.com/theloopwear_/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm tracking-wider"
        >
          Follow Us
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {instagramPosts.map((post) => (
          <div key={post.title} className="group relative bg-card overflow-hidden rounded-sm">
            <div className="aspect-square overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider">{post.title}</span>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-primary text-primary-foreground px-4 py-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Order
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionSection;
