import React from 'react'
import { remark } from 'remark'
import html from 'remark-html'

interface PreviewProps {
  markdown: string
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  const [htmlContent, setHtmlContent] = React.useState<string>('')

  React.useEffect(() => {
    const processMarkdown = async () => {
      try {
        const result = await remark()
          .use(html)
          .process(markdown)
        setHtmlContent(result.toString())
      } catch (error) {
        console.error('Error processing markdown:', error)
        setHtmlContent('<p>Error rendering markdown</p>')
      }
    }

    processMarkdown()
  }, [markdown])

  return (
    <div className="h-full p-6 overflow-auto">
      <div
        className="markdown-preview prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}

export default Preview
