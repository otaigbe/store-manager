/* eslint-disable quotes */
const getAllProductsForCart = async () => {
  let response = null;
  let json = null;
  try {
    response = await fetch('/api/v1/cart/');
    json = await response.json();
  } catch (error) {
    console.log(error.message);
  }
  // console.log(json.message);
  // console.log(json.Products);
  let table = '<table id="cart_table" style="padding:15px;">';
  let thead = '<thead><tr>';
  let tbody = '<tbody id="cart-body">';

  for (let i = 0; i < json.Resources.length; i += 1) {
    if (i === 1) {
      thead += `<th>Add to Cart</th>`;
      const keys = Object.keys(json.Resources[i]);
      for (let j = 0; j < keys.length; j += 1) {
        if (j === 3) {
          thead += `<th>Qty</th>`;
        }
        thead += `<th>${keys[j]}</th>`;
      }
      thead += `<th>Amount</th>`;
      thead += '</tr></thead>';
      table += thead;
    }

    let tableRow = `<tr class="cart_row"><td><input type="checkbox" name="check" class="tick" align="middle"></td>`;
    const values = Object.values(json.Resources[i]);
    for (let j = 0; j < values.length; j += 1) {
      if (j === 2) {
        tableRow += `<td class="Unit-price" >${values[j]}</td>`;
      } else {
        tableRow += `<td>${values[j]}</td>`;
      }
      if (j === 2) {
        tableRow += `<td><input name="quantity_to_be_purchased" type="number" class="qty_purchased" onkeypress="return isNumberKey(event)" value="0" oninput="calculateAmountReduceQuantityInStock(event)" /></td>`;
      }
    }
    tableRow += '<td><input type="number" name="amount" class="amount" value="0" readonly></td>';
    tableRow += '</tr>';
    // console.table(tableRow);

    tbody += tableRow;
  }
  table += tbody;
  table += '</tbody>';
  table += `<tfoot id="cart-foot"><tr>
            <td colspan="5"></td><td>Total</td>
            <td id="total"></td></tr></tfoot>`;
  table += '</table>';
  // console.table(table);
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('shopping_cart').prepend(d);
  // console.log(document.cookie);
};

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
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('products').prepend(d);
};
