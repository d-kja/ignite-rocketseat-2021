import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { withSSRGuest } from "../../utils/withSSRGuest"

const Test = () => {
  return (
    <div>Using nookies with the server-side-context to redirect the user</div>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => ({
  props: {},
}))

export default Test
