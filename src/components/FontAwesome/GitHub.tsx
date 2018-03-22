import * as React from 'react'
import * as faGitHub from '@fortawesome/fontawesome-free-brands/faGithub'
import Icon from './Icon'

interface Props {
  size: number
  color?: string
}

export default function GitHubIcon({ size, color }: Props) {
  return <Icon data={faGitHub} size={size} color={color} />
}
