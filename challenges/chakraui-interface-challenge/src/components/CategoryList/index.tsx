import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { CategoryIcon } from "./CategoryIcon";

export const CategoryList = () => {
  const isScreenLarge = useBreakpointValue({ base: false, lg: true });
  const ellipse = "ellipse.svg";

  return (
    <Flex
      justify={isScreenLarge ? "center" : "space-around"}
      align="center"
      gap={isScreenLarge ? "130" : "27px"}
      flexWrap="wrap"
    >
      <CategoryIcon
        icon={`/images/category-icons/${
          isScreenLarge ? "cocktail.svg" : ellipse
        }`}
        label="vida noturna"
        h={isScreenLarge ? 85 : "8px"}
      />
      <CategoryIcon
        icon={`/images/category-icons/${isScreenLarge ? "surf.svg" : ellipse}`}
        label="praia"
        h={isScreenLarge ? 85 : "8px"}
      />
      <CategoryIcon
        icon={`/images/category-icons/${
          isScreenLarge ? "building.svg" : ellipse
        }`}
        label="moderno"
        h={isScreenLarge ? 85 : "8px"}
      />
      <CategoryIcon
        icon={`/images/category-icons/${
          isScreenLarge ? "museum.svg" : ellipse
        }`}
        label="classico"
        h={isScreenLarge ? 85 : "8px"}
      />
      <CategoryIcon
        icon={`/images/category-icons/${isScreenLarge ? "earth.svg" : ellipse}`}
        label="e mais..."
        h={isScreenLarge ? 85 : "8px"}
      />
    </Flex>
  );
};
