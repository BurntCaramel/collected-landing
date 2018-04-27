import { queryTrelloBoard } from '../services/source'
import { updateAtIndex, insertBeforeIndex } from './utils'
import { Source, Collection } from '../types/source'

export interface Props {
  url: string
}

export interface State {
  url: string
  source: Source | null
}

export const initial: (props: Props) => State = props => ({
  url: props.url,
  source: null,
})

export async function load(
  props: Props,
  prevProps: Props | null
): Promise<Partial<State>> {
  let changes: Partial<State> = {}
  console.log('prevProps', prevProps, props)
  if (!prevProps || props.url !== prevProps.url) {
    const [, boardID = ''] =
      props.url.match(/^https?:\/\/trello.com\/b\/([^\/]+)/) || []
    console.log('boardID', boardID)
    if (boardID) {
      const { data, errors } = await queryTrelloBoard(boardID, { q: '' })
      if (data) {
        changes.source = data.source
      }
    }
  }
  return changes
}

export interface HandlersOut {
  load(): void
}
