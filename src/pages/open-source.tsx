import * as React from 'react'
import Link from 'gatsby-link'

const DeployPage = () => (
  <div>
    <h1 className="mt-8 mb-8">Open Source</h1>

    <article>
      <h2>Deploy your own Collected</h2>
      <h3>Lambda with Up</h3>
      <h4>1. <a href="https://github.com/apex/up/issues#quick-start">Install Up</a></h4>
      <h4>2. Then clone and deploy the repo:</h4>
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

    <article>
      <h2>BYO Infrastructure</h2> 
    </article>
  </div>
)

export default DeployPage