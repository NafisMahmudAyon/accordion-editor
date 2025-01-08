import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const RichTextEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Cleanup when the component unmounts
  }, []);

  const handleEditorChange = (state) => {
    if (isMounted) {
      setEditorState(state);
      if (onChange) {
        const rawContent = convertToRaw(state.getCurrentContent());
        onChange(JSON.stringify(rawContent));
      }
    }
  };

  const uploadImageCallback = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (isMounted) {
          resolve({ data: { link: reader.result } });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          image: {
            uploadCallback: uploadImageCallback,
            previewImage: true,
            alt: { present: true, mandatory: false },
          },
        }}
        editorStyle={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px',
          minHeight: '200px',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
