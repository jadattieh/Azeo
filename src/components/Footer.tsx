import { ChefHat, ArrowUp } from "lucide-react";
import AzeoLogo from "./AzeoLogo";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-deep-forest border-t border-champagne-gold/30 text-linen-cream pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-champagne-gold/15 items-start">
          {/* Brand Column (Logo & Description) */}
          <div className="lg:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <AzeoLogo className="h-14 w-auto drop-shadow-md" light={true} />
            </div>
            <p className="font-sans text-xs text-linen-cream/70 leading-relaxed max-w-sm mx-auto md:mx-0">
              Bringing culinary precision, Michelin-star presentation, and organic Lebanese heritage to celebrations everywhere in Lebanon. Since 2012.
            </p>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 text-center md:text-left space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-champagne-gold">Navigation</h4>
            <div className="flex flex-col gap-3 justify-center md:justify-start">
              <a href="#services" className="text-xs uppercase tracking-widest font-semibold text-linen-cream/80 hover:text-champagne-gold transition-colors duration-300">
                Services
              </a>
              <a href="#menu-explorer" className="text-xs uppercase tracking-widest font-semibold text-linen-cream/80 hover:text-champagne-gold transition-colors duration-300">
                Menu Explorer
              </a>
              <a href="#heritage" className="text-xs uppercase tracking-widest font-semibold text-linen-cream/80 hover:text-champagne-gold transition-colors duration-300">
                Our Journey
              </a>
              <a href="#gallery" className="text-xs uppercase tracking-widest font-semibold text-linen-cream/80 hover:text-champagne-gold transition-colors duration-300">
                Gallery
              </a>
              <a href="#inquire" className="text-xs uppercase tracking-widest font-semibold text-linen-cream/80 hover:text-champagne-gold transition-colors duration-300">
                Bookings
              </a>
            </div>
          </div>

          {/* Contact & Map combined column (on the right) */}
          <div className="lg:col-span-8 bg-black/25 border border-champagne-gold/15 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-stretch justify-between w-full">
            {/* Contact details */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-champagne-gold mb-3 text-center md:text-left">Inquiries & Bookings</h4>
                <div className="space-y-4 font-sans text-xs text-linen-cream/80 text-center md:text-left">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-champagne-gold/70 font-semibold mb-1">Mobile Line</span>
                    <a href="tel:+96181124455" className="hover:text-champagne-gold transition-colors text-base font-bold font-mono tracking-wide underline decoration-champagne-gold/20 mr-2">81 124455</a>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-champagne-gold/70 font-semibold mb-1">Catering Shop</span>
                    <a href="tel:+96109921020" className="hover:text-champagne-gold transition-colors text-base font-bold font-mono tracking-wide underline decoration-champagne-gold/20">09 921020</a>
                  </div>
                </div>
              </div>

              <div className="border-t border-champagne-gold/10 pt-3 text-center md:text-left">
                <span className="block text-[9px] uppercase tracking-wider text-champagne-gold/70 font-semibold mb-1">Offices & HQ</span>
                <p className="text-xs font-serif italic text-linen-cream/60 leading-relaxed">
                  Sairafi Building, Ghazir, Mount-Lebanon, Lebanon
                </p>
              </div>
            </div>

            {/* Google map iframe as a clean landscape rectangle next to the info */}
            <div className="w-full md:w-[480px] lg:w-[500px] xl:w-[560px] h-56 shrink-0 rounded-xl overflow-hidden border border-champagne-gold/25 hover:border-champagne-gold/50 shadow-xl relative group transition-colors duration-300">
              <iframe
                title="Azeo Catering Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.8145229156717!2d35.66050517585097!3d34.0101037731737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f3fc4cbd8b1cd%3A0xe5aefecb214f48a4!2sSairafi%20Building%2C%20Ghazir!5e0!3m2!1sen!2slb!4v1714527926839!5m2!1sen!2slb"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-1.5 right-1.5 bg-[#090e0b]/90 border border-champagne-gold/35 px-2 py-1 rounded text-[9px] font-sans font-bold text-champagne-gold uppercase tracking-wider opacity-90 hover:opacity-100 transition-opacity duration-200">
                <a 
                  href="https://maps.google.com/?q=Sairafi+Building,+Ghazir,+Lebanon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Map ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand terms footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-center">
          <div className="text-[10px] text-linen-cream/40 font-medium uppercase tracking-wider">
            © 2026 Azeo Catering. Crafted with Lebanese Excellence. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-[10px] text-linen-cream/40 tracking-wider">
            <a href="#inquire" className="hover:text-champagne-gold transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#inquire" className="hover:text-champagne-gold transition-colors">Terms of Hospitality</a>
            <span>•</span>
            <button
              onClick={handleScrollTop}
              className="text-champagne-gold hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center gap-1 text-[10px] cursor-pointer"
            >
              Back To Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
