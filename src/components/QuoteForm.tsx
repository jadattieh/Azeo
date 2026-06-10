import { useState, useEffect, FormEvent } from "react";
import { Mail, Phone, Users, Calendar, Clock, Sparkles, Check, ArrowRight, Download, Eye, FileText, CheckCircle } from "lucide-react";
import { QuoteRequest, CustomCateringMenu } from "../types";

interface QuoteFormProps {
  onAddReservation: (req: QuoteRequest) => void;
  preFilledDetails?: {
    eventType: string;
    guestCount: number;
    budgetProfile: 'Classic' | 'Premium' | 'Ultra-Luxury';
    customVibe: string;
    dietary: string[];
    menuJson: CustomCateringMenu;
  } | null;
}

export default function QuoteForm({ onAddReservation, preFilledDetails }: QuoteFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState<number>(50);
  const [eventType, setEventType] = useState("Wedding Banquet");
  const [budgetProfile, setBudgetProfile] = useState<'Classic' | 'Premium' | 'Ultra-Luxury'>("Premium");
  const [customVibe, setCustomVibe] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [hasCustomMenuAttached, setHasCustomMenuAttached] = useState(false);
  const [customMenu, setCustomMenu] = useState<CustomCateringMenu | null>(null);

  const [formSuccess, setFormSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [downloadModal, setDownloadModal] = useState(false);

  // Prefill if passed from the AI Planner
  useEffect(() => {
    if (preFilledDetails) {
      setEventType(preFilledDetails.eventType);
      setGuestCount(preFilledDetails.guestCount);
      setBudgetProfile(preFilledDetails.budgetProfile);
      setCustomVibe(preFilledDetails.customVibe);
      setDietary(preFilledDetails.dietary);
      setCustomMenu(preFilledDetails.menuJson);
      setHasCustomMenuAttached(true);

      // Scroll to the form section smoothly
      const section = document.getElementById("inquire");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preFilledDetails]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !eventDate) {
      return;
    }

    const uniqueId = "AZEO-" + Math.floor(1000 + Math.random() * 9000);
    const newRequest: QuoteRequest = {
      id: uniqueId,
      fullName,
      email,
      phone,
      eventDate,
      guestCount,
      eventType,
      budgetProfile,
      dietaryRestrictions: dietary,
      customVibe,
      generatedMenu: customMenu || undefined,
      status: 'Submitted',
      createdAt: new Date().toLocaleDateString()
    };

    onAddReservation(newRequest);
    setSubmittedId(uniqueId);
    setFormSuccess(true);

    // Reset inputs
    setFullName("");
    setEmail("");
    setPhone("");
    setEventDate("");
    setCustomVibe("");
    setHasCustomMenuAttached(false);
    setCustomMenu(null);
  };

  return (
    <section id="inquire" className="py-24 max-w-7xl mx-auto px-4 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Callouts description */}
        <div className="lg:col-span-5 text-left space-y-6 lg:pr-6">
          <span className="font-sans text-xs font-semibold text-champagne-gold tracking-[0.25em] uppercase mb-1 block">
            Reservation Inquiry
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-primary font-semibold tracking-tight">
            Ready to elevate your next event?
          </h3>
          <p className="font-sans text-sm text-slate-charcoal/80 leading-relaxed">
            Whether hosting an opulent seaside wedding in Batroun, an intimate family gathering in Achrafieh, or a corporate winter gala, Azeo Catering delivers Michelin-star standards.
          </p>

          <p className="font-sans text-sm text-slate-charcoal/80 leading-relaxed">
            Fill out our inquiry sheet to receive a structured quote presentation. You can also print your tailored AI menu card immediately.
          </p>

          <div className="space-y-4 pt-4 border-t border-champagne-gold/15">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 bg-primary/5 rounded-full flex items-center justify-center border border-champagne-gold/20">
                <Check className="w-3.5 h-3.5 text-secondary" />
              </span>
              <span className="text-xs font-semibold font-sans text-primary">Beirut Headquarters & Pan-Lebanon Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 bg-primary/5 rounded-full flex items-center justify-center border border-champagne-gold/20">
                <Check className="w-3.5 h-3.5 text-secondary" />
              </span>
              <span className="text-xs font-semibold font-sans text-primary">Farm-to-Table Fresh Organic Bekaa Produce</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 bg-primary/5 rounded-full flex items-center justify-center border border-champagne-gold/20">
                <Check className="w-3.5 h-3.5 text-secondary" />
              </span>
              <span className="text-xs font-semibold font-sans text-primary">Dedicated Hospitality Directors & Mixologists</span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => setDownloadModal(true)}
              className="flex items-center gap-2.5 text-secondary border border-champagne-gold/50 font-sans text-xs uppercase tracking-widest font-bold py-5 px-10 rounded-xl hover:bg-cream-dark transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-secondary" />
              Download Brochure
            </button>
          </div>
        </div>

        {/* Dynamic Booking form card */}
        <div className="lg:col-span-7 bg-white border border-champagne-gold/25 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden">
          {formSuccess ? (
            <div className="text-center p-8 flex flex-col items-center justify-center space-y-6 fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-semibold text-primary">Inquiry Registered</h4>
                <p className="font-sans text-xs text-primary/60 max-w-sm mx-auto">
                  Your Azeo Catering quote reservation has been logged successfully in our system under reference number:
                </p>
                <div className="bg-linen-cream/80 border border-champagne-gold/25 font-mono text-sm tracking-widest text-primary py-2.5 px-6 rounded-full font-bold inline-block my-2">
                  {submittedId}
                </div>
              </div>
              <p className="font-sans text-xs italic text-secondary font-semibold">
                An Azeo host coordinator will contact you shortly on your Lebanese phone line.
              </p>
              <button
                onClick={() => setFormSuccess(false)}
                className="bg-primary hover:bg-champagne-gold text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-full shadow-md transition-all cursor-pointer"
              >
                Inquire for Another Celebration
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {hasCustomMenuAttached && customMenu && (
                <div className="bg-linen-cream/80 border border-champagne-gold/30 rounded-2xl p-4 flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-sans font-bold text-secondary uppercase block">Custom AI Menu Attached</span>
                    <span className="text-xs font-bold text-primary italic leading-none">{eventType} - {guestCount} Guests</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHasCustomMenuAttached(false);
                      setCustomMenu(null);
                    }}
                    className="text-[10px] text-red-500 hover:text-red-700 font-bold tracking-wide uppercase cursor-pointer"
                  >
                    Detach Menu
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name */}
                <div>
                  <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Elie Rizk"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-cream-light/30 border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                  />
                </div>

                {/* Event date */}
                <div>
                  <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Celebration Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-cream-light/30 border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email address */}
                <div>
                  <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., contact@domain.lb"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream-light/30 border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                  />
                </div>

                {/* Phone contact */}
                <div>
                  <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Lebanese Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., +961 03 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-cream-light/30 border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                  />
                </div>
              </div>

              {!hasCustomMenuAttached && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-champagne-gold/10 pt-4">
                  {/* Category select */}
                  <div>
                    <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Event Category</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-white border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                    >
                      <option>Wedding Banquet</option>
                      <option>Family Gathering</option>
                      <option>Holiday dinner Celebration</option>
                      <option>Private Chef Dining</option>
                      <option>Corporate Gala Reception</option>
                    </select>
                  </div>

                  {/* Pricing tier */}
                  <div>
                    <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Culinary Class</label>
                    <select
                      value={budgetProfile}
                      onChange={(e) => setBudgetProfile(e.target.value as any)}
                      className="w-full bg-white border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
                    >
                      <option value="Classic">Classic Elegance ($55/guest)</option>
                      <option value="Premium">Premium Culinary ($85/guest)</option>
                      <option value="Ultra-Luxury">Ultra-Luxury Gastronomy ($125/guest)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Remarks area */}
              {!hasCustomMenuAttached && (
                <div>
                  <label className="text-xs text-primary/70 font-semibold uppercase tracking-wider block mb-2">Banquet Special Instructions / Vibe</label>
                  <textarea
                    placeholder="Specify any dietary boundaries (vegan, gluten-free) or structural requests..."
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    className="w-full h-24 bg-cream-light/30 border border-champagne-gold/25 rounded-xl px-4 py-3 text-xs text-primary placeholder:text-primary/30 focus:outline-none focus:ring-1 focus:ring-champagne-gold resize-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-champagne-gold text-white font-sans text-xs uppercase tracking-widest font-bold py-5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Get a Quote
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Brochure Downloader overlay screen */}
      {downloadModal && (
        <div
          className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex justify-center items-center p-4"
          onClick={() => setDownloadModal(false)}
        >
          <div
            className="max-w-lg w-full bg-linen-cream rounded-3xl border border-champagne-gold/30 p-6 md:p-8 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider block mb-1">Standard Collateral Portfolio</span>
            <h4 className="font-serif text-2xl font-bold text-primary mb-4 leading-tight">Azeo Catering Brochure Booklet</h4>
            
            <div className="w-12 h-[1px] bg-champagne-gold mb-6" />

            <div className="space-y-4 text-xs text-slate-charcoal/80 font-sans mb-8">
              <p>Our complete wedding planning portfolios, corporate dining lists, and pricing sheets are bound into this fine digital catalog.</p>
              <div className="bg-cream-light/60 border border-champagne-gold/15 rounded-2xl p-4 text-left font-sans italic space-y-2">
                <p className="font-serif font-bold text-primary not-italic">What's Inside:</p>
                <p>• Authentic Lebanese mezza menus and cocktail blends formulas</p>
                <p>• Coastal seafood, mountain slow lamb, and wedding banqueting templates</p>
                <p>• Detailed staffing costs, tablescaping styles, and delivery Logistics</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  alert("Brochure successfully dispatched! Your PDF file 'azeo_catering_brochure_2026.pdf' is being download on your browser.");
                  setDownloadModal(false);
                }}
                className="flex-1 bg-primary hover:bg-champagne-gold text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl shadow cursor-pointer text-center"
              >
                Start File Download
              </button>
              <button
                onClick={() => setDownloadModal(false)}
                className="px-6 border border-champagne-gold/30 hover:bg-cream-dark text-primary font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl cursor-pointer"
              >
                Close Open Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
