import { Source, Collection } from '../types/source'

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

const searchListsInTrelloBoardQuery = `
query Search($boardID: String!, $q: String) {
  collectedIA: trelloBoard(id: $boardID) {
    name
    lists(q: $q) {
      id
      name
      cards {
        id
        name {
          text
          tags
        }
        body: desc {
          frontmatter {
            title: value(key: "title"),
            description: value(key: "description")
          }
          source,
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

export type GraphQLError = {
  message: string
}

export type GraphQLResult<Data> = {
  data?: Data
  errors?: GraphQLError[]
}

export async function queryCollectedSource<Data>(
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
