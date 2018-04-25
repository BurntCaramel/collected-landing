interface Heading {
  level: number
  text: string
}

const headingsRegex = /^#+\s+.+/gm
const headingCaptureRegex = /^(#+)\s+(.+)$/
const listItemsRegex = /^\s*[-*+]\s+(.+)/gm

export function listHeadings(input: string): Heading[] {
  return (input.match(headingsRegex) || []).map(line => {
    const [_all, hashSymbols, text ] = line.match(headingCaptureRegex)
    return {
      level: hashSymbols.length,
      text
    }
  })
}

export function listListItems(input: string): string[] {
  return (input.match(listItemsRegex) || []).map(text => (
    text.trim().slice(2).trim()
  ))
}
