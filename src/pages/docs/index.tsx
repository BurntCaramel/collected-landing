import * as React from 'react'
import { Link } from 'react-static'
import LinkList from '../../components/LinkList'

interface Props {}

const DocsIndexPage = (props: Props) => (
  <div>
    <h1 className="mt-8 mb-8">Collected Docs</h1>

    <nav className="mb-8">
      <LinkList>
        <Link to="/docs/create" className="text-xl">
          Creating content
        </Link>
        <Link to="/docs/api" className="text-xl">
          GraphQL API
        </Link>
      </LinkList>
    </nav>
  </div>
)

export default DocsIndexPage
