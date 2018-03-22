import * as React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

interface Props {
  data: IconDefinition
  size: number
  block?: boolean
  color?: string
}

export default function Icon({ data, size, block = true, color = 'currentColor' }: Props) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      role="img"
      style={{ width: size, height: size, display: block ? 'block' : 'inline-block' }}
    >
      <path fill={color} d={data.icon[4]} />
    </svg>
  )
}
