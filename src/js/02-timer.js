import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputData = document.querySelector('input');
const buttonData = document.querySelector('button');
const dataSec = document.querySelector('span.value[data-seconds]');
const dataMin = document.querySelector('span.value[data-minutes]');
const dataHou = document.querySelector('span.value[data-hours]');
const dataDay = document.querySelector('span.value[data-days]');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0].getTime() <= Date.now()){
        buttonData.setAttribute('disabled', true)
        Notiflix.Notify.warning('Memento te hominem esse')
      }else{
        buttonData.removeAttribute('disabled')
        const sumaTime = selectedDates[0].getTime() - Date.now();
        convertMs(sumaTime);
        thruSumaTime.push(selectedDates[0].getTime());
      }
    },
  };
const thruSumaTime = [];

flatpickr(inputData, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  // console.log({ days, hours, minutes, seconds })
  renderMarckup({ days, hours, minutes, seconds })

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function renderMarckup({ days, hours, minutes, seconds }){
  dataSec.innerHTML = seconds;
  dataMin.innerHTML = minutes;
  dataHou.innerHTML = hours;
  dataDay.innerHTML = days;
}

buttonData.addEventListener('click', fnTaimer);

function fnTaimer(){
  buttonData.setAttribute('disabled', true);
  inputData.setAttribute('disabled', true);
  setInterval(()=>{
    const minMs = thruSumaTime[thruSumaTime.length - 1] - Date.now();
    convertMs(minMs);
  }, 1000)
}

// ---------------------------------------------------- //
const divTimer = document.querySelector(".timer");
const divField = document.querySelectorAll(".field");

divTimer.style.display = "flex";
divTimer.style.marginTop = "20px";

for(let key of divField){
  key.style.display = "flex"
  key.style.flexDirection = "column";
  key.style.marginRight = "25px";
  key.style.textAlign= "center";
}

buttonData.style.backgroundColor = "yellow";
buttonData.style.padding = "20px 40px";
buttonData.style.outline = "green solid 1px";
buttonData.style.borderRadius = "5px";