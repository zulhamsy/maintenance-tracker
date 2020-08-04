const $ = x => document.querySelector(x);

// UI Controller
const UI = (function() {
  function show(fetch) {
    let html = '';

    fetch.forEach((item,index) => {
      html +=
        `
			<tr>
			 <th scope="row" id="item-${item.id}">${index+1}</th>
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
const Storage = (function() {

})();

// Data Controller
const Data = (function() {
  let data = [
    { id: 1, date: '08/01/2020', distance: 15 },
    { id: 2, date: '08/02/2020', distance: 20 },
    { id: 3, date: '08/03/2020', distance: 88 }
		];
	
	// function on construction
	function _generateID() {
		return Math.floor(Math.random() * 10);
	}
	
	function _toLocal(data) {
		
	}
		
	function process(input) {
		let input = input;
		// give ID
		input.id = Data._generateID;
		// Store to LS
		Data._toLocal(input);
	}

  return {
    log: data,
    process
  }
})();

// App Controller
const App = (function() {
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
  	Data.process(data);
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