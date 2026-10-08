// ==========================================
// Y-HUB APP — app.js (v4 — Event & Birthday)
// ==========================================

// 1. ICON SVG
const Icons = {
    home:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`,
    cart:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>`,
    lady:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`,
    money:    `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    shirt:    `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>`,
    wrench:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`,
    cake:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v4M8 3v4M16 3v4M3 11h18"/>`,
    calendar: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
    users:    `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>`,
    chart:    `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
    bottle:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M5 9a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 9v6a2 2 0 002 2h10a2 2 0 002-2V9"/>`,
    info:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    doc:      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
    join:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>`,
    chevron:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>`,
};

// 2. MENU UTAMA
const homeMenu = [
    { id: 'penjualan',   label: 'Penjualan',   img: '/assets/menu/penjualan.png' },
    { id: 'yakult-lady', label: 'Yakult Lady', img: '/assets/menu/yakult-lady.png' },
    { id: 'kompensasi',  label: 'Kompensasi',  img: '/assets/menu/kompensasi.png' },
    { id: 'seragam',     label: 'Seragam',     img: '/assets/menu/seragam.png' },
    { id: 'breakdown',   label: 'Breakdown',   img: '/assets/menu/breakdown.png' },
    { id: 'birthday',    label: 'Birthday',    img: '/assets/menu/birthday.png' },
    { id: 'event',       label: 'Event',       img: '/assets/menu/event.png' },
    { id: 'prospek',     label: 'Prospek',     img: '/assets/menu/prospek.png' },
    { id: 'join-team',   label: 'Join Team',   img: '/assets/menu/join-team.png' },
];

// 3. MENU LAPORAN
const reportMenu = [
    { id: 'ceklist',           label: 'Ceklist TKU',        icon: 'doc',    grad: 'from-blue-500 to-blue-600' },
    { id: 'lap-mingguan-staf', label: 'Lap. Mingguan Staf', icon: 'chart',  grad: 'from-indigo-500 to-indigo-600' },
    { id: 'lap-mingguan-ceko', label: 'Lap. Mingguan Ceko', icon: 'chart',  grad: 'from-violet-500 to-violet-600' },
    { id: 'lap-join-ceko',     label: 'Lap. Join Ceko',     icon: 'doc',    grad: 'from-fuchsia-500 to-fuchsia-600' },
    { id: 'apk-tukar-botol',   label: 'Tukar Botol',        icon: 'bottle', grad: 'from-teal-500 to-teal-600' },
    { id: 'informasi',         label: 'Informasi',          icon: 'info',   grad: 'from-sky-500 to-sky-600' },
    { id: 'report',            label: 'Report',             icon: 'doc',    grad: 'from-slate-500 to-slate-600' },
];

// 4. SIDEBAR MENU
const navMenu = [
    { id: 'home', label: 'Home', icon: 'home', color: 'text-pink-500' },
    ...homeMenu.map(m => ({ id: m.id, label: m.label, icon: 'cart', color: 'text-gray-600', img: m.img })),
    ...reportMenu.map(m => ({ id: m.id, label: m.label, icon: m.icon, color: 'text-gray-600', grad: m.grad })),
];

const bottomNavMenu = [
    { id: 'home',      label: 'Home',    icon: 'home',     color: 'text-pink-500' },
    { id: 'penjualan', label: 'Jual',    icon: 'cart',     color: 'text-red-500' },
    { id: 'event',     label: 'Event',   icon: 'calendar', color: 'text-orange-500' },
    { id: 'informasi', label: 'Info',    icon: 'info',     color: 'text-sky-500' },
    { id: 'report',    label: 'Report',  icon: 'doc',      color: 'text-blue-500' },
];

// 5. HELPER
function svgIcon(name, className = "w-6 h-6") {
    return `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${Icons[name] || Icons.info}</svg>`;
}

// 6. CARD BUILDERS
function createAppCard(item, idx = 0) {
    return `
        <a href="#" onclick="navigateTo('${item.id}'); return false;" class="app-card fade-in-up" style="animation-delay: ${idx * 40}ms">
            <div class="icon-wrap">
                <img src="${item.img}" alt="${item.label}" loading="lazy">
            </div>
            <span class="label">${item.label}</span>
        </a>
    `;
}

