import * as React from 'react'
import Link from 'gatsby-link'

const DeployPage = () => (
  <div>
    <h1>Deploy your own Collected</h1>

    <article>
      <h2>Lambda with Up</h2>
      <h3><a href="https://github.com/apex/up/issues#quick-start">Install Up</a></h3>
      <h3>Then clone and deploy the repo:</h3>
      <pre>
        <code>
          {`
git clone git@github.com:RoyalIcing/collected-source.git
cd collected-source
yarn
yarn deploy:staging
          `.trim()}
        </code>
      </pre>
    </article>
  </div>
)

export default DeployPage
