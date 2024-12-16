/* eslint-disable react/prop-types */
import { Flex, Button, Box } from "@chakra-ui/react";
import CardView from "./card_view";
import listSelects_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectsList() {
  const [selects, setSelects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listSelects_fetch(setSelects);
  }, []);
  console.log(selects);

  const View = () => {
    return (
      <>
        {selects.map((select) => (
          <CardView
            key={select.id}
            id={select.id}
            user_id = {select.user_id}
            category={select.category}
            slot_id = {select.slot_id}
            startTime={select.startTime}
            endTime={select.endTime}
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
        <Button
          w="full"
          colorScheme="teal"
          onClick={() => navigate("/auctions/listAuctions")}
        >
          Аукцион
        </Button>
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