function createReportCard(item, idx = 0) {
    return `
        <a href="#" onclick="navigateTo('${item.id}'); return false;" class="report-card fade-in-up" style="animation-delay: ${idx * 40}ms">
            <div class="icon-box bg-gradient-to-br ${item.grad}">
                ${svgIcon(item.icon)}
            </div>
            <span class="label">${item.label}</span>
            <svg class="chev" fill="none" stroke="currentColor" viewBox="0 0 24 24">${Icons.chevron}</svg>
        </a>
    `;
}

// 7. SIDEBAR & BOTTOM NAV
function buildSidebar() {
    const nav = document.getElementById('desktop-nav');
    nav.innerHTML = navMenu.map(item => {
        let iconHtml;
        if (item.img) {
            iconHtml = `<img src="${item.img}" class="w-full h-full object-cover rounded-lg">`;
        } else if (item.grad) {
            iconHtml = `<div class="w-full h-full bg-gradient-to-br ${item.grad} rounded-lg flex items-center justify-center text-white">${svgIcon(item.icon, "w-4 h-4")}</div>`;
        } else {
            iconHtml = `<span class="${item.color}">${svgIcon(item.icon, "w-4 h-4")}</span>`;
        }
        const bgClass = (item.img || item.grad) ? '' : 'bg-gray-50';
        return `
            <a href="#" onclick="navigateTo('${item.id}'); return false;" 
               class="nav-link flex items-center px-3 py-2.5 rounded-xl font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50"
               data-id="${item.id}">
                <div class="w-9 h-9 ${bgClass} rounded-lg flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
                    ${iconHtml}
                </div>
                <span class="font-heading text-sm">${item.label}</span>
            </a>
        `;
    }).join('');
}

function buildBottomNav() {
    const nav = document.getElementById('mobile-nav');
    nav.innerHTML = bottomNavMenu.map(item => `
        <button onclick="navigateTo('${item.id}')" 
                class="bottom-nav-link flex flex-col items-center justify-center w-full h-full text-gray-400 transition-colors"
                data-id="${item.id}">
            ${svgIcon(item.icon, "w-6 h-6")}
            <span class="font-heading text-[10px] mt-1 font-medium">${item.label}</span>
        </button>
    `).join('');
}

// 8. TEMPLATE HOME
const templates = {
    home: `
        <div class="space-y-6">
            <!-- Hero greeting -->
            <div class="fade-in-up" style="animation-delay: 0ms">
                <div class="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-5 shadow-lg shadow-red-200 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div class="absolute bottom-0 right-8 w-20 h-20 bg-white opacity-10 rounded-full -mb-10"></div>
                    <div class="relative z-10">
                        <p class="text-red-100 text-xs font-medium mb-1" id="dateText"></p>
                        <h2 class="font-heading text-xl font-bold text-white mb-1" id="greetingText">Selamat Datang! 👋</h2>
                        <p class="text-red-50 text-xs opacity-90">Portal internal Y-Hub App</p>
                    </div>
                </div>
            </div>

            <!-- Event & Birthday -->
            <div class="fade-in-up" style="animation-delay: 100ms">
                <div class="event-card">
                    <div class="info-box">
                        <div class="icon-circle bg-gradient-to-br from-orange-400 to-orange-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
                        </div>
                        <div style="min-width:0;">
                            <div class="label">Event Hari Ini</div>
                            <div class="value" id="event-val">Memuat...</div>
                        </div>
                    </div>
                    <div class="info-box">
                        <div class="icon-circle bg-gradient-to-br from-pink-400 to-pink-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13"/><rect x="4" y="9" width="16" height="12" rx="2"/><path d="M12 6c-1.5-2-3.5-3-5-2s-1 3 1 3M12 6c1.5-2 3.5-3 5-2s1 3-1 3"/></svg>
                        </div>
                        <div style="min-width:0;">
                            <div class="label">Birthday</div>
                            <div class="value" id="birthday-val">Memuat...</div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 ml-2 flex items-center gap-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Seragam:</span>
                    <span class="text-sm font-bold text-gray-700" id="seragam-val">Memuat...</span>
                </div>
            </div>

            <!-- Menu Utama -->
            <div>
                <h3 class="section-title">Menu Utama</h3>
                <div class="grid grid-cols-4 gap-3 md:gap-5">
                    ${homeMenu.map((item, i) => createAppCard(item, i)).join('')}
                </div>
            </div>

            <!-- Laporan & Lainnya -->
            <div>
                <h3 class="section-title">Laporan & Lainnya</h3>
                <div class="grid grid-cols-2 gap-3">
                    ${reportMenu.map((item, i) => createReportCard(item, i)).join('')}
                </div>
            </div>

            <div class="text-center pt-4 pb-2 fade-in-up" style="animation-delay: 400ms">
                <p class="text-[10px] text-gray-400 font-medium">Y-Hub App &copy; 2026</p>
            </div>
        </div>
    `,
};

