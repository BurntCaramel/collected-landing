import { updateAtIndex, insertBeforeIndex } from './utils'

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
description: Yes, the whole world has changed. See for yourself here
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
