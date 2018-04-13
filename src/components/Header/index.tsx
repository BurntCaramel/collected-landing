import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import queryFromLocation from '../../nav/queryFromLocation'

const styles = {
  link: {
    fontSize: '1rem',
    lineHeight: '1.5',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    //textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'black',
    textDecoration: 'none',
  } as React.CSSProperties,
}

function classes(items: Array<string | null | undefined | false>): string {
  return items.filter(Boolean).join(' ')
}

function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  const a = event.currentTarget
  const path = a.pathname
  //navigateTo(path)
}

interface Props {
  location: Location
}

const Header = (props: Props) => {
  const link = (
    content: string,
    toPath: string,
    extraClasses: Array<string> = []
  ) => {
    const isCurrent = toPath === props.location.pathname

    return (
      <Link
        to={toPath}
        aria-current={isCurrent ? 'page' : null}
        style={styles.link}
        className={classes([
          'mr-4',
          isCurrent && 'border-b-2',
          ...extraClasses,
        ])}
      >
        {content}
      </Link>
    )
  }

  const query = queryFromLocation(props.location)

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
              className="mr-4 mt-1 mb-1 px-2"
              placeholder="Search catalog"
              defaultValue={query['q'] || ''}
            />
          </form>
        </div>
        <div className="row">
          {link('Research', '/research')}
          {link('Create', '/create')}
          {link('Contribute', '/contribute')}
          {link('Docs', '/docs')}
          {link('Open source', '/open-source')}
          {/* <Link to="/inspiration" style={styles.link} className="mr-4">
            Inspiration
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Header
