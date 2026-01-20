// Configuración global del bebé (podés editar estas variables)
window.BABY_CONFIG = {
  // "undefined" | "boy" | "girl"
  sex: "girl",

  // Carpeta de Google Drive general (por si alguna semana no está definida)
  driveBaseFolderUrl:
    "https://drive.google.com/drive/folders/TU_ID_DE_CARPETA_AQUI",

  /**
   * Configuración de Redis (Upstash)
   * 
   * Para obtener estas credenciales:
   * 1. Creá una cuenta en https://upstash.com/
   * 2. Creá una nueva base de datos Redis
   * 3. Copiá el REST URL y el Token
   * 4. Pegalos abajo
   * 
   * Si no configurás Redis, se usará almacenamiento en memoria local.
   */
  redis: {
    // REST URL de Upstash
    url: "https://healthy-jackass-26525.upstash.io",
    // Token de autenticación de Upstash
    token: "AWedAAIncDI3YTRmYzQ4ZDlhMjA0YmNkOGFlOGE4YmY5ZTljZTdlN3AyMjY1MjU",
  },
  
  
  /**
   * Array con la configuración de cada semana.
   * Completá / cambiá las URLs según tus carpetas reales de Drive.
   */
  weeks: [
    // Ejemplos; podés rellenar las que quieras del 1 al 40
    { week: 7, url: "https://drive.google.com/drive/u/0/folders/1QQilwfAmjNgykhGfPylK1DbnKn8sAUoP" },
    { week: 8, url: "https://drive.google.com/drive/u/0/folders/1VaD0gXWEpJ-ak9N4kfHuXwdHCskgVFux" },
    { week: 9, url: "https://drive.google.com/drive/u/0/folders/1mEurMstwB4wnXSmLVcaowjmTkaDzvtyg" },
    { week: 10, url: "https://drive.google.com/drive/u/0/folders/1k7KakZhWqRLDwdCtMANL4j6esVRp_Eak" },
    { week: 11, url: "https://drive.google.com/drive/u/0/folders/1YVJZJNBEIvON9AESNQSUWlWIpCibUPZs" },
    { week: 12, url: "https://drive.google.com/drive/u/0/folders/1pRmOpZQNvJBHOPAORxKLAK1P8Na8IUc3" },
    { week: 13, url: "https://drive.google.com/drive/u/0/folders/1led27ETK5wcj38pFBC5OvB9ff314q982" },
    { week: 14, url: "https://drive.google.com/drive/u/0/folders/1q6vT1D8-7X7S_ucD_yyUHkqmRuSEOvZ4" },
    { week: 15, url: "https://drive.google.com/drive/u/0/folders/1_-o_EmPI96ddbAITaWcgGzd7c4VT2Dgi" },
    { week: 16, url: "https://drive.google.com/drive/u/0/folders/1eNOeBwH_SWg2JAcdHnncNvdiIIVQHI7D" },
    { week: 17, url: "https://drive.google.com/drive/u/0/folders/1Ym0qC7xXeTVS3rj7WG3qAQFnFetuw3ZC" },
    { week: 18, url: "https://drive.google.com/drive/u/0/folders/1zsftOpgmoU-fqTfjWc8ASHBfJdIhuqLz" },
    { week: 19, url: "https://drive.google.com/drive/u/0/folders/1E9wdAJ9bF_S7rCunC3A48OKFWs1fVHst" },
    { week: 20, url: "https://drive.google.com/drive/u/0/folders/1hdkQJtqfBjbzBFmApBYrdFh5UQaNMi42" },
    { week: 21, url: "https://drive.google.com/drive/u/0/folders/1N-IgV6lW22E09P9DNkSsV41qrE0Ck46A" },
    
    // ...
  ],

  /**
   * Devuelve la URL de Drive para una semana concreta.
   * Si no hay entrada específica, usa la carpeta general.
   */
  getWeekUrl(week) {
    if (Array.isArray(this.weeks)) {
      const entry = this.weeks.find((w) => Number(w.week) === Number(week));
      if (entry && entry.url) {
        return entry.url;
      }
    }
    return this.driveBaseFolderUrl;
  },
};

