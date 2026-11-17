/* RADICE — logica e-commerce (JavaScript vanilla, nessun framework) */

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.9;
const CART_KEY = "radice_cart_v1";

/* ---------- Stato ---------- */
const state = {
  category: "all",
  sort: "none",
  query: "",
  cart: loadCart(),
  currentProduct: null
};

/* ---------- Utility ---------- */
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
const escapeHTML = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.productId && i.qty > 0) : [];
  } catch {
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  } catch {
    /* localStorage non disponibile: il carrello resta in memoria */
  }
}
function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- Catalogo, filtri, ricerca ---------- */
function initFilters() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  const select = $("#category-filter");
  categories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
  select.addEventListener("change", (e) => { state.category = e.target.value; renderProducts(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });
  $("#search").addEventListener("input", (e) => { state.query = e.target.value.trim().toLowerCase(); renderProducts(); });
}

function getVisibleProducts() {
  let list = PRODUCTS.filter((p) => {
    const matchCat = state.category === "all" || p.category === state.category;
    const haystack = `${p.name} ${p.description} ${p.notes} ${p.category} ${(p.colors || []).join(" ")} ${p.limited ? "limited limitata" : ""}`.toLowerCase();
    return matchCat && (!state.query || haystack.includes(state.query));
  });
  if (state.sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}

function renderProducts() {
  const grid = $("#product-grid");
  const list = getVisibleProducts();
  grid.innerHTML = list.map((p) => `
    <article class="card ${p.available ? "" : "sold-out"}">
      <button class="card-img" data-open="${p.id}" aria-label="Dettagli di ${escapeHTML(p.name)}">
        <img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy">
        ${p.available ? "" : '<span class="ribbon">Esaurito</span>'}
        ${p.available && p.limited ? '<span class="ribbon ribbon-limited">Limited</span>' : ""}
      </button>
      <div class="card-body">
        <span class="tag">${escapeHTML(p.category)}</span>
        <h3>${escapeHTML(p.name)}</h3>
        <p class="price">${fmt(p.price)}</p>
        <button class="btn btn-outline" data-open="${p.id}">Dettagli</button>
      </div>
    </article>`).join("");
  $("#empty-state").hidden = list.length > 0;
  $("#results-count").textContent = `${list.length} prodott${list.length === 1 ? "o" : "i"}`;
}

/* ---------- Modale dettaglio ---------- */
function fillSelect(wrapSel, selectSel, values) {
  const wrap = $(wrapSel);
  const sel = $(selectSel);
  if (values && values.length) {
    sel.innerHTML = values.map((v) => `<option>${escapeHTML(v)}</option>`).join("");
    wrap.hidden = false;
  } else {
    sel.innerHTML = "";
    wrap.hidden = true;
  }
}

function openProduct(id) {
  const p = getProduct(id);
  if (!p) return;
  state.currentProduct = p;
  $("#modal-img").src = p.image;
  $("#modal-img").alt = p.name;
  $("#modal-category").textContent = p.category;
  $("#modal-limited").hidden = !p.limited;
  $("#modal-title").textContent = p.name;
  $("#modal-desc").textContent = p.description;
  $("#modal-notes").textContent = p.notes;
  $("#modal-price").textContent = fmt(p.price);

  fillSelect("#modal-size-wrap", "#modal-size", p.sizes);
  $("#size-guide-open").hidden = !p.sizeGuide;
  fillSelect("#modal-color-wrap", "#modal-color", p.colors);

  $("#modal-add").hidden = !p.available;
  $("#modal-unavailable").hidden = p.available;
  $("#product-modal").showModal();
}

/* ---------- Carrello ---------- */
function addToCart(product, size, color) {
  const existing = state.cart.find(
    (i) => i.productId === product.id && i.size === size && i.color === color
  );
  if (existing) existing.qty += 1;
  else state.cart.push({ productId: product.id, size, color, qty: 1 });
  saveCart();
  renderCart();
}

function changeQty(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart.splice(index, 1);
  saveCart();
  renderCart();
}

function removeItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  renderCart();
}

