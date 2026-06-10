import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Phone } from "lucide-react";

interface HeroProps {
  onOpenPlanner: () => void;
}

const HERO_IMAGES = [
  "./src/assets/images/salad_avocado_platter_1781084024321.png",
  "/src/assets/images/charcuterie_terrine_1781084040127.png",
  "/src/assets/images/buffet_chafing_dishes_1781084058296.png"
];

export default function Hero({ onOpenPlanner }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number>(HERO_IMAGES.length - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 1300); // Transitions exact every 1.3 seconds continuously
    return () => clearInterval(timer);
  }, [currentIdx]);

  return (
    <section className="relative h-[780px] flex items-end overflow-hidden">
      {/* Background Plating Image Slideshow with smooth fade transitions */}
      <div className="absolute inset-0 z-0 bg-primary">
        {HERO_IMAGES.map((src, index) => {
          const isActive = index === currentIdx;
          const isPrev = index === prevIdx;
          return (
            <img 
              key={src}
              className={`absolute inset-0 w-full h-full object-cover brightness-[0.78] blur-[1px] transition-all duration-[500ms] ease-out ${
                isActive 
                  ? "opacity-100 scale-100 z-10" 
                  : isPrev 
                    ? "opacity-0 scale-103 z-0 pointer-events-none" 
                    : "opacity-0 scale-103 z-0 pointer-events-none"
              }`} 
              alt="Splendid Azeo Catering Festive Creations"
              referrerPolicy="no-referrer"
              src={src}
            />
          );
        })}
        {/* Subtle, beautiful color grading vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="max-w-2xl text-left fade-in">
          {/* Accent Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-champagne-gold/25 border border-champagne-gold/40 rounded-full mb-6 text-white text-[11px] font-sans tracking-[0.25em] font-semibold uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
            Michelin-Star Lebanese Catering
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-semibold leading-[1.1] tracking-tight mb-6">
            Exquisite Catering for Life's Most Memorable Moments
          </h2>
          
          <p className="font-sans text-base sm:text-lg text-linen-cream/85 leading-relaxed mb-8 max-w-xl">
            Top Chef quality, fresh organic ingredients, and stunning presentation delivered meticulously to your event anywhere in Lebanon. Since 2012.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenPlanner}
              className="group flex items-center justify-center gap-3 bg-champagne-gold text-primary font-sans text-xs uppercase tracking-widest font-bold px-8 py-5 rounded-full hover:bg-white transition-all duration-300 shadow-xl active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              ORDER CUSTOM MENU
            </button>
            
            <a 
              href="#menu-explorer"
              className="flex items-center justify-center gap-2 border border-white hover:border-champagne-gold hover:text-champagne-gold text-white font-sans text-xs uppercase tracking-widest font-bold px-8 py-5 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg active:scale-98"
            >
              EXPLORE OUR MENUS
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
