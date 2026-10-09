// ============================================
// AUTH GUARD — Session + Device Lock (Heartbeat)
// ============================================

const SESSION_KEY = 'yhub_session';
const SESSION_DAYS = 30;
const HEARTBEAT_INTERVAL = 999999999; // sementara OFF
let heartbeatTimer = null;

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
    stopHeartbeat();
}

function requireLogin() {
    const s = getSession();
    if (!s) {
        window.location.replace('/');
        return null;
    }
    startHeartbeat(s);
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

function startHeartbeat(session) {
    if (heartbeatTimer) return;
    
    heartbeatTimer = setInterval(async () => {
        try {
            if (typeof firebase === 'undefined' || !window.__db) return;
            
            const docRef = window.__db.collection('users').doc(session.nik);
            const snap = await docRef.get();
            
            if (!snap.exists) {
                forceLogout('User tidak ditemukan');
                return;
            }
            
            const data = snap.data();
            if (data.deviceId && data.deviceId !== session.deviceId) {
                console.warn('[Heartbeat] Device lain login');
                forceLogout('Akun kamu login di device lain');
                return;
            }
            console.log('[Heartbeat] OK');
        } catch (err) {
            console.error('[Heartbeat] Error:', err);
        }
    }, HEARTBEAT_INTERVAL);
}

function stopHeartbeat() {
    if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }
}

function forceLogout(reason) {
    stopHeartbeat();
    clearSession();
    alert('🔒 ' + (reason || 'Sesi kamu berakhir') + '\n\nKamu bakal diarahkan ke halaman login.');
    window.location.replace('/');
}
