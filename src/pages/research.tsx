import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import queryFromLocation from '../nav/queryFromLocation'
import PreviewItem from '../components/Preview/Item'
import { Source, Collection, Unit } from '../types/source'
import {
  queryCollectedIATrelloBoard,
  GraphQLResult,
  GraphQLError,
} from '../services/source'

const renderUnit = (collection: Collection) => (unit: Unit) => {
  return (
    <PreviewItem
      tags={unit.tags}
      text={unit.name}
      sections={unit.body.sections}
      frontmatter={unit.body.frontmatter}
      domain={collection.domain}
    />
  )
}

function renderCollection(collection: Collection) {
  return <div>{collection.units.map(renderUnit(collection))}</div>
}

interface Props {
  location: Location
}

interface State {
  result: GraphQLResult<{ source: Source }>
}

class ResearchPage extends React.Component<Props, State> {
  state: State = {
    result: null,
  }

  get graphqlURL(): string {
    return window.location.hostname === 'collected.design'
      ? 'https://1.source.collected.design/graphql'
      : window.location.hostname === 'localhost'
        ? 'http://localhost:9090/graphql'
        : 'https://staging.1.source.collected.design/graphql'
  }

  componentDidMount() {
    let { q } = queryFromLocation(this.props.location)

    let body = null
    let tags = null
    if (/#/.test(q)) {
      tags = q
        .replace(/#/g, '')
        .split(/\s+/)
        .map(s => s.trim())
        .filter(Boolean)
      
      q = null
    }

    queryCollectedIATrelloBoard({ q, tags }).then(result => {
      this.setState({ result })
    })
  }

  render() {
    const { result } = this.state

    return (
      <div>
        <h1 className="mt-8 mb-8">Research</h1>

        {!result && <p>Loading…</p>}

        {!!result &&
          result instanceof Error && (
            <p>
              {'Error: '}
              {result.message}
            </p>
          )}

        {!!result &&
          !!result.errors && (
            <div>
              {result.errors.map(error => (
                <p>
                  {'Error: '}
                  {error.message}
                </p>
              ))}
            </div>
          )}

        {!!result &&
          !!result.data &&
          !!result.data.source.collections &&
          result.data.source.collections.map(collection => (
            <div key={collection.name}>
              <h2>
                <Link
                  to={`/research/?q=${encodeURIComponent(collection.name)}`}
                >
                  {collection.name}
                </Link>
              </h2>
              {renderCollection(collection)}
            </div>
          ))}

        {/* <article className="mb-8">
          <h2 className="mb-2">Information Architecture</h2>
        </article>

        <article className="mb-8">
          <h2 className="mb-2">Components</h2>
        </article> */}
      </div>
    )
  }
}

export default ResearchPage
