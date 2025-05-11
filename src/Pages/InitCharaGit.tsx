import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkUserExists } from "../utils/urlUtils";
import { isExistDBGitId } from "../services/CharaGItService";
import { SeparateBar } from "../components/SeparateBar";
import { CGTopHeader } from "../components/CGTopHeader";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

type Form = {
  github_id: string;
}

export const InitCharaGit = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const pageBg = useColorModeValue('blue.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.700', 'white');

  const onSubmit: SubmitHandler<Form> = (data) => {
    isExistDBGitId(data.github_id)
    .then(res => {
      if(res){
        navigate(data.github_id);
      } else {
        navigate(`${data.github_id}/setting`)
      }
    })
    return false;
  }

  return (
    <Box minH="100vh" bg={pageBg} bgGradient="linear(to-b, blue.50, white)">
      <CGTopHeader />
      <Container maxW="4xl" py={8}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h2" fontSize="3xl" textAlign="center" mb={6} data-testid="title" color={headingColor}>
            Gitキャラ育成ゲーム
          </Heading>
          <SeparateBar>概要</SeparateBar>
          <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md" mb={8}>
            <Text textAlign="center" fontSize="lg" lineHeight="tall">
              Githubのcontribution（草）を利用して、あなたのキャラを育てましょう。<br/>
              キャラはあなたの草を食べて、あなたのスキルと共に成長します。<br/>
            </Text>
          </Box>
          <MotionCard
            shadow="2xl"
            border="1px"
            borderColor={borderColor}
            bg={cardBg}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader textAlign="center" bg={cardBg} borderBottom="1px" borderColor={borderColor}>
                <Heading fontSize="xl" color={headingColor}>GithubIDを入力</Heading>
              </CardHeader>
              <CardBody p={6}>
                <FormControl isInvalid={!!errors.github_id} mb={4}>
                  <FormLabel htmlFor="github_id" fontSize="lg">GithubID</FormLabel>
                  <Input
                    id="github_id"
                    size="lg"
                    data-testid="input"
                    {...register('github_id', {
                      required: '入力されていません。',
                      validate: async (id) => {
                        return await checkUserExists(id) ? true : 'ユーザーが存在しません';
                      }
                    })}
                  />
                  <FormErrorMessage data-testid="errormsg">
                    {errors.github_id && errors.github_id.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  data-testid="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  送信
                </Button>
              </CardBody>
            </form>
          </MotionCard>
        </MotionBox>
      </Container>
    </Box>
  )
}
