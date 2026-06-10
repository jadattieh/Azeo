import { useState } from "react";
import { Menu, X, Calendar, ChefHat, Heart, Phone, MenuSquare, Star } from "lucide-react";
import AzeoLogo from "./AzeoLogo";

interface HeaderProps {
  onOpenPlanner: () => void;
  onOpenDashboard: () => void;
  hasReservations: boolean;
}

export default function Header({ onOpenPlanner, onOpenDashboard, hasReservations }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { label: "Order on WhatsApp", onClick: onOpenPlanner, highlight: true },
    { label: "Services", href: "#services" },
    { label: "Our Menu", href: "#menu-explorer" },
    { label: "Customer Reviews", href: "#reviews" },
    { label: "Artisan Gallery", href: "#gallery" },
    { label: "Inquire", href: "#inquire" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-linen-cream/95 backdrop-blur-md border-b border-champagne-gold/20 shadow-sm flex justify-between items-center px-4 md:px-10 h-20">
        <div className="flex items-center gap-4">
          <button 
            id="mobile-menu-btn"
            onClick={() => setIsDrawerOpen(true)}
            className="text-primary hover:text-champagne-gold transition-colors duration-300 p-2 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <a href="#" className="flex items-center group transition-colors duration-300" id="navbar-brand-logo">
            <AzeoLogo className="h-11 md:h-14 w-auto scale-100 transition-transform duration-300 group-hover:scale-102" light={false} />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            item.onClick ? (
              <button
                key={i}
                onClick={item.onClick}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                  item.highlight 
                    ? "bg-primary text-white hover:bg-champagne-gold border border-transparent px-4 py-2 rounded-full" 
                    : "text-primary hover:text-champagne-gold"
                }`}
              >
                {item.label}
              </button>
            ) : (
              <a
                key={i}
                href={item.href}
                className="text-xs uppercase tracking-widest font-semibold text-primary hover:text-champagne-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Profile & Reservations Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="relative flex items-center justify-center p-2.5 rounded-full bg-cream-dark/40 hover:bg-cream-dark transition-all duration-300 border border-champagne-gold/10"
            title="My Bookings & Menus"
          >
            <Calendar className="w-5 h-5 text-primary" />
            {hasReservations && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-champagne-gold rounded-full ring-2 ring-linen-cream animate-pulse" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Overlay and Menu Panel) */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div 
          className={`h-full w-80 bg-linen-cream flex flex-col p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-champagne-gold/20">
            <div>
              <span className="font-serif text-2xl text-primary font-bold">AZEO</span>
              <p className="text-[9px] tracking-widest font-sans text-secondary font-medium uppercase mt-1">Catering Artistry</p>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-primary hover:text-champagne-gold hover:bg-cream-dark rounded-full transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenPlanner();
              }}
              className="flex items-center gap-4 p-4 bg-primary text-white hover:bg-champagne-gold rounded-xl transition-all duration-300 font-semibold text-xs uppercase tracking-wider"
            >
              <Phone className="w-5 h-5 text-champagne-gold" /> Order on WhatsApp
            </button>

            <button 
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenDashboard();
              }}
              className="flex items-center gap-4 p-4 text-left text-primary bg-cream-dark/50 hover:bg-cream-dark transition-all duration-300 rounded-xl font-semibold text-xs uppercase tracking-wider"
            >
              <Calendar className="w-5 h-5 text-secondary" /> My Menu Portal
            </button>

            <div className="h-px bg-champagne-gold/20 my-4" />

            <a 
              href="#services" 
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-4 p-4 text-primary hover:bg-cream-dark/30 transition-all duration-300 rounded-xl font-medium"
            >
              <Heart className="w-5 h-5 text-champagne-gold" /> Tailored Services
            </a>

            <a 
              href="#menu-explorer" 
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-4 p-4 text-primary hover:bg-cream-dark/30 transition-all duration-300 rounded-xl font-medium"
            >
              <MenuSquare className="w-5 h-5 text-primary" /> Gourmet Catalog
            </a>

            <a 
              href="#reviews" 
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-4 p-4 text-primary hover:bg-cream-dark/30 transition-all duration-300 rounded-xl font-medium"
            >
              <Star className="w-5 h-5 text-champagne-gold fill-champagne-gold/20" /> Customer Reviews
            </a>

            <a 
              href="#inquire" 
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-4 p-4 text-primary hover:bg-cream-dark/30 transition-all duration-300 rounded-xl font-medium"
            >
              <Phone className="w-5 h-5 text-primary" /> Inquire & Contact
            </a>
          </nav>

          <div className="mt-auto border-t border-champagne-gold/20 pt-4 text-center">
            <span className="text-[10px] text-primary/40 uppercase tracking-widest block mb-2">Beirut | Lebanon</span>
            <span className="text-[10px] text-secondary font-medium">Since 2012</span>
          </div>
        </div>
      </div>
    </>
  );
}
