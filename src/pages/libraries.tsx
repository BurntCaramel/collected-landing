import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import queryFromLocation from '../nav/queryFromLocation'
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

interface Props {
  location: Location
}

interface State {
  owner: string
  repoName: string
  result: GraphQLResult<{ source: GitHubSource }> | null
  fileSearch: string
}

class LibrariesPage extends React.PureComponent<Props, State> {
  state: State = {
    owner: '',
    repoName: '',
    result: null,
    fileSearch: '',
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    let { owner = '', repoName = '' } = queryFromLocation(nextProps.location)
    owner = owner.trim()
    repoName = repoName.trim()

    return { owner, repoName }
  }

  get canLoad() {
    const { owner, repoName } = this.state
    if (owner === '' || repoName === '') {
      return false
    }

    return true
  }

  load() {
    if (!this.canLoad) {
      return
    }

    const { owner, repoName } = this.state
    queryESInGitHubRepo(owner, repoName, {
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
      this.setState({ result: source })
    })
  }

  onChangeFileSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fileSearch: e.target.value })
  }

  render() {
    let { result, fileSearch, owner, repoName } = this.state

    fileSearch = fileSearch.trim()
    const includeFile: (file: File) => boolean =
      fileSearch === ''
        ? () => true
        : file => file.path.toLowerCase().indexOf(fileSearch) !== -1

    return (
      <div>
        <h1 className="mt-8 mb-8">Libraries</h1>

        <article className="mb-8">
          <h2 className="my-4">
            {owner} / {repoName}
          </h2>

          {!result && this.canLoad && <p>Loading…</p>}
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
            !!result.data && (
              <div>
                {!!result.data.source.dependencies && (
                  <div className="mb-8">
                    <h3 className="my-2">Dependencies</h3>
                    {result.data.source.dependencies.sources.map(
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
                )}
                {!!result.data.source.files && (
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
                    {result.data.source.files.filter(includeFile).map(file => (
                      <div key={file.path} className="my-4">
                        <h4>{file.path}</h4>
                        {!!file.asJavaScript && <JavaScriptFile file={file} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </article>
      </div>
    )
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { owner, repoName } = this.state
    if (owner !== prevState.owner || repoName !== prevState.repoName) {
      this.load()
    }
  }
}

export default LibrariesPage
