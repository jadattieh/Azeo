import { useState, useEffect } from "react";
import { Sparkles, Users, Check, Phone, ArrowRight, Clipboard, Plus, MessageSquare, AlertCircle } from "lucide-react";
import { CustomCateringMenu } from "../types";

interface MenuPlannerProps {
  onSaveMenu: (menu: CustomCateringMenu, eventType: string, guestCount: number, budgetProfile: string, customVibe: string) => void;
  onGoToInquire: (prefill: { eventType: string; guestCount: number; budgetProfile: 'Classic' | 'Premium' | 'Ultra-Luxury'; customVibe: string; dietary: string[]; menuJson: CustomCateringMenu }) => void;
  preSelectedType?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuPlanner({ onSaveMenu, onGoToInquire, preSelectedType, isOpen, onClose }: MenuPlannerProps) {
  const [eventType, setEventType] = useState(preSelectedType || "Wedding Banquet");
  const [guestCount, setGuestCount] = useState<number>(50);
  const [dietary, setDietary] = useState<string[]>([]);
  const [budgetProfile, setBudgetProfile] = useState<'Classic' | 'Premium' | 'Ultra-Luxury'>("Premium");
  const [customVibe, setCustomVibe] = useState("");
  const [successCopy, setSuccessCopy] = useState(false);

  // Sync eventType with preselection
  useEffect(() => {
    if (preSelectedType) {
      setEventType(preSelectedType);
    }
  }, [preSelectedType]);

  const dietaryOptions = [
    "Vegan",
    "Gluten-Free",
    "Nut-Free",
    "Traditional Lebanese Only",
    "100% Organic Sourcing",
    "Vegetarian"
  ];

  // Signature signature recipes to add instantly
  const popularDishes = [
    "Hummus Bil Snoubar",
    "Azeo Mixed Charcoal Grill",
    "Kibbeh Nayyeh Premium",
    "Cheese Kunafa with Orange Blossom",
    "Sayadieh Sea Bass Platter",
    "Vine Leaves (Warak Enab)"
  ];

  const handleDietaryToggle = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const addDishToVibe = (dish: string) => {
    if (!customVibe.includes(dish)) {
      setCustomVibe((prev) => {
        const separator = prev.trim() === "" ? "" : ", ";
        return `${prev}${separator}${dish}`;
      });
    }
  };

  // Compose clean text for WhatsApp transmission
  const composeWhatsAppMessage = () => {
    const formattedDietary = dietary.length > 0 ? dietary.join(", ") : "None";
    const guestTierPrice = budgetProfile === 'Classic' ? '$55/guest' : budgetProfile === 'Premium' ? '$85/guest' : '$125/guest';
    const estimatedTotal = (budgetProfile === 'Classic' ? 55 : budgetProfile === 'Premium' ? 85 : 125) * guestCount;

    return `Marhaba Azeo Catering ✨

I would like to place a custom catering inquiry and order:

📌 **Event Type**: ${eventType}
👥 **Estimated Guests**: ${guestCount} Guests
💎 **Culinary Tier**: ${budgetProfile} (${guestTierPrice})
🥗 **Dietary Guidelines**: ${formattedDietary}
🍽️ **Custom Dishes & Aesthetic Vibe**: 
"${customVibe || "Chef's selection of classic Lebanese masterworks"}"

*Estimated Order Total:* $${estimatedTotal}

Please confirm availability and provide a customized proposal. Thank you!`;
  };

  const handleSendWhatsApp = () => {
    const message = composeWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/96181124455?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    // Also trigger save so they can view it contextually in their portal
    handleSaveLocal();
  };

  const handleSaveLocal = () => {
    // Scaffold a compliant CustomCateringMenu object to preserve application state perfectly to localStorage
    const mockupMenu: CustomCateringMenu = {
      introduction: `A bespoke composition drafted individually for your custom ${eventType}. Styled exclusively around a luxurious palette, featuring handpicked Lebanese elements.`,
      themeColorPalette: ["Cedar Forest Green", "Pomegranate Ruby", "Imperial Gold"],
      appetizers: [
        {
          name: "Organic Azeo Mezze Selection",
          arabicName: "Mazat Azeo Al-Sharkiah",
          description: `Customized with selections such as hummus, mutabbal, and fresh local ingredients matching dietary guidelines: ${dietary.length > 0 ? dietary.join(", ") : "Classic"}.`,
          suitability: "Handcrafted to coordinate with event dietary parameters."
        }
      ],
      mains: [
        {
          name: "Gourmet Majestic Main Platter",
          arabicName: "Al-Tabkh Al-Malaki",
          description: `Includes specific customizations: "${customVibe || "Chef's premium mix selection"}". Served at optimal temperatures with warm Lebanese flatbreads.`
        }
      ],
      desserts: [
        {
          name: "Artisanal Dessert Assortment",
          arabicName: "Halawiyat Azeo Al-Fakhira",
          description: "Freshly baked pastries infused with locally distilled mountain rosewater and seasonal Lebanese fruits."
        }
      ],
      beverages: {
        signatureMocktail: {
          name: "Byblos Breeze",
          description: "Freshly squeezed pomegranate extract, local wild sage infusion, soda splash.",
          garnish: "Dehydrated orange crisp & sprig of mountain mint."
        },
        signatureCocktail: {
          name: "Chateau Azeo Gold",
          description: "Fine triple-distilled Araq infused with local botanicals and elderflower syrup.",
          garnish: "Twist of organic lemon rind."
        },
        pairingNote: "We recommend premium white or red Lebanese house selection pairing."
      },
      estimatedPricePerGuest: budgetProfile === 'Classic' ? 55 : budgetProfile === 'Premium' ? 85 : 125
    };

    onSaveMenu(mockupMenu, eventType, guestCount, budgetProfile, customVibe);
  };

  const handleCopyToClipboard = () => {
    const text = composeWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setSuccessCopy(true);
    setTimeout(() => setSuccessCopy(false), 2000);
  };

  if (!isOpen) return null;

  const estimatedTotal = (budgetProfile === 'Classic' ? 55 : budgetProfile === 'Premium' ? 85 : 125) * guestCount;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-linen-cream rounded-3xl border border-champagne-gold/30 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col scale-100 transition-all">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-champagne-gold/20 flex justify-between items-center bg-cream-dark/30">
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-champagne-gold" />
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-primary">
              Bespoke WhatsApp Order Board
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-primary/60 hover:text-primary hover:bg-cream-dark/50 px-4 py-2 rounded-full transition-all text-xs font-bold uppercase tracking-wider"
          >
            Close Board [X]
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-cream-light/40 border border-champagne-gold/15 p-5 rounded-2xl space-y-4">
              <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider block">
                1. Select Celebration Guidelines
              </span>

              {/* Event Type */}
              <div>
                <label className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider block mb-1.5">
                  Event Category
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-white border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs sm:text-sm text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all cursor-pointer"
                >
                  <option>Wedding Banquet</option>
                  <option>Family Gathering</option>
                  <option>Holiday dinner Celebration</option>
                  <option>Private Chef Dining</option>
                  <option>Corporate Gala Reception</option>
                </select>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider">
                    Guest Count
                  </label>
                  <span className="text-xs sm:text-sm font-bold text-primary flex items-center gap-1.5 bg-white border border-champagne-gold/15 px-3 py-1 rounded-full">
                    <Users className="w-3.5 h-3.5 text-secondary" /> {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-champagne-gold bg-cream-dark h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Dietary Selection */}
            <div className="bg-cream-light/40 border border-champagne-gold/15 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider block">
                2. Dietary Considerations
              </span>
              <div className="grid grid-cols-2 gap-2">
                {dietaryOptions.map((item, idx) => {
                  const isActive = dietary.includes(item);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleDietaryToggle(item)}
                      className={`text-left p-2.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? "bg-primary border-transparent text-white" 
                          : "bg-white border-champagne-gold/15 text-primary/80 hover:bg-cream-dark/30"
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-champagne-gold" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Culinary Quality Tier */}
            <div className="bg-cream-light/40 border border-champagne-gold/15 p-5 rounded-2xl space-y-3">
              <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider block">
                3. Culinary Grade Style
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Classic', 'Premium', 'Ultra-Luxury'] as const).map((tier) => {
                  const match = budgetProfile === tier;
                  const price = tier === 'Classic' ? '$55' : tier === 'Premium' ? '$85' : '$125';
                  return (
                    <button
                      key={tier}
                      onClick={() => setBudgetProfile(tier)}
                      className={`p-3 rounded-xl border flex flex-col items-center transition-all cursor-pointer ${
                        match 
                          ? "bg-primary border-transparent text-white ring-1 ring-champagne-gold" 
                          : "bg-white border-champagne-gold/15 text-primary/85 hover:bg-cream-dark/30"
                      }`}
                    >
                      <span className="text-xs font-bold">{tier}</span>
                      <span className="text-[10px] text-champagne-gold mt-1 font-semibold">{price} / Guest</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aesthetic Wishes + Fast Adders */}
            <div className="space-y-3">
              <label className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider block">
                4. Custom Dishes & Celebration Wishes
              </label>
              <textarea
                placeholder="E.g., Please incorporate authentic wood-fired Shish Taouk and clean gluten-free hummus platters with premium cold-pressed olive oil..."
                value={customVibe}
                onChange={(e) => setCustomVibe(e.target.value)}
                className="w-full h-24 bg-white border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-1 focus:ring-champagne-gold resize-none"
              />

              {/* Fast Add buttons */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-sans text-secondary/70 font-semibold uppercase tracking-widest block">
                  Quick Add Famous Chef Creations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularDishes.map((dish, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addDishToVibe(dish)}
                      className="bg-cream-dark/40 hover:bg-champagne-gold/25 border border-champagne-gold/10 hover:border-champagne-gold/30 text-[10px] font-medium text-primary py-1 px-2.5 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5 text-secondary" /> {dish}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Order Summary Preview Card - Right Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-primary text-linen-cream rounded-2xl border border-champagne-gold/30 p-6 md:p-8 space-y-6 relative shadow-xl overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Subtle background graphics */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-champagne-gold/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-5">
                {/* Badge layout */}
                <div className="flex justify-between items-center border-b border-champagne-gold/25 pb-4">
                  <div>
                    <h4 className="font-serif text-lg tracking-wide text-champagne-gold font-semibold uppercase">
                      AZEO CATERING
                    </h4>
                    <p className="text-[9px] tracking-widest uppercase text-linen-cream/60">
                      Gourmet Request Draft
                    </p>
                  </div>
                  <div className="bg-champagne-gold/20 border border-champagne-gold/40 text-champagne-gold px-3 py-1 rounded-full text-[9px] font-sans uppercase font-bold tracking-widest">
                    Hotline: +961 81124455
                  </div>
                </div>

                {/* Body details preview */}
                <div className="space-y-4 text-left font-sans text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block">Event Category</span>
                      <span className="font-semibold text-white text-sm">{eventType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block">Target Size</span>
                      <span className="font-semibold text-white text-sm">{guestCount} Guests</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block">Gastronomic Style</span>
                      <span className="font-semibold text-champagne-gold text-sm">{budgetProfile} Tier</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block">Dietary Alignments</span>
                      <span className="font-semibold text-white truncate block">
                        {dietary.length > 0 ? dietary.join(", ") : "Classic Sourcing"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-champagne-gold/10">
                    <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block mb-1">
                      Custom Selections & Plating Wish
                    </span>
                    <p className="text-linen-cream/80 italic line-clamp-3 leading-relaxed text-xs">
                      "{customVibe || "Chef's selection of masterpiece appetizers, slow-braised main delicacies, and traditional dessert variations."}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimate calculation block */}
              <div className="pt-6 border-t border-champagne-gold/20 flex flex-col md:flex-row justify-between items-baseline gap-2">
                <div>
                  <span className="text-[9px] text-linen-cream/50 uppercase tracking-wider block">Estimated Quote Projection</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-serif text-champagne-gold font-bold">
                      ${budgetProfile === 'Classic' ? 55 : budgetProfile === 'Premium' ? 85 : 125}
                    </span>
                    <span className="text-[10px] text-linen-cream/60 font-sans uppercase">/ guest</span>
                  </div>
                  <span className="text-[10px] text-linen-cream/40 block mt-0.5">Approx. event total: ${estimatedTotal}</span>
                </div>
                
                <div className="text-[9px] text-champagne-gold/80 italic font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 text-champagne-gold" /> Draft locks live prices
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Buttons Group */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSendWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-widest font-bold py-4.5 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-5 h-5 text-emerald-100 fill-emerald-100" />
                <span>Send Order on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="bg-white hover:bg-cream-dark border border-champagne-gold/25 text-primary text-[10px] font-sans font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Clipboard className="w-4 h-4 text-secondary" />
                  <span>{successCopy ? "Copied!" : "Copy Text Draft"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleSaveLocal();
                    onGoToInquire({
                      eventType,
                      guestCount,
                      budgetProfile,
                      customVibe,
                      dietary,
                      menuJson: {
                        introduction: `Bespoke tailored menu composition request.`,
                        themeColorPalette: ["Cedar Forest Green", "Royal White"],
                        appetizers: [{ name: "Customized Hot & Cold Mezze Basket", arabicName: "Mezze", description: "Fresh premium selection of local organic elements." }],
                        mains: [{ name: "Premium Culinary Selection", arabicName: "Mashawi Wa Main", description: customVibe || "Sizzling cedar charcoal grilled array." }],
                        desserts: [{ name: "Sweet Traditional Specialties", arabicName: "Halawiyat", description: "Traditional mountain sweets." }],
                        beverages: {
                          signatureMocktail: { name: "Refreshing Mint Infusion", description: "Spring water sparkler.", garnish: "Mint sprig" },
                          signatureCocktail: { name: "Artisanal Shrub Sparkler", description: "Fruit vinegars.", garnish: "Lemon zest" },
                          pairingNote: "Matched with optimal Lebanese wines."
                        },
                        estimatedPricePerGuest: budgetProfile === 'Classic' ? 55 : budgetProfile === 'Premium' ? 85 : 125
                      }
                    });
                  }}
                  className="bg-primary hover:bg-champagne-gold hover:text-primary text-white text-[10px] font-sans font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Book Formal Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
