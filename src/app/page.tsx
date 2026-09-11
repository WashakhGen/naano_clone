import { Nav } from "@/components/marketing/nav";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { StatsBar } from "@/components/marketing/stats-bar";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <div className="relative">
        {/* Soft sky-blue gradient, approximating naano's clouds photo — sits
            behind the nav too, so the bar reads as translucent over it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-gradient-to-b from-sky via-sky-soft to-background"
        />
        <Nav />
        <Hero />
      </div>
      <main className="flex-1">
        <LogoCloud />
        <HowItWorks />
        <StatsBar />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
