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
  import findById_fetch from '../../auctions/findById/fetch';
  import createAuction_fetch from '../../auctions/createAuction/fetch';
  import deleteCategory_fetch from '../deleteCategory/fetch';
  
  export default function CardView({
    id,
    title,
  }) {
    const navigate = useNavigate();
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
          h="auto"
          maxWidth={340}
          maxHeight={330}
        >
          <Card
            bg="gray.100"
            p={4}
            roundedTop="md"
            mb={4}
            w="100%"
            h="auto"
            maxHeight={450}
          >
            <CardHeader>
              <Heading size="lg">{id}</Heading>
            </CardHeader>
            <CardBody>
              <Text size="md">Категория</Text>
              <Heading size="md" mb={1}>
                {title}
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
                    onClick={() => {
                      let value = id;
                      console.log(value);
                      deleteCategory_fetch(value);
                      window.location.reload();
                    }}
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
  