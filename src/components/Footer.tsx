import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-black text-xl uppercase mb-4">The Loopwear</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Engineered Minimalism. Premium streetwear built for the culture.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
          <div className="space-y-2">
            {["Collection", "Lookbook", "Philosophy", "Community"].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                className="block text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Connect</h4>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/theloopwear_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/919676082195" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-10 pt-6 text-center">
        <p className="text-muted-foreground text-xs tracking-wider">
          © 2026 THE LOOPWEAR. ALL RIGHTS RESERVED. @Adityagnss
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
