document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("copyDiscord").addEventListener("click", async () => {
  const button = document.getElementById("copyDiscord");
  try {
    await navigator.clipboard.writeText("jasmany202");
    button.textContent = "¡Copiado!";
    setTimeout(() => button.textContent = "Copiar Discord", 1800);
  } catch {
    button.textContent = "Discord: jasmany202";
  }
});

// Minijuego 1: Aura Hunt
const auraOrb = document.getElementById("auraOrb");
const auraScore = document.getElementById("auraScore");
const auraReset = document.getElementById("auraReset");
let auraPoints = 0;

function moveAura() {
  const arena = auraOrb.parentElement;
  const maxX = Math.max(0, arena.clientWidth - auraOrb.offsetWidth - 8);
  const maxY = Math.max(0, arena.clientHeight - auraOrb.offsetHeight - 8);
  auraOrb.style.left = `${Math.random() * maxX}px`;
  auraOrb.style.top = `${Math.random() * maxY}px`;
}
function catchAura() {
  auraPoints += 1;
  auraScore.textContent = auraPoints;
  moveAura();
}
auraOrb.addEventListener("click", catchAura);
auraReset.addEventListener("click", () => {
  auraPoints = 0;
  auraScore.textContent = "0";
  moveAura();
});
window.addEventListener("resize", moveAura);
moveAura();

// Minijuego 2: Gato vs. Ratón
const chaseArena = document.getElementById("chaseArena");
const cat = document.getElementById("cat");
const mouse = document.getElementById("mouse");
const chaseScore = document.getElementById("chaseScore");
const chaseReset = document.getElementById("chaseReset");
let catX = 18, catY = 18, mouseX = 190, mouseY = 160, chasePoints = 0;
const step = 14;

function placeCharacter(element, x, y) {
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}
function keepInside(value, max) {
  return Math.max(4, Math.min(value, max));
}
function moveMouse() {
  const maxX = Math.max(4, chaseArena.clientWidth - 42);
  const maxY = Math.max(4, chaseArena.clientHeight - 42);
  mouseX = Math.random() * maxX;
  mouseY = Math.random() * maxY;
  placeCharacter(mouse, mouseX, mouseY);
}
function checkCatch() {
  const distance = Math.hypot(catX - mouseX, catY - mouseY);
  if (distance < 35) {
    chasePoints += 1;
    chaseScore.textContent = chasePoints;
    moveMouse();
  }
}
function moveCat(dx, dy) {
  const maxX = Math.max(4, chaseArena.clientWidth - 46);
  const maxY = Math.max(4, chaseArena.clientHeight - 46);
  catX = keepInside(catX + dx, maxX);
  catY = keepInside(catY + dy, maxY);
  placeCharacter(cat, catX, catY);
  checkCatch();
}
chaseArena.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const controls = {
    arrowup: [0, -step], w: [0, -step],
    arrowdown: [0, step], s: [0, step],
    arrowleft: [-step, 0], a: [-step, 0],
    arrowright: [step, 0], d: [step, 0]
  };
  if (controls[key]) {
    event.preventDefault();
    moveCat(...controls[key]);
  }
});
chaseArena.addEventListener("pointerdown", (event) => {
  const rect = chaseArena.getBoundingClientRect();
  const targetX = event.clientX - rect.left;
  const targetY = event.clientY - rect.top;
  moveCat(targetX > catX ? step : -step, targetY > catY ? step : -step);
  chaseArena.focus();
});
chaseReset.addEventListener("click", () => {
  catX = 18; catY = 18; chasePoints = 0;
  chaseScore.textContent = "0";
  placeCharacter(cat, catX, catY);
  moveMouse();
});
placeCharacter(cat, catX, catY);
placeCharacter(mouse, mouseX, mouseY);

// Interacciones dinámicas del portafolio
const cursorGlow = document.getElementById("cursorGlow");
const toast = document.getElementById("toast");
const interactionCountEl = document.getElementById("interactionCount");
const visitCountEl = document.getElementById("visitCount");
const liveClock = document.getElementById("liveClock");
const dynamicMessage = document.getElementById("dynamicMessage");
const randomMessage = document.getElementById("randomMessage");
let interactions = 0;

function registerInteraction() {
  interactions += 1;
  if (interactionCountEl) interactionCountEl.textContent = interactions;
}
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
document.addEventListener("mousemove", (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});
document.querySelectorAll("a,button").forEach((element) => {
  element.addEventListener("click", () => {
    registerInteraction();
  });
});
if (visitCountEl) {
  const sessionVisits = Number(sessionStorage.getItem("jasmanyVisits") || "0") + 1;
  sessionStorage.setItem("jasmanyVisits", String(sessionVisits));
  visitCountEl.textContent = sessionVisits;
}
function updateClock() {
  if (liveClock) liveClock.textContent = new Date().toLocaleTimeString("es-EC", {hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
updateClock();
setInterval(updateClock, 1000);

const messages = [
  "Gracias por visitar mi portafolio. 🦊",
  "La constancia convierte las ideas en proyectos.",
  "Sistema de soporte preparado para la comunidad.",
  "Explora mis proyectos de bots de Discord.",
  "Cada interacción suma experiencia."
];
if (randomMessage) {
  randomMessage.addEventListener("click", () => {
    dynamicMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    showToast("Mensaje actualizado");
  });
}
