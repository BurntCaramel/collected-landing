import { parse } from 'query-string'
import { Location } from 'history'

interface Query {
  q: string
  industry: string
}

export default function queryFromLocation(location: Location): Query {
  const query = parse(location.search)
  return query
}
