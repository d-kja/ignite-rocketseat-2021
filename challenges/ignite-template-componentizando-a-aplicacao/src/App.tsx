import "./styles/global.scss"

import "./styles/sidebar.scss"
import "./styles/content.scss"

import { SideBar } from "./components/SideBar"
import { Content } from "./components/Content"
import { MovieProvider } from "./context/MovieContext"

export function App() {
  return (
    <MovieProvider>
      <div
        style={{ display: "flex", flexDirection: "row" }}
      >
        <SideBar />
        <Content />
      </div>
    </MovieProvider>
  )
}
