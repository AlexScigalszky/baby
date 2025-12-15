// Configuración global del bebé (podés editar estas variables)
window.BABY_CONFIG = {
  // "undefined" | "boy" | "girl"
  sex: "undefined",

  // Carpeta de Google Drive general (por si alguna semana no está definida)
  driveBaseFolderUrl:
    "https://drive.google.com/drive/folders/TU_ID_DE_CARPETA_AQUI",

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

function updateBabyName() {
  const nameEl = document.getElementById("baby-name");
  if (!nameEl || !window.BABY_NAMES) return;

  const name = window.BABY_NAMES.getBabyName();
  nameEl.textContent = name;
}

function setupNameSection() {
  const refreshBtn = document.getElementById("refresh-name-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      updateBabyName();
    });
  }

  // Inicializar el nombre al cargar
  updateBabyName();
}

document.addEventListener("DOMContentLoaded", () => {
  applyThemeFromGlobalSex();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  createWeeksGrid();
  setupGenderSwitcher();
  setupNameSection();
});

