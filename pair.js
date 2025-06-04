// pair.js
export function submitPair() {
  const number = document.getElementById('number').value;
  if (!number) return alert('Please enter a valid number');
  
  fetch('/pair', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ number })
  })
  .then(res => res.json())
  .then(data => alert(`Pairing initiated: ${data.status}`))
  .catch(err => alert('Error pairing: ' + err.message));
}
