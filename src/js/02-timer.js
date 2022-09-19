// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// import { set } from "lodash";
import Notiflix from 'notiflix';

const inputData = document.querySelector('input');
const buttonData = document.querySelector('button');

const dataSec = document.querySelector('span[data-seconds]');
const dataMin = document.querySelector('span[data-minutes]');
const dataHou = document.querySelector('span[data-hours]');
const dataDay = document.querySelector('span[data-days]');

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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // console.log({ days, hours, minutes, seconds })

  dataSec.innerHTML = seconds;
  dataMin.innerHTML = minutes;
  dataHou.innerHTML = hours;
  dataDay.innerHTML = days;
  
  return { days, hours, minutes, seconds };
}


// console.log(thruSumaTime)
buttonData.addEventListener('click', fnTaimer);

function fnTaimer(){
  buttonData.setAttribute('disabled', true)
  setInterval(()=>{
    const minMs = thruSumaTime[thruSumaTime.length - 1] - Date.now();
    convertMs(minMs);
  }, 1000)
}

buttonData.style.backgroundColor = "green";
buttonData.style.padding = "20px 40px";
buttonData.style.outline = "green solid 1px";