function computeTotals() {
  const subtotal = state.cart.reduce((sum, i) => {
    const p = getProduct(i.productId);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  // Rimuove eventuali prodotti non più presenti o non più disponibili
  state.cart = state.cart.filter((i) => {
    const p = getProduct(i.productId);
    return p && p.available;
  });

  const container = $("#cart-items");
  if (state.cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Il carrello è vuoto.<br>Scegli un capo per iniziare!</p>';
  } else {
    container.innerHTML = state.cart.map((item, idx) => {
      const p = getProduct(item.productId);
      const variant = [item.size ? `Taglia ${item.size}` : "", item.color || ""].filter(Boolean).join(" · ");
      return `
      <div class="cart-item">
        <img src="${p.image}" alt="">
        <div class="cart-item-info">
          <strong>${escapeHTML(p.name)}</strong>
          ${variant ? `<small>${escapeHTML(variant)}</small>` : ""}
          <span>${fmt(p.price)}</span>
          <div class="qty">
            <button data-qty="${idx}" data-delta="-1" aria-label="Diminuisci quantità">&minus;</button>
            <span>${item.qty}</span>
            <button data-qty="${idx}" data-delta="1" aria-label="Aumenta quantità">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <strong>${fmt(p.price * item.qty)}</strong>
          <button class="btn-link" data-remove="${idx}">Rimuovi</button>
        </div>
      </div>`;
    }).join("");
  }

  const { subtotal, shipping, total } = computeTotals();
  $("#cart-subtotal").textContent = fmt(subtotal);
  $("#cart-shipping").textContent = shipping === 0 && subtotal > 0 ? "Gratuita" : fmt(shipping);
  $("#cart-total").textContent = fmt(total);

  const hint = $("#shipping-hint");
  if (subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD) {
    hint.textContent = `Aggiungi ${fmt(FREE_SHIPPING_THRESHOLD - subtotal)} per la spedizione gratuita!`;
  } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    hint.textContent = "Hai diritto alla spedizione gratuita 🎉";
  } else {
    hint.textContent = "";
  }

  const count = state.cart.reduce((n, i) => n + i.qty, 0);
  $("#cart-badge").textContent = count;
  $("#cart-badge").classList.toggle("empty", count === 0);
  $("#checkout-btn").disabled = state.cart.length === 0;
  $("#clear-btn").hidden = state.cart.length === 0;
}

function openCart() {
  $("#cart-drawer").classList.add("open");
  $("#cart-drawer").setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
  document.body.classList.add("no-scroll");
}
function closeCart() {
  $("#cart-drawer").classList.remove("open");
  $("#cart-drawer").setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
  document.body.classList.remove("no-scroll");
}

/* ---------- Checkout ---------- */
const validators = {
  name: (v) => (v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5 ? "" : "Inserisci nome e cognome."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Inserisci un indirizzo email valido."),
  address: (v) => (v.trim().length >= 5 && /\d/.test(v) ? "" : "Inserisci via e numero civico."),
  city: (v) => (v.trim().length >= 2 ? "" : "Inserisci la città."),
  cap: (v) => (/^\d{5}$/.test(v.trim()) ? "" : "Il CAP deve avere 5 cifre."),
  payment: (v) => (v ? "" : "Seleziona un metodo di pagamento.")
};

function validateField(form, name) {
  const msg = validators[name](form.elements[name].value);
  form.querySelector(`[data-error-for="${name}"]`).textContent = msg;
  form.elements[name].classList.toggle("invalid", Boolean(msg));
  return !msg;
}

function openCheckout() {
  closeCart();
  $("#checkout-total").textContent = fmt(computeTotals().total);
  $("#checkout-view").hidden = false;
  $("#confirm-view").hidden = true;
  $("#checkout-modal").showModal();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const results = Object.keys(validators).map((n) => validateField(form, n));
  if (results.includes(false)) {
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  const orderId = "RD-" + Date.now().toString(36).toUpperCase();
  $("#order-id").textContent = orderId;
  $("#order-email").textContent = form.elements.email.value.trim();
  $("#checkout-view").hidden = true;
  $("#confirm-view").hidden = false;

  // Svuota il carrello dopo l'ordine
  state.cart = [];
  saveCart();
  renderCart();
  form.reset();
}

/* ---------- Eventi ---------- */
function initEvents() {
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) return openProduct(Number(open.dataset.open));

    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) return closeBtn.closest("dialog").close();

    const qty = e.target.closest("[data-qty]");
    if (qty) return changeQty(Number(qty.dataset.qty), Number(qty.dataset.delta));

    const rm = e.target.closest("[data-remove]");
    if (rm) return removeItem(Number(rm.dataset.remove));
  });

  // Chiusura dialog cliccando sullo sfondo
  document.querySelectorAll("dialog").forEach((d) =>
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); })
  );

  $("#size-guide-open").addEventListener("click", () => $("#size-modal").showModal());

  $("#modal-add").addEventListener("click", () => {
    const p = state.currentProduct;
    if (!p || !p.available) return;
    const size = p.sizes ? $("#modal-size").value : null;
    const color = p.colors ? $("#modal-color").value : null;
    addToCart(p, size, color);
    $("#product-modal").close();
    toast(`«${p.name}» aggiunto al carrello`);
    openCart();
  });

  $("#cart-toggle").addEventListener("click", openCart);
  $("#cart-close").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  $("#clear-btn").addEventListener("click", () => {
    state.cart = [];
    saveCart();
    renderCart();
  });
  $("#checkout-btn").addEventListener("click", openCheckout);

  const form = $("#checkout-form");
  form.addEventListener("submit", handleCheckoutSubmit);
  Object.keys(validators).forEach((n) =>
    form.elements[n].addEventListener("blur", () => validateField(form, n))
  );
}

/* ---------- Avvio ---------- */
initFilters();
initEvents();
renderProducts();
renderCart();
