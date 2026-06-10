import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import GalleryPreview from "./components/GalleryPreview";
import MenuPlanner from "./components/MenuPlanner";
import MenuExplorer from "./components/MenuExplorer";
import QuoteForm from "./components/QuoteForm";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";
import ClientDashboard from "./components/ClientDashboard";
import AzeoLogo from "./components/AzeoLogo";
import { CustomCateringMenu, QuoteRequest } from "./types";
import { Sparkles, Calendar, Check, X } from "lucide-react";

interface SavedMenuCollection {
  id: string;
  eventType: string;
  guestCount: number;
  budgetProfile: string;
  customVibe: string;
  menu: CustomCateringMenu;
  savedAt: string;
}

export default function App() {
  // Luxury curtain/portal gate preloader state hooks
  const [isPreloading, setIsPreloading] = useState(true);
  const [logoPhase, setLogoPhase] = useState("entering"); // entering -> fading -> gone

  useEffect(() => {
    // 1. Core gate lifecycle triggers
    const timer1 = setTimeout(() => {
      setLogoPhase("fading");
    }, 1800);

    const timer2 = setTimeout(() => {
      setLogoPhase("gone");
    }, 2250);

    const timer3 = setTimeout(() => {
      setIsPreloading(false);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Lock body scroll during preloader active phase
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreloading]);

  // Navigation & overlay modals triggers
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [plannerPreselect, setPlannerPreselect] = useState<string>("");

  // Booking prefills coming out of AI Planner
  const [preFilledDetails, setPreFilledDetails] = useState<{
    eventType: string;
    guestCount: number;
    budgetProfile: 'Classic' | 'Premium' | 'Ultra-Luxury';
    customVibe: string;
    dietary: string[];
    menuJson: CustomCateringMenu;
  } | null>(null);

  // Core local states syncing with localStorage persistence index
  const [savedMenus, setSavedMenus] = useState<SavedMenuCollection[]>([]);
  const [reservations, setReservations] = useState<QuoteRequest[]>([]);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Initialize and synchronise with local storage
  useEffect(() => {
    try {
      const cachedMenus = localStorage.getItem("azeo_saved_menus");
      const cachedRequests = localStorage.getItem("azeo_reservations");
      if (cachedMenus) setSavedMenus(JSON.parse(cachedMenus));
      if (cachedRequests) setReservations(JSON.parse(cachedRequests));
    } catch (e) {
      console.error("Local storage sync error:", e);
    }
  }, []);

  // Show automatic temporary visual notification bubbles
  const triggerNotification = (text: string, type: 'success' | 'info' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // State modifiers
  const handleSaveMenu = (
    menu: CustomCateringMenu,
    eventType: string,
    guestCount: number,
    budgetProfile: string,
    customVibe: string
  ) => {
    const freshEntry: SavedMenuCollection = {
      id: "M-" + Math.floor(1000 + Math.random() * 9000),
      eventType,
      guestCount,
      budgetProfile,
      customVibe,
      menu,
      savedAt: new Date().toLocaleDateString()
    };
    const updated = [freshEntry, ...savedMenus];
    setSavedMenus(updated);
    localStorage.setItem("azeo_saved_menus", JSON.stringify(updated));
    triggerNotification(`AI Chef Menu saved successfully to your portal! Check 'My Catalog'!`, 'success');
  };

  const handleDeleteMenu = (id: string) => {
    const updated = savedMenus.filter((m) => m.id !== id);
    setSavedMenus(updated);
    localStorage.setItem("azeo_saved_menus", JSON.stringify(updated));
    triggerNotification(`Custom menu discarded.`, 'info');
  };

  const handleAddReservation = (req: QuoteRequest) => {
    const updated = [req, ...reservations];
    setReservations(updated);
    localStorage.setItem("azeo_reservations", JSON.stringify(updated));
    triggerNotification(`Inquiry ${req.id} submitted! High quality Lebanese chefs are processing. Check 'Portal'`, 'success');
  };

  const handleDeleteReservation = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem("azeo_reservations", JSON.stringify(updated));
    triggerNotification(`Quote request ${id} cancelled.`, 'info');
  };

  // Cohesive layout bridges
  const handlePlanForService = (serviceName: string) => {
    // Translate clicked service card title to fit selector categories
    let translated = "Wedding Banquet";
    if (serviceName.includes("Family")) translated = "Family Gathering";
    if (serviceName.includes("Festive") || serviceName.includes("Holiday")) translated = "Holiday dinner Celebration";

    setPlannerPreselect(translated);
    setIsPlannerOpen(true);
  };

  const handleGoToInquire = (details: {
    eventType: string;
    guestCount: number;
    budgetProfile: 'Classic' | 'Premium' | 'Ultra-Luxury';
    customVibe: string;
    dietary: string[];
    menuJson: CustomCateringMenu;
  }) => {
    setPreFilledDetails(details);
    setIsPlannerOpen(false);
    triggerNotification("AI Menu attached structure! Completing inquiry details...", 'info');
  };

  const handleViewMenuInPlanner = (
    menu: CustomCateringMenu,
    eventType: string,
    guestCount: number,
    budgetProfile: string,
    customVibe: string
  ) => {
    setIsDashboardOpen(false);
    setPlannerPreselect(eventType);
    setPreFilledDetails({
      eventType,
      guestCount,
      budgetProfile: budgetProfile as any,
      customVibe,
      dietary: [],
      menuJson: menu
    });
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-linen-cream flex flex-col font-sans antialiased text-primary relative">
      {/* Azeo Luxury Portal Preloader (Splits Left/Right like a sliding door) */}
      {isPreloading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none select-none">
          {/* Left panel gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 2.2, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full bg-[#050906] border-r border-champagne-gold/20 flex justify-end items-center pointer-events-auto"
          />
          
          {/* Right panel gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 2.2, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full bg-[#050906] border-l border-champagne-gold/20 flex justify-start items-center pointer-events-auto"
          />

          {/* Golden Center Emblem */}
          {logoPhase !== "gone" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={logoPhase === "entering" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="fixed inset-0 flex flex-col items-center justify-center z-[10000]"
            >
              <div className="flex flex-col items-center justify-center px-6 text-center max-w-xl">
                <AzeoLogo className="h-24 md:h-32 w-auto max-w-full drop-shadow-2xl animate-pulse" light={true} />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Dynamic top banner notifications */}
      {notification && (
        <div className={`fixed top-24 right-4 md:right-10 z-[120] max-w-sm rounded-2xl p-4 shadow-xl border flex items-center justify-between gap-3 animate-bounce ${
          notification.type === 'success' 
            ? "bg-primary border-champagne-gold text-white" 
            : "bg-white border-champagne-gold/25 text-primary"
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-gold fill-champagne-gold" />
            <span className="text-xs font-semibold font-sans">{notification.text}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-white/10 rounded-full transition-all text-secondary"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Appbar */}
      <Header
        onOpenPlanner={() => {
          setPlannerPreselect("");
          setIsPlannerOpen(true);
        }}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        hasReservations={reservations.length > 0}
      />

      {/* Hero Page Block */}
      <main className="flex-1 mt-20">
        <Hero 
          onOpenPlanner={() => {
            setPlannerPreselect("");
            setIsPlannerOpen(true);
          }} 
        />
        
        {/* Services Listings (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Services onPlanForService={handlePlanForService} />
        </motion.div>
        
        {/* Testimonial Panel block (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Testimonial />
        </motion.div>
        
        {/* Interactive Custom Menu catalog explorer (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MenuExplorer />
        </motion.div>
        
        {/* High Resolution Lightbox Gallery (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <GalleryPreview />
        </motion.div>

        {/* Persistent Guest Reviews & Testimonials Section (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReviewsSection />
        </motion.div>
        
        {/* Quote Inquiries Multi-Step form (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <QuoteForm 
            onAddReservation={handleAddReservation}
            preFilledDetails={preFilledDetails}
          />
        </motion.div>
      </main>

      {/* Standard App Footer */}
      <Footer />

      {/* AI Custom Menu Planner modal window */}
      <MenuPlanner
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        preSelectedType={plannerPreselect}
        onSaveMenu={handleSaveMenu}
        onGoToInquire={handleGoToInquire}
      />

      {/* Client reservations and menus dashboard portal overlay */}
      <ClientDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        savedMenus={savedMenus}
        reservations={reservations}
        onDeleteMenu={handleDeleteMenu}
        onDeleteReservation={handleDeleteReservation}
        onViewMenuInPlanner={handleViewMenuInPlanner}
      />
    </div>
  );
}
