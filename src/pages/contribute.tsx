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
    <h1 className="mt-8 mb-8">Contribute to Collected</h1>

    <article className="mb-8">
      <h2 className="mb-2">Information Architecture Catalog</h2>

      <p>
        <a href="https://trello.com/b/4wctPH1u">Submit to this Trello board</a>
      </p>
    </article>
  </div>
)

export default ContributePage
