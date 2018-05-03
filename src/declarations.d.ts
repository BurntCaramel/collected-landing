declare const graphql: (query: TemplateStringsArray) => void

declare module 'react-organism' {
  import React from 'react'

  export interface ReceiverProps<HandlersOut> {
    handlers: HandlersOut
  }

  export default function makeOrganism<Props, State, HandlersIn, HandlersOut>(
    Pure:
      | React.ComponentClass<State & ReceiverProps<HandlersOut>>
      | React.StatelessComponent<State & ReceiverProps<HandlersOut>>,
    handlersIn: HandlersIn,
    options?: {
      onChange: (newState: State) => {}
      adjustArgs: (args: any[]) => any[]
    }
  ): React.ComponentClass<Props>
}

declare module 'react-monaco-editor' {
  import React from 'react'

  interface Props {
    language?: string
    value: string
    width?: number
    height?: number
    theme?: string
  }

  export class CodeEditor extends React.Component<Props, any> {
    constructor(props: Props)
  }
}
