import * as React from 'react'
import { Link } from 'react-static'
import { Location } from 'history'
import { GitHubSource, File } from '../types/source'
import JavaScriptFile from '../components/File/JavaScriptFile'

const logoJS = `import logoMarkup from './logo.svg';

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

export default function Logo({ svgClassName, ...restProps }) {
  const svgWithClasses = logoMarkup
    .replace('<svg ', \`<svg class="\${classnames(svgClassName)}" \`);

  return (
    <div dangerouslySetInnerHTML={{ __html: svgWithClasses }} {...restProps} /> // eslint-disable-line react/no-danger
  );
}

Logo.propTypes = {
  svgClassName: PropTypes.string,
  className: PropTypes.string
};

Logo.defaultProps = {
  svgClassName: '',
  className: ''
};
`

const files: File[] = [
  {
    path: 'docs/src/components/App/Header/Logo/Logo.js',
    content: logoJS,
    asJavaScript: {
      transform: {
        imports: [],
        classes: [],
      },
    },
  },
  {
    path: 'docs/src/components/App/Header/Logo/logo.svg',
    content:
      '<svg><g><rect x="10" y="10" width="40" height="20" fill="green" /></g></svg>',
  },
]

interface Props {}

function Libraries2Page(props: Props) {
  return (
    <div>
      {typeof document !== 'undefined' && (
        <JavaScriptFile file={files[0]} allFiles={files} />
      )}
    </div>
  )
}

export default Libraries2Page
