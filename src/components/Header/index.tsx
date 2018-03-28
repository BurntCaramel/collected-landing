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
      <Link to="/api" style={styles.link} className="mr-4">
        API
      </Link>
      <Link to="/deploy" style={styles.link} className="mr-4">
        Deploy
      </Link>
      <Link to="/learn" style={styles.link} className="mr-4">
        Learn
      </Link>
      <Link to="/inspiration" style={styles.link} className="mr-4">
        Inspiration
      </Link>
    </div>
  </div>
)

export default Header
