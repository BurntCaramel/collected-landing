import * as React from 'react'
import { Link } from 'react-static'
import TrelloIcon from '../components/FontAwesome/Trello'
import GitHubIcon from '../components/FontAwesome/GitHub'
import AWSIcon from '../components/FontAwesome/AWS'
import LinkList from '../components/LinkList'
import { stringify as stringifyQuery } from 'query-string'

interface Props {}

const trelloBlue = '#0079BF'

const NewsletterForm = ({ className }: { className: string }) => (
  <article className={className}>
    <h2 className="mb-2">Hear about the latest updates!</h2>
    <form
      method="post"
      action="https://emailoctopus.com/lists/839d94de-3257-11e8-a3c9-06b79b628af2/members/embedded/1.1/add"
    >
      <div className="row row-baseline">
        <label htmlFor="newsletter-field-0">Your email</label>
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
            autoComplete="nope"
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
    <h1 className="mt-12 mb-8">
      Get feedback fast with realistic, better prototypes
    </h1>

    <article className="mb-12">
      <div className="mb-4">
        <h2 className="mb-1">Find and compare the best in your industry</h2>
        <p>
          Research navigation, onboarding, components, landing pages, forms,
          emails, categorization, search, and accessibility capabilities.
        </p>
      </div>
      <form action="/research">
        <div className="row">
          <div className="col flex-1 mr-2 mb-2">
            <label className="flex-1">{'Search catalog for '}</label>
            <input
              name="q"
              placeholder="nav, button, sign up, welcome email"
              className="flex-1 px-2 py-1 border"
            />
          </div>
          <div className="col flex-1 ml-2 mb-2">
            <label className="col flex-1">{'Industry'}</label>
            <select name="industry" className="flex-1 px-2 py-1 border">
              <option>{'Development & design'}</option>
              <option>{'Open source'}</option>
              <option>{'Government'}</option>
              <option>{'Health'}</option>
              <option>{'Finance'}</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button className="flex-1 px-2 py-1 font-bold text-white bg-shadow">
            Search
          </button>
        </div>
      </form>

      <div className="mt-2">
        <span>{'Check out: '}</span>
        <a href={`/research?${stringifyQuery({ q: '#nav' })}`}>Navs</a>
        {' | '}
        <a href="/research?q=stripe">Stripe</a>
        {' | '}
        <a href="/research?q=slack">Slack</a>
        {' | '}
        <a href="/research?q=github">GitHub</a>
        {' | '}
        <a href="/research?q=react">React</a>
        {' | '}
        <a href="/research?q=tensorflow">Tensorflow</a>
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
      {/* <h2 className="mb-8">
        Prototype with your content from Trello or GitHub.
      </h2> */}
      {/* <h2 className="mb-8">
        Prototype rapidly with content from Trello or GitHub.
      </h2> */}
      <h2 className="mb-8">Create your own interactive prototypes rapidly</h2>
      <div className="row mb-8">
        <div className="mr-4">
          <TrelloIcon size={64} color={trelloBlue} />
        </div>
        <form method="get" action="/create/source" className="col flex-1">
          <label htmlFor="input-url-trello" className="col flex-1">
            {'Paste your Trello board URL '}
          </label>
          <div className="row">
            <input
              name="url"
              id="input-url-trello"
              placeholder="https://trello.com/b/abcdef"
              className="px-2 py-1 border"
            />
            <button className="text-white bg-shadow">Go</button>
          </div>
        </form>
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
        <Link to="/docs/" className="text-xl">
          Learn more at the Collected docs
        </Link>
      </LinkList>
    </article>

    <NewsletterForm className="mb-12 px-8 py-8 bg-white rounded" />

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
  </div>
)

export default IndexPage
