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
			 <td><a href='#'>edit</a></td>
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
    		<td><a href='#'>edit</a></td>
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
  
  function scrollTop() {
  	window.scrollTo(0,0);
  }
  
  function displayToForm(data) {
		$('#date').value = data.date;
		$('#distance').value = data.distance;
  }
  
  function changeButton(editstate) {
  	const submit = `<input class="btn btn-primary btn-block font-weight-bolder" type="submit" value="Add Data">`;
  	const edit = `<input class="btn btn-warning btn-block font-weight-bolder" type="button" value="Update Data">`;
  	const del = `<input class="btn btn-outline-danger btn-block" type="button" value="Delete">`;
  	const cancel = `<input class="btn btn-light btn-block font-weight-light" type="button" value="Cancel">`
  	
  	if(editstate) {
  		// remove submit button
  		$('.btn').remove();
  		// add update button
  		$('#button-area').innerHTML = edit;
  		// add delete button
  		$('#button-area').innerHTML += del;
  		// add cancel button
  		$('#button-area').innerHTML += cancel;
  	} else {
  		// remove all button
  		$('.btn').remove();
  		// add submit button
  		$('#button-area').innerHTML = submit;
  	}
  }

  return {
    show,
    get,
    clearForm,
    scrollTop,
    displayToForm,
    changeButton
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
  
  function getDataById(source, id) {
  	for(let i = 0; i < source.length; i++) {
  		if(source[i].id == id) return source[i];
  	}
  }

  return {
    process,
    getDataById
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
  
  function editRecord(id) {
  	// scroll to top
  	UI.scrollTop();
  	// fetch from LS
  	const fetch = Storage.pullData();
  	// get data by id
  	const data = Data.getDataById(fetch, id);
  	// display record to form
  	UI.displayToForm(data);
  	// change button state
  	UI.changeButton(true);
  }

  return {
    init,
    submitForm,
    editRecord
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

// Users click edit button
$('tbody').addEventListener('click', (e) => {
	if(e.target.nodeName == 'A') {
		const target = e.target.parentNode.parentNode.id;
		App.editRecord(target);
	}
	e.preventDefault()
})