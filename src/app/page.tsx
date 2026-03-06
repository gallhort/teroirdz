import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BatchBanner from "@/components/home/BatchBanner";
import HowItWorks from "@/components/home/HowItWorks";
import CategoryGrid from "@/components/home/CategoryGrid";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BatchBanner />
        <CategoryGrid />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
