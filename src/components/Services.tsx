import React from "react";

interface ServiceCardProps {
  key?: React.Key;
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
}

function ServiceCard({ title, description, imageSrc, onClick }: ServiceCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col cursor-pointer transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden mb-5 rounded-xl border border-champagne-gold/10 relative shadow-md">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          alt={title}
          referrerPolicy="no-referrer"
          src={imageSrc}
        />
        {/* Hover translucent gold shimmer */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h4 className="font-serif text-2xl text-primary font-medium hover:text-champagne-gold transition-colors duration-300 mb-2">
        {title}
      </h4>
      <p className="font-sans text-sm text-slate-charcoal/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface ServicesProps {
  onPlanForService: (service: string) => void;
}

export default function Services({ onPlanForService }: ServicesProps) {
  const services = [
    {
      title: "Family Gatherings",
      description: "Warm, intimate service for home celebrations that bring your loved ones closer in exquisite comfort.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuClb5N8Wxc-NQI43bqLZYnh8ykjdHKzLNGLiV0kqGFW5CrGSiuKZoexGZqmeccfBpwFv9AIC5QHK35irezEPncx5Ph6d-fhWMS2zzB2l3nsVZafUv-1LTNZEg_qyvoJ2nC1jZkzZg_BuA-0Djy4lFI1xQ7aW7ccG9T4eHyvsAUs_hocLiHt_jRkkT0aUabEDOhou131n0RkE6yehpx-DyA_W5Me-oC9BiwHp1uoDZJ1u3dTHiFaHYyml961YHQ9TWUatLlo0av9yFvk"
    },
    {
      title: "Weddings",
      description: "Elegant and grand culinary experiences designed with gourmet precision to reflect your unique love story.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtynKoVb1pIcKnSywesvoNH5_0GKxpd6lHsuTcKIUDB1iKIYxNhz5nluIsXE7NhZlpVcbdK0p1JepEzfM-iIFYjHZVGs1FqGyLDZbUAAj0M3Yi_qSGIvZIpOJ5LdSF4lwXFQTzEY3Fee2TK3d6OxI5UGvkFaYwobqTPCIsTrVfXBJOWzlV2EbXv01CbI9l4JCViEQlp7ErkBGWMfsE5V6lztMi9Ma5QfkMfGrWG2Q-kGbSSTEM7N--XnO5PQPAEpQ6ty-2hFbo9rJd"
    },
    {
      title: "Festive Dinners",
      description: "Holiday-themed menus with a distinctive flavor that elevate any seasonal celebration or executive corporate gala.",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq9uFqbh7-0x5XBdi6pqhaiXrUfYGJ1fYVV2evHbI4X4gwhQndQ1WurGN2IbeCHmXOCyLrOs96yAJTRWxglXnqwupAV8tJUASDg3atbJoyb9JkPJ97Z97IyEgR9Mi86iNKRrzEmHp3lw0nTHuhBk4sHM_xFt0kRFebOFaILjtf8-CIR5ftlR-erEDhYsTEbbvLgehpR5pAUsPPJuCOJu0yS6Ec7iwOHK-ySx5mv2ncaGkUdrF6ELEzEa0xeZFeYEWjVQheVg5qPnNn"
    }
  ];

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 md:px-10">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-sans text-xs font-semibold text-champagne-gold tracking-[0.25em] uppercase mb-3 block">
          Our Services
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-primary font-semibold tracking-tight">
          Tailored Culinary Artistry
        </h3>
        {/* Sophisticated golden separator divider line */}
        <div className="w-16 h-[1.5px] bg-champagne-gold mt-4 shadow-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {services.map((svc, i) => (
          <ServiceCard
            key={i}
            title={svc.title}
            description={svc.description}
            imageSrc={svc.imageSrc}
            onClick={() => onPlanForService(svc.title)}
          />
        ))}
      </div>
    </section>
  );
}
