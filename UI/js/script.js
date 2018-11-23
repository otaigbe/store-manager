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


let receiptJson = '';
function getSalesRecordObj() {
  // console.log ("Partial sales record:"+ receiptJson);
  saveSalesRecordToDb(receiptJson);
  // document.getElementById('recordOfSales').innerHTML = receiptJson;
  const table = document.getElementById('receipt-table');
  table.parentElement.removeChild(table);
  const modal = document.getElementById('simpleModal');
  modal.style.display = 'none';
  const checkboxes = document.getElementsByClassName('tick');
  const amountboxes = document.getElementsByClassName('amount');
  // console.log (checkboxes);
  for (let i = 0; i < checkboxes.length; i += 1) {
	  if (checkboxes[i].checked === true) {
      checkboxes[i].checked = false;
    }
  }

  for (let i = 0; i < amountboxes.length; i += 1) {
    amountboxes[i].value = 0;
  }
  const purchaseboxes = document.getElementsByClassName('qty_purchased');
  for (let i = 0; i < purchaseboxes.length; i += 1) {
    purchaseboxes[i].value = 0;
  }
}


function sendForm(data, url) {
  const xmlHttp = new XMLHttpRequest();
  if (xmlHttp) {
    xmlHttp.onreadystatechange = () => {
      const messageElem = document.getElementById('salesStatus');
      if (xmlHttp.readyState === 1) {
        messageElem.innerHTML += 'Status 1: Server connection established!';
      } else if (xmlHttp.readyState === 2) {
        messageElem.innerHTML += 'Status 2: Request recieved ! <br/>';
      } else if (xmlHttp.readyState === 3) {
        messageElem.innerHTML += 'Status 3: Processing Request ! <br/>';
      } else if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          const text = xmlHttp.responseText;
          messageElem.innerHTML += 'Status 4: Processing Request ! <br/>';
          messageElem.innerHTML = text;
        } else {
          alert('Something is wrong !');
        }
      }
    };
    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(data);
  }
}


function getAttendantName() {
  const user = document.getElementById('currentUser').innerText;
  return user;
}

function replaceInputValueElementWithText(table) {
  const inputElementsInCart = table.querySelectorAll('input[name="quantity_to_be_purchased"]');
  const inputElementsInCart2 = table.querySelectorAll('input[name="amount"]');
  const inputElementsInCart3 = table.querySelectorAll('input[name="price"]');
  // console.log("cart->"+inputElementsInCart);

  for (let i = 0; i < inputElementsInCart3.length; i++) {
    const v3 = inputElementsInCart3[i].value;
    const parent = inputElementsInCart3[i].parentElement;
    inputElementsInCart3[i].parentElement.removeChild(inputElementsInCart3[i]);
    parent.innerText = v3;
  }
  for (let i = 0; i < inputElementsInCart.length; i++) {
    const v = inputElementsInCart[i].value;
    const parent = inputElementsInCart[i].parentElement;
    inputElementsInCart[i].parentElement.removeChild(inputElementsInCart[i]);
    parent.innerText = v;
  }
  for (let i = 0; i < inputElementsInCart2.length; i++) {
    const v2 = inputElementsInCart2[i].value;
    const parent2 = inputElementsInCart2[i].parentElement;
    inputElementsInCart2[i].parentElement.removeChild(inputElementsInCart2[i]);
    parent2.innerText = v2;
  }
  return table;
}

function createBill() {
  const individualAmountArray = [];
  const table = document.getElementById('cart_table');
  const thead = document.createElement('thead');
  const headrow = document.createElement('tr');
  headrow.setAttribute('id', 'salestableheadrow');
  const th1 = document.createElement('th');
  const productID = document.createTextNode('product_id');
  const productDescription = document.createTextNode('product_desc');
  const priceheading = document.createTextNode('unit_price');
  const quantityheading = document.createTextNode('quantity_bought');
  const amount = document.createTextNode('amount');
  const th2 = document.createElement('th');
  const th3 = document.createElement('th');
  const th4 = document.createElement('th');
  const th5 = document.createElement('th');
  th1.appendChild(productID);
  th2.appendChild(productDescription);
  th4.appendChild(quantityheading);
  th3.appendChild(priceheading);
  th5.appendChild(amount);
  headrow.appendChild(th1);
  headrow.appendChild(th2);
  headrow.appendChild(th3);
  headrow.appendChild(th4);
  headrow.appendChild(th5);
  thead.appendChild(headrow);
  table.appendChild(thead);
  let num = null;
  let cart = document.getElementById('cart-body');
  cart = cart.cloneNode(true);
  cart.setAttribute('id', 'receipt-table-body');
  const tbody = document.createElement('tbody');
  const selectedColumn = cart.rows[0].cells[4];
  for (let i = 0; i < cart.rows.length; i += 1) {
    const cell = cart.rows[i].cells[5];
    cell.parentElement.removeChild(cell);
  }
  // for (let i = 0; i < cart.rows.length; i += 1) {
  //   const cell = cart.rows[i].cells[4];
  //   cell.parentElement.removeChild(cell);
  //  // console.log(cell);
  // }
  // for (let i = 0; i < cart.rows.length; i += 1) {
  //   const cell = cart.rows[i].cells[5];
  //   cell.parentElement.removeChild(cell);
  //   //console.log(cell);
  // }
  const rows_to_be_selected = cart.querySelectorAll('.tick');
  // const receiptTable = document.getElementById("receipt-table");
  const receiptTable = document.createElement('table');
  receiptTable.setAttribute('id', 'receipt-table');
  receiptTable.appendChild(thead);
  let tfoot = document.getElementById('cart-foot');
  tfoot = tfoot.cloneNode(true);
  tfoot.querySelector('td').setAttribute('colspan', '3');
  for (let x = 0; x < rows_to_be_selected.length; x += 1) {
    if (rows_to_be_selected[x].checked === true) {
      const selectedrow = rows_to_be_selected[x].parentElement.parentElement;
      // console.log(selectedrow);
      const elements = selectedrow.getElementsByClassName('tick');
      // do the reduction
      // const quantity_in_storeElement = selectedrow.querySelector('input[name="quantity_in_stock"]');
      const quantity_in_storeElement = selectedrow.querySelector('.quantity_in_stock');
      // removing quantity_in_stock column
      //  quantity_in_storeElement.parentElement.removeChild(quantity_in_storeElement);
      for (let j = 0; j < elements.length; j++) {
        const parent = elements[j].parentElement;
        parent.parentElement.removeChild(parent);
      }
      tbody.appendChild(selectedrow);
      num = generateReceiptNumber();
      individualAmountArray.push(calculateTotalAmount(selectedrow));
    }
    // console.log(rows_to_be_selected[x].nodeName);
  }
  document.getElementById('receipt-content').appendChild(receiptTable);
  const sum = individualAmountArray.reduce((a, b) => a + b, 0);
  receiptTable.appendChild(tbody);
  receiptTable.appendChild(tfoot);
  // console.log(sum);
  tfoot.querySelector('#total').innerHTML = sum;
  // console.log(receiptTable);
  const refurbishedTable = replaceInputValueElementWithText(receiptTable);
  // console.table( refurbishedTable);
  console.log(num);
  receiptJson = convertTableToJson(refurbishedTable);
}

