import * as React from 'react'
import Link from 'gatsby-link'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'
import AWSIcon from '../components/FontAwesome/AWS'
import queryFromLocation from '../nav/queryFromLocation'

interface Props {
  location: Location
}

interface Card {
  name: string
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
          }
        ]
      }
    ]
  }
}

interface List {
  name: string
  cards: [Card]
}

interface Result {
  data: {
    collectedIA: {
      lists: [List]
    }
  }
}

interface State {
  result: Result
}

function renderCard(card: Card) {
  if (/#nav/.test(card.name)) {
    return renderNavCard(card)
  } else if (/#page/.test(card.name)) {
    return renderPageCard(card)
  } else {
    return null
  }
}

function renderNavCard(card: Card) {
  return (
    <div
      key={card.name}
      className='mb-8'
    >
      <h2>{card.name}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          backgroundColor: 'white',
        }}
      >
        {card.body.sections.map(section => (
          <div>
            {section.listItems.map(listItem => <span
            style={{
              display: 'inline-block',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              fontWeight: /#logo/.test(listItem.text) ? 700 : 400
            }}
            >{listItem.text}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

function renderHeading(heading: {
  level: number
  text: string
}) {
  let Component = 'h3'
  if (heading.level === 1) {
    Component = 'h1'
  }
  else if (heading.level === 2) {
    Component = 'h2'
  }
  else if (heading.level === 3) {
    Component = 'h3'
  }

  return <Component key={heading.text}>{ heading.text }</Component>
}

function renderPageCard(card: Card) {
  return (
    <div
      key={card.name}
      className='mb-8'
    >
      <h2>{card.name}</h2>
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
          <div style={{
            marginBottom: '1rem',
          }}>
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

class ResearchPage extends React.Component<Props, State> {
  state: State = {
    result: null,
  }

  componentDidMount() {
    const query = queryFromLocation(this.props.location)

    fetch('https://staging.1.source.collected.design/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variables: {
          q: query.q || ''
        },
        query: `
query Search($q: String) {
  collectedIA: trelloBoard(id: "4wctPH1u") {
    name
    lists(q: $q) {
      name
      cards {
        name,
        body: desc {
          source,
          sections {
            headings {
              text
              level
            }
            listItems {
              text
            }
          }
        }
      }
    }
  }
}
`,
      }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ result: json })
      })
  }

  render() {
    const { result } = this.state

    return (
      <div>
        <h1 className="mt-8 mb-8">Research</h1>

        {!result && <p>Loading…</p>}

        {!!result &&
          result.data.collectedIA.lists.map(list => (
            <div key={list.name}>{renderList(list)}</div>
          ))}

        <article className="mb-8">
          <h2 className="mb-2">Information Architecture</h2>
        </article>

        <article className="mb-8">
          <h2 className="mb-2">Components</h2>
        </article>
      </div>
    )
  }
}

export default ResearchPage
