import * as React from 'react'
import { File } from '../../types/source'
import CodeEditor from 'react-monaco-editor'
import Frame from 'react-frame-component'
// import Babel from 'babel-standalone'
// const Babel = require('babel-standalone')
const Babel = require('@babel/standalone')
const babelPresetEnv = require('@babel/preset-env-standalone')
import babelPluginUnpkg from 'babel-plugin-unpkg'

interface Props {
  file: File
}

type State = {
  error: Error | null
  showEditor: boolean
}

function compile(input: string): string {
  try {
    const { code } = Babel.transform(input, {
      presets: [
        // [babelPresetEnv, { modules: false, loose: true }],
        "es2015",
        "stage-3",
        ["stage-2", { decoratorsLegacy: true }],
        "flow",
        "react",
      ],
      plugins: [
        babelPluginUnpkg
      ]
    })
    return code
  }
  catch (error) {
    console.error(error.message)
    return error.message + '\n\n\n' + input
  }
}

class JavaScriptFile extends React.Component<Props, State> {
  state: State = {
    error: null,
    showEditor: false,
  }
  
  toggleEditor = () => {
    this.setState(({ showEditor }) => ({ showEditor: !showEditor }))
  }
  
  componentDidCatch(error: Error) {
    this.setState({ error })
  }
  
  render() {
    console.log('Babel', (window as any).Babel)
    const { file } = this.props
    const { error, showEditor } = this.state
    const { toggleEditor } = this

    return (
      <>
        {!!error && <p>{ error.message }</p> }
        {!!file.content && (
          <>
            <button onClick={toggleEditor}>Code</button>
            {showEditor && (
              <CodeEditor
                language="javascript"
                value={compile(file.content)}
                height={600}
                theme="vs-dark"
                minimap={{
                  enabled: false,
                }}
              />
            )}
          </>
        )}
        <dl>
          {file.asJavaScript.transform.imports.map(importDeclaration => (
            <>
              <dt className="ml-4">{importDeclaration.source}</dt>
            </>
          ))}
        </dl>
      </>
    )
  }
}

export default JavaScriptFile
