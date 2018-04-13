import * as React from 'react'

const NotFoundPage = ({ location }) => (
  <div>
    <h1>Page not found</h1>
    <p>The page at <strong>{location.pathname}</strong> could not be found.</p>
  </div>
)

export default NotFoundPage
