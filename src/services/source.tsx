import { Source, Collection, GitHubSource } from '../types/source'

function graphqlURL(): string {
  return window.location.hostname === 'collected.design'
    ? 'https://1.source.collected.design/graphql'
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
              text
              tags
            }
          }
        }
      }
    }
  }
}
`

const searchESInGitHubRepo = `
query Search($owner: String!, $repoName: String!, $pathPrefixes: [String], $pathMatching: [String], $pathNotMatching: [String]) {
  source: gitHubRepo(owner: $owner, repoName: $repoName) {
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
    pathPrefixes,
    pathMatching,
    pathNotMatching,
  }: {
    pathPrefixes?: string[]
    pathMatching?: string[]
    pathNotMatching?: string[]
  }
): Promise<GraphQLResult<{ source: GitHubSource }>> {
  return queryCollectedSource<{ source: GitHubSource }>(searchESInGitHubRepo, {
    owner,
    repoName,
    pathPrefixes,
    pathMatching,
    pathNotMatching,
  })
}
