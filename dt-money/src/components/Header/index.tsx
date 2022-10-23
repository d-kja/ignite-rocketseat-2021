import LogoDtMoney from "../../assets/logo.svg"
import { Container, Content } from "./styles"

import { Trigger } from "@radix-ui/react-dialog"

export const Header = () => {
  return (
    <Container>
      <Content>
        <img src={LogoDtMoney} alt="dt money" />
        <Trigger type="button">New transaction</Trigger>
      </Content>
    </Container>
  )
}
