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
import { resolve } from 'url';

type CompiledFile = {
  scripts: string[]
  css: string[]
  contentHTML: string[]
}

interface Props {
  file: File
  allFiles: File[]
}

type State = {
  error: Error | null
  showEditor: boolean
  compiled: CompiledFile | null
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

function filePathEquals(file: File, pathToMatch: string): boolean {
  return file.path[0] === '/' ? file.path === pathToMatch : file.path === pathToMatch.slice(1)
}

async function compile2(input: string, path: string, allFiles: File[]): Promise<CompiledFile> {
  const inputPath = path[0] === '/' ? path : '/' + path
  const bundle = await rollup.rollup({
    input: inputPath,
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
            }
            const file = allFiles.find((file) => filePathEquals(file, resolvedPath))
            if (file) {
              return file.path[0] === '/' ? file.path : '/' + file.path
            }
          }

          return false
        },
        load(id: string): string | null {
          const file = allFiles.find((file) => filePathEquals(file, id))
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
    globals: {
      'react': 'React',
      'prop-types': 'PropTypes',
      'classnames': 'classNames',
    },
  })

  return {
    scripts: [code],
    css: [],
    contentHTML: [],
  }
}

class JavaScriptFile extends React.Component<Props, State> {
  state: State = {
    error: null,
    showEditor: false,
    compiled: null
  }

  async reload() {
    const { showEditor } = this.state
    const { file, allFiles } = this.props
    const compiled = await compile2(file.content, file.path, allFiles)
    this.setState({ compiled })
  }

  componentDidMount() {
    const { showEditor } = this.state
    if (showEditor) {
      this.reload()
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { showEditor } = this.state
    if (showEditor && !prevState.showEditor) {
      this.reload()
    }
  }
  
  toggleEditor = () => {
    this.setState(({ showEditor }) => ({ showEditor: !showEditor }))
  }
  
  componentDidCatch(error: Error) {
    this.setState({ error })
  }
  
  render() {
    const { file, allFiles } = this.props
    const { error, showEditor, compiled } = this.state
    const { toggleEditor } = this

    return (
      <>
        {!!error && <p>{ error.message }</p> }
        {!!file.content && (
          <>
            <button onClick={toggleEditor}>Code</button>
            {showEditor && !!compiled && (
              <>
                <CodeEditor
                  language="javascript"
                  value={compiled.scripts[0] || ''}
                  height={600}
                  theme="vs-dark"
                  minimap={{
                    enabled: false,
                  }}
                />
                <Frame
                  initialContent={`
<div id="app">Initial</div>
<script src='https://unpkg.com/react@16.3.2/umd/react.production.min.js'></script>
<script src='https://unpkg.com/prop-types@15.6.1/prop-types.min.js'></script>
<script src='https://unpkg.com/classnames@2.2.5/index.js'></script>
<script src='https://unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js'></script>
<script id='inserter'>
var inserter = document.getElementById('inserter');
var newScript = document.createElement('script');
newScript.textContent = ${JSON.stringify(compiled.scripts.join('\n'))};
inserter.parentNode.insertBefore(newScript, inserter);
</script>
<script>
var app = document.getElementById('app');
var Output = window.Output;
app.textContent = 'Hello 3';
console.log('Output', Output);
ReactDOM.render(React.createElement(Output, null), app);
</script>
${compiled.contentHTML.join('\n')}
                  `}
                />
              </>
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
