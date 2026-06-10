import { Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="bg-deep-forest py-20 text-center relative overflow-hidden">
      {/* Decorative background subtle elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-champagne-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-champagne-gold/5 rounded-full blur-2xl" />

      <div className="max-w-4xl mx-auto px-4 md:px-10 flex flex-col items-center">
        {/* Large golden quote marks */}
        <Quote className="w-12 h-12 text-champagne-gold stroke-[1.5px] fill-champagne-gold/10 mb-6 animate-pulse" />
        
        <blockquote className="font-serif text-2xl md:text-3xl text-linen-cream italic leading-relaxed tracking-wide mb-6">
          "The food presentation was amazing. Top Chef quality!"
        </blockquote>
        
        <cite className="font-sans text-xs font-bold text-champagne-gold uppercase tracking-[0.2em] not-italic">
          — Cherihane Khoury
        </cite>
      </div>
    </section>
  );
}
