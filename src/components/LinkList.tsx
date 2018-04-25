import React from 'react'

const LinkList = ({
  children,
  Component = 'ul',
}: {
  children: React.ReactNode
  Component?: React.ComponentType
}) => (
  <Component>{React.Children.map(children, item => <li>{item}</li>)}</Component>
)

export default LinkList
