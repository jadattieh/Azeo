import { useState } from "react";
import { X, ZoomIn, Eye, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  plating: string;
  pairings: string;
}

export default function GalleryPreview() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Gourmet Blossom Garnish",
      category: "Artisanal Dessert",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzfhvmU5BIzFqaMTrefXT3uz6ewqcPFumeWibZZ3SU0nBhmC-6K8W1iXjKpyxlzUFq_7XSpb7iKbYYblOjnJ-hjonXkaNcW0IozPTVfxlzlnay0g1RjyZVRt7AA5UUuHNkgfjlAv9c94qSJyGnMCZORJnvdffCvC-eifX7-NB_wyrjTZ-5ZEXNL_vLGQmqSXlvddeoGqvzNbt7-R4bvSznUkfvfDwuKRU1FLULJQmqnGrhJVxd6Zi4nJw2db0xs1tq8NUmusVKw7MV",
      description: "A precision close-up of a premium Lebanese Ashta dessert garnished with edible botanicals, sweet violets, and 24K gold leaf flaking in our state-of-the-art kitchen.",
      plating: "Vitreous custom pottery plate, minimal garnish margins.",
      pairings: "Pairs majestically with white floral tea or desert-infused coffee."
    },
    {
      id: 2,
      title: "Artisanal Slate Mezze",
      category: "Authentic Mezze Trio",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0PbOHwgK7TliAQ5ySpMFsTXovDY7b1sKV7HezwigDDMRNe_GAaIYhTglkUxN9c4BQM_92v-sIidogmcEEj8jOSccrTrPtfIlhhHH8L0VLKnsCUrYmjLYiZNRz76TnqBeaFegY16cQ6-Mcj6b_4AiV1TgcyXRHr3bXf1jMUQiksxXOrr1Mz87IDYcKqeqSB0dFKWEqMaeSCINOsodYvITEAS9rQW1ug5MUJnSSaN9YnD5QFRiCeudX93Om9FT7a69Orw2OQCf5Bh_W",
      description: "Sleek, direct-from-mountain slate-charcoal trays arranged with uniform traditional savory pocket appetizers, designed for executive standing receptions.",
      plating: "Carvings of local cedar timber, mountain slate stones.",
      pairings: "Matches a clean, ice-shaken Lebanese Araq digestif."
    },
    {
      id: 3,
      title: "Seared Salmon & Pea Nectar",
      category: "Signature Main Course",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRghpJ_JntG1sI0xQlXpcXxQO5ok6yQJJgycL3hq5JFEeZDziLnvC1RYuPN7hKtUZJ0dw2sNh4uRczfkbAGt0vHogR44bHWKe4-bvivCQ6U2R0BWAOMU414tzUCYfhZVZ-EaLCaem4o-P5fPDuYrOchatLU1rG-Ax204ltYTonUBu_hA25bfqlaXxQJDt2oOTQrHZRaUEYTy_2bOjSRJHb-5hIXBVn6tK_DFTlslP7oL8X1D3suX6igyu3qzl44nywJNMwehJr0aE",
      description: "Crispy seared Mediterranean salmon sitting symmetrically over a bed of vibrant, cold-strained organic green pea puree, finished with local citrus oil bead droplets.",
      plating: "Fine bone porcelain double rimmed with a champagne gold lining.",
      pairings: "A sharp, oaky glass of Ksara Blanc de Blancs handles this beautifully."
    },
    {
      id: 4,
      title: "The Botanical Elixir",
      category: "Signature Craft Cocktail",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwkILkFHkWMbK34iwF9v8ql6FMOJNupGWZGNnmJd-zXBSrCtSpb0P9WqE-IXko6llgNfUM2ydOLqfwBm6ePZ4mKLOqNMFl3pMyurIOFYSGzO2KTuTEt0gwNFrKFhuEdYKnKCQ4i8FP8PEE86d8ySLj1qT5zt_MP1w3ALzo_qMjjXbM4JlmIZDyf88ZtrQYYDO-dHfkt3kcGHJBfhwuOb3p5ErpnpikQnN89d2fqOGiVtDxcEcqFB8Q9wxGnbQupCFHvFNE7WW77qUg",
      description: "Our mixology expert pours a delicate jasmine and pomegranate-infused signature botanical cocktail over dry, wood-smoked local mint and hydrated citrus crystals.",
      plating: "Asymmetrical vintage crystal glass on solid dark teak wood rail.",
      pairings: "Perfect accompaniment to cold cucumber labneh bites."
    }
  ];

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 md:px-10">
      <div className="flex justify-between items-end mb-12">
        <div className="text-left">
          <span className="font-sans text-xs font-semibold text-champagne-gold tracking-[0.25em] uppercase mb-3 block">
            Artistry
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-primary font-semibold tracking-tight">
            The Gallery Preview
          </h3>
        </div>
        <a 
          href="#menu-explorer" 
          className="group items-center gap-2 text-primary hover:text-champagne-gold transition-colors duration-300 font-semibold text-xs tracking-wider uppercase hidden sm:flex"
        >
          VIEW FULL CATALOG 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {galleryItems.map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group aspect-square overflow-hidden rounded-xl border border-champagne-gold/10 relative shadow-sm cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out" 
              alt={item.title}
              referrerPolicy="no-referrer"
              src={item.imageSrc}
            />
            {/* Visual overlay with icons */}
            <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 p-4 text-center">
              <Eye className="w-6 h-6 text-champagne-gold" />
              <span className="font-serif text-sm font-semibold text-white tracking-wide">{item.title}</span>
              <span className="font-sans text-[10px] text-champagne-gold tracking-widest uppercase font-medium">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Cinematic Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex justify-center items-center p-4 md:p-8"
          onClick={() => setActiveItem(null)}
        >
          {/* Universal High-Visibility Close Button - Fixed in the top-right corner of the viewport */}
          <button 
            onClick={() => setActiveItem(null)}
            className="fixed top-4 right-4 md:top-6 md:right-6 p-2.5 bg-black/80 hover:bg-black text-white hover:text-champagne-gold backdrop-blur-md rounded-full transition-all z-[150] shadow-2xl border border-white/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
            title="Close Dialog"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-4xl w-full bg-linen-cream rounded-2xl border border-champagne-gold/30 shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 max-h-[88vh] md:max-h-[92vh] lg:max-h-none overflow-y-auto md:overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image side */}
            <div className="w-full md:w-1/2 aspect-square relative bg-black/20 flex-shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                src={activeItem.imageSrc}
              />
              <span className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-champagne-gold font-sans text-[10px] py-1 px-3 rounded-full uppercase tracking-wider font-semibold border border-champagne-gold/20">
                {activeItem.category}
              </span>
            </div>

            {/* Description side */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col text-left justify-center">
              <span className="text-[10px] font-sans text-secondary font-bold uppercase tracking-[0.2em] mb-2 block">Chef's Plating Masterpiece</span>
              <h4 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4 leading-tight">
                {activeItem.title}
              </h4>
              
              <div className="w-12 h-[1px] bg-champagne-gold mb-6" />

              <p className="font-sans text-slate-charcoal/90 text-sm leading-relaxed mb-6">
                {activeItem.description}
              </p>

              {/* Plating Standard Notes */}
              <div className="space-y-4 border-t border-champagne-gold/20 pt-6">
                <div>
                  <h5 className="font-sans text-[11px] font-bold uppercase text-primary/50 tracking-wider">Visual & Plating Technique</h5>
                  <p className="text-sm font-sans text-primary/80 font-medium">{activeItem.plating}</p>
                </div>
                <div>
                  <h5 className="font-sans text-[11px] font-bold uppercase text-primary/50 tracking-wider">Beverage Pairing Harmony</h5>
                  <p className="text-sm font-sans text-secondary font-medium italic">{activeItem.pairings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
