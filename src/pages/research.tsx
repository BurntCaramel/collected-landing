import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import queryFromLocation from '../nav/queryFromLocation'
import PreviewItem from '../components/Preview/Item'

const listSearchQuery = `
query Search($q: String) {
  collectedIA: trelloBoard(id: "4wctPH1u") {
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

const cardTagsQuery = `
query Search($tags: [String!]) {
  collectedIA: trelloBoard(id: "4wctPH1u") {
    name
    lists {
      id
      name
      cards(tags: $tags) {
        id
        name {
          text
          tags
        }
        body: desc {
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

interface Card {
  id: string
  name: {
    text: string
    tags: [string]
  }
  body: {
    frontmatter: {
      title: string | null
      description: string | null
    }
    sections: [
      {
        headings: [
          {
            level: number
            text: string
          }
        ]
        listItems: [
          {
            text: string
            tags: [string]
          }
        ]
      }
    ]
  }
}

interface List {
  id: string
  name: string
  cards: [Card]
}

interface SuccessResult {
  data: {
    collectedIA: {
      lists: [List]
    }
  }
}

interface FailureResult {
  errors: [
    {
      message: string
    }
  ]
}

const renderCard = (list: List) => (card: Card) => {
  const listName = list.name
  const [domain] = listName.split(' ').slice(-1)

  const { tags } = card.name

  return (
    <PreviewItem
      tags={card.name.tags}
      text={card.name.text}
      sections={card.body.sections}
      frontmatter={card.body.frontmatter}
      domain={domain}
    />
  )
}

function renderList(list: List) {
  return <div>{list.cards.map(renderCard(list))}</div>
}

interface Props {
  location: Location
}

interface State {
  result: SuccessResult | FailureResult | Error
}

const isSuccess = (
  result: SuccessResult | FailureResult | Error
): result is SuccessResult => !!(result as SuccessResult).data

const isFailure = (
  result: SuccessResult | FailureResult | Error
): result is FailureResult => !!(result as FailureResult).errors

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
    const { q } = queryFromLocation(this.props.location)

    let body = null
    if (/#/.test(q)) {
      body = {
        variables: {
          tags: q
            .replace(/#/g, '')
            .split(/\s+/)
            .map(s => s.trim())
            .filter(Boolean),
        },
        query: cardTagsQuery,
      }
    } else {
      body = {
        variables: {
          q: q || '',
        },
        query: listSearchQuery,
      }
    }

    fetch(this.graphqlURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ result: json })
      })
      .catch(error => {
        this.setState({ result: error })
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
          isFailure(result) && (
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
          isSuccess(result) &&
          result.data.collectedIA.lists.map(list => (
            <div key={list.name}>
              <h1>{list.name}</h1>
              {renderList(list)}
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
