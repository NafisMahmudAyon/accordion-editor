'use client';
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Include Quill's default styles

interface MarkdownEditorProps {
	value?: string;
	onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value = "", onChange }) => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const quillInstance = useRef<Quill | null>(null); // To store Quill instance

	useEffect(() => {
		if (!editorRef.current || quillInstance.current) return;

		// Initialize Quill only once
		quillInstance.current = new Quill(editorRef.current, {
			theme: "snow",
			modules: {
				toolbar: [
					["bold", "italic", "underline", "strike"],
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					["blockquote", "code-block"],
					[
						// { header: "1" }, { header: "2" }, { header: "3" }, { header: "4" }, { header: "5" }, { header: "6" }, 
						{ font: [] }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					["link"],
					["image"],
					[{ align: [] }],
					[{ direction: "rtl" }, { size: ["small", false, "large", "huge"] }],
					[{"color": []}, {"background": []}],
					["clean"],
				],
			},
		});

		// Set initial content
		quillInstance.current.root.innerHTML = value;

		// Listen to text changes and call onChange
		quillInstance.current.on("text-change", () => {
			const htmlContent = quillInstance.current!.root.innerHTML;
			onChange(htmlContent);
		});
	}, [onChange, value]);

	useEffect(() => {
		// Update the content if `value` changes externally
		if (quillInstance.current && quillInstance.current.root.innerHTML !== value) {
			quillInstance.current.root.innerHTML = value;
		}
	}, [value]);

	return <div ref={editorRef} style={{ height: "300px" }} />;
};

export default MarkdownEditor;
