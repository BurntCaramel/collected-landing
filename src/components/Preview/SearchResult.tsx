import React from 'react'
import { stripTags } from '../../utils/tags'
import { Frontmatter } from '../../utils/markdown'

export interface Heading {
  level: number
  text: string
}

export interface Section {
  headings: Heading[]
  //bodyTexts: string[]
}

export interface Props {
  text: string
  sections: Section[]
  frontmatter: Frontmatter
}

function titleFor({ text, sections, frontmatter }: Props): string {
  console.log('frontmatter', frontmatter)
  if (frontmatter.title) {
    return frontmatter.title
  }

  const headings = sections[0] ? sections[0].headings : []
  const [primaryHeading] = headings.filter(heading => heading.level === 1)
  if (primaryHeading) {
    return primaryHeading.text
  }

  return ''
}

function descriptionFor({ text, sections, frontmatter }: Props): string {
  if (frontmatter.description) {
    return frontmatter.description
  }

  return ''
}

const baseURL = 'https://example.com'

function urlFor({ text }: Props): string {
  const withoutTags = stripTags(text)
  return baseURL + withoutTags
}

function SearchResult(props: Props) {
  return (
    <div className="mb-8 px-2 py-4 bg-white">
      <h3
        style={{
          fontFamily: 'arial, sans-serif',
          fontSize: 18,
          lineHeight: 1.2,
          fontWeight: 400,
          color: 'rgb(26, 13, 171)',
        }}
      >
        {titleFor(props)}
      </h3>
      <div>
        <cite
          style={{
            fontFamily: 'arial, sans-serif',
            fontSize: 14,
            lineHeight: 16,
            color: 'rgb(0, 102, 33)',
            fontStyle: 'normal',
            whiteSpace: 'nowrap',
          }}
        >
          {urlFor(props)}
        </cite>
      </div>
      <p
        style={{
          fontFamily: 'arial, sans-serif',
          fontSize: 13,
          lineHeight: 18,
          fontWeight: 400,
          color: 'rgb(84, 84, 84)',
        }}
      >{descriptionFor(props)}</p>
    </div>
  )
}

export default SearchResult
