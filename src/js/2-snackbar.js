
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

const formEl = document.querySelector('.form');
const delayEl = formEl.querySelector('input[name="delay"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    const delay = delayEl.value;
    const state = formEl.elements.state.value;
    createPromise(delay, state)
        .then(resp => {
            iziToast.success({
                title: `✅  Fulfilled promise in ${resp}ms`,
                position: 'topRight',
                icon: '',
            })})
        .catch(error => {
            iziToast.error({
                title: `❌  Rejected promise in ${error}ms`,
                position: 'topRight',
                icon: '',
            })})
        .finally(() => formEl.reset());
}

function createPromise(delayEl, state) {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                res(delayEl);
            } else if (state === "rejected") {
                rej(delayEl);
            }
        }, delayEl);
    });
    return promise;
}

