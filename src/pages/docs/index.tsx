import * as React from 'react'
import { Link } from 'react-static'

interface Props {}

const DocsIndexPage = (props: Props) => (
  <div>
    <h1 className="mt-8 mb-8">Collected Docs</h1>

    <nav className="mb-8">
      <ul>
        <li>
          <Link to="/docs/create">Create</Link>
        </li>
        <li>
          <Link to="/docs/api">API</Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default DocsIndexPage
