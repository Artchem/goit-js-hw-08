import throttle from 'lodash.throttle';
// console.log(localStorage);

// localStorage.setItem('my-name', JSON.stringify({ name: 'Artem', age: 36 }));

// const saveData = localStorage.getItem('my-name');
// console.log(saveData);

// const parsedData = JSON.parse(saveData);
// console.log(parsedData);
// localStorage.removeItem('my-name');

const STORAGE_KEY = 'feedback-form-state';

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
}

function onEmailMessageInput(evt) {
  const { email, message } = refs.form.elements;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: `${email.value}`, message: `${message.value}` })
  );
}

function dataFromLocalStorage() {
  const savedDataForm = localStorage.getItem(STORAGE_KEY);

  if (savedDataForm) {
    const parseSavedDataForm = JSON.parse(savedDataForm);

    refs.form.email.value = parseSavedDataForm.email;
    refs.form.message.value = parseSavedDataForm.message;
  }
}
