import * as React from 'react'
import { File } from '../../types/source'
import CodeEditor from 'react-monaco-editor'
import Frame from 'react-frame-component'
const Babel = require('@babel/standalone')
const babelPresetEnv = require('@babel/preset-env-standalone')
import babelPluginUnpkg from 'babel-plugin-unpkg'
const rollup = require('rollup')
import rollupHypothetical from 'rollup-plugin-hypothetical'
import * as Path from 'path'

interface Props {
  file: File
  allFiles: File[]
}

type State = {
  error: Error | null
  showEditor: boolean
  compiledCode: string | null
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

async function compile2(input: string, path: string, allFiles: File[]): string {
  const bundle = await rollup.rollup({
    input: path,
    plugins: [
      {
        transform(input: string, id: string) {
          try {
            const { code } = Babel.transform(input, {
              presets: [
                // [babelPresetEnv, { modules: false, loose: true }],
                ["es2015", { modules: false } ],
                "stage-3",
                ["stage-2", { decoratorsLegacy: true }],
                "flow",
                "react",
              ],
              // plugins: [
              //   babelPluginUnpkg
              // ]
            })
            return code
          }
          catch (error) {
            console.error(error.message)
            //return error.message + '\n\n\n' + input
            return ''
          }
        }
      },
      {
        resolveId(importee: string, importer?: string): string | false | void {
          if (/^\.|^\//.test(importee)) {
            let resolvedPath: string = importee
            if (importer) {
              resolvedPath = Path.join(importer, '..', importee)
              console.log('resolvedPath', importee)
            }
            const file = allFiles.find(file => file.path === resolvedPath)
            if (file) {
              console.log('resolved file:', file.path)
              return file.path
            }
          }

          return false
        },
        load(id: string): string | null {
          const file = allFiles.find(file => file.path === id)
          console.log('load', id, !!file && file.path)
          if (!file) {
            return null
          }

          if (/\.svg$/.test(id)) {
            return `export default ${JSON.stringify(file.content)}`
          }

          return file.content
        }
      }

      // rollupHypothetical({
      //   leaveIdsAlone: true,
      //   filesMap: {
      //     forEach(callback: (name: string, content: string) => void) {
      //       allFiles.forEach(file => {
      //         callback(file.content || '', file.path)
      //       })

      //       callback('/index.js', '')
      //       callback('/react/Button/Button.less', '')
      //     }
      //   }
      // }),

      // {
      //   transform(input: string, id: string) {
      //     try {
      //       const { code } = Babel.transform(input, {
      //         presets: [
      //           ["es2015", { modules: true } ],
      //         ]
      //       })
      //       return code
      //     }
      //     catch (error) {
      //       console.error(error.message)
      //       //return error.message + '\n\n\n' + input
      //       return ''
      //     }
      //   }
      // },
    ]
  })

  console.log('created rollup bundle')

  const { code } =  await bundle.generate({
    // format: 'system',
    format: 'iife',
    name: 'Output',
  })
  console.log('generate code', code)
  return code
}

class JavaScriptFile extends React.Component<Props, State> {
  state: State = {
    error: null,
    showEditor: false,
    compiledCode: null
  }

  async componentDidMount() {
    const { file, allFiles } = this.props
    const compiledCode = await compile2(file.content, file.path, allFiles)
    this.setState({ compiledCode })
  }
  
  toggleEditor = () => {
    this.setState(({ showEditor }) => ({ showEditor: !showEditor }))
  }
  
  componentDidCatch(error: Error) {
    this.setState({ error })
  }
  
  render() {
    console.log('Babel', (window as any).Babel)
    const { file, allFiles } = this.props
    const { error, showEditor, compiledCode } = this.state
    const { toggleEditor } = this

    return (
      <>
        {!!error && <p>{ error.message }</p> }
        {!!file.content && (
          <>
            <button onClick={toggleEditor}>Code</button>
            {!!compiledCode && (
              <CodeEditor
                language="javascript"
                value={compiledCode}
                height={600}
                theme="vs-dark"
                minimap={{
                  enabled: false,
                }}
              />
            )}
          </>
        )}
        { !!file.asJavaScript && <dl>
          {file.asJavaScript.transform.imports.map(importDeclaration => (
            <>
              <dt className="ml-4">{importDeclaration.source}</dt>
            </>
          ))}
        </dl>
        }
      </>
    )
  }
}

export default JavaScriptFile
