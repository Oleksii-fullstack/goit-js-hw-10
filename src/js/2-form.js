
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css"

const feedbackForm = document.querySelector('.feedback-form');
const inputEmail = feedbackForm.querySelector('[name="email"]');
const textareaMessage = feedbackForm.querySelector('[name="message"]');


const formData = {
    email: "",
    message: "",
}

const FEEDBACK_FORM_STATE = "feedback-form-state";

feedbackForm.addEventListener('input', getFeedbackFormData);
feedbackForm.addEventListener('submit', onFormSubmit);

function getFeedbackFormData(event) {
    const email = event.currentTarget.elements.email.value.trim();
    const message = event.currentTarget.elements.message.value.trim();

    formData.email = email;
    formData.message = message;
    
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(formData));
}

function populateData() {
    const isData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
    if (!isData) {
        return
    } 
    formData.email = isData.email;
    formData.message = isData.message;
    inputEmail.value = isData.email;
    textareaMessage.value = isData.message;
}

populateData();

function onFormSubmit(event) {
    event.preventDefault();
    if (inputEmail.value === "" || textareaMessage.value === "") {
        // alert("«Fill please all fields»");
        iziToast.warning({
        title: 'Caution',
            message: '«Fill please all fields»',
            position: 'topRight',
            balloon: true,
            messageSize: 16,	
        });
        return;
    }
    console.log(formData);

    localStorage.removeItem(FEEDBACK_FORM_STATE);
    formData.email = "";
    formData.message = "";
    feedbackForm.reset();
}
