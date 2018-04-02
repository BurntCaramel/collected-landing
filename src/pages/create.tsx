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

const ContributePage = (props: Props) => (
  <div>
    <h1 className="mt-8 mb-8">Create your own Collected</h1>

    <article className="mb-8">
      <h2 className="mb-2">Trello</h2>

      <p className="mb-2">
        Trello is a popular tool for structuring information with a friendly UI.
        Use Trello when:
      </p>

      <ul>
        <li>You want something everyone on the team can use.</li>
        <li>You don’t need historical data, just what’s most up to date.</li>
        <li>You just need something fast.</li>
      </ul>
    </article>

    <article className="mb-8">
      <h2 className="mb-2">GitHub</h2>

      <p className="mb-2">
        GitHub is commonly used for managing source code, with powerful
        version-control features and workflows. Use GitHub when:
      </p>

      <ul>
        <li>
          Your team is already familiar or can get up to speed with GitHub.
        </li>
        <li>You need historical data.</li>
        <li>You want multiple versions using Git branches and tags.</li>
      </ul>
    </article>
  </div>
)

export default ContributePage
