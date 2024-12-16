/* eslint-disable react/prop-types */
import { Flex, Button, Box } from "@chakra-ui/react";
import CardView from "./card_view";
import listAuctions_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuctionSlots() {
  console.log("Выводятся слоты");
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listAuctions_fetch(setAuctions);
  }, []);
  console.log(auctions);

  const View = () => {
    return (
      <>
        {auctions.map((auction) => (
          <CardView
            key={auction.id}
            id={auction.id}
            user_id = {auction.user_id}
            slot_id={auction.slot_id}
            startTime={auction.startTime}
            endTime={auction.endTime}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <Flex
        bg="gray.50"
        justify="space-between"
        gap={30}
        pl={10}
        pr={10}
        zIndex={1}
        width="100%"
      >
      </Flex>
      <Flex
        bg="gray.100"
        align="center"
        justify="center"
        flexWrap="wrap"
        overflow="auto"
        p={8}
      >
        <View />
      </Flex>
    </>
  );
}