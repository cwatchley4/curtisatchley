"use strict";

/* Dark - Light Mode Toggle Button */

// Select the button for switching themes
const button = document.querySelector("[data-theme-icon]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

// Helper function to check if system preference is dark mode
const isSystemDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply the correct theme and update the button icon
function applyTheme(theme) {
  document.querySelector("html").setAttribute("data-theme", theme);

  // Update button icon and color based on the applied theme
  if (theme === "dark") {
    button.setAttribute("class", "fa-solid fa-sun");
    button.style.color = "#ff901b"; // Set color for dark mode
  } else {
    button.setAttribute("class", "fa-solid fa-moon");
    button.style.color = "#333"; // Set color for light mode
  }
}

// Determine the initial theme (localStorage, system setting, or default to light)
function getInitialTheme() {
  if (localStorageTheme) {
    return localStorageTheme; // Use theme from localStorage if available
  }
  return isSystemDarkMode() ? "dark" : "light"; // Fallback to system preference
}

// Update theme in both localStorage and on the HTML element
function switchTheme() {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme); // Save the new theme in localStorage
  currentThemeSetting = newTheme;
  applyTheme(newTheme); // Apply the new theme
}

// Initialize the theme based on system preference or localStorage
let currentThemeSetting = getInitialTheme();
applyTheme(currentThemeSetting); // Apply initial theme when the page loads

// Add event listener for theme switch button
button.addEventListener("click", switchTheme);

// Also listen for system theme changes (if the user changes system preferences while the app is open)
systemSettingDark.addEventListener("change", (event) => {
  const newSystemTheme = event.matches ? "dark" : "light";
  localStorage.setItem("theme", newSystemTheme); // Optionally update localStorage with system preference
  currentThemeSetting = newSystemTheme;
  applyTheme(newSystemTheme); // Apply the new system theme
});

/* NAVBAR DROP DOWN MENU */

const toggleBtn = document.querySelector(".header__nav-toggle-btn");
const toggleBtnIcon = document.querySelector(".header__nav-toggle-btn i");
const dropDownMenu = document.querySelector(".header__nav-dropdown-menu");

const openDropDownMenu = function () {
  dropDownMenu.classList.add("header__nav-dropdown-menu--open");
};

const closeDropDownMenu = function () {
  dropDownMenu.classList.remove("header__nav-dropdown-menu--open");
};

// toggle-btn icon changes from bars to x
const changeToggleBtnIcon = function () {
  const isOpen = dropDownMenu.classList.contains(
    "header__nav-dropdown-menu--open"
  );
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

// toggle-btn click event
toggleBtn.addEventListener("click", function () {
  !dropDownMenu.classList.contains("header__nav-dropdown-menu--open")
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
