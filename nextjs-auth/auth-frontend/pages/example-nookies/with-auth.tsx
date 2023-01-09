import { GetServerSideProps } from "next"
import React from "react"
import { apiClient } from "../../app/services/api"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { AuthTokenError } from "../../app/services/errors/AuthTokenError"

const withAuth = () => {
  return <div>withAuth</div>
}

// Redirect if it doesn't have a token
export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const api = apiClient(ctx)

    const response = await api.get("/me")
    console.log(response.data)

    return {
      props: {},
    }
  }
)

export default withAuth
