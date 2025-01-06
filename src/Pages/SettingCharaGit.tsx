import { useNavigate, useParams } from "react-router-dom";
import { CGHeader } from "../components/CGHeader";
import { Box, Button, Center, Container, Fade, FormControl, FormErrorMessage, FormHelperText, Heading, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { SeparateBar } from "../components/SeparateBar";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegistCharaGit } from "../hooks/useRegistCharaGit";

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
    <>
      <CGHeader id={id ?? ""}/>
      <Fade in={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxW="4xl">
            <Heading as="h2" fontSize="3xl" data-testid="title">Gitキャラ設定入力</Heading>
            <Box w='100%' justifyContent='center'>
              <Center>
                <Text></Text>
              </Center>
            </Box>
            <Box w='100%' justifyContent='center' mb="20px">
              <SeparateBar>あなたのGithubID</SeparateBar>
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
                <Center>
                  <Button type="submit" data-testid="submit">確定</Button>
                </Center>
              </FormControl>
            </Box>
          </Container>
        </form>
      </Fade>
    </>
  )
}
