// Styling
import { GlobalStyle } from "./styles/global"

// Component
import { Home } from "./pages/home"
import { TransactionsProvider } from "./context/TransactionsContext"

export function App() {
  return (
    <TransactionsProvider>
      <Home />
      <GlobalStyle />
    </TransactionsProvider>
  )
}
