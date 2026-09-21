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

const auraOrb = document.getElementById("auraOrb");
const auraScore = document.getElementById("auraScore");
let score = 0;
function catchAura() {
  score += 1;
  auraScore.textContent = score;
  auraOrb.style.transform = `translate(${Math.random()*34-17}px, ${Math.random()*24-12}px)`;
}
auraOrb.addEventListener("click", catchAura);
auraOrb.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    catchAura();
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
const themeToggle = document.getElementById("themeToggle");
const welcomeButton = document.getElementById("welcomeButton");
const activityButton = document.getElementById("activityButton");
const activityStatus = document.getElementById("activityStatus");
const visitCount = document.getElementById("visitCount");

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("colorful");
  themeToggle.textContent = document.body.classList.contains("colorful")
    ? "🎨 Volver al rojo"
    : "🌈 Cambiar colores";
});

welcomeButton?.addEventListener("click", () => {
  document.body.classList.add("energy-mode");
  welcomeButton.textContent = "⚡ ¡Energía activada!";
  setTimeout(() => document.body.classList.remove("energy-mode"), 800);
  setTimeout(() => welcomeButton.textContent = "✨ Activar energía", 1800);
});

const statuses = [
  "Explorando nuevas ideas",
  "Preparando nuevos proyectos",
  "Mejorando la comunidad",
  "Creando herramientas para Discord",
  "Disponible para aprender"
];
let statusIndex = 0;
let visits = 1;
activityButton?.addEventListener("click", () => {
  statusIndex = (statusIndex + 1) % statuses.length;
  visits += 1;
  activityStatus.textContent = statuses[statusIndex];
  visitCount.textContent = visits;
});
