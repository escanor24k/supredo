
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "modeSwitchButton fa-regular fa-lightbulb" : "modeSwitchButton fa-solid fa-lightbulb";
  // const newCte = isDark ? " Dark" : " Light"
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("class", newCta);
  buttonEl.innerText = "";
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });


button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
}); 