import { ChakraProvider} from "@chakra-ui/react"
import { CharaGitRouter } from "./CharaGitRouter"

export const CharaGitProvider = () => {
  return (
    <>
      <ChakraProvider>
        <CharaGitRouter />
      </ChakraProvider>
    </>
  )
}