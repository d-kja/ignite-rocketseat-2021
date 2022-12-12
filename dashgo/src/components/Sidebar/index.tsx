import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useSidebarDrawer } from "../../context/SidebarDrawerContext"
import { SidebarBody } from "./SidebarBody"

export default function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()
  const isFloatingSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isFloatingSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navigation</DrawerHeader>

            <DrawerBody>
              <SidebarBody />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarBody />
    </Box>
  )
}
