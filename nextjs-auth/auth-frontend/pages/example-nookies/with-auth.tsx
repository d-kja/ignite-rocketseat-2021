import { GetServerSideProps } from "next"
import React from "react"
import { apiClient } from "../../app/services/api"
import { withSSRAuth } from "../../utils/withSSRAuth"

const withAuth = () => {
  return <div>withAuth</div>
}

// Redirect if it doesn't have a token
export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const api = apiClient(ctx)

    try {
      const response = await api.get("/me")
      console.log(response.data)
    } catch (error) {
      console.log(error)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }

    return {
      props: {},
    }
  }
)

export default withAuth
