import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import { AuthStatus } from '../../data/auth'
import queryFromLocation, { Query } from '../../nav/queryFromLocation'

function classes(items: Array<string | null | undefined | false>): string {
  return items.filter(Boolean).join(' ')
}

function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  const a = event.currentTarget
  const path = a.pathname
  //navigateTo(path)
}

function isSignedIn(authStatus: AuthStatus | null): boolean {
  if (!authStatus) {
    return false
  }

  return authStatus.github || authStatus.figma || authStatus.trello
}

interface Props {
  location: Location
  authStatus: AuthStatus | null
}

interface State {
  urlQuery: Query
  enteredQ: string
}

class Header extends React.Component<Props, State> {
  state: State = {
    urlQuery: queryFromLocation(this.props.location),
    enteredQ: queryFromLocation(this.props.location).q || '',
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): any {
    const query = queryFromLocation(nextProps.location)
    if (prevState.urlQuery.q !== query.q) {
      return {
        urlQuery: query,
        enteredQ: query.q || '',
      }
    }

    return null
  }

  onChangeQ = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ enteredQ: e.target.value })
  }

  render() {
    const link = (
      content: string,
      toPath: string,
      extraClasses: Array<string> = []
    ) => {
      const pathToMatch = this.props.location.pathname
      const isCurrent =
        toPath ===
        (toPath === '/' ? pathToMatch : pathToMatch.slice(0, toPath.length))

      return (
        <Link
          to={toPath}
          aria-current={isCurrent ? 'page' : null}
          style={{
            fontSize: '1rem',
            lineHeight: '1.5',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            //textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'black',
            textDecoration: 'none',
          }}
          className={classes([
            'px-2',
            isCurrent && 'border-b-2',
            ...extraClasses,
          ])}
        >
          {content}
        </Link>
      )
    }

    const { enteredQ } = this.state

    const signedIn = isSignedIn(this.props.authStatus)

    return (
      <div
        style={{
          backgroundColor: '#ffffff4d',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            maxWidth: 960,
            padding: '0 1rem',
          }}
        >
          <div className="row">
            {link('Collected', '/', ['font-bold'])}
            <form action="/research" method="get" className="row">
              <input
                name="q"
                className="ml-2 mr-2 mt-1 mb-1 px-2"
                style={{ width: '12em' }}
                placeholder="Search catalog"
                value={enteredQ}
                onChange={this.onChangeQ}
              />
            </form>
          </div>
          <div className="row">
            {link('Research', '/research')}
            {link('Libraries', '/libraries/')}
            {/* {link('Create', '/create')} */}
            {link('Docs', '/docs')}
            {link('Open Source', '/contribute')}
            {/* {!signedIn && link('Sign In / Up', '/signin')} */}
            {signedIn && link('Account', '/account')}
            {/* <Link to="/inspiration" style={styles.link} className="mr-4">
              Inspiration
            </Link> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Header
