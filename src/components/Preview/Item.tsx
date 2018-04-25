import React from 'react'
import Nav from './Nav'
import Page from './Page'

export interface Heading {
  level: number
  text: string
}

export interface ListItem {
  tags: string[]
  text: string
}

export interface Section {
  headings: Heading[]
  listItems: ListItem[]
}

export interface Props {
  text: string
  tags: string[]
  sections: Section[]
}

function Item({ text, tags, sections }: Props) {
  if (tags[0] === 'nav') {
    return <Nav tags={tags} sections={sections} />
  } else if (tags[0] === 'page') {
    return <Page text={text} sections={sections} />
  } else {
    return null
  }
}

export default Item
