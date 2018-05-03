import * as React from 'react'
import { File } from '../../types/source'
import CodeEditor from 'react-monaco-editor'

interface Props {
  file: File
}

type State = {
  showEditor: boolean
}

class JavaScriptFile extends React.Component<Props, State> {
  state: State = {
    showEditor: false,
  }

  toggleEditor = () => {
    this.setState(({ showEditor }) => ({ showEditor: !showEditor }))
  }

  render() {
    const { file } = this.props
    const { showEditor } = this.state
    const { toggleEditor } = this

    return (
      <>
        {!!file.content && (
          <>
            <button onClick={toggleEditor}>Code</button>
            {showEditor && (
              <CodeEditor
                language="javascript"
                value={file.content}
                height={600}
                theme="vs-dark"
                minimap={{
                  enabled: false
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
