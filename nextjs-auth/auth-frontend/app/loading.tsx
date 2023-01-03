import { Loading as LoadingComponent } from "./components/Loading"

export default function Loading() {
  return (
    <section
      aria-label="loading container"
      className="fixed inset-0 bg-base-100"
    >
      <LoadingComponent />
    </section>
  )
}
