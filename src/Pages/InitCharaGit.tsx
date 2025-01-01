import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkUserExists } from "../utils/urlUtils";
import { isExistDBGitId } from "../services/CharaGItService";
import { SeparateBar } from "../components/SeparateBar";
import { CGTopHeader } from "../components/CGTopHeader";

type Form = {
  github_id: string;
}

export const InitCharaGit = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();

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
    <>
      <CGTopHeader />
      <Container maxW="4xl">
        <Heading as="h2" fontSize="3xl">Gitキャラ育成ゲーム</Heading>
        <SeparateBar>概要</SeparateBar>
        <Box>
          <Text textAlign="center">
            Githubのcontribution（草）を利用して、あなたのキャラを育てましょう。<br/>
            キャラはあなたの草を食べて、あなたのスキルと共に成長します。<br/>
          </Text>
        </Box>
        <Spacer h="50px"></Spacer>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card shadow="2xl" border="1px">
              <CardHeader textAlign="center">
                <Heading fontSize="lg">GithubIDを入力</Heading>
              </CardHeader>
              <CardBody>
                <FormControl isInvalid={!!errors.github_id}>
                  <FormLabel htmlFor="github_id">GithubID</FormLabel>
                  <Input id="github_id"
                  {...register('github_id', {
                    required : '入力されていません。',
                    validate : async (id) => {
                      return await checkUserExists(id) ? true : 'ユーザーが存在しません';
                    }
                  })}>
                  </Input>
                  <FormErrorMessage>
                    {errors.github_id && errors.github_id.message}
                  </FormErrorMessage>
                </FormControl>
                <Button type="submit">送信</Button>
              </CardBody>
            </Card>
          </form>
        </Box>
      </Container>
    </>
  )
}
