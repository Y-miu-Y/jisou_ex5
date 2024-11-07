import { useParams } from "react-router-dom";
import { isExistGitId } from "../services/CharaGItService";
import { CGHeader } from "../components/CGHeader";
import { Fade, Container, Heading, Box, Image, Center } from "@chakra-ui/react";
import { useEffect } from "react";

export const UserCharaGit = () => {
  const { id } = useParams();

  useEffect(()=> {
    
  });

  return (
    <>
      <CGHeader></CGHeader>
      <Fade in={true}>
        <Container maxW="4xl">
          <Heading as="h2" fontSize="3xl">キャラ画面</Heading>
          <Box w='100%' justifyContent='center'>
            <Center>
              <Box w='50%' justifyContent='center'>
                <Image src="src/images/CharaGitMain.png" w="100%"/>
              </Box>
            </Center>
            
          </Box>
        </Container>
      </Fade>
    </>
  )
}
