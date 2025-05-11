import { AbsoluteCenter, Box, Divider, useColorModeValue } from '@chakra-ui/react';

export const SeparateBar = ({children, bgColor}: {children:string, bgColor?:string}) => {
  const defaultBgColor = useColorModeValue('blue.50', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <>
      <Box position='relative' padding='10'>
        <Divider borderColor="gray.300"></Divider>
        <AbsoluteCenter bg={bgColor ?? defaultBgColor} px='4' color={textColor}>
          {children}
        </AbsoluteCenter>
      </Box>
    </>
  );
};