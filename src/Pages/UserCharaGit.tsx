import { useParams } from "react-router-dom";
import { CGHeader } from "../components/CGHeader";
import { Fade, Container, Heading, Image, Center, Box, VStack, Card, CardBody, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCharaGit } from "../hooks/useCharaGit";
import { Loading } from "../components/Loading";
import { motion } from "framer-motion";

export const UserCharaGit = () => {
  const { id } = useParams();

  const { charaGit, isLoading, comment, init } = useCharaGit();

  useEffect(()=> {
    init(id ?? "");
  }, [id]);

  if(isLoading){
    return (<Loading />);
  } else {
    // Chakra UIのカラーモード対応
    const pageBg = useColorModeValue('blue.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headingColor = useColorModeValue('gray.700', 'white');
    const MotionBox = motion(Box);
    const MotionCard = motion(Card);
    return (
      <Box minH="100vh" bg={pageBg} bgGradient="linear(to-b, blue.50, white)">
        <CGHeader id={id ?? ""}></CGHeader>
        <Container maxW="4xl" py={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading as="h2" fontSize="3xl" textAlign="center" mb={6} color={headingColor}>
              キャラ情報
            </Heading>
            <MotionCard
              shadow="2xl"
              border="1px"
              borderColor={borderColor}
              bg={cardBg}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardBody p={8}>
                <VStack spacing={8}>
                  <Box w='70%' justifyContent='center'>
                    <Box border="1px" minH="40px" textAlign="center" data-testid="commentBox" borderRadius="md" bg={useColorModeValue('gray.50','gray.700')}
                      borderColor={borderColor} p={2}>
                      <p data-testid="comment">{comment}</p>
                    </Box>
                  </Box>
                  <Box w='50%' justifyContent='center'>
                    <Image src="src/images/CharaGitMain.png" w="100%" data-testid="charaImg" borderRadius="lg" boxShadow="md"/>
                  </Box>
                  <Box as="h2" fontSize="2xl" color={headingColor} fontWeight="bold">
                    {charaGit?.name}
                  </Box>
                  <Box as="h3" fontSize="lg">
                    げんき：{charaGit?.status}
                  </Box>
                </VStack>
              </CardBody>
            </MotionCard>
          </MotionBox>
        </Container>
      </Box>
    )
  }
  
}
