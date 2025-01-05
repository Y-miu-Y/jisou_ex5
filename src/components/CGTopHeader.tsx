import { Box, Container, HStack, Heading } from "@chakra-ui/react";

export const CGTopHeader = () => {

  return (
    <>
      <Box w="100%" shadow="lg"h={{"base": "80px"}} mb="50px">
        <Container maxW="5xl">
          <HStack>
            <Box w="120px" ml="10px" data-testid="cgTopHeader">
                <Heading fontSize="xx-large" justifyContent="left" >Chara<br />Git</Heading>
            </Box>

          </HStack>
        </Container>
      </Box>
    </>
  );
};