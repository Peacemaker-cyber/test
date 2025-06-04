// mega.js

// Generate a Unique Session ID
function generateSessionID() {
  const prefix = 'PEACE';
  const now = new Date();
  const timestamp = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase(); // 8 random chars
  return `${prefix}-${timestamp}-${randomPart}`;
}

// Store or Load Session ID
function getOrCreateSessionID() {
  let sessionID = sessionStorage.getItem('peaceSessionID');
  if (!sessionID) {
    sessionID = generateSessionID();
    sessionStorage.setItem('peaceSessionID', sessionID);
  }
  return sessionID;
}

// Display Session ID in console or on page (optional)
const sessionID = getOrCreateSessionID();
console.log("Session ID:", sessionID);

// Optional: Display it in an HTML element with id="session-id"
const display = document.getElementById('session-id');
if (display) {
  display.textContent = sessionID;
}
