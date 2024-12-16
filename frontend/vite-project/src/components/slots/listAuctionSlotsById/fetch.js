import Cookies from "universal-cookie";

const listAuctionSlotsById_fetch = (setSlots) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/slots/listAuctionSlotsById`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      setSlots(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default listAuctionSlotsById_fetch;
