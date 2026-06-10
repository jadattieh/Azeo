import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const REVIEWS_FILE = path.join(process.cwd(), "reviews.json");

// Helper to load reviews from persistent file
function loadReviews() {
  const defaultReviews = [
    {
      id: "rev-1",
      name: "Cherihane Khoury",
      rating: 5,
      comment: "The food presentation was amazing. Top Chef quality! Azeo Catering made our corporate gala absolutely unforgettable. Highly recommend the Dinde aux Marrons!",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe104jvjn5etmTzUk6o-gaKXib53D2N0ryx9YmLL3QQNWuyCy7QEmVS0Sz3D_snrIaFUwMofoOiPzftrkf8AY8OkrXdCvOlYrTw3qMhCYP4m4LYdpyCVAVw-_BuVJQYf518li0TBT274pUlwo5itZ-PWNhyaxtpi8pRSfTGkxVwiFEesp-tBdNQCOQwB_Kw8QCe9YCnfZwamcIpeYrjBIvzttoc2uQ8XTpY5aB3_X4SFuP7bFhpsJA7TGIteve9hk2M2ufhf6QGuXn",
      createdAt: "06/01/2026"
    },
    {
      id: "rev-2",
      name: "Jean-Pierre Attieh",
      rating: 5,
      comment: "By far the finest Lebanese catering service. The canapés and salmon tartare éclair are pure culinary art! Outstanding service from Ghazir to Beirut.",
      avatar: "",
      createdAt: "06/04/2026"
    },
    {
      id: "rev-3",
      name: "Nayla Massaad",
      rating: 5,
      comment: "We ordered the Selection Festive - Formule 1 for a 12-person family celebration. Extremely generous, beautiful styling, and absolutely delicious hummus trio. Marhaba, Azeo!",
      avatar: "",
      createdAt: "06/08/2026"
    }
  ];

  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
      return JSON.parse(data);
    } else {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(defaultReviews, null, 2), "utf-8");
      return defaultReviews;
    }
  } catch (error) {
    console.error("Error loading reviews, falling back to defaults:", error);
    return defaultReviews;
  }
}

// Helper to save reviews
function saveReviews(reviews: any[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing reviews to file:", error);
  }
}

app.use(express.json());

// Initialize Gemini safely
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not set. All menu planning requests will run in sandbox mode with mock menus.");
      return null;
    }
    genAI = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': "aistudio-build",
        }
      }
    });
  }
  return genAI;
}

