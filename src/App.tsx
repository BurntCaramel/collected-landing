import * as React from 'react'
import { Router, Route, Link } from 'react-static'
import StaticRoutes from 'react-static-routes'
import DefaultLayout from './layouts'
import Header from './components/Header'
import './layouts/reset.css'
import './layouts/base.css'
import './layouts/layout.css'
import './layouts/type.css'
import './layouts/style.css'

function App() {
  return (
    <div>
      <Router>
        <Route render={({ location }) => (
          <DefaultLayout location={location}>
            <StaticRoutes />
          </DefaultLayout>
        )} />
      </Router>
    </div>
  )
}

export default App
