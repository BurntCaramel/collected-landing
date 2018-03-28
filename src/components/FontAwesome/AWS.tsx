import * as React from 'react'
import * as faAws from '@fortawesome/fontawesome-free-brands/faAws'
import Icon from './Icon'

interface Props {
  size: number
  color?: string
}

export default function AWSIcon({ size, color }: Props) {
  return <Icon data={faAws} size={size} color={color} />
}
