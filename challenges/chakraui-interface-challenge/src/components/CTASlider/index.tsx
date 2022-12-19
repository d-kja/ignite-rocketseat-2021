import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Slider from "./Slider";

export const CTASlider = () => {
  return (
    <Stack spacing="20px">
      <Text fontWeight={500} fontSize={[20, 36]} textAlign="center">
        Vamos nessa? <br /> Então escola seu continente
      </Text>

      <Flex justify="center" align="center">
        <Box maxW={1240} mb="40px">
          <Slider />
        </Box>
      </Flex>
    </Stack>
  );
};
