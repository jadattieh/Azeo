import { useState } from "react";
import { Check, Plus, Minus, Search, Sparkles, ShoppingBag, MessageSquare } from "lucide-react";
import { STANDARD_MENU_CATALOG } from "../data";
import { StandardMenuItem } from "../types";

export default function MenuExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItems, setSelectedItems] = useState<StandardMenuItem[]>([]);

  const categories = ['All', 'Sélection Festive', 'Entrées', 'Salade', 'Plats Principaux', 'Bouchées', 'Desserts'] as const;

  const handleWhatsAppInquiry = () => {
    if (selectedItems.length === 0) return;
    
    const dishesList = selectedItems.map((item, idx) => `${idx + 1}. ${item.name} (${item.arabicName})`).join("\n");
    const selectionProfile = selectedItems.length > 6 
      ? "Grand Royal Feast" 
      : selectedItems.length > 3 
        ? "Standard Mezze Banquet" 
        : "Intimate Platter Service";

    const message = `Marhaba Azeo Catering ✨

I built a custom catering selection on your website and would like a quote for these dishes:

📋 **Dishes List:**
${dishesList}

✨ **Banquet Style Profile:** ${selectionProfile}
👥 **Guest Count Estimate:** Please guide us!

Please get back to us with custom catering options and dates availability. Mashkoureen!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/96181124455?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredItems = STANDARD_MENU_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleSelectItem = (item: StandardMenuItem) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((d) => d.id !== item.id)
        : [...prev, item]
    );
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <section id="menu-explorer" className="py-24 bg-surface-container-low border-y border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Intro */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-sans text-xs font-semibold text-champagne-gold tracking-[0.25em] uppercase mb-3 block">
            Azeo Classics
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-primary font-semibold tracking-tight">
            Explore Our Culinary Catalog
          </h3>
          <p className="font-sans text-sm text-slate-charcoal/80 max-w-xl mt-3 leading-relaxed">
            Authentic, generations-old recipes prepared with modern plating techniques. Select your favorites below to estimate your bespoke feast list.
          </p>
          <div className="w-16 h-[1px] bg-champagne-gold mt-4" />
        </div>

        {/* Toolbar selectors */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary border-transparent text-white"
                    : "bg-white border-champagne-gold/15 text-primary/80 hover:bg-cream-dark/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 order-1 md:order-2">
            <Search className="w-4 h-4 text-primary/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Mezze, Grills, Desserts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-champagne-gold/25 rounded-full pl-10 pr-4 py-2.5 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-champagne-gold transition-all"
            />
          </div>
        </div>

        {/* Interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Catalog grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = selectedItems.some((sel) => sel.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleSelectItem(item)}
                    className={`group bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer select-none relative ${
                      isSelected 
                        ? "border-champagne-gold bg-linen-cream/30 ring-1 ring-champagne-gold/50" 
                        : "border-champagne-gold/15 hover:border-champagne-gold/40"
                    }`}
                  >
                    {item.isPopular && (
                      <span className="absolute top-4 right-4 bg-champagne-gold/15 border border-champagne-gold/30 text-secondary text-[9px] font-sans font-bold uppercase py-0.5 px-2 rounded-full tracking-wider">
                        Popular
                      </span>
                    )}

                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-start gap-2 pr-16">
                        <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                        {item.price && (
                          <span className="text-[11px] font-mono text-champagne-gold font-bold bg-primary/20 px-2 py-0.5 rounded-full border border-champagne-gold/25 self-start shrink-0">
                            {item.price}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-baseline pr-12 pb-0.5">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-primary group-hover:text-champagne-gold transition-colors">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-serif text-xs text-secondary/70 italic block pb-1">
                        {item.arabicName}
                      </span>
                      <p className="font-sans text-xs text-slate-charcoal/80 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-champagne-gold/10 pt-4 mt-4 flex justify-between items-center">
                      <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest font-sans">
                        Baladi Ingredients
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelectItem(item);
                        }}
                        className={`p-1.5 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                          isSelected 
                            ? "bg-primary text-white" 
                            : "bg-linen-cream text-primary border border-champagne-gold/20 hover:bg-cream-dark"
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-champagne-gold/25 flex flex-col items-center justify-center p-6 space-y-2">
                <Search className="w-8 h-8 text-primary/30" />
                <h5 className="font-serif text-sm font-semibold text-primary/80">No dishes match your queries</h5>
                <p className="font-sans text-xs text-primary/40">Try looking for general terms or select a different category.</p>
              </div>
            )}
          </div>

          {/* Interactive banquet estimator sidebar */}
          <div className="lg:col-span-4 bg-white border border-champagne-gold/25 rounded-2xl p-6 shadow-sm sticky top-24 text-left">
            <div className="flex justify-between items-center border-b border-champagne-gold/15 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-champagne-gold" />
                <h4 className="font-serif text-lg font-semibold text-primary">Custom Selection</h4>
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleClearSelection}
                  className="text-[10px] text-red-500 font-bold uppercase tracking-wider hover:text-red-700 transition-all cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedItems.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-charcoal/70 leading-relaxed font-sans">
                  You are building a custom banquet list. This selection will be attached to your inquiry if you proceed!
                </p>

                <div className="divide-y divide-champagne-gold/10 max-h-60 overflow-y-auto pr-1">
                  {selectedItems.map((sel) => (
                    <div key={sel.id} className="py-2.5 flex justify-between items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-xs text-primary block truncate">{sel.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] text-secondary/70 italic font-serif">{sel.arabicName}</span>
                          {sel.price && <span className="text-[9px] font-mono text-champagne-gold font-bold">({sel.price})</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleSelectItem(sel)}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold tracking-wide cursor-pointer p-1 rounded-full hover:bg-red-50 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-linen-cream/60 border border-champagne-gold/15 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-sans font-bold text-primary/50 uppercase">Total Dishes Selected</span>
                    <span className="text-sm font-bold text-primary">{selectedItems.length} Dishes</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-champagne-gold/10">
                    <span className="text-[10px] font-sans font-bold text-primary/50 uppercase">Banquet Profile</span>
                    <span className="text-xs font-semibold text-secondary">
                      {selectedItems.length > 6 ? "Grand Royal Feast" : selectedItems.length > 3 ? "Standard Mezze Banquet" : "Intimate Platter Service"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md text-center active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white flex-shrink-0" />
                  <span>Send Selection via WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col justify-center items-center space-y-3 p-4">
                <Sparkles className="w-8 h-8 text-champagne-gold/40 fill-champagne-gold/5" />
                <div className="space-y-1">
                  <h5 className="font-serif text-sm font-semibold text-primary/80">Tailor Your Banquet</h5>
                  <p className="font-sans text-xs text-primary/50 max-w-xs leading-relaxed mx-auto">
                    Click the [+] icon on any dish card to compile your custom culinary feast card and evaluate size profiles in real-time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
