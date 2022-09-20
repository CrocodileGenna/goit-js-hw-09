
const start = document.querySelector("button[data-start]");
const body = document.querySelector("body")
const stop = document.querySelector("button[data-stop]");
let intervalColor;
start.addEventListener('click', randomColorBody)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomColorBody(){
  intervalColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.setAttribute('disabled', true)
  stop.removeAttribute('disabled')
}

stop.addEventListener('click', () => {
  clearInterval(intervalColor)
  stop.setAttribute('disabled', true)
  start.removeAttribute('disabled')
})
stop.setAttribute('disabled', true)