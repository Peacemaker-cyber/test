import express from 'express';
import pkg from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { fileURLToPath } from 'url';
import path from 'path';

const { useSingleFileAuthState, DisconnectReason, makeWASocket } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
