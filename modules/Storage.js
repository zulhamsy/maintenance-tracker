export const Storage = (function() {
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

  function update(dataset) {
    const data = _toString(dataset);
    _setData(data);
  }

  return {
    storeData,
    pullData,
    update
  }
})();