(() => {
    "use strict";

    const WA_URL = "https://wa.me/6288103716947";
    const THEME_KEY = "wc-theme";

    /* ============================================================
       1. PRODUCT DATA
    ============================================================ */
    const PRODUCTS = [
        { id: 1, name: "Classic Original", price: 7500, tag: "Evergreen", emoji: "🍪", image: "image/classic-original.jpg", desc: "Cookies klasik dengan rasa mentega dan cokelat yang seimbang. Hangat, renyah di luar, dan lembut di dalam." },
        { id: 2, name: "Choco Bomb", price: 10000, tag: "Best Seller", emoji: "🍫", image: "image/choco-bomb.jpg", desc: "Ledakan cokelat meleleh di setiap gigitan dengan potongan cokelat premium yang melimpah." },
        { id: 3, name: "Pistachio Kunafa", price: 24500, tag: "Premium", emoji: "🌰", image: "image/pistachio-kunafa.jpg", desc: "Perpaduan pistachio dan kunafa renyah, manis gurih yang mewah dan autentik." },
        { id: 4, name: "S'more's", price: 11500, tag: "Classic", emoji: "🍮", image: "image/smores.jpg", desc: "Marshmallow lembut, cokelat lumer, dan graham crackers. Nostalgia klasik dalam satu cookies." },
        { id: 5, name: "Macha Bomb", price: 11500, tag: "Matcha", emoji: "🍵", image: "image/macha-bomb.jpg", desc: "Matcha asli dengan perpaduan pahit manis yang creamy dan meleleh di mulut." },
        { id: 6, name: "Cloreo", price: 10000, tag: "Matcha", emoji: "💚", image: "image/cloreo.jpg", desc: "Matcha crunchy dengan remahan oreo yang gurih dan renyah di setiap gigitan." },
        { id: 7, name: "Double Chocolate", price: 10000, tag: "Chocolate", emoji: "🍫", image: "image/double-chocolate.jpg", desc: "Dobel cokelat: cokelat hitam dan choco chip menyatu dalam satu cookies." },
        { id: 8, name: "Clotus", price: 10000, tag: "Classic", emoji: "🤎", image: "image/clotus.jpg", desc: "Cookies dengan buttercream lembut dan aroma karamel lotus yang khas dan manis." },
        { id: 9, name: "Red Velvet Cheese", price: 10500, tag: "Creamy", emoji: "🍰", image: "image/red-velvet-cheese.jpg", desc: "Red velvet lembut dengan cream cheese yang creamy, manis, dan legit." },
        { id: 10, name: "Macha Green Tea", price: 9500, tag: "Matcha", emoji: "🍵", image: "image/macha-green-tea.jpg", desc: "Matcha green tea yang harum dengan tekstur lembut dan tingkat kemanisan yang pas." },
        { id: 11, name: "Signature Earl Grey", price: 19500, tag: "Signature", emoji: "🫖", image: "image/signature-earl-grey.jpg", desc: "Cookies dengan aroma floral earl grey dan buttery yang elegan dan menenangkan." },
        { id: 12, name: "Dubai Chewy Cookie", price: 36000, tag: "Premium", emoji: "👑", image: "image/dubai-chewy-cookie.jpg", desc: "Cookies premium khas Dubai: kenyal, mewah, dengan isian rich yang berkesan panjang." },
        { id: 13, name: "Signature Brookies", price: 19500, tag: "Signature", emoji: "🍩", image: "image/signature-brookies.jpg", desc: "Perpaduan brownie dan cookies dalam satu gigitan. Fudgy, padat, dan memanjakan." },
        { id: 14, name: "Signature Nutela", price: 19500, tag: "Signature", emoji: "🥜", image: "image/signature-nutela.jpg", desc: "Isian Nutella yang lumer dengan tekstur cookies lembut yang sempurna." },
        { id: 15, name: "Signature NY Chochip", price: 16500, tag: "Signature", emoji: "🍪", image: "image/signature-ny-chochip.jpg", desc: "New York style chochip cookies: tebal, chewy, dan cokelatnya melimpah." }
    ];

    const TESTIMONIALS = [
        { name: "Alya", text: "Cookies-nya enak banget, teksturnya lembut dan rasanya pas.", rating: 5 },
        { name: "Raka", text: "Choco Bomb-nya rich banget. Salah satu cookies favorit saya.", rating: 5 },
        { name: "Nadia", text: "Packaging-nya cantik dan cookies-nya fresh.", rating: 5 },
        { name: "Dimas", text: "Dubai Chewy Cookie-nya juara, rasa premium banget. Recommended!", rating: 5 },
        { name: "Salsa", text: "Suka banget sama Signature Nutela, lumer di mulut!", rating: 5 },
        { name: "Bagas", text: "Earl Grey-nya elegan, wanginya bikin ketagihan.", rating: 5 }
    ];

    /* ============================================================
       2. HELPERS
    ============================================================ */
    const fmtPrice = (n) => "Rp" + n.toLocaleString("id-ID");
    const waOrder = (name) => WA_URL + "?text=" + encodeURIComponent("Halo Website Cookies, saya ingin memesan " + name + " 🍪");

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ============================================================
       3. THEME (dark / light mode)
    ============================================================ */
    const themeToggle = $("#theme-toggle");
    const iconMoon = $("#icon-moon");
    const iconSun = $("#icon-sun");

    function applyTheme(theme) {
        document.documentElement.classList.toggle("dark", theme === "dark");
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
        renderThemeIcons();
    }

    function renderThemeIcons() {
        const dark = document.documentElement.classList.contains("dark");
        if (iconMoon) iconMoon.classList.toggle("hidden", dark);
        if (iconSun) iconSun.classList.toggle("hidden", !dark);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
            applyTheme(next);
        });
    }

    /* ============================================================
       4. NAVBAR: scroll state + mobile menu
    ============================================================ */
    const navbar = $("#navbar");
    const menuBtn = $("#menu-btn");
    const mobileMenu = $("#mobile-menu");

    function onNavScroll() {
        navbar.classList.toggle("scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden");
            menuBtn.setAttribute("aria-expanded", String(isHidden));
        });
    }
    $$(".menu-link").forEach((link) => link.addEventListener("click", closeMobileMenu));

    /* ============================================================
       5. SMOOTH SCROLL
    ============================================================ */
    function scrollToId(id) {
        const el = id === "#top" || id === "#" ? document.body : document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    $$("a[href^='#']").forEach((link) => {
        link.addEventListener("click", (e) => {
            const id = link.getAttribute("href");
            if (id.length > 1) {
                e.preventDefault();
                closeMobileMenu();
                scrollToId(id);
            }
        });
    });

    $$("[data-scroll]").forEach((btn) => {
        btn.addEventListener("click", () => scrollToId(btn.getAttribute("data-scroll")));
    });

    /* ============================================================
       6. RENDERING: products + testimonials
    ============================================================ */
    const grid = $("#products-grid");
    const emptyState = $("#empty-state");
    const productCount = $("#product-count");

    function placeholderHTML(emoji, alt) {
        return '<div class="img-ph" role="img" aria-label="' + (alt || "") + '"><span>' + emoji + "</span></div>";
    }

    function cardHTML(product, index) {
        const delay = (index % 8) * 45;
        return (
            '<article class="cookie-card reveal bg-[var(--card)] group cursor-pointer overflow-hidden rounded-3xl border border-[var(--border)] shadow-sm" ' +
            'data-id="' + product.id + '" role="button" tabindex="0" ' +
            'aria-label="Lihat detail ' + product.name + ', ' + fmtPrice(product.price) + '" ' +
            'style="transition-delay:' + delay + 'ms">' +
            '<div class="cookie-img-box relative aspect-[4/3] overflow-hidden">' +
            '<img class="cookie-img h-full w-full object-cover" src="' + product.image + '" alt="' + product.name +
            '" loading="lazy">' +
            "</div>" +
            '<div class="p-5">' +
            '<h3 class="font-display text-lg font-semibold">' + product.name + "</h3>" +
            '<div class="mt-1.5 flex items-center justify-between">' +
            '<p class="text-[15px] font-semibold text-[var(--accent-strong)]">' + fmtPrice(product.price) + "</p>" +
            '<span class="grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition group-hover:translate-x-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">' +
            '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
            "</span>" +
            "</div>" +
            "</div>" +
            "</article>"
        );
    }

    function attachImageFallbacks(scope) {
        $$("img.cookie-img", scope).forEach((img) => {
            img.addEventListener("error", () => {
                const box = img.closest(".cookie-img-box");
                if (!box || box.querySelector(".img-ph")) return;
                const product = PRODUCTS.find((p) => p.image === img.getAttribute("src")) ||
                    PRODUCTS.find((p) => p.name === img.getAttribute("alt"));
                const emoji = product ? product.emoji : "🍪";
                img.remove();
                box.insertAdjacentHTML("afterbegin", placeholderHTML(emoji, img.getAttribute("alt")));
            }, { once: true });
        });
    }

    function renderProducts(items) {
        grid.innerHTML = items.length
            ? items.map(cardHTML).join("")
            : "";

        attachImageFallbacks(grid);
        observeReveals({ forceToBottom: false });

        const total = PRODUCTS.length;
        productCount.textContent = items.length === 0
            ? "Tidak ada cookies yang cocok"
            : items.length === total
                ? total + " varian cookies"
                : items.length + " dari " + total + " varian cookies";

        emptyState.classList.toggle("hidden", items.length > 0);
    }

    function renderTestimonials() {
        const tGrid = $("#testimonials-grid");
        if (!tGrid) return;
        tGrid.innerHTML = TESTIMONIALS.map((t, i) => {
            const stars = Array.from({ length: t.rating }, () =>
                '<svg class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>'
            ).join("");
            return (
                '<figure class="reveal group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 transition hover:-translate-y-1.5 hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5"' +
                ' style="transition-delay:' + (i % 3) * 90 + 'ms">' +
                '<div class="flex gap-0.5">' + stars + "</div>" +
                '<blockquote class="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">"' + t.text + '"</blockquote>' +
                '<figcaption class="mt-5 flex items-center gap-3">' +
                '<span class="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">' +
                t.name.charAt(0) + "</span>" +
                '<span class="text-sm font-semibold">' + t.name + "</span>" +
                "</figcaption>" +
                "</figure>"
            );
        }).join("");
        observeReveals({ forceToBottom: false });
    }

    /* ============================================================
       7. SEARCH (by name and by price, realtime)
    ============================================================ */
    const searchInput = $("#search-input");

    function filterProducts(query) {
        const q = query.trim().toLowerCase();
        if (!q) return PRODUCTS.slice();

        const digits = q.replace(/\D/g, "");
        return PRODUCTS.filter((p) => {
            const nameMatch = p.name.toLowerCase().includes(q);
            const priceMatch = digits.length > 0 && String(p.price).includes(digits);
            return nameMatch || priceMatch;
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            renderProducts(filterProducts(searchInput.value));
        });
    }

    /* ============================================================
       8. PRODUCT DETAIL (reusable overlay + flying image)
    ============================================================ */
    const overlay = $("#detail-overlay");
    const detailMedia = $("#detail-media");
    const detailInfo = $("#detail-info");
    const detailTag = $("#detail-tag");
    const detailName = $("#detail-name");
    const detailPrice = $("#detail-price");
    const detailDesc = $("#detail-desc");
    const detailWa = $("#detail-wa");
    const detailClose = $("#detail-close");
    const detailBack = $("#detail-back");

    let lastCardRect = null;
    let closingTimer = null;

    function openDetail(id, cardEl) {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product || !overlay) return;

        if (closingTimer) {
            clearTimeout(closingTimer);
            closingTimer = null;
        }

        detailTag.textContent = product.tag || "Handmade";
        detailName.textContent = product.name;
        detailPrice.textContent = fmtPrice(product.price);
        detailDesc.textContent = product.desc;
        detailWa.href = waOrder(product.name);

        detailMedia.innerHTML = "";
        const img = document.createElement("img");
        img.className = "h-full w-full object-cover";
        img.alt = product.name;
        img.src = product.image;
        img.addEventListener("error", () => {
            if (detailMedia.querySelector(".img-ph")) return;
            detailMedia.innerHTML = placeholderHTML(product.emoji, product.name);
        }, { once: true });
        detailMedia.appendChild(img);

        detailMedia.style.transition = "none";
        detailMedia.style.transform = "none";
        detailInfo.classList.remove("in");

        let start = null;
        if (cardEl) {
            const box = cardEl.querySelector(".cookie-img-box");
            if (box) start = box.getBoundingClientRect();
        }
        lastCardRect = start;

        overlay.classList.remove("hidden");
        overlay.classList.add("open");
        document.body.classList.add("overflow-hidden");
        if (detailClose) detailClose.focus();

        if (start) {
            const end = detailMedia.getBoundingClientRect();
            const dx = start.left - end.left;
            const dy = start.top - end.top;
            const sx = start.width / end.width;
            const sy = start.height / end.height;

            requestAnimationFrame(() => {
                detailMedia.style.transformOrigin = "top left";
                detailMedia.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
                requestAnimationFrame(() => {
                    detailMedia.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
                    detailMedia.style.transform = "translate(0,0) scale(1)";
                });
            });
        } else {
            detailMedia.style.transformOrigin = "center";
            detailMedia.style.transform = "scale(0.92)";
            requestAnimationFrame(() => {
                detailMedia.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
                detailMedia.style.transform = "scale(1)";
            });
        }

        window.setTimeout(() => detailInfo.classList.add("in"), 300);
    }

    function closeDetail() {
        if (!overlay || !overlay.classList.contains("open")) return;

        overlay.classList.remove("open");

        if (lastCardRect) {
            const end = detailMedia.getBoundingClientRect();
            const dx = lastCardRect.left - end.left;
            const dy = lastCardRect.top - end.top;
            const sx = lastCardRect.width / end.width;
            const sy = lastCardRect.height / end.height;
            detailInfo.classList.remove("in");
            detailMedia.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
            detailMedia.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
        }

        closingTimer = window.setTimeout(() => {
            overlay.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
            detailMedia.style.transition = "none";
            detailMedia.style.transform = "none";
            closingTimer = null;
        }, lastCardRect ? 440 : 300);
    }

    grid.addEventListener("click", (e) => {
        const card = e.target.closest(".cookie-card");
        if (card) openDetail(Number(card.dataset.id), card);
    });

    grid.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const card = e.target.closest(".cookie-card");
        if (card) {
            e.preventDefault();
            openDetail(Number(card.dataset.id), card);
        }
    });

    [detailClose, detailBack].forEach((btn) => {
        if (btn) btn.addEventListener("click", closeDetail);
    });

    overlay.addEventListener("click", (e) => {
        if (closingTimer) return;
        if (!e.target.closest(".detail-panel")) closeDetail();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDetail();
    });

    /* ============================================================
       9. REVEAL / SCROLL ANIMATIONS
    ============================================================ */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    entry.target.style.transitionDelay = "";
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    function observeReveals(opts) {
        const root = opts && opts.root ? opts.root : document;
        $$(".reveal:not(.in)", root).forEach((el) => revealObserver.observe(el));
    }

    /* ============================================================
       10. FOOTER YEAR + INIT
    ============================================================ */
    const yearEl = $("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    renderProducts(PRODUCTS);
    renderTestimonials();
    renderThemeIcons();
})();