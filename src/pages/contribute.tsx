import * as React from 'react'
import { Link } from 'react-static'

const DeployPage = () => (
  <div>
    <h1 className="mt-8 mb-8">Contribute to Collected Open Source</h1>

    <article className="mb-8">
      <h2 className="my-2">Want to change or improve the catalog?</h2>

      <h3 className="my-2">Collected IA Catalog</h3>
      <p>
        {'Submit to '}
        <a href="https://trello.com/b/4wctPH1u">{'this Trello board'}</a>{'.'}
      </p>
    </article>

    <article>
      <h2 className="my-4">Run your own Collected</h2>

      <h3>Node.js API</h3>

      <h4 className="mt-2">{'1. Clone the repo:'}</h4>
      <pre>
        <code>
          {`
git clone git@github.com:RoyalIcing/collected-source.git
cd collected-source
yarn
`.trim()}
        </code>
      </pre>

      <h4 className="mt-2">{'2. Run locally:'}</h4>
      <pre>
        <code>
          {`
yarn dev
          `.trim()}
        </code>
      </pre>

      <h4 className="mt-2">{'Deploy — '}<a href="https://github.com/apex/up/issues#quick-start">Apex Up</a>{':'}</h4>
      <pre>
        <code>
          {`
yarn deploy:staging
          `.trim()}
        </code>
      </pre>
    </article>
  </div>
)

export default DeployPage
