import * as React from 'react'
import { Link } from 'react-static'
import { queryESInGitHubRepo, GraphQLResult } from '../services/source'
import { GitHubSource } from '../types/source'

const Grid = ({
  Component = 'div',
  children,
  columns,
  gap,
}: {
  Component?: React.ComponentClass | React.StatelessComponent | string
  children: any
  columns?: string | number
  gap: string | number
}) => (
  <Component
    style={{
      display: 'grid',
      gridTemplateColumns:
        typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      gridGap: gap,
    }}
  >
    {children}
  </Component>
)

interface State {
  seekStyleGuide: GraphQLResult<{ source: GitHubSource }> | null
}

class LibrariesPage extends React.PureComponent {
  state: State = {
    seekStyleGuide: null
  }

  componentDidMount() {
    queryESInGitHubRepo('seek-oss', 'seek-style-guide', {
      pathPrefixes: ['react/'],
      pathMatching: ["**/*.js"],
      pathNotMatching: ["**/__snapshots__/*", "**/*.demo.js", "**/*.test.js", "**/*.sketch.js", "**/private/**"]
    })
      .then(source => { this.setState({ seekStyleGuide: source })})
  }

  render() {
    const { seekStyleGuide } = this.state

    return (
  <div>
    <h1 className="mt-8 mb-8">Libraries</h1>

    <article className="mb-8">
      <h2 className="my-2">Seek Style Guide</h2>

      {!seekStyleGuide && <p>Loading…</p>}
      {!!seekStyleGuide && !!seekStyleGuide.errors && <div>
        {seekStyleGuide.errors.map(error => (
          <p>
            {'Error: '}
            {error.message}
          </p>
        ))}
      </div>}
      {!!seekStyleGuide && !!seekStyleGuide.data && <div>
        <div className='mb-4'>
          <h3 className='my-2'>Dependencies</h3>
          {seekStyleGuide.data.source.dependencies.sources.map(dependencySource => (
            <div>
              <div className='my-2'><em>{dependencySource.file.path}</em></div>
              <Grid
                columns='repeat(auto-fill, 12rem)'
                gap={10}
              >
                {dependencySource.items.map(item => (
                  <div>
                    <div className='font-bold'>{item.name}</div>
                    <div>{item.rule}</div>
                  </div>
                ))}
              </Grid>
            </div>
          ))}
        </div>
        <div>
          <h3>Files</h3>
          {seekStyleGuide.data.source.files.map(file => (
            <div>
              <h4>{file.path}</h4>
              {!!file.asJavaScript &&
                <>
                  <dl>
                    {file.asJavaScript.transform.imports.map(importDeclaration => (
                      <>
                        <dt className='ml-4'>{importDeclaration.source}</dt>
                      </>
                    ))}
                  </dl>
                </>
              }
            </div>
          ))}
        </div>
      </div>}
    </article>
  </div>
  )
}
}

export default LibrariesPage
