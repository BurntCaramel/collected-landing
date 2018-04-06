import * as React from 'react'
import Link from 'gatsby-link'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'
import AWSIcon from '../components/FontAwesome/AWS'
import queryFromLocation from '../nav/queryFromLocation'

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

const isPrimaryItem = ({ tags }: { tags: [string] }): boolean =>
  tags[0] === 'primary'

const regexToFontAwesomeName = [
  // Brands
  { regex: /\bfacebook\b/i, className: 'fab fa-facebook' },
  { regex: /\bgithub\b/i, className: 'fab fa-github' },
  { regex: /\binstagram\b/i, className: 'fab fa-instagram' },
  { regex: /\bmedium\b/i, className: 'fab fa-medium' },
  { regex: /\btwitter\b/i, className: 'fab fa-twitter' },
  // Symbols
  { regex: /\bnotification[s]?\b/i, className: 'fas fa-bell' },
  { regex: /\bnew|add\b/i, className: 'fas fa-plus' },
  { regex: /\buser|profile|account\b/i, className: 'fas fa-user-circle' },
  { regex: /\bsearch\b/i, className: 'fas fa-search' },
  { regex: /\bcontribute\b/i, className: 'fas fa-pencil-alt' },
]

function Icon({ text, sizeRem = 1, fallbackRounded = false }: { text: string, sizeRem?: number, fallbackRounded?: boolean }) {
  const key = text.toLowerCase()
  let fontAwesomeClassName = null
  regexToFontAwesomeName.some(({ regex, className }) => {
    if (regex.test(key)) {
      fontAwesomeClassName = className
      return true
    }
    return false
  })

  if (fontAwesomeClassName) {
    return <i className={fontAwesomeClassName} style={{ fontSize: `${sizeRem}rem` }} />
  }

  return (
    <svg viewBox='0 0 2 2' width={sizeRem * 18} height={sizeRem * 18} style={{ display: 'inline-block' }}>
      { fallbackRounded ?
        <circle cx={1} cy={1} r={1} />
        :
        <rect width={2} height={2} />
      }
      <title>{text}</title>
    </svg>
  )
}

function titleForNavCard(card: Card) {
  if (card.name.tags[1] === 'primary') {
    return 'Primary nav'
  }

  if (card.name.tags[1] === 'footer') {
    return 'Footer nav'
  }
  
  return 'Nav'
}

function fontSizeForNavCard(card: Card) {
  if (card.name.tags[1] === 'footer') {
    return '0.75rem'
  }
  
  return '1rem'
}

function renderNavCard(card: Card) {
  return (
    <div key={card.id} className="mb-8">
      <h2>{titleForNavCard(card)}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          fontSize: fontSizeForNavCard(card),
          backgroundColor: 'white',
        }}
      >
        {card.body.sections.map(section => (
          <div
            style={{
              display: 'flex',
              flexDirection: card.body.sections.length >= 4 ? 'column' : 'row',
              flexWrap: 'wrap',
              alignItems: card.body.sections.length >= 4 ? 'flex-start' : 'center',
              flexGrow: card.body.sections.length === 1 ? 1 : 0,
              justifyContent: card.body.sections.length === 1 ? 'space-between' : 'initial',
            }}
          >
            {section.listItems.map((listItem, listItemIndex, { length: listItemCount }) => {
              const isPrimary = isPrimaryItem(listItem)
              const isSearch = listItem.tags[0] === 'search'
              const isIcon = listItem.tags[0] === 'icon'
              const isPicture = listItem.tags[0] === 'picture'
              const isLast = listItemIndex === listItemCount - 1
              return (
                <span
                  style={{
                    display: 'flex',
                    paddingLeft: '0.333rem',
                    paddingRight: '0.333rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    marginLeft: isPrimary ? '0.25rem' : '0',
                    marginRight: isPrimary ? '0.25rem' : '0',
                    fontWeight: listItem.tags[0] === 'logo' ? 700 : 400,
                    color: isPrimary ? 'white' : isSearch ? '#888' : '#111',
                    backgroundColor: isPrimary ? '#111' : 'white',
                    border: isSearch ? '1px solid #111' : 'none',
                    borderRadius: isPrimary ? 5 : 0,
                  }}
                >
                  {(isIcon || isPicture) ? '' : listItem.text}
                  {isIcon &&
                    <Icon text={listItem.text} />
                  }
                  {isPicture &&
                    <Icon text={listItem.text} sizeRem={1.5} fallbackRounded />
                  }
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
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
          tags: q.replace(/#/g, '').split(/\s+/).map(s => s.trim()).filter(Boolean),
        },
        query: cardTagsQuery
      }
    }
    else {
      body = {
        variables: {
          q: q || '',
        },
        query: listSearchQuery
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
