import throttle from 'lodash.throttle';
import { STORAGE_KEY_FORM } from './common';

// const STORAGE_KEY_FORM = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onEmailMessageInput, 500));

dataFromLocalStorage();

function onFormSubmit(evt) {
  evt.preventDefault();

  const saveData = localStorage.getItem(STORAGE_KEY_FORM);
  console.log(JSON.parse(saveData));

  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY_FORM);
  formData = {};
}

function onEmailMessageInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function dataFromLocalStorage() {
  const savedDataForm = localStorage.getItem(STORAGE_KEY_FORM);

  if (savedDataForm) {
    const parseSavedDataForm = JSON.parse(savedDataForm);

    refs.form.email.value = parseSavedDataForm.email ?? '';
    refs.form.message.value = parseSavedDataForm.message ?? '';

    formData = { ...parseSavedDataForm };
  }
}
