const $ = x => document.querySelector(x);

// UI Controller
const UI = (function() {
  let tr = '';

  // Private Method
  function _childCount(parent) {
    return $(parent).childElementCount;
  }

  function show(fetch) {
    if (Array.isArray(fetch)) {
      fetch.forEach((item, index) => {
        tr = document.createElement('tr');
        tr.id = item.id
        tr.innerHTML =
          `
			 <th scope="row">${index + 1}</th>
			 <td>${item.date}</td>
			 <td>${item.distance} Km</td>
			`;
        $('tbody').appendChild(tr);
      });
    } else {
      tr = document.createElement('tr');
      tr.id = fetch.id;
      tr.innerHTML =
        `
        <th scope="row">${_childCount('tbody') + 1}</th>
    		<td>${fetch.date}</td>
    		<td>${fetch.distance} Km</td>
    		`;
      $('tbody').appendChild(tr);
    }
  }

  function get() {
    return {
      date: $('#date').value,
      distance: Number($('#distance').value)
    }
  }

  function clearForm() {
    $('#date').value = '';
    $('#distance').value = '';
  }

  return {
    show,
    get,
    clearForm
  }
})();

// LocalStorage Controller
const Storage = (function() {
  // Private Method
  function _getData() {
    return localStorage.getItem('localdata');
  }

  function _setData(data) {
    localStorage.setItem('localdata', data);
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
    let localData;
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
const Data = (function() {
  // Private Method
  function _generateID(length) {
    let result = '',
    		chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  // Public Method
  function process(input) {
    let data = input;
    // give ID
    data.id = _generateID(3);
    return data;
  }

  return {
    process
  }
})();

// App Controller
const App = (function() {
  function init() {
    // fetch data from DataController
    let fetch = Storage.pullData();
    if (!fetch) return;
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
    // clear form
    UI.clearForm();
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
});