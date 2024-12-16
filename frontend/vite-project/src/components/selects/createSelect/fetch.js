import Cookies from "universal-cookie";

const createSelect_fetch = (value) => {
  const cookies = new Cookies();
  console.log(value);
  const accessToken = cookies.get("accessToken");
  fetch("http://localhost:3030/selects/createSelect", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify(value, null, 2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.statusCode == undefined)
        alert(response.message ? response.message : response.errors[0].message);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default createSelect_fetch;
