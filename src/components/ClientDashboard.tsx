import { CustomCateringMenu, QuoteRequest } from "../types";
import { X, Calendar, ChefHat, Trash2, Printer, MapPin, Sparkles, CheckSquare, ChevronRight, FileText } from "lucide-react";

interface SavedMenuCollection {
  id: string;
  eventType: string;
  guestCount: number;
  budgetProfile: string;
  customVibe: string;
  menu: CustomCateringMenu;
  savedAt: string;
}

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  savedMenus: SavedMenuCollection[];
  reservations: QuoteRequest[];
  onDeleteMenu: (id: string) => void;
  onDeleteReservation: (id: string) => void;
  onViewMenuInPlanner: (menu: CustomCateringMenu, eventType: string, guestCount: number, budgetProfile: string, customVibe: string) => void;
}

export default function ClientDashboard({
  isOpen,
  onClose,
  savedMenus,
  reservations,
  onDeleteMenu,
  onDeleteReservation,
  onViewMenuInPlanner
}: ClientDashboardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-linen-cream rounded-3xl border border-champagne-gold/30 shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col scale-100 transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-champagne-gold/20 flex justify-between items-center bg-cream-dark/30">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-secondary" />
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-primary">
              My Azeo Catering Portal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-primary/60 hover:text-primary hover:bg-cream-dark/50 p-2 rounded-full transition-all text-sm font-semibold"
          >
            Close Portal [X]
          </button>
        </div>

        {/* Dashboard grid panel */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left">
          {/* Active quote inquiries */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-champagne-gold" /> Active Quote Requests
              </h4>
              <span className="bg-primary text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {reservations.length} Pending
              </span>
            </div>

            {reservations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((res) => (
                  <div key={res.id} className="bg-white rounded-2xl border border-champagne-gold/15 p-5 relative shadow-sm hover:border-champagne-gold/40 transition-all flex flex-col justify-between">
                    <button
                      onClick={() => onDeleteReservation(res.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                      title="Cancel Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary bg-linen-cream border border-champagne-gold/20 px-2.5 py-0.5 rounded-full">
                          {res.id}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {res.status}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-serif text-base font-bold text-primary leading-none">{res.eventType}</h5>
                        <p className="text-[11px] font-sans text-secondary font-medium tracking-wide mt-1">Date: {res.eventDate}</p>
                      </div>

                      <div className="text-xs text-slate-charcoal/80 space-y-1 font-sans">
                        <p><strong>Lead Name:</strong> {res.fullName}</p>
                        <p><strong>Size count:</strong> {res.guestCount} guests ({res.budgetProfile} tier)</p>
                        {res.generatedMenu && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                            <Sparkles className="w-3 h-3 fill-emerald-600/10" /> AI Gastronomic Menu Linked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-champagne-gold/10 pt-3 mt-4 flex items-center justify-between text-[11px] font-sans text-primary/40 font-bold uppercase tracking-wider">
                      <span>Submitted Log: {res.createdAt}</span>
                      <span className="text-secondary font-semibold flex items-center gap-1 cursor-help">Coordinator assigned</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-champagne-gold/20 p-6 flex flex-col justify-center items-center space-y-2.5">
                <FileText className="w-8 h-8 text-secondary/30" />
                <h5 className="font-serif text-sm font-semibold text-primary/80">No Submitted Quote Tickets</h5>
                <p className="font-sans text-xs text-primary/40 max-w-xs leading-relaxed mx-auto">
                  Submit our quote inquiry form on the landing page to monitor status and link menus here!
                </p>
              </div>
            )}
          </div>

          {/* Saved AI culinary menus */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-champagne-gold" /> My Custom Menus ({savedMenus.length})
            </h4>

            {savedMenus.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedMenus.map((sm) => (
                  <div key={sm.id} className="bg-white rounded-2xl border border-champagne-gold/15 p-5 relative shadow-sm hover:border-champagne-gold/40 transition-all flex flex-col justify-between">
                    <button
                      onClick={() => onDeleteMenu(sm.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                      title="Discard Saved Menu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] font-sans text-secondary font-bold uppercase tracking-wider block">Bespoke Generated Blueprint</span>
                        <h5 className="font-serif text-base font-bold text-primary italic leading-tight">{sm.eventType}</h5>
                        <p className="text-[10px] font-sans text-primary/40 uppercase font-bold tracking-widest mt-1">Saved on {sm.savedAt}</p>
                      </div>

                      <div className="bg-linen-cream/60 p-3 rounded-xl border border-champagne-gold/10 space-y-1.5">
                        <div className="flex justify-between text-xs font-sans text-primary/70">
                          <span>Configuration:</span>
                          <span className="font-bold">{sm.guestCount} guests</span>
                        </div>
                        <div className="flex justify-between text-xs font-sans text-primary/70">
                          <span>Culinary Quality:</span>
                          <span className="font-bold text-secondary">{sm.budgetProfile} Style</span>
                        </div>
                        <div className="flex justify-between text-xs font-sans text-primary/70 items-baseline pt-1 border-t border-champagne-gold/10">
                          <span>Estimated price check:</span>
                          <span className="font-bold text-primary text-sm">${sm.menu.estimatedPricePerGuest}/guest</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-champagne-gold/10 pt-4 mt-4 flex gap-2">
                      <button
                        onClick={() => onViewMenuInPlanner(sm.menu, sm.eventType, sm.guestCount, sm.budgetProfile, sm.customVibe)}
                        className="flex-1 bg-primary hover:bg-champagne-gold text-white font-sans text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-champagne-gold fill-champagne-gold/10" /> View Chef Card
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="p-2 border border-champagne-gold/25 text-primary hover:bg-cream-dark rounded-lg transition-all"
                        title="Print"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-champagne-gold/20 p-6 flex flex-col justify-center items-center space-y-2.5">
                <ChefHat className="w-8 h-8 text-secondary/30" />
                <h5 className="font-serif text-sm font-semibold text-primary/80">No Saved Menus</h5>
                <p className="font-sans text-xs text-primary/40 max-w-sm mx-auto">
                  Head over to our Bespoke Planner, input event details, and click 'Save to Portal' after generating!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
