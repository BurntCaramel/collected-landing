import * as React from 'react'
import { Link } from 'react-static'

const SignInPage = () => (
  <div>
    <h1 className="mt-8 mb-8">Welcome to Collected</h1>

    <article className="mb-8">
      <p>Sign up with one of the following:</p>
      <p>
        <a href="/api-auth-1/signin/github">GitHub</a>
      </p>
      <p>
        <a href="/api-auth-1/signin/trello">Trello</a>
      </p>
      <p>
        <a href="/api-auth-1/signin/figma">Figma</a>
      </p>
    </article>
  </div>
)

export default SignInPage
