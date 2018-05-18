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

interface ESModuleTransformer {
  imports: {
    source: string
    specifiers: {
      in: string | null
      as: string
    }[]
  }[]
  classes: {
    name: string
    superClass: string | null
    methods: {
      name: string
      lineCount: number
    }
  }[]
}

export interface File {
  path: string
  content?: string
  asJavaScript?: {
    transform: ESModuleTransformer
  }
}

interface DependencySourceItem {
  name: string
  rule: string
  groups: string[]
}

interface DependencySource {
  file: File
  items: DependencySourceItem[]
}

export interface GitHubSource {
  npmProjects: {
    directoryPath: string
    name: string
    version: string
    dependencies: DependencySource
  }[]
  dependencies: {
    sources: DependencySource[]
  }
  files: File[]
}
