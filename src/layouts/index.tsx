import * as React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './reset.css'
import './base.css'
import './layout.css'
import './type.css'
import './style.css'

interface Props {
  children: any
  location: {
    pathname: string
    search: string
    hash: string
  }
}

//const TemplateWrapper = ({ children }: Props) => (
class TemplateWrapper extends React.Component<Props, void> {
  render() {
    console.log('props', this.props)
    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: 'bg-key text-shadow',
          }}
          title="Collected"
          meta={[
            {
              name: 'description',
              content:
                'Collected lets you design with existing content and assets',
            },
          ]}
        />
        <Header location={this.props.location} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default TemplateWrapper
