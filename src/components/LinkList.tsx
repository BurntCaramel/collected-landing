import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string,
  noBullets: boolean
}

const LinkList = ({
  children,
  className,
  noBullets = false
}: Props) => {
  const Component = 'ul'
  return <Component className={className} style={Object.assign({}, noBullets && { listStyle: 'none' })}>{React.Children.map(children, item => <li>{item}</li>)}</Component>
}

export default LinkList
