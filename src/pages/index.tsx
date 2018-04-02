import * as React from 'react'
import Link from 'gatsby-link'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'
import AWSIcon from '../components/FontAwesome/AWS'

interface Props {}

const trelloBlue = '#0079BF'

const LinkList = ({ children, Component = 'ul' }) => (
  <Component>{React.Children.map(children, item => <li>{item}</li>)}</Component>
)

const NewsletterForm = () => (
  <article className="mb-8">
    <h2 className="mb-2">Hear about the latest updates</h2>
    <form
      method="post"
      action="https://emailoctopus.com/lists/839d94de-3257-11e8-a3c9-06b79b628af2/members/embedded/1.1/add"
    >
      <div className="row">
        <label htmlFor="newsletter-field-0">
          Email address
        </label>
        <input
          id="newsletter-field-0"
          name="embedded_form_subscription[field_0]"
          type="email"
          placeholder=""
          className="border ml-2"
        />
        <div className="email-octopus-form-row-hp" aria-hidden="true">
          {/* Do not remove this field, otherwise you risk bot sign-ups */}
          <input
            type="text"
            name="hp839d94de-3257-11e8-a3c9-06b79b628af2"
            tabIndex={-1}
            autocomplete="nope"
          />
        </div>

        <div className="email-octopus-form-row-subscribe ml-4">
          <input type="hidden" name="successRedirectUrl" value="" />
          <button type="submit" className="px-2 py-1 text-white bg-shadow">
            Subscribe
          </button>
        </div>
      </div>

    </form>
  </article>
)

const IndexPage = (props: Props) => (
  <div>
    {/* <h1 className="mt-12 mb-12">
      Get feedback fast from your users with realistic prototypes
    </h1> */}
    {/* <h1 className="mt-12 mb-12">
      Let your users give feedback fast with realistic prototypes
    </h1> */}
    {/* <h1 className="mt-12 mb-8">Get rapid feedback with rapid prototyping</h1> */}
    <h1 className="mt-12 mb-8">Get feedback fast with realistic prototypes</h1>

    <article className="mb-8">
      <div className="mb-4">
        <h2 className="mb-1">
          Find and compare information architecture & flows
        </h2>
        <p>
          Research navs, onboarding, forms, emails, categorization, search capabilities.
        </p>
      </div>
      <form>
        <div className="row">
          <div className="col flex-1 mr-2 mb-2">
            <label className="flex-1">{'Search catalog for '}</label>
            <input placeholder="nav" className="flex-1 px-2 py-1 border" />
          </div>
          <div className="col flex-1 ml-2 mb-2">
            <label className="col flex-1">{'Industry'}</label>
            <select className="flex-1 px-2 py-1 border">
              <option>{'Development & design'}</option>
              <option>{'Open source'}</option>
              <option>{'Government'}</option>
              <option>{'Health'}</option>
              <option>{'Finance'}</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button className="flex-1 py-1 text-white bg-shadow">
            Search
          </button>
        </div>
      </form>

      <div className="mt-2">
        <span>{'Examples: '}</span>
        <a href="">Stripe</a>{' | '}
        <a href="">Slack</a>{' | '}
        <a href="">GitHub</a>{' | '}
        <a href="">React</a>{' | '}
        <a href="">Tensorflow</a>
      </div>
    </article>

    {false && (
      <article className="mb-8">
        <ol>
          <li>Make components using Markdown</li>
          <li>
            Create or connect data: Trello, AWS S3, or generate with Faker
          </li>
          <li>Combine data with components into living prototype</li>
          <li>Share to get immediate feedback</li>
        </ol>
      </article>
    )}

    <article className="mb-12 px-8 py-8 bg-white rounded">
      {/* <h2>Turn your content into an GraphQL/REST API with Collected Source.</h2> */}
      {/* <h2 className="mb-4">
        Turn your content into a prototyping data source.
      </h2> */}
      <h2 className="mb-8">
        Prototype with your content from Trello or GitHub.
      </h2>
      <div className="row mb-8">
        <div className="mr-4">
          <TrelloIcon size={64} color={trelloBlue} />
        </div>
        <div className="col flex-1">
          <label htmlFor="input-url-trello" className="col flex-1">
            {'Paste your Trello board URL '}
          </label>
          <div className="row">
            <input
              id="input-url-trello"
              placeholder="https://trello.com/b/abcdef"
              className="px-2 py-1 border"
            />
            <button className="text-white bg-shadow">Go</button>
          </div>
        </div>
      </div>
      <div className="row mb-8">
        <div className="mr-4">
          <GitHubIcon size={64} />
        </div>
        <div className="col flex-1">
          <label htmlFor="input-url-github" className="col flex-1">
            {'Paste your GitHub repo URL '}
          </label>
          <div className="row">
            <input
              id="input-url-github"
              placeholder="https://github.com/org/repo"
              className="px-2 py-1 border"
            />
            <button className="text-white bg-shadow">Go</button>
          </div>
        </div>
      </div>
      <div className="row mb-8">
        <div className="mr-4">
          <AWSIcon size={64} />
        </div>
        <div className="col flex-1">
          <label htmlFor="input-url-github" className="col flex-1">
            {'Enter your AWS S3 bucket and key '}
          </label>
          <div className="row">
            <input
              id="input-url-github"
              placeholder="bucket-name/key/path"
              className="px-2 py-1 border"
            />
            <button className="text-white bg-shadow">Go</button>
          </div>
        </div>
      </div>
      <LinkList>
        <Link to="/page-2/" className="text-xl">
          Trello: Onboarding flow, from forms to emails
        </Link>
        <Link to="/page-2/" className="text-xl">
          Trello: Header, sidebar & footer navigation
        </Link>
        <Link to="/page-2/" className="text-xl">
          Trello: Landing page
        </Link>
      </LinkList>
    </article>
    {false && (
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

    <NewsletterForm />

  </div>
)

export default IndexPage
