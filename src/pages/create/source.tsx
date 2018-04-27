import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import makeAware, { ReceiverProps } from 'react-organism'
import * as SourceLoading from '../../state/sourceLoading'
import queryFromLocation from '../../nav/queryFromLocation'
import PreviewItem from '../../components/Preview/Item'

interface Props {
  location: Location
}

const SourceLoader: React.ComponentClass<SourceLoading.Props> = makeAware(
  ({ source }: SourceLoading.State) => (
    <div>
      {!source && <p>Loading…</p>}
      {!!source && <h1>{name}</h1>}
      {!!source &&
        source.collections &&
        source.collections.map((collection, collectionIndex) => (
          <div key={collectionIndex}>
            <h2>{collection.name}</h2>
            <div>
              {collection.units.map((unit, unitIndex) => (
                <PreviewItem
                  tags={unit.tags}
                  text={unit.name}
                  sections={unit.body.sections}
                  frontmatter={unit.body.frontmatter}
                  domain={collection.domain}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  ),
  SourceLoading
)

const LoadSourcePage = (
  props: Props & ReceiverProps<SourceLoading.HandlersOut>
) => {
  const query = queryFromLocation(props.location)

  return (
    <div>
      <h1 className="mt-8 mb-8">{'Create from Source'}</h1>

      <article className="mb-8">
        <h2>
          Source:{' '}
          <a href={query.url} rel="noopener">
            {query.url}
          </a>
        </h2>
        <SourceLoader url={query.url} />
      </article>
    </div>
  )
}

export default LoadSourcePage
