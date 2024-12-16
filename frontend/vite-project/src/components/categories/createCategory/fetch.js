import Cookies from "universal-cookie";

const createCategory_fetch = (values, navigate) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch("http://localhost:3030/categories/createCategory", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify(values, null, 2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.statusCode == undefined)
        alert(response.message ? response.message : response.errors[0].message);
      else
      {
        navigate("/categories/listCategories");
      }
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default createCategory_fetch;
