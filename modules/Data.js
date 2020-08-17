export const Data = (function() {
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
    for (let i = 0; i < source.length; i++) {
      if (source[i].id == id) return source[i];
    }
  }

  function updateData(dataset, update, id) {
    const index = dataset.findIndex(element => element.id == id);
    dataset[index].date = update.date;
    dataset[index].distance = update.distance;
    return dataset
  }

  function deleteData(dataset, id) {
    const index = dataset.findIndex(element => element.id == id);
    dataset.splice(index, 1);
  }

  function countDistance(data) {
    let dist = data.map(el => el.distance);
    return dist.reduce((acc, curr) => {
      return acc + curr;
    })
  }

  function progressBar(input) {
    const oli = 2000,
      belt = 4000,
      cvt = 8000;
    const oliPercent = Math.floor(input / oli * 100),
      beltPercent = Math.floor(input / belt * 100),
      cvtPercent = Math.floor(input / cvt * 100);
    return {
      oliPercent,
      beltPercent,
      cvtPercent
    }
  }

  return {
    process,
    getDataById,
    updateData,
    deleteData,
    countDistance,
    progressBar
  }
})();