// Fecha objetivo: 15 de mayo de 2026 (00:00 hora local)
const TARGET_DATE = new Date(2026, 4, 15, 0, 0, 0); // Mes 4 = mayo (0-indexed)

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const messageEl = document.getElementById("countdown-message");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !messageEl) {
    return;
  }

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    messageEl.textContent =
      "¡Nuestro bebé ya debería estar en nuestros brazos o a puntito de llegar!";
    messageEl.classList.add("countdown-message-ready");
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  // Cálculo en semanas + días (formato tipo "10s+2d")
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

  const shortFormat = `${weeks}s+${remainingDays}d`;

  messageEl.textContent = `Faltan ${shortFormat} (${days} día${
    days === 1 ? "" : "s"
  }) para conocer a nuestro bebé.`;
  messageEl.classList.remove("countdown-message-ready");
}

function createWeeksGrid() {
  const container = document.getElementById("weeks-grid");

  if (!container) {
    return;
  }

  for (let week = 1; week <= 40; week++) {
    const config = window.BABY_CONFIG || {};
    const hasCustomWeeks = Array.isArray(config.weeks) && config.weeks.length > 0;
    const weekIsDefined =
      hasCustomWeeks &&
      !!config.weeks.find((w) => Number(w.week) === Number(week));

    const wrapper = document.createElement("div");
    wrapper.className = "week-card";

    const text = `Semana ${week}`;

    if (weekIsDefined && typeof config.getWeekUrl === "function") {
      const link = document.createElement("a");
      link.className = "week-button week-button--active";
      link.textContent = text;
      link.href = config.getWeekUrl(week);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      wrapper.appendChild(link);
    } else {
      const button = document.createElement("button");
      button.type = "button";
      button.disabled = true;
      button.className = "week-button week-button--disabled";
      button.textContent = text;
      wrapper.appendChild(button);
    }

    container.appendChild(wrapper);
  }
}

function applyThemeFromGlobalSex() {
  const linkEl = document.getElementById("theme-style");
  const buttons = document.querySelectorAll(".gender-btn");
  if (!linkEl) return;

  const sex = window.BABY_CONFIG.sex || "undefined";

  if (sex === "boy") {
    linkEl.href = "style.boy.css";
  } else if (sex === "girl") {
    linkEl.href = "style.girl.css";
  } else {
    linkEl.href = "style.undefined.css";
  }

  // Sincronizar estado visual de los botones
  buttons.forEach((btn) => {
    const gender = btn.getAttribute("data-gender");
    if (gender === sex) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function setupGenderSwitcher() {
  const buttons = document.querySelectorAll(".gender-btn");
  const linkEl = document.getElementById("theme-style");

  if (!buttons.length || !linkEl) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const gender = btn.getAttribute("data-gender");
      if (!gender) return;

      // Actualizar variable global
      window.BABY_CONFIG.sex = gender;

      // Aplicar tema a partir de la variable global
      applyThemeFromGlobalSex();

      // Actualizar el nombre cuando cambia el sexo
      updateBabyName();
    });
  });
}

async function updateBabyName() {
  const nameEl = document.getElementById("baby-name");
  if (!nameEl || !window.BABY_NAMES) return;

  const name = window.BABY_NAMES.getBabyName();
  nameEl.textContent = name;
  await updateVoteButtons(name);
}

async function updateVoteButtons(currentName) {
  const voteUpBtn = document.getElementById("vote-up-btn");
  const voteDownBtn = document.getElementById("vote-down-btn");
  
  if (!voteUpBtn || !voteDownBtn) return;

  // Intentar obtener votos desde Redis, fallback a memoria local
  let votes = 0;
  if (window.REDIS_CLIENT) {
    votes = await window.REDIS_CLIENT.getNameVotesRedis(currentName);
  } else if (window.BABY_NAMES) {
    votes = window.BABY_NAMES.getNameVotes(currentName);
  }

  voteUpBtn.dataset.name = currentName;
  voteDownBtn.dataset.name = currentName;
  
  // Actualizar el texto del botón si hay votos
  if (votes > 0) {
    voteUpBtn.textContent = `👍 +1 (${votes})`;
  } else {
    voteUpBtn.textContent = "👍 +1";
  }
}

