import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="container mx-auto text-center max-w-2xl">
        <p className="text-sm tracking-[0.4em] uppercase text-primary font-semibold mb-4">Stay Connected</p>
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Enter the Loop</h2>
        <p className="text-muted-foreground mb-10">
          Get exclusive access to drops, behind-the-scenes content, and community updates.
        </p>
        {subscribed ? (
          <p className="text-primary font-bold text-lg uppercase tracking-wider">You're in the loop! 🔥</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
