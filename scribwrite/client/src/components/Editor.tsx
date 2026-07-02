import React from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { EditorState } from '@codemirror/state'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  readOnly?: boolean
}

const Editor: React.FC<EditorProps> = ({ value, onChange, readOnly = false }) => {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const viewRef = React.useRef<EditorView | null>(null)

  React.useEffect(() => {
    if (!editorRef.current) return

    const onUpdate = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString())
      }
    })

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown({ base: markdownLanguage }),
          onUpdate,
          EditorView.editable.of(!readOnly),
          EditorView.theme({
            '&': {
              height: '100%',
              fontSize: '14px',
              fontFamily: 'monospace'
            },
            '.cm-content': {
              padding: '1rem'
            }
          })
        ]
      }),
      parent: editorRef.current
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [])

  React.useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      })
    }
  }, [value])

  return (
    <div className="h-full">
      <div ref={editorRef} className="h-full" />
    </div>
  )
}

export default Editor
