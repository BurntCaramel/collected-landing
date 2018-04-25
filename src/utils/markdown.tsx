interface Heading {
  level: number
  text: string
}

export interface Frontmatter {
  [key: string]: string
}

const headingsRegex = /^#+\s+.+/gm
const headingCaptureRegex = /^(#+)\s+(.+)$/
const listItemsRegex = /^\s*[-*+]\s+(.+)/gm
const frontmatterRegex = /^---\n([\s\S]+)\n---\n+/m
const frontmatterKeyValuePairRegex = /^([^:]+):\s*(.+)?/

export function listHeadings(input: string): Heading[] {
  return (stripFrontmatter(input).match(headingsRegex) || []).map(line => {
    const [, hashSymbols, text] = line.match(headingCaptureRegex)
    return {
      level: hashSymbols.length,
      text,
    }
  })
}

export function listListItems(input: string): string[] {
  return (stripFrontmatter(input).match(listItemsRegex) || []).map(text =>
    text
      .trim()
      .slice(2)
      .trim()
  )
}

export function extractFrontmatter(input: string): Frontmatter {
  const [, raw = ''] = input.match(frontmatterRegex) || []
  return raw
    .split('\n')
    .map(line => {
      const [, key = '', value = ''] =
        line.match(frontmatterKeyValuePairRegex) || []
      return [key, value]
    })
    .filter(pair => pair[0] !== '')
    .reduce(
      (obj, [key, value]) => {
        obj[key] = value
        return obj
      },
      {} as Frontmatter
    )
}

export function stripFrontmatter(input: string): string {
  return input.replace(frontmatterRegex, '')
}
