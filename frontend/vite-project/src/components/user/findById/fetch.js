const findById_fetch = (user_id) =>
  fetch(`http://localhost:3030/users/findById`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      user_id(response.body);
    })
    .catch(function (error) {
      alert(error);
      //console.log(error);
    });

export default findById_fetch;
