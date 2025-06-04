// qr.js
import QRCode from 'qrcode'

fetch('/qr')
  .then(res => res.json())
  .then(data => {
    if (data.qr) {
      QRCode.toCanvas(document.getElementById('qrcode'), data.qr, error => {
        if (error) console.error(error);
      });
    } else {
      alert('No QR available');
    }
  });
