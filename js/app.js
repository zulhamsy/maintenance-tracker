const $ = x => document.querySelector(x);

// UI Controller
const UI = (function () {
  function show(fetch) {
    let tr = ''
    fetch.forEach((item, index) => {
      tr = document.createElement('tr');
      tr.innerHTML +=
        `
			 <th scope="row" id="item-${item.id}">${index + 1}</th>
			 <td>${item.date}</td>
			 <td>${item.distance}</td>
			`;
      $('tbody').appendChild(tr);
    });
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

  function pullData() {
    let localData = [];
    if (_getData()) {
      // fetch data first
      localData = _getData();
      // parse to object
      localData = _toParse(localData);
    }
    return localData;
  }

  return {
    storeData,
    pullData
  }
})();

// Data Controller
const Data = (function () {
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
    process
  }
})();

// App Controller
const App = (function () {
  function init() {
    // fetch data from DataController
    let fetch = Storage.pullData();
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
    // pass to view controller
    UI.show(data);
  }

  return {
    init,
    submitForm
  }
})();

// App initialize
App.init();

// Users submit form
$('form').addEventListener('submit', (e) => {
  // run app controller to proccess
  App.submitForm();

  e.preventDefault();
})