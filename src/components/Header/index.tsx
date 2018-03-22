import * as React from 'react'
import Link from 'gatsby-link'

const styles = {
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    lineHeight: '1.5',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  } as React.CSSProperties,
}

const Header = () => (
  <div
    style={{
      background: '#1a1a1a',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        display: 'flex',
        margin: '0 auto',
        maxWidth: 960,
        padding: '0.5rem 1rem',
      }}
    >
      <Link to="/" style={styles.link} className="mr-4 font-bold">
        Collected
      </Link>
      <Link to="/share" style={styles.link} className="mr-4">
        Share
      </Link>
      <Link to="/philosophy" style={styles.link} className="mr-4">
        Philosophy
      </Link>
      <Link to="/docs" style={styles.link} className="mr-4">
        Docs
      </Link>
    </div>
  </div>
)

export default Header
