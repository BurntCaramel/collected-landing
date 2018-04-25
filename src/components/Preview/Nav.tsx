import React from 'react'
import Icon from './Icon'

export interface ListItem {
  tags: string[]
  text: string
}

export interface Section {
  listItems: ListItem[]
}

export interface Props {
  tags: string[]
  sections: Section[]
}

const isPrimaryItem = ({ tags }: ListItem): boolean => tags[0] === 'primary'

function titleForTags(tags: string[]) {
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

function Nav({ tags, sections }: Props) {
  return (
    <div className="mb-8">
      <h2>{titleForTags(tags)}</h2>
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
          backgroundColor: 'white',
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
                const isPrimary = isPrimaryItem(listItem)
                const isSearch = listItem.tags[0] === 'search'
                const isIcon = listItem.tags[0] === 'icon'
                const isPicture = listItem.tags[0] === 'picture'
                const isLast = listItemIndex === listItemCount - 1
                return (
                  <span
                    key={listItemIndex}
                    style={{
                      display: 'flex',
                      paddingLeft: '0.333rem',
                      paddingRight: '0.333rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      marginLeft: isPrimary ? '0.25rem' : '0',
                      marginRight: isPrimary ? '0.25rem' : '0',
                      fontWeight: listItem.tags[0] === 'logo' ? 700 : 400,
                      color: isPrimary ? 'white' : isSearch ? '#888' : '#111',
                      backgroundColor: isPrimary ? '#111' : 'white',
                      border: isSearch ? '1px solid #111' : 'none',
                      borderRadius: isPrimary ? 5 : 0,
                    }}
                  >
                    {isIcon || isPicture ? '' : listItem.text}
                    {isIcon && <Icon text={listItem.text} />}
                    {isPicture && (
                      <Icon
                        text={listItem.text}
                        sizeRem={1.5}
                        fallbackRounded
                      />
                    )}
                  </span>
                )
              }
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nav
