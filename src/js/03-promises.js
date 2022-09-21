import Notiflix from 'notiflix';

const href = {
    delayIn: document.querySelector('[name=delay]'),
    stepIn: document.querySelector('[name=step]'),
    amountIn: document.querySelector('[name=amount]'),
    butTon: document.querySelector("button")
    }

href.butTon.addEventListener('click', promiseCreate);

function promiseCreate(el){
    el.preventDefault();
    const delayVal = Number(href.delayIn.value);
    const stepVal = Number(href.stepIn.value);
    const amountVal = Number(href.amountIn.value);
    let delay = delayVal;
    for(let position = 1; position <= amountVal; position += 1){ 
        createPromise(position, delay)
        .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
        delay += stepVal;
    }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((Fulfill, Reject) => {
    setTimeout(() => { 
    if (shouldResolve) {
    Fulfill({position, delay});
    }else{
    Reject({position, delay});
    }
    }, delay)
 })
}
