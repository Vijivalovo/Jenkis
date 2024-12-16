/* eslint-disable react/prop-types */
import { Flex, Button, Box } from "@chakra-ui/react";
import CardView from "./card_view";
import get_slots_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelList() {
  console.log("Выводятся слоты");
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    get_slots_fetch(setSlots);
  }, []);
  console.log("THIS IS SLOTS");
  console.log(slots);

  const View = () => {
    return (
      <>
        {slots.map((slot) => (
          <CardView
            key={slot.id}
            id={slot.id}
            title={slot.title}
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
          onClick={() => navigate("/categories/createCategory")}
        >
          Добавить категорию
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
