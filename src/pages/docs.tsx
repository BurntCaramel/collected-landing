import * as React from 'react'
import Link from 'gatsby-link'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'
import AWSIcon from '../components/FontAwesome/AWS'

interface Props {}

const trelloBlue = '#0079BF'

const LinkList = ({
  children,
  Component = 'ul',
}: {
  children: React.ReactNode
  Component: React.ComponentType
}) => (
  <Component>{React.Children.map(children, item => <li>{item}</li>)}</Component>
)

const IndexPage = (props: Props) => (
  <div>
    <h1 className="mt-8 mb-8">Collected Docs</h1>

    <article className="mb-8">
      <h2 className="mb-2">Collected Source GraphQL</h2>
      <p>Query & load content from Trello, GitHub.</p>

      <h3 className="mt-4 mb-2">Try online</h3>
      <p>
        <a href="https://1.source.collected.design/graphiql">https://1.source.collected.design/graphiql</a>
      </p>

      <h3 className="mt-4 mb-2">End-point</h3>
      <p>
        <code>{`https://1.source.collected.design/graphql`}</code>
      </p>

      <h3 className="mt-4 mb-2">GitHub: All files in the RoyalIcing/lofi-bootstrap repo</h3>
      <pre>
        <code>
          {`
gitHubRepo(owner: "RoyalIcing", repoName: "lofi-bootstrap") {
  owner,
  files {
    path
    content
  }
}
`.trim()}
        </code>
      </pre>

      <h3 className="mt-4 mb-2">Trello: Lists and their cards in a board</h3>
      <pre>
        <code>
          {`
query Trello {
  trelloBoard(id: "580710faeb62c4f7a6fa7786") {
    name,
    id,
    lists {
      id,
      name,
      cards {
        id,
        name,
        desc
      }
    }
  }
}
`.trim()}
        </code>
      </pre>

      <h3 className="mt-4 mb-2">Trello: Cards tagged #page in a list named ‘Stripe’</h3>
      <pre>
        <code>
          {`
{
  collectedNavs: trelloBoard(id: "4wctPH1u") {
    name
    stripe: list(name: "Stripe") {
      name
      pages: cards(tags: ["page"]) {
        name,
        body: desc {
          headings {
            text,
            level
          }
        }
      }
    }
  }
}
`.trim()}
        </code>
      </pre>
    </article>

    <article className="mb-8">
      <h2 className="mb-2">Collected Source REST</h2>
      <p>Load from Trello, GitHub. Formats: JSON.</p>

      <h3 className="mt-4 mb-2">Base URL</h3>
      <p>
        <code>{`https://1.source.collected.design`}</code>
      </p>

      <h3 className="mt-4 mb-2">List files in a GitHub repo</h3>
      <pre>
        <code>
          {`GET https://1.source.collected.design/github/RoyalIcing/lofi-bootstrap/master/command:list?content`}
        </code>
      </pre>

      <h3 className="mt-4 mb-2">List cards in a Trello board</h3>
      <pre>
        <code>
          {`GET https://1.source.collected.design/trello/580710faeb62c4f7a6fa7786`}
        </code>
      </pre>
    </article>

  </div>
)

export default IndexPage
