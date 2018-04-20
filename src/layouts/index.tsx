import * as React from 'react'
import { Location } from 'history'
import Helmet from 'react-helmet'

import { AuthStatus } from '../data/auth'
import Header from '../components/Header'
import './reset.css'
import './base.css'
import './layout.css'
import './type.css'
import './style.css'

interface Props {
  children: any
  location: Location
  authStatus: AuthStatus
}

//const TemplateWrapper = ({ children }: Props) => (
class TemplateWrapper extends React.Component<Props, {}> {
  render() {
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
            {
              name: 'google-site-verification',
              content: 'wWt2bpsMO6BWfCe-Nce_n0TcZPCFHfiZRXCyMtNqr90',
            },
          ]}
          link={[
            {
              rel: 'stylesheet',
              href: 'https://use.fontawesome.com/releases/v5.0.9/css/all.css',
              integrity:
                'sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1',
              crossOrigin: 'anonymous',
            },
          ]}
        />
        <Header location={this.props.location} authStatus={this.props.authStatus} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default TemplateWrapper
