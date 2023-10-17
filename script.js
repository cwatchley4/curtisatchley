"use strict";

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
