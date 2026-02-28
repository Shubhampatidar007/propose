import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

function calculateLove(name: string): number {
  const n = name.trim().toLowerCase();
  if (n === "shubham") return 101;
  return 0;
}

const LoveCalculator = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [displayNum, setDisplayNum] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (result === null) return;
    setDisplayNum(0);
    setShowConfetti(false);
    const target = result;
    const steps = 40;
    const stepTime = 30;
    let current = 0;
    const interval = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(interval);
        if (target > 100) setShowConfetti(true);
      }
      setDisplayNum(Math.round(current));
    }, stepTime);
    return () => clearInterval(interval);
  }, [result]);

  const handleCalculate = () => {
    if (!name.trim()) return;
    setResult(calculateLove(name));
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      <Card
        className={`w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <CardContent className="p-8 text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4 animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Calculate the Love
          </h2>
          <p className="text-muted-foreground mb-8">
            See how much love is between Radhika & someone special…
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-muted/50 rounded-lg p-3 text-foreground font-medium">
              💕 Radhika
            </div>
            <p className="text-primary text-lg">&</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
              placeholder="Type a name…"
              className="bg-muted/50 border-primary/30 text-foreground placeholder:text-muted-foreground text-center text-lg"
            />
            <Button
              onClick={handleCalculate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
            >
              Calculate 💘
            </Button>
          </div>

          {result !== null && (
            <div className="relative">
              <div
                className={`text-6xl md:text-7xl font-bold transition-colors duration-300 ${
                  result > 100 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {displayNum}%
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {result > 100
                  ? "A love beyond 100%! It was always meant to be. 💖"
                  : "Hmm… maybe try a different name? 😉"}
              </p>

              {/* Confetti hearts */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute animate-confetti-fall"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${-10 + Math.random() * 30}%`,
                        fontSize: `${14 + Math.random() * 14}px`,
                        animationDelay: `${Math.random() * 0.6}s`,
                        animationDuration: `${0.8 + Math.random() * 0.6}s`,
                      }}
                    >
                      {["💖", "💕", "❤️", "🌹", "✨"][Math.floor(Math.random() * 5)]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default LoveCalculator;
