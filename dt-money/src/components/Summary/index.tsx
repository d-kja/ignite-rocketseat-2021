import { Container } from "./styles"
import IncomeSVG from "../../assets/income.svg"
import OutcomeSVG from "../../assets/outcome.svg"
import TotalSVG from "../../assets/total.svg"

export const Summary = () => {
  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={IncomeSVG} alt="income" />
        </header>
        <strong>R$ 1.000.00</strong>
      </div>

      <div>
        <header>
          <p>Outcome</p>
          <img src={OutcomeSVG} alt="outcome" />
        </header>
        <strong>- R$ 500.00</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={TotalSVG} alt="total" />
        </header>
        <strong>R$ 500.00</strong>
      </div>
    </Container>
  )
}
