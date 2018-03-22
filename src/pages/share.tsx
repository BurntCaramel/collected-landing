import * as React from 'react'
import Link from 'gatsby-link'

const SecondPage = () => (
  <div>
    <h1>Share</h1>

    <article className="mb-4">
      <ul>
        <li>Information Architecture: navigation, categorization, search</li>
        <li>Flows: onboarding, forms, emails</li>
        <li>Public Data Sets</li>
      </ul>
    </article>

    <article className="mb-4">
      <h3 className="mb-2">
        Search
      </h3>
      <form className="col">
        <input placeholder="nav" className="border" />
      </form>
    </article>

    <article>
      <h3 className="mb-2">
        Submit
      </h3>
      <form className="col">
        <label className="row row-baseline mb-2">
          <span className="w-8rem text-right mr-2">{'URL: '}</span>
          <input className="border" placeholder="https://trello.com/b/…" />
        </label>
        <label className="row row-baseline mb-2">
          <span className="w-8rem text-right mr-2">{'Description: '}</span>
          <input className="border" placeholder="Navigation for fintech company" />
        </label>
        <label className="row row-baseline mb-2">
          <span className="w-8rem text-right mr-2">{'Tags: '}</span>
          <input className="border" placeholder="fintech finance nav ia" />
        </label>
        <button type="submit" className="text-white bg-grey-dark">Submit</button>
      </form>
    </article>
  </div>
)

export default SecondPage
