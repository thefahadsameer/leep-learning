import Hero from "../components/Hero/Hero";
import Logos from "../components/Logos/Logos";
import Features from "../components/Features/Features";
import WhyWorks from "../components/Features/WhyWorks";
import GrowthChart from "../components/Chart/GrowthChart";
import Turnkey from "../components/Turnkey/Turnkey";
import FinalCTA from "../components/CTA/FinalCTA";

function Home() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <WhyWorks />
      <GrowthChart />
      <Turnkey />
      <FinalCTA />
    </>
  );
}

export default Home;
