import React from 'react'
import { Section, ListItem } from '../../types/source'
import Icon from './Icon'

export interface Props {
  tags: string[]
  sections: Section[]
}

const hasTag = (tag: string, { content: { tags } }: ListItem): boolean =>
  tags[0] === tag

export function titleForTags(tags: string[]) {
  if (tags[1] === 'primary') {
    return 'Primary nav'
  }

  if (tags[1] === 'footer') {
    return 'Footer nav'
  }

  return 'Nav'
}

function fontSizeForTags(tags: string[]) {
  if (tags[1] === 'footer') {
    return '0.75rem'
  }

  return '1rem'
}

const blue = '#0267ff'

function renderListItem({
  key,
  listItem,
  isLast,
}: {
  key: number | string
  listItem: ListItem
  isLast: boolean
}): React.ReactElement<'details'> {
  const isPrimary = hasTag('primary', listItem)
  const isSecondary = hasTag('secondary', listItem)
  const isSearch = hasTag('search', listItem)
  const isIcon = hasTag('icon', listItem)
  const isPicture = hasTag('picture', listItem)
  const isLogo = hasTag('logo', listItem)
  return (
    <details
      key={key}
      style={{
        display: 'flex',
        paddingLeft: '0.333rem',
        paddingRight: '0.333rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        marginLeft: isPrimary ? '0.25rem' : '0',
        marginRight: isPrimary ? '0.25rem' : '0',
        fontWeight: isLogo ? 700 : 400,
        color: isPrimary
          ? 'white'
          : isSearch
            ? 'rgba(255,255,255,0.7)'
            : 'white',
        backgroundColor: isPrimary ? 'rgba(0,0,0,0.7)' : isSecondary ? 'rgb(255,255,255,0.3)' :'transparent',
        border: isSearch ? '1px solid white' : 'none',
        borderRadius: (isPrimary || isSecondary) ? 5 : 0,
        cursor: isSearch ? 'text' : 'pointer',
        position: 'relative',
      }}
    >
      <summary>
        {isIcon || isPicture ? '' : listItem.content.text}
        {isIcon && <Icon text={listItem.content.text} />}
        {isPicture && (
          <Icon text={listItem.content.text} sizeRem={1.5} fallbackRounded />
        )}
        {listItem.childItems && listItem.childItems.length > 0 && ' ▾'}
      </summary>
      {listItem.childItems && (
        <ul
          style={{
            position: 'absolute',
            left: '-0.5em',
            minWidth: '10em',
            padding: '0.5em',
            backgroundColor: blue,
          }}
        >
          {listItem.childItems.map(
            (listItem, listItemIndex, { length: listItemCount }) => {
              return renderListItem({
                key: listItemIndex,
                listItem,
                isLast: listItemIndex === listItemCount - 1,
              })
            }
          )}
        </ul>
      )}
    </details>
  )
}

function Nav({ tags, sections }: Props) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          fontSize: fontSizeForTags(tags),
          backgroundColor: blue,
        }}
      >
        {sections.map((section, sectionIndex, { length: sectionCount }) => (
          <div
            key={sectionIndex}
            style={{
              display: 'flex',
              flexDirection: sectionCount >= 4 ? 'column' : 'row',
              flexWrap: 'wrap',
              alignItems: sectionCount >= 4 ? 'flex-start' : 'center',
              flexGrow: sectionCount === 1 ? 1 : 0,
              justifyContent: sectionCount === 1 ? 'space-between' : 'initial',
            }}
          >
            {section.listItems.map(
              (listItem, listItemIndex, { length: listItemCount }) => {
                return renderListItem({
                  key: listItemIndex,
                  listItem,
                  isLast: listItemIndex === listItemCount - 1,
                })
              }
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nav
