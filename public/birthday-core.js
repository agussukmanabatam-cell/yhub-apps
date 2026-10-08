/* birthday-core.js — satu sumber logika ulang tahun (widget + Y-Hub) */
(function (root) {
  const MONTH_NAMES = {
    januari:1, jan:1, january:1, februari:2, feb:2, february:2, maret:3, mar:3, march:3,
    april:4, apr:4, mei:5, may:5, juni:6, jun:6, june:6, juli:7, jul:7, july:7,
    agustus:8, agu:8, ags:8, aug:8, august:8, september:9, sep:9, sept:9,
    oktober:10, okt:10, oct:10, october:10, november:11, nov:11, desember:12, des:12, dec:12, december:12
  };
  const pad2 = n => String(n).padStart(2, '0');
  const isLeap = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const daysInMonth = (m, y) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
  const keyOf = (m, d) => pad2(m) + '-' + pad2(d);

  function parseDate(str) {
    const s = String(str || '').trim();
    let day, month, m;
    if ((m = s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/))) {
      month = +m[2]; day = +m[3];
    } else if ((m = s.match(/^(\d{1,2})[-\/.](\d{1,2})(?:[-\/.]\d{2,4})?$/))) {
      day = +m[1]; month = +m[2];
      if (month > 12 && day <= 12) { const t = day; day = month; month = t; }
    } else if ((m = s.match(/^(\d{1,2})\s+([A-Za-z]+)\.?(?:\s+\d{2,4})?$/))) {
      day = +m[1]; month = MONTH_NAMES[m[2].toLowerCase()];
    } else return null;
    if (!month || month < 1 || month > 12 || !day || day < 1) return null;
    if (day > daysInMonth(month, 2000)) return null;
    return { month, day };
  }

  function effective(month, day, year) {
    if (month === 2 && day === 29 && !isLeap(year)) return { month: 2, day: 28 };
    return { month, day };
  }

  function parseCSVRow(str) {
    const arr = []; let quote = false, col = '';
    for (let i = 0; i < str.length; i++) {
      const c = str[i], n = str[i + 1];
      if (c === '"' && quote && n === '"') { col += '"'; i++; continue; }
      if (c === '"') { quote = !quote; continue; }
      if (c === ',' && !quote) { arr.push(col.trim()); col = ''; continue; }
      col += c;
    }
    arr.push(col.trim());
    return arr;
  }

  function parseCSV(text) {
    const rows = [], seen = new Set();
    String(text).split(/\r?\n/).forEach((line, i) => {
      line = line.trim();
      if (!line) return;
      if (i === 0 && /^nama|^name|^tanggal|^date/i.test(line)) return;
      const c = parseCSVRow(line);
      if (c.length < 2 || !c[0] || !c[1]) return;
      const d = parseDate(c[1]);
      if (!d) return;
      const k = c[0].toLowerCase() + '|' + keyOf(d.month, d.day);
      if (seen.has(k)) return;
      seen.add(k);
      rows.push({ name: c[0], month: d.month, day: d.day });
    });
    return rows;
  }

  function index(rows, year) {
    const map = {};
    rows.forEach(r => {
      const e = effective(r.month, r.day, year);
      const k = keyOf(e.month, e.day);
      (map[k] = map[k] || []).push({ name: r.name, month: e.month, day: e.day, m0: r.month, d0: r.day });
    });
    return map;
  }

  const todayKey = (now = new Date()) => keyOf(now.getMonth() + 1, now.getDate());

  function daysUntil(month, day, now = new Date()) {
    if (!month || month < 1 || month > 12 || !day || day < 1) return { days: 9999, target: null };
    const y = now.getFullYear();
    const t0 = Date.UTC(y, now.getMonth(), now.getDate());
    for (const yr of [y, y + 1]) {
      const e = effective(month, day, yr);
      const t = Date.UTC(yr, e.month - 1, e.day);
      if (t >= t0) return { days: Math.round((t - t0) / 86400000), target: new Date(yr, e.month - 1, e.day) };
    }
    return { days: 9999, target: null };
  }

  function nextOne(rows, now = new Date()) {
    let best = null;
    rows.forEach(r => {
      const i = daysUntil(r.month, r.day, now);
      if (!best || i.days < best.days) best = { ...i, name: r.name, month: r.month, day: r.day };
    });
    return best;
  }

  root.Birthday = { pad2, isLeap, parseDate, parseCSV, effective, index, todayKey, daysUntil, nextOne, keyOf };
})(typeof window !== 'undefined' ? window : globalThis);
