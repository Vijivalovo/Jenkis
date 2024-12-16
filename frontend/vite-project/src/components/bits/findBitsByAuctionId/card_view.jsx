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
    user_id,
    lastname,
    userID,
    bit,
    timeBit,
  }) {
    //const navigate = useNavigate();
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
        maxWidth={400}
        maxHeight={650}
      >
        <Card
          bg="gray.100"
          p={4}
          roundedTop="md"
          mb={4}
          w="100%"
          h="auto"
          maxHeight={600}
        >
          <CardHeader>
            <Heading size="lg">{lastname}</Heading>
          </CardHeader>
          <CardBody>
          <Text size="md">Ставка</Text>
            <Heading size="md" mb={1}>
              {bit}
            </Heading>
            <Text size="md">Время ставки</Text>
            <Heading size="md" mb={1}>
              {timeBit}
            </Heading>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  