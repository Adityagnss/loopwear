import { useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/919676082195?text=Hi%20I%20want%20to%20order%20from%20The%20Loopwear";

const navItems = ["Collection", "Lookbook", "Philosophy", "Community"];

const Header = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <img src={logo} alt="The Loopwear" className="h-10 w-10 invert" />

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/theloopwear_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Order Now
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
            >
              {item}
            </button>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold tracking-wider uppercase"
          >
            Order Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
