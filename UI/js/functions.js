// eslint-disable-next-line wrap-iife
const functions = () => {
  function generateProductsTable(json) {
    let table = '<table id="productsrecordtable">';
    let thead = '<thead><tr>';
    let tbody = '<tbody>';
    for (let i = 0; i < json.Products.length; i += 1) {
      if (i === 1) {
        const keys = Object.keys(json.Products[i]);
        for (let j = 0; j < keys.length; j += 1) {
          thead += `<th>${keys[j]}</th>`;
        }
        table += thead;
      }
      let tableRow = '<tr>';
      const values = Object.values(json.Products[i]);
      for (let j = 0; j < values.length; j += 1) {
        tableRow += `<td>${values[j]}</td>`;
      }
      tableRow += '</tr>';
      tbody += tableRow;
    }
    table += tbody;
    table += '</tbody><tfoot><tr></tr></tfoot></table>';
    return table;
  }

  function convertFormDataToJson(formdata) {
    const jsonObj = {};
    for (const [key, value] of formdata.entries()) {
      jsonObj[key] = value;
    }
    return jsonObj;
  }


  return {
    buildTable: generateProductsTable,
    convertFormDataToJson,
  };
};
