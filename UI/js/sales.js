const getAllSalesRecordsWithDetails = async () => {
  let response = null;
  let json = null;
  const url = '/api/v1/sales/';
  console.log(document.cookie);
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  console.log(ans);
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ans2,
      },
    });
    json = await response.json();
  } catch (error) {
    console.log(error.message);
  }
  // console.log(json.Resources);
  let table = '<table id="salesrecordtable">';
  let thead = '<thead><tr>';
  let tbody = '<tbody>';

  for (let i = 0; i < json.Resources.length; i += 1) {
    if (i === 0) {
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
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('sales').prepend(d);
};
