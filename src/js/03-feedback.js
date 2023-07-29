import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onEmailMessageInput, 500));

dataFromLocalStorage();

function onFormSubmit(evt) {
  evt.preventDefault();

  const saveData = localStorage.getItem(STORAGE_KEY);
  console.log(JSON.parse(saveData));

  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function onEmailMessageInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function dataFromLocalStorage() {
  const savedDataForm = localStorage.getItem(STORAGE_KEY);

  if (savedDataForm) {
    const parseSavedDataForm = JSON.parse(savedDataForm);

    refs.form.email.value = parseSavedDataForm.email ?? '';
    refs.form.message.value = parseSavedDataForm.message ?? '';

    formData = { ...parseSavedDataForm };
  }
}
