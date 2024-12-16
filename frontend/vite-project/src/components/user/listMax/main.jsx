/* eslint-disable react/prop-types */
import { Flex, Button, Box } from "@chakra-ui/react";
import CardView from "./card_view";
import get_users_fetch from "./fetch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  console.log("Выводятся слоты");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    get_users_fetch(setUsers);
  }, []);
  console.log(users);

  const View = () => {
    return (
      <>
        {users.map((user) => (
          <CardView
            key={user.id}
            id={user.id}
            role={user.role}
            lastname={user.lastname}
            firstname={user.firstname}
            patronymic={user.patronymic}
            datebirth = {user.datebirth}
            earned = {user.earned}
            raiting = {user.raiting}
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
