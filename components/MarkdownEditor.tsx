'use client';
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface MarkdownEditorProps {
	value?: string;
	onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value = "", onChange }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const quillInstance = useRef<Quill | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Destroy any previous Quill instance before creating a new one
		if (quillInstance.current) {
			quillInstance.current.off("text-change");
			quillInstance.current = null;
		}

		// Define toolbar options
		const toolbarOptions = [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			["blockquote", "code-block"],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["link", "image"],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			["clean"],
		];

		// Initialize a new Quill editor
		const editor = new Quill(containerRef.current, {
			theme: "snow",
			modules: {
				toolbar: toolbarOptions,
			},
		});

		quillInstance.current = editor;

		// Set initial content if provided
		if (value) {
			editor.root.innerHTML = value;
		}

		// Handle content changes
		editor.on("text-change", () => {
			const htmlContent = editor.root.innerHTML;
			onChange(htmlContent);
		});

		// Cleanup Quill instance on unmount
		return () => {
			if (quillInstance.current) {
				quillInstance.current.off("text-change");
				if (containerRef.current) {
					containerRef.current.innerHTML = ""; // Clear toolbar and editor content
				}
				quillInstance.current = null;
			}
		};
	}, []); // Run only once on mount

	// Handle external `value` updates
	useEffect(() => {
		if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
			quillInstance.current.root.innerHTML = value;
		}
	}, [value]);

	return (
		<div className="editor-wrapper">
			<div ref={containerRef} className="h-[300px]" />
			<style jsx global>{`
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          min-height: 200px;
        }
      `}</style>
		</div>
	);
};

export default MarkdownEditor;