// 9. PETA APP → FILE
const APP_PATHS = {
    'penjualan':         '/apps/penjualanbdl.html',
    'yakult-lady':       '/apps/kondisiyl.html',
    'kompensasi':        '/apps/kompenasasi.html',
    'seragam':           '/apps/seragam.html',
    'breakdown':         '/apps/breakdown.html',
    'birthday':          '/apps/birthday.html',
    'event':             '/apps/Event.html',
    'prospek':           '/apps/prospek.html',
    'join-team':         '/apps/penilaian-join.html',
    'ceklist':           '/apps/ceklist-tku.html',
    'lap-mingguan-staf': '/apps/lapmingguanstaf.html',
    'lap-mingguan-ceko': '/apps/lapmingguanceko.html',
    'lap-join-ceko':     '/apps/laporan-join-ceko.html',
    'apk-tukar-botol':   '/apps/pointplg.html',
    'informasi':         '/apps/Informasibdl.html',
    'report':            '/apps/report.html',
};

// 10. NAVIGASI
function navigateTo(pageId, pushHistory = true) {
    const contentArea = document.getElementById('app-content');
    contentArea.style.opacity = '0';
    
    if (pushHistory) {
        history.pushState({ page: pageId }, '', '#' + pageId);
    }
    
    setTimeout(() => {
        const isHome = (pageId === 'home');
        document.body.classList.toggle('app-fullscreen', !isHome);
        
        if (isHome) {
            contentArea.innerHTML = templates.home;
            setTimeout(initHomePage, 50);
        } else if (APP_PATHS[pageId]) {
            contentArea.innerHTML = `
                <iframe src="${APP_PATHS[pageId]}" 
                        class="w-full h-full border-0 bg-white fade-in"
                        style="display:block; width:100%; height:100%;"
                        loading="lazy"
                        title="App Content"></iframe>
            `;
        } else {
            const menu = navMenu.find(m => m.id === pageId);
            contentArea.innerHTML = `
                <div class="fade-in max-w-2xl mx-auto text-center py-12 px-4">
                    <h2 class="font-heading text-xl font-bold text-gray-700 mb-2">
                        ${menu ? menu.label : pageId}
                    </h2>
                    <p class="text-sm text-gray-500">Halaman ini belum tersedia.</p>
                    <button onclick="navigateTo('home')" class="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-full font-medium">
                        Kembali ke Home
                    </button>
                </div>
            `;
        }
        contentArea.style.opacity = '1';
        contentArea.scrollTop = 0;
        updateActiveNav(pageId);
    }, 150);
}

