import * as React from 'react'
import { Link } from 'react-static'

const AccountPage = () => (
  <div>
    <h1 className="mt-8 mb-8">Your Collected Account</h1>

    <article className="mb-8">
      <h3>Trello: @username</h3>
      <p>Connect a Trello board</p>
    </article>

    <article className="mb-8">
      <h3>GitHub: @Username</h3>
      <p>Connect a GitHub repo</p>
    </article>

    <article className="mb-8">
      <h3>Figma</h3>
      <p>Connect a Figma document</p>
    </article>
  </div>
)

export default AccountPage
