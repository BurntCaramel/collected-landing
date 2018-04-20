import * as React from 'react'
import { Router, Route, Link } from 'react-static'
import StaticRoutes from 'react-static-routes'
import axios from 'axios'
import DefaultLayout from './layouts'
import Header from './components/Header'
import { AuthStatus } from './data/auth'
import './layouts/reset.css'
import './layouts/base.css'
import './layouts/layout.css'
import './layouts/type.css'
import './layouts/style.css'

type State = {
  error: Error | null
  authStatus: AuthStatus | null
}

class App extends React.PureComponent<{}, State> {
  state: State = {
    error: null,
    authStatus: null,
  }

  render() {
    const { authStatus } = this.state

    return (
      <div>
        <Router>
          <Route
            render={({ location }) => (
              <DefaultLayout location={location} authStatus={authStatus}>
                <StaticRoutes />
              </DefaultLayout>
            )}
          />
        </Router>
      </div>
    )
  }

  componentDidMount() {
    if (location.host === 'collected.design') {
      axios
        .get('/api-auth-1/auth/status')
        .then(res => this.setState({ authStatus: res.data }))
        .catch(error => this.setState({ error }))
    }
  }
}

export default App
