import * as React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

interface Props {
  data: IconDefinition
  size: number
  color?: string
}

export default function Icon({ data, size, color = 'currentColor' }: Props) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      role="img"
      style={{ width: size, height: size }}
    >
      <path fill={color} d={data.icon[4]} />
    </svg>
  )
}
