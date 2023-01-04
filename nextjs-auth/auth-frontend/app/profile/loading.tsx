import { Loading as LoadingComponent } from "../components/Loading"

const Loading = () => {
  return (
    <section
      aria-label="loading container"
      className="flex flex-1 h-full bg-base-100"
    >
      <LoadingComponent />
    </section>
  )
}

export default Loading
