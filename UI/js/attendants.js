const addAttendant = async () => {
  let response = null;
  let json = null;
  const url = '/api/v1/auth/signup/';
  // console.log(document.cookie);
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  // console.log(ans);
  const formdata = new FormData(document.getElementById('register_attendant_form'));
  const jsonObj = {};
  for (const [key, value] of formdata.entries()) {
    jsonObj[key] = value;
  }
  if (jsonObj.admin === 'on') {
    jsonObj.admin = true;
  } else {
    jsonObj.admin = false;
  }
  delete jsonObj.confirmPassword;
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
  document.getElementById('status').innerHTML = json.message;
};
