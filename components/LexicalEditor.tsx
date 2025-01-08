import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { INSERT_IMAGE_COMMAND } from '@lexical/file';
import { $createParagraphNode, $getRoot } from 'lexical';
import { ImageNode } from '@lexical/file';

// Editor styles
const editorStyles = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '8px',
  minHeight: '200px',
};

const EditorPlaceholder = () => <div style={{ opacity: 0.5 }}>Start typing...</div>;

const LexicalEditor = ({ value, onChange }) => {
  // Initial configuration for Lexical
  const initialConfig = {
    namespace: 'ControlledLexicalEditor',
    onError: (error) => console.error('Lexical Error:', error),
    nodes: [ImageNode],
  };

  // Handle Image Insertion
  const insertImage = (editor) => {
    const imageURL = prompt('Enter image URL:');
    if (imageURL) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: imageURL,
        altText: 'Image',
      });
    }
  };

  // Serialize editor state to JSON
  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const serializedState = JSON.stringify(editorState.toJSON());
      if (onChange) onChange(serializedState);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <button
        onClick={() => insertImage()}
        style={{
          marginBottom: '10px',
          padding: '5px 10px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Insert Image
      </button>
      <RichTextPlugin
        contentEditable={<ContentEditable style={editorStyles} />}
        placeholder={<EditorPlaceholder />}
        ErrorBoundary={(error) => <div>Error: {error.message}</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleEditorChange} />
    </LexicalComposer>
  );
};

export default LexicalEditor;
