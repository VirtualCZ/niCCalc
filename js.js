function sendToConsole(event) {
  event.preventDefault();
  var input = document.getElementById("text-input").value;
  console.log(input);
  var output = document.getElementById("text-output");
  output.innerHTML = "Hello, " + input;
}

const toggleSwitch = document.querySelector("#theme-toggle");
let currentTheme = localStorage.getItem("theme");
const themeHref = document.getElementById("theme-style");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    themeHref.setAttribute("href", "dark-mode.css");
  } else {
    themeHref.setAttribute("href", "light-mode.css");
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeHref.setAttribute("href", "dark-mode.css");

    console.log("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeHref.setAttribute("href", "light-mode.css");

    console.log("light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
