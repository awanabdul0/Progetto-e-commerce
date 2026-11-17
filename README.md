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

## 6. Design e responsività (`style/layout-responsive`)
Il foglio di stile [`css/style.css`](css/style.css) definisce l'identità del brand con variabili CSS (`--ink`, `--forest`, `--clay`, `--bone`) e tipografia sans-serif in maiuscolo per un look streetwear.

- **CSS Grid** per la griglia prodotti (`repeat(auto-fill, minmax(240px, 1fr))`) e per la barra dei valori del brand.
- **Flexbox** per header, barra dei filtri, drawer del carrello e righe del riepilogo.
- **Breakpoint:** 860 px (valori a 2 colonne), 720 px (catalogo a 2 colonne, modale a colonna singola, form a una colonna), 420 px (catalogo a 1 colonna).
- Accessibilità: `:focus-visible` evidente, contrasto elevato, `prefers-reduced-motion` rispettato.
- Badge «Limited» e «Esaurito» sulle card; tabella della guida alle taglie con scroll orizzontale su schermi stretti.

## 7. Filtri, ricerca e dettaglio prodotto (`feat/filtri-dettaglio-prodotto`)
La logica è in [`js/app.js`](js/app.js), con un unico oggetto `state` che contiene filtro, ordinamento, ricerca e carrello.

- **Filtro per categoria:** il menu è generato automaticamente dalle categorie presenti nei dati.
- **Ordinamento per prezzo:** crescente o decrescente.
- **Ricerca in tempo reale:** a ogni tasto cerca in nome, descrizione, materiali, categoria e colori (es. «nero», «oversize», «limited»). I tre controlli si combinano tra loro.
- **Modale di dettaglio** (`<dialog>`): immagine, descrizione, materiali, selezione di **taglia** e **colore** (solo se il prodotto li prevede) e pulsante «Aggiungi al carrello». Se il prodotto è esaurito il pulsante lascia il posto al messaggio «Attualmente non disponibile».
- **Guida alle taglie:** seconda modale con tabella di misure (petto, lunghezza, spalle da XS a XXL), apribile dal link accanto al menu delle taglie.
- Tutti i testi dei dati passano da `escapeHTML` prima di essere inseriti nel DOM.

## 8. Carrello interattivo e persistente
- **Drawer laterale** che si apre dal pulsante in header (o automaticamente dopo l'aggiunta di un prodotto) e si chiude con la X, cliccando fuori o con `Esc`. Il **badge** nell'header mostra il numero totale di pezzi e si aggiorna in tempo reale.
- Ogni riga è identificata da **prodotto + taglia + colore**: la stessa maglia in due taglie diverse resta su due righe distinte.
- Pulsanti **+ / −** per le quantità (a 0 la riga viene rimossa), «Rimuovi» e «Svuota carrello».
- **Calcolo automatico:** subtotale, spedizione e totale. La spedizione costa **4,90 €** ed è **gratuita da 50 €** di subtotale; un messaggio indica quanto manca per ottenerla.
- **Persistenza:** il carrello è salvato in `localStorage` (chiave `radice_cart_v1`) a ogni modifica e ricaricato all'avvio. Se `localStorage` non è disponibile o i dati sono corrotti, il sito riparte con un carrello vuoto senza errori. I prodotti non più a catalogo o diventati esauriti vengono tolti dal carrello.
