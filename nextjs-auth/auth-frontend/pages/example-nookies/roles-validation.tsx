import { GetServerSideProps } from "next"
import { withSSRAuth } from "../../utils/withSSRAuth"

const rolesValidation = () => {
  return <div>Validation page!</div>
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    }
  },
  {
    validation: {
      roles: [
        // "administrator",
        "editor",
      ],
    },
  }
)

export default rolesValidation
