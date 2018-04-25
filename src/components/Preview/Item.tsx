import React from 'react'
import Nav from './Nav'
import Page from './Page'
import SearchResult from './SearchResult'
import { Frontmatter } from '../../utils/markdown'

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
  frontmatter: Frontmatter
}

function Item({ text, tags, sections, frontmatter }: Props) {
  if (tags[0] === 'nav') {
    return <Nav tags={tags} sections={sections} />
  } else if (tags[0] === 'page') {
    return (
      <div className="mb-4">
        <h2>{text}</h2>
        <div className="row row-stretch">
          <div className="flex-1">
            <Page text={text} sections={sections} />
          </div>
          <div className="ml-4" style={{ width: '20rem' }}>
            <SearchResult
              text={text}
              sections={sections}
              frontmatter={frontmatter}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Item
