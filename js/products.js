/* Catalogo prodotti — RADICE Ethical Streetwear
 * Struttura dati caricata dinamicamente da app.js (nessun prodotto "hardcoded" in HTML).
 * Le immagini sono SVG generati al volo, così il progetto funziona anche offline.
 */

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function makeImage(bg, fg, label, shape = "tee") {
  const shapes = {
    tee: `<path d="M130 80L170 66Q200 96 230 66L270 80L335 130L303 172L270 150V312H130V150L97 172L65 130Z" fill="${fg}"/>
          <path d="M170 66Q200 96 230 66" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="8"/>`,
    hoodie: `<path d="M128 90L168 74Q200 100 232 74L272 90L340 190L304 214L272 170V322H128V170L96 214L60 190Z" fill="${fg}"/>
             <path d="M160 74Q200 14 240 74Q200 112 160 74Z" fill="rgba(0,0,0,.22)"/>
             <rect x="165" y="236" width="70" height="46" rx="8" fill="rgba(0,0,0,.18)"/>`,
    pants: `<path d="M138 70H262L282 336H212L200 168L188 336H118Z" fill="${fg}"/>
            <rect x="138" y="70" width="124" height="22" fill="rgba(0,0,0,.25)"/>
            <rect x="226" y="150" width="34" height="46" rx="4" fill="rgba(0,0,0,.15)"/>`,
    cap: `<path d="M105 230Q105 120 200 120Q295 120 295 230Z" fill="${fg}"/>
          <path d="M270 222Q350 222 352 248Q305 252 262 240Z" fill="rgba(0,0,0,.28)"/>
          <circle cx="200" cy="124" r="8" fill="rgba(0,0,0,.3)"/>`,
    tote: `<path d="M118 150H282L298 332H102Z" fill="${fg}"/>
           <path d="M156 152V112Q200 52 244 112V152" fill="none" stroke="${fg}" stroke-width="12"/>
           <circle cx="200" cy="240" r="30" fill="${bg}" opacity=".75"/>`,
    socks: `<path d="M110 80H170V220L225 262Q250 290 225 310Q190 330 150 296L110 250Z" fill="${fg}"/>
            <path d="M230 80H290V220L345 262Q370 290 345 310Q310 330 270 296L230 250Z" fill="${fg}" opacity=".75"/>
            <rect x="110" y="80" width="60" height="24" fill="rgba(0,0,0,.22)"/>
            <rect x="230" y="80" width="60" height="24" fill="rgba(0,0,0,.22)"/>`
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="${bg}"/>
    ${shapes[shape]}
    <text x="200" y="376" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" letter-spacing="4" fill="${fg}">${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const PRODUCTS = [
  {
    id: 1, name: "Tee Radice Basic", category: "T-shirt", price: 29, available: true, limited: false,
    description: "La t-shirt di tutti i giorni in cotone organico certificato GOTS, 180 g/m². Vestibilità regular.",
    notes: "100% cotone organico · Tinture a basso impatto · Prodotta in Portogallo.",
    sizes: SIZES, sizeGuide: true, colors: ["Bianco naturale", "Nero", "Verde salvia"],
    image: makeImage("#ece6d8", "#2f4a3a", "RADICE", "tee")
  },
  {
    id: 2, name: "Tee Oversize «Terra»", category: "T-shirt", price: 35, available: true, limited: false,
    description: "Taglio oversize con spalla scesa e stampa piccola sul petto. Cotone organico pesante da 220 g/m².",
    notes: "100% cotone organico · Stampa ad acqua · Unisex.",
    sizes: SIZES, sizeGuide: true, colors: ["Sabbia", "Nero", "Terracotta"],
    image: makeImage("#e3d8c3", "#b0623a", "TERRA", "tee")
  },
  {
    id: 3, name: "Tee «Alba» — Edizione limitata", category: "T-shirt", price: 42, available: true, limited: true,
    description: "Grafica originale disegnata da un'artista locale. Solo 200 pezzi numerati.",
    notes: "Cotone organico · Edizione numerata 200 pz · Etichetta ricamata.",
    sizes: SIZES, sizeGuide: true, colors: ["Bianco naturale", "Verde salvia"],
    image: makeImage("#dfe8dc", "#46704f", "ALBA", "tee")
  },
  {
    id: 4, name: "Tee «Marea» — Edizione limitata", category: "T-shirt", price: 42, available: false, limited: true,
    description: "Seconda uscita della serie limitata, ispirata al mare d'inverno. Attualmente esaurita.",
    notes: "Cotone organico · Edizione numerata 150 pz.",
    sizes: SIZES, sizeGuide: true, colors: ["Blu notte"],
    image: makeImage("#d6dde6", "#2b3f5c", "MAREA", "tee")
  },
  {
    id: 5, name: "Felpa Hoodie Essential", category: "Felpe", price: 69, available: true, limited: false,
    description: "Felpa con cappuccio in felpato organico, interno morbido e tasca a marsupio. Pensata per durare anni.",
    notes: "100% cotone organico 380 g/m² · Cuciture rinforzate · Unisex.",
    sizes: SIZES, sizeGuide: true, colors: ["Nero", "Grigio melange", "Verde bosco"],
    image: makeImage("#e8e2d6", "#3a3a38", "ESSENTIAL", "hoodie")
  },
  {
    id: 6, name: "Felpa Girocollo Riciclata", category: "Felpe", price: 59, available: true, limited: false,
    description: "Girocollo in mix di cotone organico (70%) e cotone riciclato post-industriale (30%).",
    notes: "70% cotone organico · 30% cotone riciclato · Orlo a costine.",
    sizes: SIZES, sizeGuide: true, colors: ["Sabbia", "Verde salvia", "Nero"],
    image: makeImage("#ebe3d0", "#8a7a56", "RICICLATA", "hoodie")
  },
  {
    id: 7, name: "Zip Hoodie «Nebbia» — Edizione limitata", category: "Felpe", price: 85, available: true, limited: true,
    description: "Felpa con zip in tiratura limitata, tintura naturale a base di piante. Ogni capo è leggermente unico.",
    notes: "Tintura vegetale · 120 pezzi · Zip YKK riciclata.",
    sizes: SIZES, sizeGuide: true, colors: ["Grigio nebbia"],
    image: makeImage("#e4e6e3", "#8f9a93", "NEBBIA", "hoodie")
  },
  {
    id: 8, name: "Pantaloni Cargo Canvas", category: "Pantaloni", price: 79, available: true, limited: false,
    description: "Cargo in canvas di cotone organico, taglio rilassato, tasche laterali capienti e vita regolabile.",
    notes: "100% cotone organico · Bottoni in corozo · Vestibilità relaxed.",
    sizes: SIZES, sizeGuide: true, colors: ["Oliva", "Nero", "Sabbia"],
    image: makeImage("#e6e0cf", "#5b6a43", "CARGO", "pants")
  },
  {
    id: 9, name: "Jogger Organic Fleece", category: "Pantaloni", price: 64, available: true, limited: false,
    description: "Jogger comodi in felpato organico, polsini elastici e coulisse in cotone.",
    notes: "100% cotone organico · Tasche con zip nascosta.",
    sizes: SIZES, sizeGuide: true, colors: ["Grigio melange", "Nero"],
    image: makeImage("#e9e4da", "#6d6d6a", "JOGGER", "pants")
  },
  {
    id: 10, name: "Cappellino 6 pannelli", category: "Accessori", price: 24, available: true, limited: false,
    description: "Cappellino in twill di cotone organico con chiusura regolabile in metallo riciclato.",
    notes: "Taglia unica · Ricamo frontale.",
    sizes: null, sizeGuide: false, colors: ["Verde bosco", "Nero", "Sabbia"],
    image: makeImage("#eae3d3", "#2f4a3a", "CAP", "cap")
  },
  {
    id: 11, name: "Tote Bag Radice", category: "Accessori", price: 16, available: true, limited: false,
    description: "Borsa in tela di cotone organico con manici lunghi. Per la spesa, il lavoro, tutto.",
    notes: "Capienza 12 L · Lavabile in lavatrice.",
    sizes: null, sizeGuide: false, colors: null,
    image: makeImage("#ece6d8", "#b8a88a", "TOTE", "tote")
  },
  {
    id: 12, name: "Calze Pack da 3", category: "Accessori", price: 18, available: true, limited: false,
    description: "Tre paia di calze in cotone organico con punta e tallone rinforzati.",
    notes: "80% cotone organico · 18% poliammide riciclata · 2% elastan.",
    sizes: ["36-40", "41-45"], sizeGuide: false, colors: ["Nero", "Bianco naturale"],
    image: makeImage("#e8e3d8", "#555a55", "SOCKS", "socks")
  }
];
