import Cookies from "universal-cookie";

const listAuctions_fetch = (setSlots) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/auctions/listAuctions`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      setSlots(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default listAuctions_fetch;