// 11. INIT HOME PAGE
function initHomePage() {
    const greeting = document.getElementById('greetingText');
    const dateEl = document.getElementById('dateText');
    
    if (greeting) {
        const h = new Date().getHours();
        let timeGreet = 'Selamat Datang';
        if (h < 11) timeGreet = 'Selamat pagi';
        else if (h < 15) timeGreet = 'Selamat siang';
        else if (h < 19) timeGreet = 'Selamat sore';
        else timeGreet = 'Selamat malam';
        
        const sess = (typeof getSession === 'function') ? getSession() : null;
        const nama = sess ? sess.nama.split(' ')[0] : '';
        greeting.textContent = nama ? `${timeGreet}, ${nama}! 👋` : `${timeGreet}! 👋`;
    }
    
    if (dateEl) {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const d = new Date();
        dateEl.textContent = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    loadEventData();
}

// 12. EVENT & BIRTHDAY DATA
const EVENT_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCp3DY8YrJP9Bmy1eO6-w6LJzuUj5Iq9cVNnPiJKjpF91Hcei7o4Q5-2i7rTQbrcmT6hCHotfTmU5u/pub?gid=1388278707&single=true&output=csv';
const BIRTHDAY_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCp3DY8YrJP9Bmy1eO6-w6LJzuUj5Iq9cVNnPiJKjpF91Hcei7o4Q5-2i7rTQbrcmT6hCHotfTmU5u/pub?gid=336207575&single=true&output=csv';

async function fetchCSV(url) {
    const response = await fetch(url + '&t=' + new Date().getTime());
    const text = await response.text();
    return text.split('\n').map(row => row.split(','));
}

async function loadEventData() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayStr1 = `${yyyy}-${mm}-${dd}`;
    const todayStr2 = `${dd}/${mm}/${yyyy}`;
    const dayMonthStr = `${dd}/${mm}`;

    try {
        const dataES = await fetchCSV(EVENT_CSV);
        let foundEvent = "Tidak ada";
        let foundSeragam = "Tidak ada";

        dataES.forEach((row, index) => {
            if (index === 0) return;
            let dateCol = row[8] ? row[8].trim() : "";
            if (dateCol === todayStr1 || dateCol === todayStr2 || dateCol.includes(dayMonthStr)) {
                if (row[5] && row[5].trim() !== "") foundEvent = row[5].trim();
                if (row[3] && row[3].trim() !== "") foundSeragam = row[3].trim();
            }
        });
        
        const eventEl = document.getElementById('event-val');
        const seragamEl = document.getElementById('seragam-val');
        if (eventEl) eventEl.innerText = foundEvent;
        if (seragamEl) seragamEl.innerText = foundSeragam;

        const dataB = await fetchCSV(BIRTHDAY_CSV);
        let bdays = [];
        dataB.forEach((row, index) => {
            if (index === 0) return;
            let bDate = row[1] ? row[1].trim() : "";
            if (bDate.includes(dayMonthStr)) {
                bdays.push(row[0]);
            }
        });
        
        const bdayEl = document.getElementById('birthday-val');
        if (bdayEl) bdayEl.innerText = bdays.length > 0 ? bdays.join(', ') : "Tidak ada";

    } catch (e) {
        console.error('Error loading event:', e);
        const eventEl = document.getElementById('event-val');
        const bdayEl = document.getElementById('birthday-val');
        const seragamEl = document.getElementById('seragam-val');
        if (eventEl) eventEl.innerText = '-';
        if (bdayEl) bdayEl.innerText = '-';
        if (seragamEl) seragamEl.innerText = '-';
    }
}

// 13. UPDATE ACTIVE NAV
function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-link').forEach(el => {
        const isActive = el.dataset.id === pageId;
        el.classList.toggle('bg-red-50', isActive);
        el.classList.toggle('text-red-600', isActive);
        el.classList.toggle('text-gray-600', !isActive);
    });
    document.querySelectorAll('.bottom-nav-link').forEach(el => {
        const isActive = el.dataset.id === pageId;
        el.classList.toggle('text-red-600', isActive);
        el.classList.toggle('text-gray-400', !isActive);
    });
}

// 14. BACK BUTTON
window.addEventListener('popstate', (e) => {
    const pageId = (e.state && e.state.page) || 'home';
    navigateTo(pageId, false);
});

// 15. INIT
document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    buildBottomNav();
    
    history.replaceState({ page: 'home' }, '', '#home');
    navigateTo('home', false);
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('[SW] Registered', reg.scope))
            .catch(err => console.log('[SW] Error', err));
    }
});