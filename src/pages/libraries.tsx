import * as React from 'react'
import { Link } from 'react-static'
import { queryESInGitHubRepo, GraphQLResult } from '../services/source'
import { GitHubSource, File } from '../types/source'
// import CodeEditor from '../components/CodeEditor'
import JavaScriptFile from '../components/File/JavaScriptFile'

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
  fileSearch: string
}

class LibrariesPage extends React.PureComponent {
  state: State = {
    seekStyleGuide: null,
    fileSearch: '',
  }

  componentDidMount() {
    queryESInGitHubRepo('seek-oss', 'seek-style-guide', {
      includeContent: true,
      // pathPrefixes: ['react/'],
      pathMatching: ['**/*.js'],
      pathNotMatching: [
        '**/test/**',
        '**/__snapshots__/*',
        '**/*.config.js',
        '**/*.demo.js',
        '**/*.test.js',
        '**/*.sketch.js',
        '**/private/**',
      ],
    }).then(source => {
      this.setState({ seekStyleGuide: source })
    })
  }

  onChangeFileSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fileSearch: e.target.value })
  }

  render() {
    let { seekStyleGuide, fileSearch } = this.state

    fileSearch = fileSearch.trim()
    const includeFile: (file: File) => boolean =
      fileSearch === ''
        ? () => true
        : file => file.path.toLowerCase().indexOf(fileSearch) !== -1

    return (
      <div>
        <h1 className="mt-8 mb-8">Libraries</h1>

        <article className="mb-8">
          <h2 className="my-2">Seek Style Guide</h2>

          {!seekStyleGuide && <p>Loading…</p>}
          {!!seekStyleGuide &&
            !!seekStyleGuide.errors && (
              <div>
                {seekStyleGuide.errors.map(error => (
                  <p>
                    {'Error: '}
                    {error.message}
                  </p>
                ))}
              </div>
            )}
          {!!seekStyleGuide &&
            !!seekStyleGuide.data && (
              <div>
                <div className="mb-4">
                  <h3 className="my-2">Dependencies</h3>
                  {seekStyleGuide.data.source.dependencies.sources.map(
                    dependencySource => (
                      <div>
                        <div className="my-2">
                          <em>{dependencySource.file.path}</em>
                        </div>
                        <Grid columns="repeat(auto-fill, 12rem)" gap={10}>
                          {dependencySource.items.map(item => (
                            <div>
                              <div className="font-bold">{item.name}</div>
                              <div>{item.rule}</div>
                            </div>
                          ))}
                        </Grid>
                      </div>
                    )
                  )}
                </div>
                <div>
                  <h3>
                    {'Files '}
                    <input
                      className="ml-2 px-2 py-1 text-base font-normal"
                      value={fileSearch}
                      placeholder="Filter files…"
                      onChange={this.onChangeFileSearch}
                    />
                  </h3>
                  {seekStyleGuide.data.source.files
                    .filter(includeFile)
                    .map(file => (
                      <div key={file.path} className="my-4">
                        <h4>{file.path}</h4>
                        {!!file.asJavaScript && <JavaScriptFile file={file} />}
                      </div>
                    ))}
                </div>
              </div>
            )}
        </article>
      </div>
    )
  }
}

export default LibrariesPage
