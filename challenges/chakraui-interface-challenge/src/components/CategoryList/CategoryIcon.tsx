import {
  Flex,
  Image,
  ImageProps,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface CategoryIconProps extends ImageProps {
  icon: string;
  label?: string;
}

export const CategoryIcon = ({
  icon,
  label = "",
  ...props
}: CategoryIconProps) => {
  const isScreenLarge = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      gap={isScreenLarge ? "6" : "2"}
      _hover={{
        filter: "brightness(0.75)",
        transition: "filter .2s",
        cursor: "pointer",
      }}
      direction={isScreenLarge ? "column" : "row"}
      align={isScreenLarge ? "" : "center"}
    >
      <Image src={icon} alt={"icon"} {...props} />

      {!!label && (
        <Text fontWeight={600} fontSize={24}>
          {label}
        </Text>
      )}
    </Flex>
  );
};
