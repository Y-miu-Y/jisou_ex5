import { AbsoluteCenter, Box, Divider } from '@chakra-ui/react';

export const SeparateBar = ({children}: {children:string}) => {

  return (
    <>
      <Box position='relative' padding='10'>
        <Divider  borderColor="black"></Divider>
        <AbsoluteCenter bg='white' px='4'>
          {children}
        </AbsoluteCenter>
      </Box>
    </>
  );
};