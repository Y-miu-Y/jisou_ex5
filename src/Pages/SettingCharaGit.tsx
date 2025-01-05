import { useNavigate, useParams } from "react-router-dom";
import { CGHeader } from "../components/CGHeader";
import { Box, Button, Center, Container, Fade, FormControl, FormErrorMessage, FormHelperText, Heading, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { SeparateBar } from "../components/SeparateBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegistCharaGit } from "../hooks/useRegistCharaGit";

type Form = {
  chara_name: string;
  character: string;
}

export const SettingCharaGit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
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
    <>
      <CGHeader id={id ?? ""}/>
      <Fade in={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxW="4xl">
            <Heading as="h2" fontSize="3xl">登録画面</Heading>
            <Box w='100%' justifyContent='center'>
              <Center>
                <Text></Text>
              </Center>
            </Box>
            <Box w='100%' justifyContent='center' mb="20px">
              <SeparateBar>あなたのGithubID</SeparateBar>
              <Center>
                <Text as="h2" fontSize="3xl">{id}</Text>
              </Center>
            </Box>
            <Box w='100%' justifyContent='center' mb="20px">
              <FormControl isInvalid={!!errors.chara_name}>
                <Center>
                  <VStack w='100%'>
                    <FormHelperText>あなたのキャラの名前を入力してください。</FormHelperText>
                    <Input type='text' w='50%' borderColor='black' textAlign='center'
                      data-testid="input"
                      id="chara_name"
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
                    <RadioGroup defaultValue="cool" id="character">
                      <VStack w='100%'>
                        <Radio value="cool">かっこいい系</Radio>
                        <Radio value="cute">かわいい系</Radio>
                        <Radio value="poor">ぼんやり系</Radio>
                        <Radio value="philosophy">ふしぎ系</Radio>
                      </VStack>
                    </RadioGroup>
                  </VStack>
                </Center>
                <Center>
                  <Button type="submit">確定</Button>
                </Center>
              </FormControl>
            </Box>
          </Container>
        </form>
      </Fade>
    </>
  )
}
