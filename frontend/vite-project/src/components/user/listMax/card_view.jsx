import {
    Flex,
    Text,
    Button,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import findById_fetch from '../../user/findById/fetch';
  
  export default function CardView({
    id,
    role,
    lastname,
    firstname,
    patronymic,
    datebirth,
    earned,
    raiting,
  }) {
    //const navigate = useNavigate();
    if( role == false)
    {
        return (
            <Flex
              bg="white"
              flexDirection="column"
              alignItems="center"
              rounded="md"
              mr={10}
              ml={10}
              p={6}
              mt={10}
              w="100%"
              h="100vh"
              maxWidth={400}
              maxHeight={650}
            >
              <Card
                bg="gray.100"
                p={4}
                roundedTop="md"
                mb={4}
                w="100%"
                h="100vh"
                maxHeight={600}
              >
                <CardHeader>
                  <Heading size="lg">{"Пользователь"}</Heading>
                </CardHeader>
                <CardBody>
                <Text size="md">Место в рейтинге</Text>
                  <Heading size="md" mb={1}>
                    {raiting}
                  </Heading>
                  <Text size="md">Заработал</Text>
                  <Heading size="md" mb={1}>
                    {earned}
                  </Heading>
                  <Text size="md">Имя</Text>
                  <Heading size="md" mb={1}>
                    {lastname}
                  </Heading>
                  <Text size="md">Фамилия</Text>
                  <Heading size="md" mb={1}>
                    {firstname}
                  </Heading>
                  <Text size="md">Отчество</Text>
                  <Heading size="md" mb={1}>
                    {patronymic}
                  </Heading>
                  <Text size="md">Дата рождения</Text>
                  <Heading size="md" mb={1}>
                    {datebirth}
                  </Heading>
                  <Popover>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody p={5}>{id}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </CardBody>
              </Card>
            </Flex>
          );
    }
    if(role == true)
    {
        return (
            <Flex
              bg="white"
              flexDirection="column"
              alignItems="center"
              rounded="md"
              mr={10}
              ml={10}
              p={6}
              mt={10}
              w="100%"
              h="100vh"
              maxWidth={400}
              maxHeight={650}
            >
              <Card
                bg="gray.100"
                p={4}
                roundedTop="md"
                mb={4}
                w="100%"
                h="100vh"
                maxHeight={600}
              >
                <CardHeader>
                  <Heading size="lg">{"Пользователь"}</Heading>
                </CardHeader>
                <CardBody>
                <Text size="md">Место в рейтинге</Text>
                  <Heading size="md" mb={1}>
                    {raiting}
                  </Heading>
                  <Text size="md">Заработал</Text>
                  <Heading size="md" mb={1}>
                    {earned}
                  </Heading>
                  <Text size="md">Имя</Text>
                  <Heading size="md" mb={1}>
                    {lastname}
                  </Heading>
                  <Text size="md">Фамилия</Text>
                  <Heading size="md" mb={1}>
                    {firstname}
                  </Heading>
                  <Text size="md">Отчество</Text>
                  <Heading size="md" mb={1}>
                    {patronymic}
                  </Heading>
                  <Text size="md">Дата рождения</Text>
                  <Heading size="md" mb={1}>
                    {datebirth}
                  </Heading>
                  <Popover>
                      <Button
                        m={0}
                        p={15}
                        b={0}
                        size="md"
                        outline="none"
                        style={{marginTop: 25}}
                        colorScheme="teal"
                        onClick={console.log("мимо")}
                      >
                        Удалить
                      </Button>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody p={5}>{id}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </CardBody>
              </Card>
            </Flex>
          );
    }
  }
  