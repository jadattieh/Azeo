import { StandardMenuItem, LebaneseMilestone } from "./types";

export const STANDARD_MENU_CATALOG: StandardMenuItem[] = [
  // --- Sélection Festive ---
  {
    id: "sf1",
    category: "Sélection Festive",
    name: "Selection Festive - Formule 1",
    arabicName: "Al-Majmou'a Al-Yo'ala (Formule 1)",
    description: "Serves 10 to 12 persons. Includes: Salade de Paysanne à la Rocca et Fromage Majdoule (sauce Balsamique au Miel), Hommos Trio (Betterave, Pesto, Nature), Moutabal Trio (Chou-Fleur, Carotte, Aubergine), Feuilles de Vigne farcies à la mélasse de Grenade, Darne de Poisson avec Légumes grillés (sauce Tajen), mixed Bouchées assortment (Kebbe, Sambousek, Sambousek au Fromage, Hot Dog, Fatayer aux épinards), and Dinde aux Marrons (sauce Orientale).",
    price: "$390",
    isPopular: true
  },
  {
    id: "sf2",
    category: "Sélection Festive",
    name: "Selection Festive - Formule 2",
    arabicName: "Al-Majmou'a Al-Yo'ala (Formule 2)",
    description: "Serves 10 to 12 persons. Includes: Salade aux Crevettes et à l'avocat (sauce Moutarde à l'ancienne), premium Canapés assortment (Salami, Fromage de Chèvre, Chicken cashew Nuts), Quiche Saumon, Pie au Poulet (pâte feuilletée), Roti de Boeuf accompagné de Salade Russe, and Gigot d'agneau rôti accompanied by Légumes sautés (sauce Café de Paris).",
    price: "$440",
    isPopular: true
  },

  // --- Entrées ---
  {
    id: "en1",
    category: "Entrées",
    name: "Baklava à la Saucisse",
    arabicName: "Baklawa Bel Sijok",
    description: "A gorgeous savory puff pastry roll stuffed with spiced Lebanese sausage (saucisse), sweet sautéed onions, fresh parsley, cheese, and seasoned breadcrumbs. Crisp and decadent.",
    price: "4 dz $55"
  },
  {
    id: "en2",
    category: "Entrées",
    name: "Bao Bun (Poulet / Boeuf)",
    arabicName: "Bao Bun Poulet/Boeuf",
    description: "Fluffy, cloud-like steamed bao buns loaded with tender marinated chicken or flame-seared shredded beef steak and light house spices.",
    price: "1.5 dz $45"
  },
  {
    id: "en3",
    category: "Entrées",
    name: "Mini éclair au tartare de saumon",
    arabicName: "Éclair Tartare Saumon",
    description: "Exquisite individual choux pastry éclairs stuffed with fresh cold-water salmon tartare, whipped herb cream cheese, and wild dill.",
    price: "1.5 dz $48"
  },
  {
    id: "en4",
    category: "Entrées",
    name: "Cheese Cake salé au Saumon fumé",
    arabicName: "Cheese Cake Salé",
    description: "Fabulous gourmet chilled cheesecake (25cm size) layering rich cream cheese, capers, fresh chives, zest of organic lemon, set on a salted biscuit base and blanketed under smoked salmon slices.",
    price: "25cm $80",
    isPopular: true
  },
  {
    id: "en5",
    category: "Entrées",
    name: "Mini Burger à la Truffe et Oignons Caramelisés",
    arabicName: "Mini burger Truffe & Onions",
    description: "Sizzling luxury mini beef patties topped with black truffle-infused cream cheese and slow-melted caramelized onions in a soft toasted brioche bun.",
    price: "1 dz $24"
  },
  {
    id: "en6",
    category: "Entrées",
    name: "Big Bite Burger",
    arabicName: "Big Bite Classic",
    description: "Generous mini burger bites (1 dozen) featuring double steak beef patties, melted golden cheddar cheese, crisp pickles, and special demi-pain bun.",
    price: "1 dz $28"
  },
  {
    id: "en7",
    category: "Entrées",
    name: "Quiche aux Asperges croquantes et Saumon Tendre",
    arabicName: "Quiche Asperge & Saumon",
    description: "A beautiful 28cm golden quiche filled with fresh snappy baby asparagus spears, tender flaked salmon, and a rich, nutmeg-spiced egg custard.",
    price: "28cm $70"
  },
  {
    id: "en8",
    category: "Entrées",
    name: "Quiche aux Épinards",
    arabicName: "Quiche Sabanekh",
    description: "Individually baked 28cm golden tart shell generously packed with garden-fresh spinach, sautéed onions, garlic, and rich local cream cheese.",
    price: "28cm $50"
  },
  {
    id: "en9",
    category: "Entrées",
    name: "Quiche Lorraine",
    arabicName: "Quiche Lorraine Traditionnelle",
    description: "Simple French elegance (28cm): golden flaky butter crust filled with salted pork lardons (or beef bacon), sautéed onions, and melted Swiss Emmental cheese.",
    price: "28cm $50"
  },

  // --- Salade ---
  {
    id: "sl1",
    category: "Salade",
    name: "Salade Roquette, Bresaola et Chèvre",
    arabicName: "Salat Al-Rocca Bel Bresaola",
    description: "Serves 10 to 12 persons. Crisp peppery arugula greens topped with fine layers of cured beef bresaola, premium aged goat cheese rounds, shaved Parmesan cheese, and sweet homemade honey-balsamic dressing.",
    price: "$85",
    isPopular: true
  },
  {
    id: "sl2",
    category: "Salade",
    name: "Salade exotique crabe et mangue",
    arabicName: "Salat Al-Krab Bel Mango",
    description: "Serves 10 to 12 persons. Shaved sea crab meat, julienned ripe sweet mangoes, green garden leaves, dressed in a signature refreshing lemon-mayonnaise reduction.",
    price: "$70"
  },
  {
    id: "sl3",
    category: "Salade",
    name: "Salade thaïe au poulet mariné",
    arabicName: "Salat Al-Dajaj Al-Thai",
    description: "Serves 10 to 12 persons. Tender strips of grilled marinated chicken breast tossed with soft rice glass noodles, sliced fresh mango, cilantro, and roasted sesame-ginger vinaigrette.",
    price: "$75"
  },
  {
    id: "sl4",
    category: "Salade",
    name: "Fattouche traditionnel avec halloumi mini Kaak",
    arabicName: "Fattouche Bel Halloumi",
    description: "Serves 10 to 12 persons. Crisp garden cucumbers, tomatoes, radishes, local greens, tossed with grilled Halloumi cubes and miniature Kaak sesame crackers, dressed with tang sumac molasses.",
    price: "$50",
    isPopular: true
  },
  {
    id: "sl5",
    category: "Salade",
    name: "Rosace de saumon fumé aux saveurs tropicales sur lit de quinoa",
    arabicName: "Saumon Fumé Quinoa Exotique",
    description: "Serves 10 to 12 persons. Elegant rosette plating of premium cold-smoked salmon slices over an organic white and red quinoa salad, diced mangoes, fresh lime, and custom tart raspberry drizzle.",
    price: "$120"
  },

  // --- Plats Principaux ---
  {
    id: "pp1",
    category: "Plats Principaux",
    name: "Poulet entier à L'Orientale",
    arabicName: "Farrouj Kamel Malaki",
    description: "Whole roasted rotisserie chicken steeped in dynamic Eastern spices, presented on a rich platter of spiced minced-beef rice, sweet roasted chestnuts, toasted pine nuts, and almonds.",
    price: "$95"
  },
  {
    id: "pp2",
    category: "Plats Principaux",
    name: "Tagliatelles au Poulet farci aux épinards, sauce aux cèpes",
    arabicName: "Tagliatelle Dajaj Bel Cepe",
    description: "Ribbon tagliatelle pasta loaded with premium chicken breast rolls stuffed with fresh mountain spinach and cheese, sautéed in a rich, velvety wild porcini forest mushroom gravy.",
    price: "$110"
  },
  {
    id: "pp3",
    category: "Plats Principaux",
    name: "Gigot d'agneau à L'orientale (Mansaf)",
    arabicName: "Mansaf El-Eid Bel Gigot",
    description: "Showstopping oven-baked leg of spring lamb cooked until falling off the bone, layered on spiced caramelized-onion rice, topped with premium ghee-roasted almonds and cashew slivers.",
    price: "$130",
    isPopular: true
  },
  {
    id: "pp4",
    category: "Plats Principaux",
    name: "Gigot d'agneau rôti et Légumes sautées, sauce Café de Paris",
    arabicName: "Gigot Rôti Café de Paris",
    description: "Elegant presentation of sliced oven-braised lamb leg paired with crisp butter-sautéed seasonal vegetables and served with a side of luxurious, herb-infused Café de Paris butter sauce.",
    price: "$150"
  },
  {
    id: "pp5",
    category: "Plats Principaux",
    name: "Filet de Boeuf grillés, Smashed Potatoes à la Truffe",
    arabicName: "Filet de Boeuf El-Azeo",
    description: "Premium seared master-cut beef tenderloin charcoal grilled, accompanied by crispy gold roasted smashed potatoes seasoned with black truffle oil, raw Parmesan, and herbal salsa verde.",
    price: "$160",
    isPopular: true
  },
  {
    id: "pp6",
    category: "Plats Principaux",
    name: "Pavé de saumon au sésame, Linguine a L'encre de seiche",
    arabicName: "Pavé Saumon Encre de Seiche",
    description: "Thick-cut fresh Atlantic salmon fillet crusted in white and black sesame seeds, resting on a bed of magnificent squid ink black linguine, drowned in a deep ocean lobster bisque sauce.",
    price: "$165"
  },
  {
    id: "pp7",
    category: "Plats Principaux",
    name: "Paella Fruits de Mer",
    arabicName: "Paella Marine Al-Fakhira",
    description: "Spectacular Spanish-style rice dyed with premium saffron, cooked with rich seafood stock, jumbo sautéed tiger prawns, Atlantic black mussels, tender squid, and fresh sweet garden peas.",
    price: "$160"
  },
  {
    id: "pp8",
    category: "Plats Principaux",
    name: "Dinde à l'américaine accompagnée de légumes sautés",
    arabicName: "Dinde Al-Amricaniyyeh",
    description: "Authentic celebratory roasted turkey platter with sweet caramelized bacon, pan-sautéed winter root vegetables, sweet yams, served with thick wild-crafted alpine cranberry sauce.",
    price: "$160"
  },
  {
    id: "pp9",
    category: "Plats Principaux",
    name: "Dinde aux Marrons, sauce Orientale",
    arabicName: "Dinde Bel Marron",
    description: "Moist, slow-baked festive turkey crown carved elegantly over a rich bed of roasted chestnuts, spiced aromatic minced beef rice, and served with a rich savory brown turkey gravy.",
    price: "$150"
  },

  // --- Bouchées ---
  {
    id: "bo1",
    category: "Bouchées",
    name: "Pizza Mini-Bites",
    arabicName: "Pizza Mini",
    description: "Fabulous golden hand-rolled dough wheels topped with sweet vine tomato sauce, fresh melted Mozzarella cheese chunks, and premium dried local wild oregano.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo2",
    category: "Bouchées",
    name: "Rouleaux de fromage",
    arabicName: "Rkakat Jebneh",
    description: "Golden-crispy pastry rolls stuffed with an authentic warm melting blend of local salty Akawi and sheep milk Halloumi cheeses seasoned with fresh mountain mint.",
    price: "3 dz $18 / 6 dz $33",
    isPopular: true
  },
  {
    id: "bo3",
    category: "Bouchées",
    name: "Bouchées Hot Dog",
    arabicName: "Hot Dog Feuillete",
    description: "Flaky french puff pastry blanketed tightly surrounding premium spiced mini sausages, baked till puffed and golden.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo4",
    category: "Bouchées",
    name: "Fatayer aux épinards",
    arabicName: "Fatayer Sabanekh",
    description: "Handmade pillowy dough pockets with a dark-green citrusy filling of sautéed wild spinach leaves, sour sumac berries, finely diced red onion, and olive oil.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo5",
    category: "Bouchées",
    name: "Sambousek au fromage",
    arabicName: "Sambousek Jebneh",
    description: "Half-moon shaped hand-crimped pastry pockets containing a creamy local cheese blend, savory parsley, fried until deeply golden and flaky.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo6",
    category: "Bouchées",
    name: "Fatayer au thym",
    arabicName: "Fatayer Zaatar El-Jabal",
    description: "Aromatic mountain wild thyme mixed with toasted sesame seeds and cold-pressed Bejjeh village olive oil, baked on tender miniature dough rounds.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo7",
    category: "Bouchées",
    name: "Sambousek à la viande",
    arabicName: "Sambousek Lahme",
    description: "Delicate pastry purses filled with rich sautéed grass-fed minced lamb, local onions, wild sumac berry powder, and hot ghee-toasted pine nuts.",
    price: "3 dz $18 / 6 dz $33",
    isPopular: true
  },
  {
    id: "bo8",
    category: "Bouchées",
    name: "Kebbé à la viande",
    arabicName: "Kebbeh Kouras",
    description: "Traditional egg-shaped bulgur wheat and beef casings filled to capacity with pan-seared ground meat, sweet onions, warm spices, and pine nut clusters.",
    price: "3 dz $18 / 6 dz $33"
  },
  {
    id: "bo9",
    category: "Bouchées",
    name: "Kishek Savory Bites",
    arabicName: "Kishek El-Balad",
    description: "An incredibly authentic rustic treat featuring traditional sun-dried goat yogurt wheat (Kishek) simmered with garlic, confit beef, inside miniature crispy golden cups.",
    price: "3 dz $18 / 6 dz $33"
  },

  // --- Desserts ---
  {
    id: "de1",
    category: "Desserts",
    name: "Fruits exotiques Plat",
    arabicName: "Sahn Al-Fawakeh Al-Exotique",
    description: "A grand colorful architectural cascade of freshly hand-carved tropical and exotic fruits, highlighting dragon fruit, ripe passion fruit, mango fillets, winter berries, and mountain mint.",
    price: "$50"
  },
  {
    id: "de2",
    category: "Desserts",
    name: "Tarte aux Fraises (25cm)",
    arabicName: "Tarat Al-Fraise El-Fakhra",
    description: "Shortcrust sweet butter tart base with silk dairy pastry cream, packed tightly with glazed fresh organic Lebanese strawberries.",
    price: "$30"
  },
  {
    id: "de3",
    category: "Desserts",
    name: "Tarte Exotiques (25cm)",
    arabicName: "Tarat Al-Fawakeh Al-Exotique",
    description: "Fabulous butter pastry tart stacked high with kiwi, mango slices, sweet pomegranate, passion fruit syrup, and vanilla crème pâtissière.",
    price: "$40",
    isPopular: true
  },
  {
    id: "de4",
    category: "Desserts",
    name: "Bûche de Noël Chocolat (40cm)",
    arabicName: "Bûche au Chocolat Noël",
    description: "Signature Christmas holiday cake roll (40cm). Super moist chocolate sponge rolled with fine French cocoa cream and coated under rich dark Belgian chocolate icing.",
    price: "$45"
  },
  {
    id: "de5",
    category: "Desserts",
    name: "Bûche de Noël Red Velvet (40cm)",
    arabicName: "Bûche Red Velvet Malakiyyeh",
    description: "Spectacular elegant velvety deep-red yule log cake (40cm length) wrapped with refreshing house cream cheese icing and vanilla dust.",
    price: "$55"
  },
  {
    id: "de6",
    category: "Desserts",
    name: "Bûche de Noël Concerto (40cm)",
    arabicName: "Bûche Concerto Chef Selection",
    description: "Chef's gourmet masterpiece (40cm length) with alternate layers of dark chocolate honeycomb crunch, light hazelnut praline mousse, and gold leaf detailing.",
    price: "$60",
    isPopular: true
  }
];

export const HERITAGE_TIMELINE: LebaneseMilestone[] = [
  {
    year: "2012",
    title: "Culinary Origins",
    location: "Achrafieh, Beirut",
    description: "Azeo Catering commenced as a boutique private chef collective in Beirut, designing highly personalized dinners for intimate gatherings and political galas."
  },
  {
    year: "2015",
    title: "Granular Grandeur",
    location: "Ghazir, Mount Lebanon",
    description: "Located to our professional high-capacity production headquarters in Ghazir (Sairafi Building), serving high-status banqueting, festive winter banquets, and customized catering packages premium-grade."
  },
  {
    year: "2018",
    title: "The Farm-To-Table Alliance",
    location: "Mount Lebanon & Bekaa Coast",
    description: "Pioneered direct organic trade loops with local Lebanon agricultural micro-cultivators, guaranteeing premium daily-harvested native herbs, Baladi dairy, and prime grass-fed meats."
  },
  {
    year: "2026",
    title: "Excellence Refined",
    location: "Ghazir HQ & Beyond",
    description: "Evolving the brand to supreme design heights, providing fine culinary masterworks, direct WhatsApp luxury inquiries, and stellar Lebanese cuisine services."
  }
];
