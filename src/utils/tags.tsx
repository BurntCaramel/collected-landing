const strictTagsRegex = /#(\w+)/g
const looseTagsRegex = /#(\w*)/g

export function listTags(
  input: string,
  { strict = true }: { strict?: boolean } = {}
): string[] {
  return (input.match(strict ? strictTagsRegex : looseTagsRegex) || []).map(
    text => text.slice(1)
  )
}

export function stripTags(input: string): string {
  return input.replace(looseTagsRegex, '')
}

export function tagsToInput(tags: string[]): string {
  if (tags.length === 0) {
    return ''
  }

  return '#' + tags.join(' #')
}
