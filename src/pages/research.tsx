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
import makeAware from 'react-organism'

const unitsWithTag = (tag: string, units: Unit[]) => {
  return units.filter(unit => unit.tags[0] === tag)
}

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
  return <div>
    {unitsWithTag('category', collection.units).map(unit => (
      <dl>
        { false && <dt>{unit.name}:</dt> }
        {unit.body.sections.map(section => (
          <>
            {section.listItems.map(listItem => (
              <dd>{listItem.content.text}</dd>
            ))}
          </>
        ))}
      </dl>
    ))}
    {collection.units.map(renderUnit(collection))}
  </div>
}

interface PageProps {
  location: Location
}

interface RenderProps {
  q: string
}

interface State {
  result: GraphQLResult<{ source: Source }>
}

const stateHandlers = {
  initial(): State {
    return { result: null }
  },

  async load(
    props: RenderProps,
    prevProps: RenderProps | null
  ): Promise<Partial<State> | null> {
    if (!prevProps || props.q !== prevProps.q) {
      let q = props.q
      let tags = null
      if (/#/.test(q)) {
        tags = q
          .replace(/#/g, '')
          .split(/\s+/)
          .map(s => s.trim())
          .filter(Boolean)

        q = null
      }

      const result = await queryCollectedIATrelloBoard({ q, tags })
      return { result }
    }

    return null
  },
}

function Render({ result }: State): JSX.Element {
  const collections =
    (!!result &&
    !!result.data &&
    !!result.data.source.collections &&
    !!result.data.source.collections
      ? result.data.source.collections.filter(collection => collection.units.length > 0)
      : null) || null

  const count =
    collections
      ? collections.length
      : null

  return (
    <div>
      <h3 className="mt-8 mb-8">
        {count != null &&
          (count === 1 ? `1 catalog result` : `${count} catalog results`)}
      </h3>

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

      {!!collections &&
        collections.map(collection => (
          <div key={collection.name}>
            <h2>
              <Link to={`/research/?q=${encodeURIComponent(collection.name)}`}>
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

const Loader: React.ComponentClass<RenderProps> = makeAware(
  Render,
  stateHandlers
)

class ResearchPage extends React.Component<PageProps> {
  render() {
    const { q } = queryFromLocation(this.props.location)

    return <Loader q={q} />
  }
}

export default ResearchPage
