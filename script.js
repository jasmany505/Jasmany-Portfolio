document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copy");
  const discord = document.getElementById("discord");
  const status = document.getElementById("status");

  if (copyButton && discord && status) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(discord.textContent.trim());
        status.textContent = "Discord copiado correctamente.";
      } catch (error) {
        status.textContent = "Copia manualmente: " + discord.textContent.trim();
      }
    });
  }

  // Minijuego 1: Gato vs Ratón
  const mouseStart = document.getElementById("mouse-start");
  const mouseTarget = document.getElementById("mouse-target");
  const mouseArena = document.getElementById("mouse-arena");
  const mouseScore = document.getElementById("mouse-score");
  const mouseTime = document.getElementById("mouse-time");
  const mouseMessage = document.getElementById("mouse-message");
  let score = 0;
  let timeLeft = 20;
  let mouseTimer = null;
  let mousePlaying = false;

  function moveMouse() {
    if (!mouseArena || !mouseTarget) return;
    const maxX = Math.max(10, mouseArena.clientWidth - mouseTarget.offsetWidth - 10);
    const maxY = Math.max(10, mouseArena.clientHeight - mouseTarget.offsetHeight - 55);
    mouseTarget.style.left = Math.round(10 + Math.random() * (maxX - 10)) + "px";
    mouseTarget.style.top = Math.round(10 + Math.random() * (maxY - 10)) + "px";
  }

  function endMouseGame() {
    mousePlaying = false;
    clearInterval(mouseTimer);
    mouseTimer = null;
    mouseTarget.disabled = true;
    mouseMessage.textContent = "¡Tiempo terminado! Conseguistes " + score + " puntos.";
    mouseStart.textContent = "Jugar de nuevo";
  }

  if (mouseStart && mouseTarget && mouseArena) {
    mouseStart.addEventListener("click", () => {
      clearInterval(mouseTimer);
      score = 0;
      timeLeft = 20;
      mousePlaying = true;
      mouseScore.textContent = score;
      mouseTime.textContent = timeLeft;
      mouseTarget.disabled = false;
      mouseMessage.textContent = "¡Atrapa al ratón!";
      mouseStart.textContent = "Reiniciar juego";
      moveMouse();

      mouseTimer = setInterval(() => {
        timeLeft--;
        mouseTime.textContent = timeLeft;
        if (timeLeft <= 0) endMouseGame();
      }, 1000);
    });

    mouseTarget.addEventListener("click", () => {
      if (!mousePlaying) return;
      score++;
      mouseScore.textContent = score;
      moveMouse();
    });
  }

  // Minijuego 2: Parkour por checkpoints
  const parkourStart = document.getElementById("parkour-start");
  const parkourProgress = document.getElementById("parkour-progress");
  const parkourBest = document.getElementById("parkour-best");
  const parkourMessage = document.getElementById("parkour-message");
  const checkpoints = [...document.querySelectorAll(".checkpoint")];
  let currentCheckpoint = 0;
  let parkourStartTime = 0;
  let parkourPlaying = false;
  let bestTime = null;

  function resetParkour() {
    currentCheckpoint = 0;
    parkourPlaying = true;
    parkourStartTime = performance.now();
    parkourProgress.textContent = "0/5";
    parkourMessage.textContent = "Pulsa los checkpoints en orden.";
    checkpoints.forEach((checkpoint) => {
      checkpoint.classList.remove("done", "next");
      checkpoint.disabled = false;
    });
    if (checkpoints[0]) checkpoints[0].classList.add("next");
    parkourStart.textContent = "Reiniciar parkour";
  }

  if (parkourStart && checkpoints.length) {
    parkourStart.addEventListener("click", resetParkour);

    checkpoints.forEach((checkpoint) => {
      checkpoint.addEventListener("click", () => {
        if (!parkourPlaying) return;
        const selected = Number(checkpoint.dataset.checkpoint);
        if (selected !== currentCheckpoint + 1) {
          parkourMessage.textContent = "¡Orden incorrecto! Sigue el checkpoint " + (currentCheckpoint + 1) + ".";
          return;
        }

        currentCheckpoint++;
        checkpoint.classList.remove("next");
        checkpoint.classList.add("done");
        parkourProgress.textContent = currentCheckpoint + "/5";

        if (currentCheckpoint < checkpoints.length) {
          checkpoints[currentCheckpoint].classList.add("next");
          parkourMessage.textContent = "¡Bien! Ahora ve al checkpoint " + (currentCheckpoint + 1) + ".";
        } else {
          parkourPlaying = false;
          const elapsed = ((performance.now() - parkourStartTime) / 1000).toFixed(2);
          if (bestTime === null || Number(elapsed) < Number(bestTime)) {
            bestTime = elapsed;
            parkourBest.textContent = elapsed + "s";
          }
          parkourMessage.textContent = "¡Recorrido completado en " + elapsed + " segundos!";
          parkourStart.textContent = "Jugar de nuevo";
          checkpoints.forEach((item) => item.disabled = true);
        }
      });
    });
  }
});