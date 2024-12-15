import { Center, Spinner } from "@chakra-ui/react"

export const Loading = () => {

  return (
    <>
      <Center w="100vw" h="100vh">
        <Spinner></Spinner>
      </Center>
    </>
  )
}