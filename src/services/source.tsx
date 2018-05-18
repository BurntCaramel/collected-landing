import { Source, Collection, GitHubSource } from '../types/source'

function graphqlURL(): string {
  return window.location.hostname === 'collected.design'
    ? 'https://collected-source-dot-collected-193006.appspot.com/graphql' //'https://1.source.collected.design/graphql'
    : window.location.hostname === 'localhost'
      ? 'http://localhost:9090/graphql'
      : 'https://staging.1.source.collected.design/graphql'
}

const collectedIABoardID = '4wctPH1u'

const searchCollectionsInTrelloBoardQuery = `
query Search($boardID: String!, $q: String, $tags: [String!]) {
  source: trelloBoard(id: $boardID) {
    name
    collections(q: $q) {
      name
      domain: value(key: "domain")
      units(tags: $tags) {
        name
        tags
        body {
          frontmatter {
            title: value(key: "title"),
            description: value(key: "description")
          }
          sections {
            headings {
              text
              level
            }
            listItems {
              content {
                text
                tags
              }
              childItems {
                content {
                  text
                  tags
                }
              }
            }
          }
        }
      }
    }
  }
}
`

const searchESInGitHubRepo = `
query Search($owner: String!, $repoName: String!, $pathPrefixes: [String], $pathMatching: [String], $pathNotMatching: [String], $includeContent: Boolean!) {
  source: gitHubRepo(owner: $owner, repoName: $repoName) {
    npmProjects {
      directoryPath
      name
      version
      dependencies {
        items {
          name
          rule
        }
      }
    }
    dependencies {
      sources {
        file {
          path
        }
        items {
          name
          rule
          groups
        }
      }
    }
    dependencies {
      sources {
        file {
          path
        }
        items {
          name
          rule
          groups
        }
      }
    }
    files(pathPrefixes: $pathPrefixes, pathMatching: $pathMatching, pathNotMatching: $pathNotMatching) {
      path
      content @include(if: $includeContent)
      asJavaScript {
        transform {
          imports {
            source
            specifiers {
              in
              as
            }
          }
          classes {
            name
            superClass
            methods {
              name
              lineCount
            }
          }
        }
      }
    }
  }
}
`

export type GraphQLError = {
  message: string
}

export type GraphQLResult<Data> = {
  data?: Data
  errors?: GraphQLError[]
}

async function queryCollectedSource<Data>(
  query: string,
  variables: {}
): Promise<GraphQLResult<Data>> {
  const body = {
    variables,
    query,
  }

  console.log('fetching', body)

  return fetch(graphqlURL(), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json())
}

export async function queryTrelloBoard(
  boardID: string,
  { q, tags }: { q?: string; tags?: string[] }
): Promise<GraphQLResult<{ source: Source }>> {
  return queryCollectedSource<{ source: Source }>(
    searchCollectionsInTrelloBoardQuery,
    {
      boardID,
      q,
      tags,
    }
  )
}

export async function queryCollectedIATrelloBoard(query: {
  q?: string
  tags?: string[]
}): Promise<GraphQLResult<{ source: Source }>> {
  return queryTrelloBoard(collectedIABoardID, query)
}

export async function queryESInGitHubRepo(
  owner: string,
  repoName: string,
  {
    includeContent = false,
    pathPrefixes,
    pathMatching,
    pathNotMatching,
  }: {
    includeContent: boolean
    pathPrefixes?: string[]
    pathMatching?: string[]
    pathNotMatching?: string[]
  }
): Promise<GraphQLResult<{ source: GitHubSource }>> {
  return queryCollectedSource<{ source: GitHubSource }>(searchESInGitHubRepo, {
    owner,
    repoName,
    includeContent,
    pathPrefixes,
    pathMatching,
    pathNotMatching,
  })
}
