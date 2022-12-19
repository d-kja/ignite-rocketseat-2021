import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";

interface SlideProps {
  src: string;
  title: string;
  subTitle: string;
}

export const Slide = ({ src, title, subTitle }: SlideProps) => {
  return (
    <Box h={["250px", "250px", "450px"]} w="full" position="relative">
      <Image
        src={src}
        alt={title}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center"
        filter={"brightness(.55)"}
      />
      <Stack
        spacing={16}
        position="absolute"
        left="50%"
        top="50%"
        __css={{
          transform: "translate(-50%, -50%)",
          filter: "brightness(120%)",
        }}
        textAlign="center"
        color="gray.50"
      >
        <Heading fontWeight={700} fontSize={["28px", "28px", "48px"]}>
          {title}
        </Heading>

        <Text fontWeight={700} fontSize={["14px", "14px", "24px"]}>
          {subTitle}
        </Text>
      </Stack>
    </Box>
  );
};
