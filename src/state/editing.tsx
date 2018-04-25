export interface Props {
  initialSections?: Section[]
}

export type Tag = string

export type Section = {
  name: string
  content: string
}

export interface State {
  sections: Section[]
}

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
  return items
    .slice(0, beforeIndex)
    .concat([insertedItem])
    .concat(items.slice(beforeIndex))
}

export const initial: (props: Props) => State = props => ({
  sections: props.initialSections || [],
})

export const editSectionName = (
  props: Props,
  changedIndex: number,
  newName: string
) => ({ sections }: State) =>
  ({
    sections: updateAtIndex(sections, changedIndex, section => ({
      ...section,
      name: newName,
    })),
  } as State)

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
  sections: insertBeforeIndex(sections, beforeIndex, {
    name: '/ #page',
    content: `
---
title: Example - the next level experience
---

# Primary heading

## Subheading
`.trim(),
  }),
})

export interface HandlersOut {
  editSectionName(changedIndex: number, newName: string): void
  editSectionContent(changedSectionIndex: number, newContent: string): void
  insertSection(beforeIndex: number): void
}
