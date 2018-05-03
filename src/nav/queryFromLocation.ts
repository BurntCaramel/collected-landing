import { parse } from 'query-string'
import { Location } from 'history'

export interface Query {
  q: string
  industry: string
  url: string
  owner: string
  repoName: string
}

export default function queryFromLocation(location: Location): Query {
  return parse(location.search)
}
