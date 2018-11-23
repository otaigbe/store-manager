/* eslint-disable quotes */
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

    let tableRow = `<tr>`;
    const values = Object.values(json.Products[i]);
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
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('products').prepend(d);
};
