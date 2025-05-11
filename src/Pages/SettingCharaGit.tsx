import { useNavigate, useParams } from "react-router-dom";
import { CGHeader } from "../components/CGHeader";
import { Box, Button, Card, CardBody, Center, Container, Fade, FormControl, FormErrorMessage, FormHelperText, Heading, Input, Radio, RadioGroup, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { SeparateBar } from "../components/SeparateBar";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegistCharaGit } from "../hooks/useRegistCharaGit";
import { motion } from "framer-motion";

type Form = {
  chara_name: string;
  character: string;
}

export const SettingCharaGit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, control, formState: { errors } } = useForm<Form>();
  const { upsertDB } = useRegistCharaGit();

  const onSubmit: SubmitHandler<Form> = (data) => {
    upsertDB({
      git_id: id ?? "",
      name: data.chara_name,
      character: data.character
    })
    .then(() => {
      navigate("/" + id);
    })

    return false;
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('blue.50', 'gray.900')} bgGradient="linear(to-b, blue.50, white)">
      <CGHeader id={id ?? ""}/>
      <Container maxW="4xl" py={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 as any }}
        >
          <Card
            shadow="2xl"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            bg={useColorModeValue('white', 'gray.800')}
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 as any }}
          >
            <CardBody p={8}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h2" fontSize="3xl" textAlign="center" mb={6} color={useColorModeValue('gray.700', 'white')} data-testid="title">Gitキャラ設定入力</Heading>
                <Box w='100%' justifyContent='center' mb="20px">
                  <SeparateBar bgColor={useColorModeValue('white', 'gray.800')}>あなたのGithubID</SeparateBar>
                  <Center>
                    <Text as="h2" fontSize="3xl" data-testid="githubId">{id}</Text>
                  </Center>
                </Box>
                <Box w='100%' justifyContent='center' mb="20px">
                  <FormControl isInvalid={!!errors.chara_name}>
                    <Center>
                      <VStack w='100%'>
                        <FormHelperText>あなたのキャラの名前を入力してください。</FormHelperText>
                        <Input type='text' w='50%' borderColor='black' textAlign='center'
                          data-testid="inputName"
                          id="chara_name"
                          bg={useColorModeValue('gray.50','gray.700')}
                          {...register('chara_name', {
                            required : '入力されていません。'
                            })}></Input>
                        <FormErrorMessage data-testid="errormsg">
                          {errors.chara_name && errors.chara_name.message}
                        </FormErrorMessage>
                      </VStack>
                    </Center>
                  </FormControl>
                </Box>
                <Box w='100%' justifyContent='center' mb="20px">
                  <FormControl>
                    <Center>
                      <VStack w='100%'>
                        <FormHelperText>
                          あなたのキャラの性格を選んでください<br />
                          キャラは性格に応じてあなたにコメントをくれます
                        </FormHelperText>
                        <Controller
                          name="character"
                          control={control}
                          defaultValue="cool"
                          render={({ field }) => (
                            <RadioGroup {...field} data-testid="selectChara">
                              <VStack w='100%'>
                                <Radio value="cool" data-testid="selectCool">かっこいい系</Radio>
                                <Radio value="cute" data-testid="selectCute">かわいい系</Radio>
                                <Radio value="poor" data-testid="selectPoor">ぼんやり系</Radio>
                                <Radio value="philosophy" data-testid="selectPhilosophy">ふしぎ系</Radio>
                              </VStack>
                            </RadioGroup>
                          )}>
                        </Controller>
                      </VStack>
                    </Center>
                    <Center mt={6}>
                      <Button type="submit" data-testid="submit" colorScheme="blue" size="lg" width="40%" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} transition="all 0.2s">確定</Button>
                    </Center>
                  </FormControl>
                </Box>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}
