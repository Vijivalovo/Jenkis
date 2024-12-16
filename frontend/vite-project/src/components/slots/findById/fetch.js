import Cookies from "universal-cookie";
import listAuctionSlotsById_fetch from "../../bits/findBitsByAuctionId/fetch";

const findByIdSlot_fetch = (setSlots, slot_id, auction_id, setBits) => {
  console.log(slot_id);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/slots/findSlot/${slot_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("THIS IS RESPONSE FOR SLOT");
      console.log(response);
      setSlots(response.body);
      if(setBits)
      {
        listAuctionSlotsById_fetch(setBits, auction_id);
      }
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default findByIdSlot_fetch;
