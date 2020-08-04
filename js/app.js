const $ = x => document.querySelector(x);

// UI Controller
const UI = (function () {
  function show(fetch) {
    let html = '';

    fetch.forEach((item, index) => {
      html +=
        `
			<tr>
			 <th scope="row" id="item-${item.id}">${index + 1}</th>
			 <td>${item.date}</td>
			 <td>${item.distance}</td>
			</tr>
			`;
    });

    $('tbody').innerHTML = html;
  }

  function get() {
    return {
      date: $('#date').value,
      distance: Number($('#distance').value)
    }
  }

  return {
    show,
    get
  }
})();

// LocalStorage Controller
const Storage = (function () {
  // Private Method
  function _getData() {
    return localStorage.getItem('localdata');
  }

  function _setData(data) {
    return localStorage.setItem('localdata', data);
  }

  function _toParse(data) {
    return JSON.parse(data);
  }

  function _toString(data) {
    return JSON.stringify(data);
  }

  // Public Method
  function storeData(jsonData) {
    let localData = [];
    if (_getData()) {
      // fetch data first
      localData = _getData();
      // parse to object
      localData = _toParse(localData);
    }
    // push new data to local
    localData.push(jsonData);
    // set to localStorage
    _setData(_toString(localData));
  }

  return {
    storeData
  }
})();

// Data Controller
const Data = (function () {
  let data = [
    { id: 1, date: '08/01/2020', distance: 15 },
    { id: 2, date: '08/02/2020', distance: 20 },
    { id: 3, date: '08/03/2020', distance: 88 }
  ];

  // Private Method
  function _generateID() {
    return Math.floor(Math.random() * 10);
  }

  // Public Method
  function process(input) {
    let data = input;
    // give ID
    data.id = _generateID();
    return data;
  }

  return {
    log: data,
    process
  }
})();

// App Controller
const App = (function () {
  function init() {
    // fetch data from DataController
    let fetch = Data.log;
    // pass data to UIController
    UI.show(fetch);
  }

  function submitForm() {
    // get data from UI
    let data = UI.get();
    // pass data to DC to proccess
    data = Data.process(data);
    // store data to LS
    Storage.storeData(data);
  }

  return {
    init,
    submitForm
  }
})();

// App initialize
App.init();

// Users submit form
$('form').addEventListener('submit', e => {
  // run app controller to proccess
  App.submitForm();

  e.preventDefault();
})