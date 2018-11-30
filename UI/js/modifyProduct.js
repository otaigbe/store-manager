/* eslint-disable no-restricted-syntax */
async function EditProduct(id) {
  let response = null;
  let json = null;
  const url = `/api/v1/products/${id}`;
  // console.log(document.cookie);
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  // console.log(ans);
  const formdata = new FormData(document.getElementById('EditProductForm'));
  const jsonObj = {};
  for (const [key, value] of formdata.entries()) {
    jsonObj[key] = value;
  }
  jsonObj.unit_price = Number(jsonObj.unit_price);
  jsonObj.quantity_in_stock = Number(jsonObj.quantity_in_stock);
  jsonObj.quantity_supplied = Number(jsonObj.quantity_supplied);
  // console.log(jsonObj);
  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ans2,
      },
      body: JSON.stringify(jsonObj),

    });
    json = await response.json();
  } catch (error) {
    console.log(error);
  }
  console.log(json);
  document.getElementById('modifyMessage').innerHTML = json.message;
  // document.getElementById('message').innerHTML = json.message;
}

function handleForm(event) {
  event.preventDefault();
  const formElement = document.getElementById('EditProductForm').elements;
  const id = formElement[0].value;
  EditProduct(id);
  console.log('Pressed');
  const screen = document.getElementById('popup');
  screen.parentElement.removeChild(screen);
}

function getProductId(event) {
  const targetGrandParent = event.target.parentElement.parentElement;
  const productId = targetGrandParent.cells[0].textContent;
  return productId;
}

async function deleteProduct(event) {
  const id = getProductId(event);
  // console.log(id);
  let response = null;
  let json = null;
  const url = `/api/v1/products/${id}`;
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  try {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ans2,
      },
    });
    json = await response.json();
  } catch (error) {
    console.log(error);
  }
  console.log(json.message);
  document.getElementById('modifyMessage').innerHTML = json.message;
}
const getAllProducts = async () => {
  let response = null;
  let json = null;
  const url = '/api/v1/products/';
  // console.log(document.cookie);
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  // console.log(ans);
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
  // console.log(json.Resources);
  let table = '<table id="productsrecordtable">';
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

      if (j === 7) {
        tableRow += `<td><button type="button" class="edit">Edit</button></td>
        <td><button type="button" class="del">Del</button></td>`;
      }
    }
    tableRow += '</tr>';
    // console.table(tableRow);
    tbody += tableRow;
  }
  table += tbody;
  table += '</tbody>';
  table += '<tfoot><tr></tr></tfoot>';
  table += `</table><script type="text/javascript">
  const elements = document.getElementsByClassName('edit'); 
  const delElements = document.getElementsByClassName('del');
  for (let i = 0; i < elements.length; i++) { 
      elements[i].addEventListener('click', createWindow);
      delElements[i].addEventListener('click', deleteProduct);
    }
  
  </script>`;
  const d = document.createRange().createContextualFragment(table);
  document.getElementById('productsarea').prepend(d);
};

const createWindow = (e) => {
  const window = `<div id ="popup" style="border: thick solid black;height: 310px;width: 800px;">
  <button type="button" class="closePopup" id="closePopup">x</button><form method="PUT" id="EditProductForm" name="addProductForm" action="">
  <h3>Edit Product</h3><table><tr><td><label for="product_id"> ProductID:</label></td><td><input type="number" name="product_id" required readonly/>
  </td></tr><tr><td><label for="product_name_add"> Product Name:</label></td><td><input type="text" name="product_desc" id="product_name_add" required />
  </td></tr><tr><td><label for="unit_price_add"> Unit Price:</label></td><td><input type="number" name="unit_price" id="unit_price_add" onkeypress="return isNumberKey(event)" required /></td>
  </tr><tr><td><label for="quantityInStock"> Quantity In Stock:</label></td><td><input type="text" name="quantity_in_stock" id="quantity" required />
  </td></tr><tr><td><label for="quantitySupplied"> Quantity Supplied:</label></td><td><input type="text" name="quantity_supplied" required />
  </td></tr><tr><td><label for="quantity"> Supplier:</label></td><td><input type="text" name="supplier_name" id="supplier" required /></td>
  </tr><tr><td><label for="category_add"> Category:</label></td><td><input type="text" name="category" id="category_add" required /></td>
  </tr></table><button type="submit" id="EditSubmitButton">Edit</button></form></div><script>
  function destroyWindow() { const popup = document.getElementById('popup'); popup.parentElement.removeChild(popup); }
  </script><script>document.getElementById('closePopup').addEventListener('click', destroyWindow);</script>`;
  const popup = document.createRange().createContextualFragment(window);
  document.getElementById('popupdiv').prepend(popup);
  const targetGrandParent = e.target.parentElement.parentElement;
  const formElements = document.getElementById('EditProductForm').elements;
  console.log(formElements[0]);
  for (let i = 0; i < targetGrandParent.cells.length - 2; i += 1) {
    formElements[i].value = targetGrandParent.cells[i].textContent;
    // console.log(targetGrandParent.cells[i].textContent);
  }
  document.getElementById('EditSubmitButton').addEventListener('click', handleForm);
};
