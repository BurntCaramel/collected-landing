import React from 'react'

const regexToFontAwesomeName = [
  // Brands
  { regex: /\bfacebook\b/i, className: 'fab fa-facebook' },
  { regex: /\bgithub\b/i, className: 'fab fa-github' },
  { regex: /\binstagram\b/i, className: 'fab fa-instagram' },
  { regex: /\bmedium\b/i, className: 'fab fa-medium' },
  { regex: /\btwitter\b/i, className: 'fab fa-twitter' },
  // Symbols
  { regex: /\bnotification[s]?\b/i, className: 'fas fa-bell' },
  { regex: /\bnew|add\b/i, className: 'fas fa-plus' },
  { regex: /\buser|profile|account\b/i, className: 'fas fa-user-circle' },
  { regex: /\bsearch\b/i, className: 'fas fa-search' },
  { regex: /\bcontribute\b/i, className: 'fas fa-pencil-alt' },
]

function Icon({
  text,
  sizeRem = 1,
  fallbackRounded = false,
}: {
  text: string
  sizeRem?: number
  fallbackRounded?: boolean
}) {
  const key = text.toLowerCase()
  let fontAwesomeClassName = null
  regexToFontAwesomeName.some(({ regex, className }) => {
    if (regex.test(key)) {
      fontAwesomeClassName = className
      return true
    }
    return false
  })

  if (fontAwesomeClassName) {
    return (
      <i
        className={fontAwesomeClassName}
        style={{ fontSize: `${sizeRem}rem` }}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 2 2"
      width={sizeRem * 18}
      height={sizeRem * 18}
      style={{ display: 'inline-block' }}
    >
      {fallbackRounded ? (
        <circle cx={1} cy={1} r={1} />
      ) : (
        <rect width={2} height={2} />
      )}
      <title>{text}</title>
    </svg>
  )
}

export default Icon
