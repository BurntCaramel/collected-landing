import * as React from 'react'
import * as faTrello from '@fortawesome/fontawesome-free-brands/faTrello'
import Icon from './Icon'

interface Props {
  size: number
  color?: string
}

export default function TrelloIcon({ size, color }: Props) {
  return <Icon data={faTrello} size={size} color={color} />
}
