import { listTags } from '../utils/tags'

export interface Props {
  initialSections?: Section[]
}

export type Tag = string

export type Section = {
  tags: Tag[]
  content: string
}

export interface State {
  sections: Section[]
}

export const initial: (props: Props) => State = props => ({
  sections: props.initialSections || [],
})

export const editSectionTags = (
  props: Props,
  changedIndex: number,
  newTagsInput: string
) => ({ sections }: State) =>
  ({
    sections: sections.map((section, sectionIndex) => {
      if (sectionIndex === changedIndex) {
        return {
          ...section,
          tags: listTags(newTagsInput, { strict: false }),
        }
      } else {
        return section
      }
    }),
  } as State)

function updateAtIndex<Item>(
  items: Item[],
  changedIndex: number,
  makeChanges: (original: Item) => Item
) {
  return items.map((item, itemIndex) => {
    if (itemIndex === changedIndex) {
      return makeChanges(item)
    } else {
      return item
    }
  })
}

function insertBeforeIndex<Item>(
  items: Item[],
  beforeIndex: number,
  insertedItem: Item
) {
  return items.slice(0, beforeIndex).concat([insertedItem]).concat(items.slice(beforeIndex))
}

export const editSectionContent = (
  props: Props,
  changedSectionIndex: number,
  newContent: string
) => ({ sections }: State) =>
  ({
    sections: updateAtIndex(sections, changedSectionIndex, section => ({
      ...section,
      content: newContent,
    })),
  } as State)

export const insertSection = (props: Props, beforeIndex: number) => ({
  sections,
}: State) => ({
  sections: insertBeforeIndex(sections, beforeIndex, { tags: ['page'], content: '# Primary heading\n\n## Subheading' }),
})

export interface HandlersOut {
  editSectionTags(changedIndex: number, newTagsInput: string): void
  editSectionContent(changedSectionIndex: number, newContent: string): void
  insertSection(beforeIndex: number): void
}
