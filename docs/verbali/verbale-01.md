# Verbale n. 1 — Kick-off

**Agenzia:** PMA AGENCY
**Progetto:** E-commerce di nicchia — Brand di Abbigliamento Sostenibile / Streetwear Etico («RADICE»)
**Committenti:** Prof.ssa Valentina Villani, Anna de Vincentiis
**Data:** 17/11/2026 (Giorno 1, laboratorio)
**Presenti:** Abdul, Ibraimi, Piergiorgio

## 1. Scelta del settore
Il gruppo sceglie il **Settore 2: Brand di Abbigliamento Sostenibile / Streetwear Etico** (capi in cotone organico, edizioni limitate, guida alle taglie). Nome del brand: **RADICE — Ethical Streetwear**.

## 2. Nome dell'agenzia
**PMA AGENCY**

## 3. Ruoli assegnati
| Membro | Ruolo |
|---|---|
| Abdul | Responsabile di progetto e Lead JS Developer |
| Piergiorgio | CSS Designer |
| Ibraimi | Git & QA Specialist |

Tutti i componenti contribuiscono attivamente alla scrittura del codice, indipendentemente dal ruolo.

## 4. Cadenza dei briefing
**Daily Stand-up** di 15 minuti all'inizio di ogni lezione di laboratorio. Ogni stand-up produce un verbale in `/docs/verbali`.

## 5. Flusso di lavoro Git: GitHub Flow
- `main` è sempre stabile e funzionante; **sono vietati i push diretti**.
- Ogni funzionalità o fix nasce da un ramo dedicato creato da `main`, con nome `tipo/descrizione-breve`
  (es. `feat/filtri-catalogo`, `fix/calcolo-spedizione`, `style/layout-responsive`, `docs/verbale-2`).
- Commit **atomici** con prefissi standard: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.
- Ogni ramo viene integrato tramite **Pull Request** verso `main`:
  - descrizione chiara di cosa cambia e come testarlo;
  - revisione e approvazione di **almeno un altro componente** del gruppo;
  - il revisore verifica funzionamento, leggibilità e rispetto delle convenzioni;
  - merge solo dopo approvazione; il ramo viene poi eliminato.
- Il Git & QA Specialist controlla che le regole siano rispettate e che `main` resti funzionante.

## 6. Attività concluse oggi
- Lettura e analisi del capitolato.
- Scelta del settore, del brand e del nome dell'agenzia.
- Assegnazione dei ruoli e scelta della cadenza dei briefing.
- Scelta del workflow Git.
- Creazione del repository GitHub, con tutti i componenti e la docente Villani come collaboratori.
- Struttura iniziale del progetto: `index.html`, `css/`, `js/`, `docs/verbali/`, `README.md`.

## 7. Compiti per la prossima sessione
| Chi | Compito |
|---|---|
| Abdul | Verificare catalogo dinamico, filtri/ricerca e carrello con `localStorage` |
| Piergiorgio | Rifinire identità visiva, palette e layout responsive |
| Ibraimi | Configurare protezione del ramo `main` e review obbligatoria su GitHub; testare il checkout e la guida alle taglie |

## 8. Criticità emerse
Nessuna criticità tecnica al momento. Da tenere d'occhio: gestione dello stato del carrello nel `localStorage` (varianti taglia/colore) e adattamento mobile.
