import * as React from 'react'
import { Link } from 'react-static'
import makeAware, { ExtraProps } from 'react-organism'
import * as editorModule from '../../state/editor'
import { listTags, stripTags, tagsToInput } from '../../utils/tags'
import PreviewNav, {
  Section as PreviewNavSection,
} from '../../components/Preview/Nav'

interface Props {}

type State = editorModule.State

function toNavSections(content: string): PreviewNavSection[] {
  return content.split(/\*\*\*+|---+/).map(subsectionContent => ({
    listItems: subsectionContent
      .split(/\n+/)
      .map(text => ({ text: stripTags(text), tags: listTags(text) })),
  }))
}

const Editor: React.ComponentClass<editorModule.Props> = makeAware(
  ({ sections, handlers }: State & ExtraProps<editorModule.HandlersOut>) => (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="col">
          <input
            className="mb-2 px-2 py-1 border"
            value={tagsToInput(section.tags)}
            onChange={e =>
              handlers.editSectionTags(sectionIndex, e.target.value)
            }
          />
          <textarea
            className="px-2 py-1 border"
            rows={10}
            onChange={e =>
              handlers.editSectionContent(sectionIndex, e.target.value)
            }
          >
            {section.content}
          </textarea>
          <PreviewNav
            tags={section.tags}
            sections={toNavSections(section.content)}
          />
        </div>
      ))}
    </div>
  ),
  editorModule
)

const editorProps: editorModule.Props = {
  initialSections: [
    {
      tags: ['nav', 'primary'],
      content: `
Example #logo

***

Features
Pricing
Sign In
Sign Up #primary
`.trim(),
    },
  ],
}

class EditPage extends React.PureComponent<Props, {}> {
  render() {
    return (
      <div>
        <h1 className="mt-8 mb-8">{'Edit prototype'}</h1>

        <article className="mb-8">
          <h2 className="mb-2">{'Add section'}</h2>

          <Editor {...editorProps} />
        </article>
      </div>
    )
  }
}

export default EditPage
