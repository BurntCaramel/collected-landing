import * as React from 'react'
import { Link } from 'react-static'
import queryFromLocation from '../nav/queryFromLocation'
import PreviewNav from '../components/Preview/Nav'

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

function renderCard(card: Card) {
  const { tags } = card.name

  if (tags[0] === 'nav') {
    return renderNavCard(card)
  } else if (tags[0] === 'page') {
    return renderPageCard(card)
  } else {
    return null
  }
}

function renderNavCard(card: Card) {
  return <PreviewNav tags={card.name.tags} sections={card.body.sections} />
}

function renderHeading(heading: { level: number; text: string }) {
  let Component = 'h3'
  if (heading.level === 1) {
    Component = 'h1'
  } else if (heading.level === 2) {
    Component = 'h2'
  } else if (heading.level === 3) {
    Component = 'h3'
  }

  return <Component key={heading.text}>{heading.text}</Component>
}

function renderPageCard(card: Card) {
  return (
    <div key={card.id} className="mb-8">
      <h2>{card.name.text}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          padding: '1rem',
          backgroundColor: 'white',
        }}
      >
        {card.body.sections.map(section => (
          <div
            style={{
              marginBottom: '1rem',
            }}
          >
            {section.headings.map(renderHeading)}
          </div>
        ))}
      </div>
    </div>
  )
}

function renderList(list: List) {
  return <div>{list.cards.map(renderCard)}</div>
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

    fetch('https://staging.1.source.collected.design/graphql', {
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
