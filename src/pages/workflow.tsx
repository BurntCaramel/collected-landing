import * as React from 'react'
import Link from 'gatsby-link'

const Grid = ({
  children,
  columns,
  gap,
}: {
  children: any
  columns?: string | number
  gap: string | number
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns:
        typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      gridGap: gap,
    }}
  >
    {children}
  </div>
)

const many = (renderItem, items) =>
  items.map(item =>
    renderItem(typeof item === 'string' ? { children: item } : item)
  )

const WorkflowPage = () => (
  <div>
    <h1>Workflow</h1>

    <Grid columns={2} gap="0.5rem">
      {many(props => <button className="text-white bg-shadow" {...props} />, [
        'Add data source',
        'Add component library',
        'New project',
        'New document',
        'New space',
      ])}
    </Grid>

    {/* <Grid gap="0.5rem">
      <button className="text-white bg-shadow">Add data source</button>
      <button className="text-white bg-shadow">Add component library</button>
      <button className="text-white bg-shadow">New project</button>
      <button className="text-white bg-shadow">New document</button>
      <button className="text-white bg-shadow">New space</button>
    </Grid> */}

    <hr />

    <h2>Choose or create a Data source</h2>

    <h2>Choose or create one or more component libraries</h2>

    <h2>Make a composition combining data with components</h2>
  </div>
)

export default WorkflowPage
