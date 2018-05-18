import React from 'react'
import { Link } from 'react-static'
import Nav, { titleForTags as titleForNavTags } from './Nav'
import Page from './Page'
import SearchResult from './SearchResult'
import { Frontmatter } from '../../utils/markdown'
import { stripTags, tagsToInput } from '../../utils/tags'

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
  domain?: string
}

function Item({ text, tags, sections, frontmatter, domain }: Props) {
  if (tags[0] === 'nav') {
    return (
      <div className="my-4">
        <h3>
          {titleForNavTags(tags)}
          {' '}
          <Link to={`/research?q=${encodeURIComponent(tagsToInput(tags))}`}>
            {tagsToInput(tags)}
          </Link>
        </h3>
        <Nav tags={tags} sections={sections} />
      </div>
    )
  } else if (tags[0] === 'page') {
    return (
      <div className="mb-4">
        <h3>
          {stripTags(text)}
          {' '}
          <Link to={`/research?q=${encodeURIComponent(tagsToInput(tags))}`}>
            {tagsToInput(tags)}
          </Link>
        </h3>
        <div className="row row-stretch">
          <div className="flex-1">
            <Page text={text} sections={sections} />
          </div>
          <div className="ml-4" style={{ width: '20rem' }}>
            <SearchResult
              text={text}
              sections={sections}
              frontmatter={frontmatter}
              domain={domain}
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
