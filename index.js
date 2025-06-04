import express from 'express';
import { Boom } from '@hapi/boom';
import makeWASocket, { useSingleFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';

const { state, saveState } = useSingleFileAuthState('./auth.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let sock;

async function startBot() {
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on('creds.update', saveState);
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) sock.qrCode = qr;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    }
  });
}

startBot();

app.get('/qr', (req, res) => {
  res.json({ qr: sock.qrCode || null });
});

app.post('/pair', (req, res) => {
  const { number } = req.body;
  // Custom logic here to trigger WhatsApp message
  res.json({ status: 'Pairing started for ' + number });
});

app.listen(PORT, () => console.log(`PEACE MD server running on ${PORT}`));
