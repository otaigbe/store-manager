/* eslint-disable quotes */
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
    let tableRow = `<tr>`;
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
  table += `<tfoot><tr></tr></tfoot>`;
  table += '</table>';
  return table;
}


const getAllProductsWithDetails = async () => {
  let response = null;
  let json = null;
  const url = '/api/v1/products/';
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    json = await response.json();
  } catch (error) {
    console.log(error.message);
  }
  const table = generateTableWithHeader(json, 'productsrecordtable');
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('products').prepend(d);
};

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
  const table = generateTableWithHeader(json, 'productsrecordtable');
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('sales').prepend(d);
};

async function saveSalesRecordToDb(receipt) {
  const num = document.getElementById('receipt-num').textContent;
  const attendant = document.getElementById('attendantName').textContent;
  const str = `"${attendant}"`;
  console.log(`{"salesRecords":${receipt},"receiptNumber":${num},"attendant_name":${str}}`);
  const salesObj = JSON.parse(`{"salesRecords":${receipt},"receiptNumber":${num},"attendant_name":${str}}`);
  const res = await fetch('/api/v1/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salesObj),
  });
  // console.log(JSON.parse(salesObj));
  // console.log(salesObj);
  const receiptObj = JSON.parse(receipt);
  // console.log(receiptObj[0].product_id);
  const args = [];
  for (let i = 0; i < receiptObj.length; i += 1) {
    const array = [];
    array.push(receiptObj[i].quantity_bought, receiptObj[i].product_id);
    args.push(array);
  }
  // console.log(args);
  // console.log(res);
  const url = 'api/v1/products/';
  // console.log(url);
  let res2 = '';
  if (res.status === 201) {
    res2 = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
  }
  console.log(res2);
}
