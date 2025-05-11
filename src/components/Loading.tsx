import { Center, Spinner, Text, Box, useColorModeValue } from "@chakra-ui/react"

export const Loading = () => {
  const spinnerColor = "#222";
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.100, white)",
    "linear(to-b, gray.800, gray.900)"
  );
  return (
    <Box w="100vw" h="100vh" bgGradient={bgGradient}>
      <Center w="100vw" h="100vh" flexDirection="column">
        <Spinner size="xl" thickness="6px" speed="0.7s" color={spinnerColor} mb={6} />
        <Text fontSize="2xl" color="#222" fontWeight="bold" letterSpacing="wide">
          読み込み中...
        </Text>
      </Center>
    </Box>
  )
}