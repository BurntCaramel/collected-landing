import * as React from 'react'
import Link from 'gatsby-link'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'

interface Props {}

const trelloBlue = '#0079BF'

const LinkList = ({ children, Component = 'ul' }) => (
  <Component>{React.Children.map(children, item => <li>{item}</li>)}</Component>
)

const IndexPage = (props: Props) => (
  <div>
    {/* <h1 className="mt-12 mb-12">
      Get feedback fast from your users with realistic prototypes
    </h1> */}
    {/* <h1 className="mt-12 mb-12">
      Let your users give feedback fast with realistic prototypes
    </h1> */}
    <h1 className="mt-12 mb-8">Get feedback fast with realistic prototypes</h1>
    <article className="mb-8">
      <ol>
        <li>Make components using Markdown</li>
        <li>Create data: Trello, Spreadsheet, or generate with Faker</li>
        <li>Connect data and components into living prototype</li>
        <li>Share to get immediate feedback</li>
      </ol>
    </article>
    <article className="mb-12">
      {/* <h2>Turn your content into an GraphQL/REST API with Collected Source.</h2> */}
      <h2 className="mb-4">Turn your content into a data source.</h2>
      <div className="row mb-4">
        <div className="mr-1">
          <TrelloIcon size={64} color={trelloBlue} />
        </div>
        <label className="col flex-1">
          {'Paste your Trello board URL '}
          <input placeholder="https://trello.com/b/abcdef" className="border" />
        </label>
        <button className="ml-2">Go</button>
      </div>
      <div className="row mb-4">
        <div className="mr-1">
          <GitHubIcon size={64} />
        </div>
        <label className="col flex-1">
          {'Paste your GitHub repo URL '}
          <input placeholder="https://github.com/org/repo" className="border" />
        </label>
        <button className="ml-2">Go</button>
      </div>
      <LinkList>
        <Link to="/page-2/" className="text-xl">
          Trello: Landing page
        </Link>
        <Link to="/page-2/" className="text-xl">
          Trello: Header, sidebar & footer navigation
        </Link>
        <Link to="/page-2/" className="text-xl">
          Trello: Onboarding flow
        </Link>
      </LinkList>
    </article>
    {true && (
      <article className="mb-12">
        <h2 className="mb-4">Make components simply by writing Markdown.</h2>
        <LinkList>
          <a
            href="https://datadown.collected.design/github/RoyalIcing/lofi-bootstrap/master"
            className="text-xl"
          >
            Bootstrap 4 component library
          </a>
          <a
            href="https://datadown.collected.design/example"
            className="text-xl"
          >
            Communicate with APIs
          </a>
        </LinkList>
      </article>
    )}
  </div>
)

export default IndexPage
