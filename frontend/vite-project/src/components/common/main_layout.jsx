import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import tokenFetch from "../user/update_token/fetch";
import getRoleAndId_fetch from "../user/getRoleAndId/fetch";
import Profile from "../user/profile/main";
const MainLayout = ({ children }) => {
 console.log("Начало55");
  const cookies = new Cookies();
  const navigate = useNavigate();
  const accessToken = cookies.get("accessToken");

  console.log(accessToken);
  console.log("========accessToken==========");

  const [role, setRole] = useState();

  console.log("role");
  console.log(role);

  useEffect(() => {
    console.log("23");
    getRoleAndId_fetch(setRole);
  }, []);

  const signOut = () => {
    console.log("HELLO");
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    navigate("/singin");
  };
  const auth = () => {
    if (accessToken !== undefined)
    {
      if(role == undefined || role.message == 'Пользователь не авторизован')
      {
        getRoleAndId_fetch(setRole);
      }
      else
      {
        console.log(accessToken);
        console.log("========if======accessToken==========");
        console.log(role);

        let bo = role.Role;
        console.log("THIS IS ROLE USER");
        console.log(bo);
        if(bo == false)
        {
          console.log("BOOOOOOOOOOOOOOOOOOO");
        }

        if(bo == false)
        {
          console.log("========false==========");
          console.log("false")
          return (
            <>
              <Profile />
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listMaxSlots");
                }}
                w={150}
                position="fixed"
                top={36}
                whiteSpace="pre-wrap"
              >
                Топ слотов
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/users/listMax");
                }}
                w={150}
                position="fixed"
                top={204}
              >
                Топ пользователей
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSelectById");
                }}
                w={150}
                position="fixed"
                top={260}
                whiteSpace="pre-wrap"
              >
                Посмотреть избранные
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSlotsById");
                }}
                w={150}
                position="fixed"
                top={316}
                whiteSpace="pre-wrap"
              >
                Мои слоты
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listWaitSlotsById");
                }}
                w={150}
                position="fixed"
                top={372}
                whiteSpace="pre-wrap"
              >
                Слоты в ожидании
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listAuctionSlotsById");
                }}
                w={150}
                position="fixed"
                top={428}
                whiteSpace="pre-wrap"
              >
                Слоты на аукционе
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSoldSlotsById");
                }}
                w={150}
                position="fixed"
                top={484}
                whiteSpace="pre-wrap"
              >
                Купленные слоты
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={signOut}
                w={150}
                position="fixed"
                bottom={4}
              >
                Выйти
              </Button>
            </>
          );
        }
        if(bo == true)
        {
          console.log("========false==========");
          console.log("false")
          return (
            <>
              <Profile />
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listMaxSlots");
                }}
                w={150}
                position="fixed"
                top={36}
                whiteSpace="pre-wrap"
              >
                Топ слотов
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/users/listMax");
                }}
                w={150}
                position="fixed"
                top={204}
              >
                Топ пользователей
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSelectById");
                }}
                w={150}
                position="fixed"
                top={260}
                whiteSpace="pre-wrap"
              >
                Посмотреть избранные
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSlotsById");
                }}
                w={150}
                position="fixed"
                top={316}
                whiteSpace="pre-wrap"
              >
                Мои слоты
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listWaitSlotsById");
                }}
                w={150}
                position="fixed"
                top={372}
                whiteSpace="pre-wrap"
              >
                Слоты в ожидании
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listAuctionSlotsById");
                }}
                w={150}
                position="fixed"
                top={428}
                whiteSpace="pre-wrap"
              >
                Слоты на аукционе
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/slots/listSoldSlotsById");
                }}
                w={150}
                position="fixed"
                top={484}
                whiteSpace="pre-wrap"
              >
                Купленные слоты
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={() => {
                  tokenFetch();
                  navigate("/categories/listCategories");
                }}
                w={150}
                position="fixed"
                top={540}
                whiteSpace="pre-wrap"
              >
                Категории
              </Button>
              <Button
                colorScheme="teal"
                fontSize="md"
                onClick={signOut}
                w={150}
                position="fixed"
                bottom={4}
              >
                Выйти
              </Button>
            </>
          );
        }
      }
    }
    else
    {
      return (
        <Button
          colorScheme="teal"
          fontSize="md"
          onClick={() => navigate("/singin")}
          w={150}
          position="fixed"
          bottom={4}
        >
          Войти
        </Button>
      );
    }
  };

  return (
    <Flex>
      <VStack
        spacing={8}
        align="flex-start"
        bg="gray.50"
        p={6}
        w={200}
        position="fixed"
        left={0}
        top={0}
        h="100%"
        zIndex={10}
      >
        <Button
          colorScheme="teal"
          fontSize="md"
          onClick={() => navigate("/")}
          w={150}
          position="fixed"
          top={20}
        >
          На главную
        </Button>

        {auth()}
      </VStack>
      <Box w="100%" ml = "200">{children}</Box>
    </Flex>
  );
};

export default MainLayout;
export {useEffect};
