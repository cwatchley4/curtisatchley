"use strict";

/* Dark - Light Mode Toggle Button */

const button = document.querySelector("[data-theme-icon]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
// const buttonIcon = document.querySelector("data-theme-icon");;

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const runColorMode = (fn) => {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  fn(query.matches);
  query.addEventListener("change", (event) => fn(event.matches));
};

runColorMode((isDarkMode) => {
  if (isDarkMode) {
    document.querySelector("html").setAttribute("data-theme", "dark");
    button.setAttribute("class", "fa-solid fa-sun");
    button.style["color"] = "#ff901b";
  } else {
    document.querySelector("html").setAttribute("data-theme", "light");
    button.style["color"] = "#333";
    button.setAttribute("class", "fa-solid fa-moon");
  }
});

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  } else {
    return "light";
  }
}

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

function updateButton(buttonEl, isDark) {
  const newIcon = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  buttonEl.setAttribute("class", newIcon);
  const iconColor = isDark
    ? (buttonEl.style["color"] = "#ff901b")
    : (buttonEl.style["color"] = "#333");
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton(button, newTheme === "dark");
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});

/* NAVBAR DROP DOWN MENU */

const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

const openDropDownMenu = function () {
  dropDownMenu.classList.add("open");
};

const closeDropDownMenu = function () {
  dropDownMenu.classList.remove("open");
};

// toggle-btn icon changes from bars to x
const changeToggleBtnIcon = function () {
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

// toggle-btn click event
toggleBtn.addEventListener("click", function () {
  !dropDownMenu.classList.contains("open")
    ? openDropDownMenu()
    : closeDropDownMenu();
  changeToggleBtnIcon();
});

// when drop down menu is open, click on main closes it
document.querySelector("main").addEventListener("click", function () {
  closeDropDownMenu();
  changeToggleBtnIcon();
});

// when drop down menu is open, esc key press closes it
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeDropDownMenu();
    changeToggleBtnIcon();
  }
});
