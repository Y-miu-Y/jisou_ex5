import { useParams } from "react-router-dom";
import { CGHeader } from "../components/CGHeader";
import { Fade, Container, Heading, Image, Center, Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCharaGit } from "../hooks/useCharaGit";
import { Loading } from "../components/Loading";

export const UserCharaGit = () => {
  const { id } = useParams();

  const { charaGit, isLoading, comment, init } = useCharaGit();

  useEffect(()=> {
    init(id ?? "");
  }, [id]);

  if(isLoading){
    return (<Loading />);
  } else {
    return (
      <>
        <CGHeader id={id ?? ""}></CGHeader>
        <Fade in={true}>
          <Container maxW="4xl">
            <Heading as="h2" fontSize="3xl"></Heading>
            <Box w='100%' justifyContent='center'>
              <Center>
                <Box w='100%'>
                  <VStack>
                    <Box w='70%' justifyContent='center'>
                      <Box border="1px" minH="40px" textAlign="center">
                        <p>{comment}</p>
                      </Box>
                    </Box>
                    <Box w='50%' justifyContent='center'>
                      <Image src="src/images/CharaGitMain.png" w="100%"/>
                    </Box>
                    <Box as="h2" fontSize="40px">
                      {charaGit?.name}
                    </Box>
                    <Box as="h3">
                      げんき：{charaGit?.status}
                    </Box>
                  </VStack>
                </Box>  
              </Center>
            </Box>
          </Container>
        </Fade>
      </>
    )
  }
  
}
