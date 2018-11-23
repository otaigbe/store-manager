const addProduct = async () => {
  let response = null;
  let json = null;
  const url = '/api/v1/products/';
  // console.log(document.cookie);
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  // console.log(ans);
  const formdata = new FormData(document.getElementById('addProductForm'));
  const jsonObj = {};
  for (const [key, value] of formdata.entries()) {
    jsonObj[key] = value;
  }
  jsonObj.unit_price = Number(jsonObj.unit_price);
  jsonObj.quantity_in_stock = Number(jsonObj.quantity_in_stock);
  jsonObj.quantity_supplied = Number(jsonObj.quantity_supplied);
  console.log(jsonObj);
  try {
    response = await fetch(url, {
      method: 'POST',
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
  document.getElementById('message').innerHTML = json.message;
};

