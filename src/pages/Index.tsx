import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import CollectionSection from "@/components/CollectionSection";
import LookbookSection from "@/components/LookbookSection";
import CommunitySection from "@/components/CommunitySection";
import ReelsCarousel from "@/components/ReelsCarousel";
import NewsletterSection from "@/components/NewsletterSection";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <PhilosophySection />
    <CollectionSection />
    <LookbookSection />
    <CommunitySection />
    <ReelsCarousel />
    <NewsletterSection />
    <ComingSoonBanner />
    <Footer />
  </div>
);

export default Index;
