const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const STATUS_FILE = path.join(__dirname, 'status.json');
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// ---------- Statusi live (E lire / E zene) ----------

function loadState() {
  try {
    const raw = fs.readFileSync(STATUS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { occupied: false, changedAt: new Date().toISOString(), changedBy: null };
  }
}

function saveState(state) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(state, null, 2));
}

let state = loadState();

// ---------- Rezervimet (kalendari me terminet) ----------

function loadBookings() {
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

let bookings = loadBookings();

// Konverton "HH:MM" ne minuta nga mesnata, per krahasim te lehte
function toMinutes(hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + m;
}

function isValidTime(hhmm) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(String(hhmm));
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------- API: statusi live ----------

app.get('/api/status', (req, res) => {
  res.json(state);
});

app.post('/api/toggle', (req, res) => {
  const { occupied, name } = req.body;

  if (typeof occupied === 'boolean') {
    state.occupied = occupied;
  } else {
    state.occupied = !state.occupied;
  }
  state.changedAt = new Date().toISOString();
  state.changedBy = name || null;

  saveState(state);
  res.json(state);
});

// ---------- API: rezervimet ----------

// Merr rezervimet per nje date te caktuar: /api/bookings?date=2026-08-06
app.get('/api/bookings', (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Mungon parametri date (YYYY-MM-DD).' });
  }
  const dayBookings = bookings
    .filter(b => b.date === date)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  res.json(dayBookings);
});

// Krijo nje rezervim te ri
app.post('/api/bookings', (req, res) => {
  const { date, start, end, name, service } = req.body;

  if (!date || !isValidTime(start) || !isValidTime(end) || !name || !name.trim()) {
    return res.status(400).json({ error: 'Te dhena te pavlefshme. Kerkohen date, start, end (HH:MM) dhe emri.' });
  }

  const startMin = toMinutes(start);
  const endMin = toMinutes(end);

  if (endMin <= startMin) {
    return res.status(400).json({ error: 'Ora e mbarimit duhet te jete pas ores se fillimit.' });
  }

  const conflict = bookings.find(b =>
    b.date === date && overlaps(startMin, endMin, toMinutes(b.start), toMinutes(b.end))
  );

  if (conflict) {
    return res.status(409).json({
      error: `Ky interval perputhet me nje rezervim ekzistues: ${conflict.start}-${conflict.end} (${conflict.name}).`
    });
  }

  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    date,
    start,
    end,
    name: name.trim(),
    service: (service && String(service).trim()) || null,
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  saveBookings(bookings);
  res.status(201).json(booking);
});

// Fshi nje rezervim
app.delete('/api/bookings/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Rezervimi nuk u gjet.' });
  }
  bookings.splice(idx, 1);
  saveBookings(bookings);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Banjo Status po punon ne http://localhost:${PORT}`);
  console.log('Per t\'u hapur nga koleget ne rrjetin e zyres, perdorni IP-n e ketij kompjuteri, p.sh. http://192.168.1.X:' + PORT);
});
