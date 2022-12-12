import {
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react"

type SidebarDrawerContext = UseDisclosureReturn
interface SidebarDrawerProvider {
  children: ReactNode
}

const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContext
)
export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProvider) => {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () =>
  useContext(SidebarDrawerContext)
