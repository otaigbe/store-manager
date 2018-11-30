/* eslint-disable no-restricted-syntax */
function generateTableWithHeader(json, tableName) {
  let table = `<table id="${tableName}">`;
  let thead = '<thead><tr>';
  let tbody = '<tbody>';
  for (let i = 0; i < json.Resources.length; i += 1) {
    if (i === 1) {
      const keys = Object.keys(json.Resources[i]);
      for (let j = 0; j < keys.length; j += 1) {
        thead += `<th>${keys[j]}</th>`;
      }
      table += thead;
    }
    let tableRow = '<tr>';
    const values = Object.values(json.Resources[i]);
    for (let j = 0; j < values.length; j += 1) {
      tableRow += `<td>${values[j]}</td>`;
    }
    tableRow += '</tr>';
    // console.table(tableRow);
    tbody += tableRow;
  }
  table += tbody;
  table += '</tbody>';
  table += '<tfoot><tr></tr></tfoot>';
  table += '</table>';
  return table;
}

function splitCookie() {
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  return ans2;
}

function convertFormDataToJsonObject(formdata) {
  const jsonObj = {};
  for (const [key, value] of formdata.entries()) {
    jsonObj[key] = value;
  }
  return jsonObj;
}
