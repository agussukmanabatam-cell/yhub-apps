// ============================================
// AUTH GUARD — Shared Session Logic
// ============================================

const SESSION_KEY = 'yhub_session';
const SESSION_DAYS = 30;

function saveSession(data) {
    const session = {
        nik: data.nik,
        nama: data.nama,
        hirarki: data.hirarki,
        deviceId: data.deviceId,
        loginAt: Date.now(),
        expiresAt: data.remember 
            ? Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 
            : null
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
}

function getSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const s = JSON.parse(raw);
        if (s.expiresAt && Date.now() > s.expiresAt) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }
        return s;
    } catch {
        return null;
    }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('deviceId');
}

function requireLogin() {
    const s = getSession();
    if (!s) {
        window.location.replace('/');
        return null;
    }
    return s;
}

function redirectIfLoggedIn() {
    const s = getSession();
    if (s) {
        window.location.replace('/home.html');
        return true;
    }
    return false;
}

function logout() {
    clearSession();
    window.location.replace('/');
}
