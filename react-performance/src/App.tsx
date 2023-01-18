import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryClient } from "./services/react-query"

import Home from "./pages/Home"

function App() {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default App
