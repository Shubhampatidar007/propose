import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const onScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Stars layer — slowest parallax */}
      <div
        className="absolute inset-0 stars-bg"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        aria-hidden="true"
      />

      {/* Gradient vignette layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, transparent 30%, hsl(222 47% 6% / 0.8) 100%)`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
        aria-hidden="true"
      />

      {/* Bokeh circles — mid-speed parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { top: "20%", left: "10%", size: 200, dur: 12, speed: 0.25 },
          { top: "60%", left: "75%", size: 150, dur: 15, speed: 0.3 },
          { top: "40%", left: "50%", size: 100, dur: 10, speed: 0.2 },
          { top: "80%", left: "25%", size: 120, dur: 18, speed: 0.35 },
          { top: "15%", left: "65%", size: 80, dur: 14, speed: 0.15 },
          { top: "70%", left: "40%", size: 160, dur: 16, speed: 0.28 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bokeh-drift"
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle, hsl(346 100% 65% / 0.15), transparent 70%)`,
              animationDuration: `${b.dur}s`,
              transform: `translateY(${scrollY * b.speed}px)`,
            }}
          />
        ))}
      </div>

      {/* Content — fastest parallax (moves up as you scroll) */}
      <div
        className={`relative z-20 text-center px-6 transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
        style={{ transform: visible ? `translateY(${scrollY * -0.15}px)` : undefined }}
      >
        <p className="text-secondary text-lg md:text-xl font-light mb-4 tracking-widest uppercase">
          A message for you
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
          Radhika, will you
          <br />
          <span className="text-primary animate-pulse-glow inline-block mt-2">
            accept my heart?
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
          Scroll down to discover something special I made just for you… 💖
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-scroll-bounce">
        <ChevronDown className="w-8 h-8 text-primary opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
