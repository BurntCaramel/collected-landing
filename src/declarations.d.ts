declare const graphql: (query: TemplateStringsArray) => void

declare module 'react-organism' {
  import React from 'react'

  export interface ExtraProps<HandlersOut> {
    handlers: HandlersOut
  }

  function makeOrganism<Props, State, HandlersIn, HandlersOut>(
    Pure:
      | React.ComponentClass<State & ExtraProps<HandlersOut>>
      | React.StatelessComponent<State & ExtraProps<HandlersOut>>,
    handlersIn: HandlersIn,
    options?: {
      onChange: (newState: State) => {}
      adjustArgs: (args: any[]) => any[]
    }
  ): React.ComponentClass<Props>

  export default makeOrganism
}
