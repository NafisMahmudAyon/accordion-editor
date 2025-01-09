'use client'

import { Button } from "aspect-ui/Button";
import { Typography } from "aspect-ui/Typography";
import React, { useState } from "react";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  content?: string;
  lang?: string;
  styles?: string;
  headerStyles?: string;
  bodyStyles?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  content = "",
  lang = "html",
  styles = "",
  headerStyles = "",
  bodyStyles = "",
}) => {
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(content.trim())
      .then(() => setCopySuccess(true))
      .catch(() => setCopySuccess(false));

    // Reset copy success message after 2 seconds
    setTimeout(() => {
      setCopySuccess(null);
    }, 2000);
  };
  return (
    <Code styles={` ${styles} rounded-t-lg rounded-b-lg  relative`}>
      <CodeHeader
        styles={` ${headerStyles} flex items-center justify-between   p-2 w-full bg-[#b4b4b4] text-white rounded-t-lg pl-4 `}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1"><span className="size-3 bg-red-500 inline-block rounded"></span><span className="size-3 bg-amber-500 inline-block rounded"></span><span className="size-3 bg-green-500 inline-block rounded"></span></div>
          <Typography className="text-primary-200 dark:text-primary-900">{lang}</Typography>
        </div>
        <Button
          onClick={handleCopyClick}
          icon={<ClipboardDocumentIcon className="size-5" />}
          iconClassName="mr-2"
          className="absolute top-0 right-0 p-2 text-inherit z-10 pr-4 cursor-pointer bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-200"
        >
          {
            copySuccess === null
              ? "Copy code"
              : copySuccess === true
                ? "Code copied"
                : "Failed to copy"
          }
        </Button>
      </CodeHeader>
      <CodeBody
        content={content}
        language={lang}
        styles={` ${bodyStyles} pt-1 px-4 pb-1 text-sm overflow-y-scroll light-scrollbar !rounded-b-lg block  `}
      />
    </Code>
  );
};

export default CodeSnippet;

interface CodeProps {
  content?: string;
  languages?: string;
  styles?: string;
  children?: React.ReactNode
}

const Code: React.FC<CodeProps> = ({
  styles = "",
  children,
}) => {

  return <pre className={`${styles}`}>{children}</pre>;
};

// * CodeHeader
interface CodeHeaderProps {
  styles?: string;
  children?: React.ReactNode;
}
const CodeHeader: React.FC<CodeHeaderProps> = ({ styles = "", children }) => {
  return <div className={` ${styles} `}>{children}</div>;
};

// * CodeBody
interface CodeBodyProps {
  styles?: string;
  language?: string;
  content?: string;
}

const CodeBody: React.FC<CodeBodyProps> = ({ styles = "", language, content = "" }) => {
  return (
    <SyntaxHighlighter
      className={`${styles} nova-mono-regular`}
      language={language}
      style={coldarkDark}
      customStyle={{
        maxHeight: "420px",
        borderRadius: "0px",
        paddingLeft: "40px",
        paddingBottom: "20px",
        marginTop: "0px",
        marginBottom: "0px",
        background: "#1C222B",
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "-0.2px",
        fontFamily: "Nova Mono !important",
      }}
    >
      {content}
    </SyntaxHighlighter>
  );
};