// API Route for menu generation
app.post("/api/generate-menu", async (req, res) => {
  try {
    const { eventType, guestCount, dietaryRestrictions, budgetProfile, customVibe } = req.body;

    const ai = getGenAI();
    if (!ai) {
      // Fallback elegant mock menu if no API key is set so the app never crashes
      return res.json({
        introduction: "Welcome to a taste of Lebanese luxury. This sandbox preview menu has been designed to reflect the classic elegance of Azeo Catering, highlighting fresh aromatic herbs, pomegranate jewels, and artisanal presentation.",
        themeColorPalette: ["Deep Forest Green", "Champagne Gold", "Linen Cream"],
        appetizers: [
          {
            name: "Artisanal Hummus Trio",
            arabicName: "Hummus Beiruti",
            description: "Traditional chickpea puree with toasted pine nuts, a modern beetroot-infused variant, and vibrant herb pesto hummus, arranged as a painting of flavors.",
            suitability: "A gorgeous modern twist that caters to vegans and gluten-free diets alike."
          },
          {
            name: "Fig and Halloumi Carpaccio",
            arabicName: "Halloumi Bil Teen",
            description: "Griddled Cypriot halloumi layered with local Akkar mountain figs, micro-herbs, and a reduction of wild carob syrup.",
            suitability: "Sophisticated savory-sweet pairing that matches your premium style profile."
          }
        ],
        mains: [
          {
            name: "Slow-Roasted Lamb Mosaics",
            arabicName: "Ouzi Bil Lahme",
            description: "24-hour slow-cooked spiced Baladi lamb shoulder over a bed of smoked cinnamon-infused freekeh, toasted pine nuts, and caramelized shallots.",
            platingStyle: "Presented on modern hand-painted stoneware, garnished with micro-coriander and fresh pomegranate caviar."
          }
        ],
        desserts: [
          {
            name: "Orange Blossom Ashta Panna Cotta",
            arabicName: "Ashtalyia",
            description: "Traditional Lebanese milk pudding infused with distilled orange-blossom water, served with pistachios and candied Damascus rose petals."
          }
        ],
        beverages: {
          signatureMocktail: {
            name: "Beirut Sunset",
            description: "Fresh pomegranate juice muddled with Lebanese wild mint, local orange honey, fresh lime, and sparkling soda.",
            garnish: "Dehydrated orange wheel and fresh mint bouquet."
          },
          signatureCocktail: {
            name: "The Cedars Elixir",
            description: "Handcrafted Lebanese Araq shaken with fresh cucumber extract, wild elderflower syrup, and lime juice.",
            garnish: "Cucumber ribbon and fresh rosemary sprig."
          },
          pairingNote: "We highly recommend pairing this masterwork with a full-bodied Chateau Musar red or a dry, crisp Ksara Chardonnay to balance the rich spices."
        },
        estimatedPricePerGuest: budgetProfile === "Ultra-Luxury" ? 120 : budgetProfile === "Premium" ? 85 : 55
      });
    }

    const dietStr = (dietaryRestrictions && dietaryRestrictions.length > 0)
      ? (Array.isArray(dietaryRestrictions) ? dietaryRestrictions.join(", ") : JSON.stringify(dietaryRestrictions))
      : "No strict dietary boundaries";

    const prompt = `Design an exquisite, high-end, tailored Lebanese catering menu for an upcoming event in Lebanon:
- Event Type: ${eventType}
- Guest Count: ${guestCount}
- Dietary requests / constraints: ${dietStr}
- Budget Tier / Style profile: ${budgetProfile} (Classic, Premium, or Ultra-Luxury)
- Custom requests / vibe: ${customVibe || "None"}

Ensure the menu feels highly premium, incorporating authentic Lebanese culinary heritage with modern, Michelin-star style plate presentations. Use evocative descriptions. Generate exactly matching details. Use JSON output format matching the requested schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Executive Head Chef of Azeo Catering, a premier ultra-luxury culinary house in Beirut, Lebanon. Your menus are poetic, highly precise, culturally authentic yet modern, and visually striking.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            introduction: {
              type: Type.STRING,
              description: "A welcoming, poetic chef's note explaining the concept of the custom-designed menu, incorporating local Lebanese heritage and fresh ingredients."
            },
            themeColorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-4 custom color name strings that would visually define this bespoke dining experience (e.g., 'Champagne Gold', 'Pomegranate Crimson')."
            },
            appetizers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  arabicName: { type: Type.STRING, description: "Phonetic Arabic name, e.g., 'Hummus Bil Lahme', 'Moutabal'." },
                  description: { type: Type.STRING, description: "Elegant culinary description emphasizing fresh local ingredients and plating." },
                  suitability: { type: Type.STRING, description: "Why this perfectly fits their guests/dietary choices." }
                },
                required: ["name", "arabicName", "description", "suitability"]
              },
              description: "A list of curated cold and hot starters or mezze plates."
            },
            mains: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  arabicName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  platingStyle: { type: Type.STRING, description: "How the chef recommends presenting this on the table/plate." }
                },
                required: ["name", "arabicName", "description", "platingStyle"]
              },
              description: "The main course options, featuring masterfully cooked Lebanese specialties with modern twists."
            },
            desserts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  arabicName: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "arabicName", "description"]
              }
            },
            beverages: {
              type: Type.OBJECT,
              properties: {
                signatureMocktail: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    garnish: { type: Type.STRING }
                  },
                  required: ["name", "description", "garnish"]
                },
                signatureCocktail: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    garnish: { type: Type.STRING }
                  },
                  required: ["name", "description", "garnish"]
                },
                pairingNote: { type: Type.STRING, description: "Chef's suggestion on overall beverage or wine pairing." }
              },
              required: ["signatureMocktail", "signatureCocktail", "pairingNote"]
            },
            estimatedPricePerGuest: {
              type: Type.INTEGER,
              description: "A calculated estimated price per guest in USD depending on their style, guest count, and ingredients."
            }
          },
          required: ["introduction", "themeColorPalette", "appetizers", "mains", "desserts", "beverages", "estimatedPricePerGuest"]
        }
      }
    });

    const menuJson = JSON.parse(response.text.trim());
    res.json(menuJson);
  } catch (error) {
    console.error("Error generating menu:", error);
    res.status(500).json({ error: "Failed to generate catering menu. Please try again." });
  }
});

// GET endpoint to fetch all persistent reviews
app.get("/api/reviews", (req, res) => {
  try {
    const reviews = loadReviews();
    res.json(reviews);
  } catch (err) {
    console.error("Error in GET /api/reviews:", err);
    res.status(500).json({ error: "Failed to load reviews" });
  }
});

// POST endpoint to add a persistent review
app.post("/api/reviews", (req, res) => {
  try {
    const { name, rating, comment, avatar } = req.body;
    if (!name || typeof rating !== "number" || !comment) {
      return res.status(400).json({ error: "Name, rating, and comment are required." });
    }
    
    const reviews = loadReviews();
    const newReview = {
      id: "rev-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      name,
      rating: Math.max(1, Math.min(5, Number(rating))),
      comment,
      avatar: avatar || "",
      createdAt: new Date().toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
    };
    
    const updated = [newReview, ...reviews];
    saveReviews(updated);
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error in POST /api/reviews:", err);
    res.status(500).json({ error: "Failed to persist review." });
  }
});

// Serve static assets in production, otherwise mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
