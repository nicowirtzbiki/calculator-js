const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const copyButton = document.getElementById("copyToClipboard");

//Limit keyboard on input
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  resultInput.value = "";
  resultInput.classList.remove("error");
  copyButton.innerText = "Copy";
  copyButton.classList.remove("success");
});

document.addEventListener("keydown", function (ev) {
  ev.preventDefault(); //doesn`t allow the default behavior (keybord to work)
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

document.getElementById("equal").addEventListener("click", calculate);

copyButton.addEventListener("click", function (ev) {
  if (copyButton.innerText === "Copy") {
    copyButton.innerText = "Copied!";
    copyButton.classList.add("success");
    navigator.clipboard.writeText(resultInput.value); //what really copies
  } else {
    copyButton.innerText = "Copy";
    copyButton.classList.remove("success");
  }
});

function calculate() {
  copyButton.innerText = "Copy";
  copyButton.classList.remove("success");

  try {
    const result = eval(input.value);
    resultInput.value = result;
    resultInput.classList.remove("error");
  } catch (error) {
    resultInput.value = "ERROR";
    resultInput.classList.add("error");
  }
}

document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#d154ba");
    root.style.setProperty("--font-color", "#d154ba");
    root.style.setProperty("--primary-color", "#26834a");
    root.style.setProperty("--secondary-color", "#d154ba");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#a5ebd3");
    root.style.setProperty("--font-color", "#a5ebd3");
    root.style.setProperty("--primary-color", "#d0bef5");
    root.style.setProperty("--secondary-color", "#a5ebd3");
    main.dataset.theme = "dark";
  }
});
