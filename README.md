# RADICE — Ethical Streetwear

E-commerce di nicchia per un brand di abbigliamento sostenibile e streetwear etico, realizzato da **PMA AGENCY** (Classe 5ª Informatica) per le committenti Prof.ssa Valentina Villani e Anna de Vincentiis.

> Questo README viene aggiornato a ogni funzionalità: ogni sezione è stata scritta nella Pull Request che introduce la parte di codice che descrive.

## 1. Il brand
**RADICE** propone capi essenziali in **cotone organico certificato GOTS**, prodotti in Portogallo con filiera trasparente. Il catalogo comprende T-shirt, felpe, pantaloni e accessori, con **edizioni limitate** numerate e mai ristampate. Il tono è diretto e urbano: *«Vesti forte. Pesa leggero sul pianeta.»*

- Palette: nero inchiostro, verde bosco, argilla e bianco osso.
- Spedizione gratuita oltre 50 €, resi entro 30 giorni.

## 2. Team — PMA AGENCY
| Membro | Ruolo |
|---|---|
| Abdul | Responsabile di progetto & Lead JS Developer |
| Piergiorgio | CSS Designer |
| Ibraimi | Git & QA Specialist |

Tutti i componenti contribuiscono attivamente allo sviluppo del codice.

## 3. Organizzazione del lavoro
- **Briefing:** Daily Stand-up all'inizio di ogni lezione di laboratorio; ogni incontro è documentato in [`docs/verbali/`](docs/verbali/).
- **Workflow Git: GitHub Flow**
  - `main` è sempre stabile: **vietati i push diretti**.
  - Un ramo per ogni funzionalità o fix: `feat/…`, `fix/…`, `style/…`, `docs/…`.
  - Commit atomici con prefissi `feat:`, `fix:`, `style:`, `docs:`.
  - Merge solo tramite Pull Request approvata da almeno un altro componente.

## 4. Stack tecnologico
HTML5 · CSS3 (Grid, Flexbox, variabili CSS) · JavaScript vanilla (ES6+). Nessun framework né dipendenza esterna.

## 5. Catalogo dinamico (`feat/catalogo-dinamico`)
La pagina `index.html` contiene solo lo scheletro: **nessun prodotto è scritto in HTML**. I 12 articoli sono definiti come array di oggetti in [`js/products.js`](js/products.js) e vengono mostrati via JavaScript.

Ogni prodotto ha: `id`, `name`, `category`, `price`, `available` (disponibilità), `limited` (edizione limitata), `description`, `notes` (materiali), `sizes`, `colors`, `sizeGuide` e `image`.

| Categoria | Prodotti |
|---|---|
| T-shirt | Tee Radice Basic, Tee Oversize «Terra», Tee «Alba» (limited), Tee «Marea» (limited, esaurita) |
| Felpe | Hoodie Essential, Girocollo Riciclata, Zip Hoodie «Nebbia» (limited) |
| Pantaloni | Cargo Canvas, Jogger Organic Fleece |
| Accessori | Cappellino 6 pannelli, Tote Bag, Calze pack da 3 |

Le immagini sono SVG generati da una funzione (`makeImage`), così il sito funziona anche offline e senza file esterni.
Per aggiungere un prodotto basta aggiungere un oggetto all'array `PRODUCTS`.
