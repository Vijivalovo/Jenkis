/* eslint-disable react/prop-types */
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    PopoverFooter,
    Button,
    Avatar,
    WrapItem,
  } from "@chakra-ui/react";
  import profile_fetch from "./fetch";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  function getRandomAvatar(userName) {
    const avatars = [
      "https://bit.ly/dan-abramov",
      "https://bit.ly/tioluwani-kolawole",
      "https://bit.ly/kent-c-dodds",
      "https://bit.ly/broken-link",
      "https://bit.ly/ryan-florence",
      "https://bit.ly/prosper-baba",
      "https://bit.ly/code-beast",
      "https://bit.ly/sage-adebayo",
    ];
  
    const randomIndex = Math.floor(Math.random() * avatars.length);
    const randomAvatarSrc = avatars[randomIndex];
  
    return (
      <WrapItem alignItems="center">
        <Avatar size="sm" name={userName} mr={2} src={randomAvatarSrc} /> Профиль
      </WrapItem>
    );
  }
  
  export default function Profile() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      profile_fetch(setUser);
    }, []);
    const update_data = () => {
      profile_fetch(setUser);
    };
  
    if(user.role == "админ")
    {
      return (
        <Popover placement="right">
          <PopoverTrigger>
            <Button onClick={() => update_data()}>
              {getRandomAvatar(user.lastname)}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Имя: {user.lastname}</PopoverHeader>
              <PopoverBody>
                  Фамилия: {user.firstname} Отчество: {user.patronymic} Дата рождения : {user.datebirth} Роль : {user.role} Зарплата : {user.salary} 
              </PopoverBody>
              <PopoverFooter>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      );
    }
  }
  