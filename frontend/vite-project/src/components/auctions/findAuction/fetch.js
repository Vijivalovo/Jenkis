import Cookies from "universal-cookie";

const findById_fetch = (setAuction, slot_id) => {
    console.log(slot_id);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/auctions/find/${slot_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("HTIS IS RESPONSE BODY AUCTION");
      console.log(response);
      setAuction(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default findById_fetch;
