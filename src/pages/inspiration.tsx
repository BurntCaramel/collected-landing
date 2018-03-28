import * as React from 'react'
import Link from 'gatsby-link'

const PhilosophyPage = () => (
  <div>
    <h1>Inspiration</h1>

    <h2>GraphQL</h2>
    <article>
      <h3>
        <a href="https://blog.graph.cool/top-5-reasons-to-use-graphql-b60cfa683511">
          Top 5 Reason to Use GraphQL
        </a>
      </h3>
      <blockquote>
        <p>
          Another benefit of the schema is that developers don’t have to
          manually write API documentation any more — instead it can be
          auto-generated based on the schema that defines the API.
        </p>
      </blockquote>
      <blockquote>
        <p>
          With GraphQL, it is possible to completely redesign the UI of an app
          without needing to touch the backend.
        </p>
      </blockquote>
    </article>
  </div>
)

export default PhilosophyPage
