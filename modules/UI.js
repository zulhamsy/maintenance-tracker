const $ = x => document.querySelector(x);

// UI Controller
export const UI = (function() {
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
    window.scrollTo(0, 0);
  }

  function displayToForm(data) {
    $('#date').value = data.date;
    $('#distance').value = data.distance;
  }

  function changeButton(editstate) {
    const submit = `<input class="btn btn-primary btn-block font-weight-bolder" type="submit" id="submit" value="Add Data">`;
    const edit = `<input class="btn btn-warning btn-block font-weight-bolder" type="button" id="update" value="Update Data">`;
    const del = `<input class="btn btn-outline-danger btn-block" type="button" id="delete" value="Delete">`;
    const cancel = `<input class="btn btn-light btn-block font-weight-light" type="button" id="cancel" value="Cancel">`

    if (editstate) {
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

  function progressBar(percent) {
    $('#prog-oli').style.width = `${percent.oliPercent}%`;
    $('#prog-belt').style.width = `${percent.beltPercent}%`;
    $('#prog-cvt').style.width = `${percent.cvtPercent}%`;
  }

  return {
    show,
    get,
    clearForm,
    scrollTop,
    displayToForm,
    changeButton,
    progressBar
  }
})();