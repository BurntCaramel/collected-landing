import React from 'react'

export interface Heading {
  level: number
  text: string
}

export interface Section {
  headings: Heading[]
}

export interface Props {
  text: string
  sections: Section[]
}

function renderHeading(heading: Heading) {
  let Component = 'h3'
  if (heading.level === 1) {
    Component = 'h1'
  } else if (heading.level === 2) {
    Component = 'h2'
  } else if (heading.level === 3) {
    Component = 'h3'
  }

  return <Component key={heading.text}>{heading.text}</Component>
}

function Page({ text, sections }: Props) {
  return (
    <div className="mb-8">
      <h2>{text}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          padding: '1rem',
          backgroundColor: 'white',
        }}
      >
        {sections.map(section => (
          <div
            style={{
              marginBottom: '1rem',
            }}
          >
            {section.headings.map(renderHeading)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
