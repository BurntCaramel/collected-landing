import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

export default App

if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'))
}
