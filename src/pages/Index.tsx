import Hero from "@/components/Hero";
import LoveCalculator from "@/components/LoveCalculator";
import ProposeCard from "@/components/ProposeCard";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <FloatingHearts />
      <Hero />
      <LoveCalculator />
      <ProposeCard />
      <Footer />
    </main>
  );
};

export default Index;
