import * as React from 'react'
import { Link } from 'react-static'
import makeAware, { ExtraProps } from 'react-organism'
import * as Editing from '../../state/editing'
import { listTags, stripTags, tagsToInput } from '../../utils/tags'
import * as markdownUtils from '../../utils/markdown'
import PreviewItem, {
  Section as PreviewSection,
} from '../../components/Preview/Item'

interface Props {}

type State = Editing.State

function toPreviewSections(content: string): PreviewSection[] {
  return content.split(/\*\*\*+|---+/).map(subsectionContent => ({
    headings: markdownUtils.listHeadings(subsectionContent),
    listItems: markdownUtils.listListItems(subsectionContent)
      .map(text => ({ text: stripTags(text), tags: listTags(text) })),
  }))
}

const Editor: React.ComponentClass<Editing.Props> = makeAware(
  ({ sections, handlers }: State & ExtraProps<Editing.HandlersOut>) => (
    <div>
      {sections.map((section, sectionIndex) => (<>
        <button className='mb-4 bg-black text-white' onClick={() => handlers.insertSection(sectionIndex)}>+</button>
        <div key={sectionIndex} className="col">
          <input
            className="mb-2 px-2 py-1 border"
            value={tagsToInput(section.tags)}
            onChange={e =>
              handlers.editSectionTags(sectionIndex, e.target.value)
            }
          />
          <div className="row">
            <textarea
              className="flex-1 px-2 py-1 border"
              rows={10}
              onChange={e =>
                handlers.editSectionContent(sectionIndex, e.target.value)
              }
            >
              {section.content}
            </textarea>
            <div
              className="mt-2 ml-4"
              style={{ maxWidth: '12rem', fontSize: '0.75rem' }}
            >
              <p className="mb-2">{'Put each nav item on its own line.'}</p>
              <p className="mb-2">{'Use *** to separate into subsections.'}</p>
              <p className="mb-2">
                {
                  'If you have 4 or more subsections, then it will become stacked.'
                }
              </p>
            </div>
          </div>
          <PreviewItem
            tags={section.tags}
            text={''}
            sections={toPreviewSections(section.content)}
          />
        </div>
      </>))}
      <button className='mt-4 bg-black text-white' onClick={() => handlers.insertSection(sections.length)}>+</button>
    </div>
  ),
  Editing
)

const editorProps: Editing.Props = {
  initialSections: [
    {
      tags: ['nav', 'primary'],
      content: `
- Example #logo

***

- Features
- Pricing
- Sign In
- Sign Up #primary
`.trim(),
    },
  ],
}

class EditPage extends React.PureComponent<Props, {}> {
  render() {
    return (
      <div>
        <h1 className="mt-8 mb-8">{'Create prototype'}</h1>

        <article className="mb-8">
          <Editor {...editorProps} />
        </article>
      </div>
    )
  }
}

export default EditPage
