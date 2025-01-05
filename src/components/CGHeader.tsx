import { Box, Container, Heading, HStack } from '@chakra-ui/react';
import { Link } from "react-router-dom"

export const CGHeader = ({id}:{id: string}) => {

  return (
    <>
      
      <Box w="100%" shadow="lg"h={{"base": "80px"}} mb="50px">
        <Container maxW="5xl">
          <HStack>
            <Box w="120px" ml="10px">
                <Heading fontSize="xx-large" justifyContent="left" >Chara<br />Git</Heading>
            </Box>

            <Box>
              <Link to="/">
                トップに戻る
              </Link>
            </Box>

            <Box>
              <Link to={`/${id}/setting`}>
                設定画面へ
              </Link>
            </Box>

          </HStack>
        </Container>
      </Box>
    </>
  );
};