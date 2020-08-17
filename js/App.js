import {UI} from '../modules/UI.js';
import {Data} from '../modules/Data.js';
import {Storage} from '../modules/Storage.js';

export const App = (function() {
  let editIdState;

  function init() {
    // fetch data from DataController
    let fetch = Storage.pullData();
    if (!fetch) return;
    // pass data to UIController
    UI.show(fetch);
    // count total distance
    const total = Data.countDistance(fetch);
    // pass to DC for calculate %
    const percent = Data.progressBar(total);
    // pass to UI
    UI.progressBar(percent);
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
    // change id state
    editIdState = id;
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

  function updateRecord() {
    if (editIdState) {
      // get data from UI
      const update = UI.get();
      // pull data from LS
      let dataset = Storage.pullData();
      // proceed to update data in DC
      Data.updateData(dataset, update, editIdState);
      // update data to LS
      Storage.update(dataset);
      // reset state
      document.location.reload();
      editIdState = undefined;
    }
  }

  function deleteRecord() {
    if (editIdState) {
      // pull data from LS
      let dataset = Storage.pullData();
      // proceed to deletion in DC
      Data.deleteData(dataset, editIdState);
      // update data to LS
      Storage.update(dataset);
      // reset state
      document.location.reload();
      editIdState = undefined;
    }
  }

  function cancelEdit() {
    UI.clearForm();
    UI.changeButton(false);
    editIdState = undefined;
  }

  return {
    init,
    submitForm,
    editRecord,
    updateRecord,
    deleteRecord,
    cancelEdit
  }
})();