import {App} from './js/App.js';
const $ = (x) => document.querySelector(x);

// App initialize
App.init();

// Users click edit button
$('tbody').addEventListener('click', (e) => {
  if (e.target.nodeName == 'A') {
    const target = e.target.parentNode.parentNode.id;
    App.editRecord(target);
  }
  e.preventDefault()
});

// Users click button on edit state
$('#button-area').addEventListener('click', (e) => {
  const target = e.target.id;
  switch (target) {
    case 'submit':
      App.submitForm();
      break;
    case 'update':
      App.updateRecord();
      break;
    case 'delete':
      App.deleteRecord();
      break;
    case 'cancel':
      App.cancelEdit();
      break
  }
  e.preventDefault();
});