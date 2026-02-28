import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Heart } from "lucide-react";

const ProposeCard = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const dodgeNo = useCallback(() => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const maxX = bounds.width - 120;
    const maxY = bounds.height - 50;
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setDodgeCount((c) => c + 1);
  }, []);

  const handleConfirm = () => {
    setShowConfirm(false);
    setAccepted(true);
  };

  if (accepted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">💖</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              She said YES!
            </h2>
            <p className="text-foreground text-lg mb-4">
              This is the beginning of something beautiful, Radhika.
            </p>
            <p className="text-muted-foreground">
              Shubham will cherish this moment forever. 🌹
            </p>
            {/* Celebration hearts */}
            <div className="relative mt-6 h-20 overflow-visible" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute animate-confetti-fall"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: 0,
                    fontSize: `${16 + Math.random() * 16}px`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${1 + Math.random() * 1}s`,
                    animationIterationCount: "infinite",
                  }}
                >
                  {["💖", "💕", "🌹", "✨", "❤️"][Math.floor(Math.random() * 5)]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <Card
        className={`w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <CardContent className="p-8 text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4 animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Radhika — will you be mine?
          </h2>
          <p className="text-muted-foreground mb-8">
            I made this just for you. If you say yes, I'll know instantly. 💖
          </p>

          <div ref={containerRef} className="relative h-32 flex items-center justify-center gap-6">
            <Button
              onClick={() => setShowConfirm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 z-10"
            >
              Yes 💕
            </Button>

            <Button
              variant="outline"
              onMouseEnter={dodgeNo}
              onClick={dodgeNo}
              className="border-primary/40 text-foreground hover:bg-muted text-lg px-10 py-6 transition-all duration-300 z-10"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
            >
              No
            </Button>
          </div>

          {dodgeCount >= 5 && (
            <p className="text-muted-foreground text-sm mt-4 animate-fade-in">
              Nice try 😏 That button is hard to catch, isn't it?
            </p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-card border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground text-xl">
              Are you sure? 💖
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-base">
              I promise to cherish you always. This will notify Shubham that
              you said yes!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-primary/30 text-foreground">
              Wait…
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Yes, I'm sure! 🌹
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ProposeCard;