function convertTableToJson(table) {
  const cols = [];
  const headerlist = table.querySelectorAll('thead tr th');
  // console.log(headerlist);
  for (let i = 0; i < headerlist.length; i++) {
    // console.log(headerlist[i].childNodes[0].textContent.toString().trim());
    cols.push(headerlist[i].childNodes[0].textContent.toString().trim());
  }
  const tableobj = [];
  const rowlist = table.querySelectorAll('tbody tr');
  // console.log(rowlist);
  for (let j = 0; j < rowlist.length; j++) {
    const tdlist = rowlist[j].querySelectorAll('td');
    const row = {};
    // console.log(rowlist[j].textContent.toString().trim());
    for (let k = 0; k < tdlist.length; k++) {
      const text = tdlist[k].textContent.toString().trim();
      const rowName = cols[k];
      row[rowName] = text;
      // console.log(text);
    }
    tableobj.push(row);
  }
  // console.log(tableobj);
  return JSON.stringify(tableobj);
// console.log(JSON.stringify(tableobj));
}


function calculateTotalAmount(row) {
  const individualAmount = row.querySelector('.amount').value;
  const number = Number(individualAmount);
  // console.log(number);
  return number;
}

function generateSalesRecordId() {
  const randnum = Math.floor(Math.random() * 10000 + 1);
  return randnum;
}

function generateReceiptNumber() {
  const randnum = Math.floor(Math.random() * 10000000000 + 1);
  const tag = document.getElementById('receipt-num');
  tag.innerHTML = randnum;
  return randnum;
}

document.getElementById('modalBtn').addEventListener('click', createBill);


function isNumberKey(evt) {
  const charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; }
  return true;
}

function calculateAmountReduceQuantityInStock(e) {
  const source = e.target.parentElement.parentElement;
  const value = source.querySelector('input[name="check"]');
  if (value.checked === true) {
    // console.log(true);
    // const price = source.querySelector('input[name="price"]').value;
	 const price = Number(source.querySelector('.Unit-price').textContent.toString().trim());
    const quantity = source.querySelector('input[name="quantity_to_be_purchased"]').value;
    // const quantity_in_store = source.querySelector('input[name="quantity_in_stock"]').value
    const amount_per_item = Math.abs(price) * Math.abs(quantity);
    source.querySelector('input.amount').value = amount_per_item;
    // console.log(quantity_remaining);
    // source.querySelector('input[name="quantity_in_stock"]').value = quantity_remaining;
  } else {
    // console.log(false);
  }
}


function filterTable() {
  let input; let filter; let table; let tr; let td; let
    i;
  input = document.getElementById('product_filter');
  filter = input.value.toUpperCase();
  table = document.getElementById('cart_table');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}


/*
document.getElementById("product_to_modify").addEventListener('change', function (evt) {
  let source = evt.target.nodeName;
  document.getElementById("product_id").value = "{values from db}";
  document.getElementById("product_brand").value = "{values from db}";
  document.getElementById("quantity_in_store").value = "{values from db}";
  document.getElementById("unit_price").value = "{values from db}";
  document.getElementById("colour").value = "{values from db}";
  document.getElementById("category").value = "{values from db}";
});
const elem = document.getElementById("deletebutton").addEventListener('click', confirmdelete);
*/

/* function confirmdelete(e) {
  e.preventDefault();
  alert("This product cannot be retrieved once deleted.");
  //document.getElementById("delete_form").innerHTML +="<br>"+"<input type=\"text\" />;
  //document.getElementById("deletebutton").dispatchEvent('click');
  //alert("event continued.");
} */
