export interface Section {
  headings: {
    level: number
    text: string
  }[]
  listItems: {
    text: string
    tags: string[]
  }[]
}

export interface Unit {
  name: string
  tags: string[]
  body: {
    frontmatter: {
      title: string
      description: string
    }
    sections: Section[]
  }
}

export interface Collection {
  name: string
  domain: string
  units: Unit[]
}

export interface Source {
  name: string
  collections: Collection[]
}