async function voteForCurrentName(vote) {
  const nameEl = document.getElementById("baby-name");
  if (!nameEl) return;

  const currentName = nameEl.textContent;
  if (!currentName || currentName === "...") return;

  // Intentar votar en Redis, fallback a memoria local
  if (window.REDIS_CLIENT) {
    await window.REDIS_CLIENT.voteForNameRedis(currentName, vote);
  } else if (window.BABY_NAMES) {
    window.BABY_NAMES.voteForName(currentName, vote);
  }

  await updateVoteButtons(currentName);
  await updateTopNames();

  // Luego de votar, pasamos al siguiente nombre
  updateBabyName();
}

async function updateTopNames() {
  const topNamesList = document.getElementById("top-names-list");
  if (!topNamesList) return;

  // Intentar obtener top desde Redis, fallback a memoria local
  let topNames = [];
  if (window.REDIS_CLIENT) {
    topNames = await window.REDIS_CLIENT.getTopNamesRedis(5);
  } else if (window.BABY_NAMES) {
    topNames = window.BABY_NAMES.getTopNames(5);
  }
  
  if (topNames.length === 0) {
    topNamesList.innerHTML = '<p class="no-votes-message">Aún no hay nombres votados</p>';
    return;
  }

  topNamesList.innerHTML = topNames
    .map(
      (entry, index) => `
        <div class="top-name-item">
          <span class="top-name-rank">${index + 1}.</span>
          <span class="top-name-text">${entry.name}</span>
          <span class="top-name-votes">${entry.votes} ${entry.votes === 1 ? "voto" : "votos"}</span>
        </div>
      `
    )
    .join("");
}

function showNamesExhaustedMessage(sex) {
  const messageEl = document.getElementById("names-exhausted-message");
  if (!messageEl) return;

  let mensaje = "";
  if (sex === "girl") {
    mensaje = "✨ ¡Último nombre de niña! Después de este se reiniciará la lista.";
  } else if (sex === "boy") {
    mensaje = "✨ ¡Último nombre de niño! Después de este se reiniciará la lista.";
  } else {
    mensaje = "✨ ¡Último nombre disponible! Después de este se reiniciará la lista.";
  }

  messageEl.textContent = mensaje;
  messageEl.classList.add("show");

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    messageEl.classList.remove("show");
  }, 5000);
}

async function setupNameSection() {
  // Inicializar Redis si está configurado
  const config = window.BABY_CONFIG || {};
  if (config.redis && window.REDIS_CLIENT) {
    // Verificar si hay configuración de Redis Cloud o Upstash
    const hasRedisCloud = config.redis.host && config.redis.port && config.redis.user && config.redis.password;
    const hasUpstash = config.redis.url && config.redis.token;
    
    if (hasRedisCloud || hasUpstash) {
      window.REDIS_CLIENT.initRedis(config.redis);
    }
  }

  const refreshBtn = document.getElementById("refresh-name-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      await updateBabyName();
    });
  }

  const voteUpBtn = document.getElementById("vote-up-btn");
  if (voteUpBtn) {
    voteUpBtn.addEventListener("click", async () => {
      await voteForCurrentName(1);
    });
  }

  const voteDownBtn = document.getElementById("vote-down-btn");
  if (voteDownBtn) {
    voteDownBtn.addEventListener("click", async () => {
      await voteForCurrentName(-1);
    });
  }

  // Listener para evento de nombres agotados
  document.addEventListener("baby-names-exhausted", (e) => {
    showNamesExhaustedMessage(e.detail.sex);
  });

  // Inicializar el nombre al cargar
  await updateBabyName();
  await updateTopNames();
}

document.addEventListener("DOMContentLoaded", () => {
  applyThemeFromGlobalSex();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  createWeeksGrid();
  setupGenderSwitcher();
  setupNameSection();
});

