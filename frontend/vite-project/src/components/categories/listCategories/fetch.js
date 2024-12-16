const listCategories_fetch = (setArrCategories) => {
  fetch(`http://localhost:3030/categories/listCategories`, {
    method: "GET",
    headers: { "Content-Type": "application/json"},
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      setArrCategories(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default listCategories_fetch;
