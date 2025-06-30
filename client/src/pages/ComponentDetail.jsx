import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ComponentDetail = () => {
  const { slug } = useParams();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const { data } = await api.get(`/components/${slug}`);
        setComponent(data);
      } catch (err) {
        console.error("Failed to fetch component:", err);
      }
    };
    fetchComponent();
  }, [slug]);

  if (!component) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
      <p className="text-sm text-gray-500">Version: {component.version}</p>

      <div className="flex flex-wrap gap-2 my-4">
        {component.tags.map(tag => (
          <span key={tag} className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>

      {component.image && (
        <img src={component.image} alt={component.name} className="rounded-lg shadow mb-6" />
      )}

      <h3 className="text-xl font-semibold mt-6">Code</h3>
      {component.codeFiles.map((file, idx) => (
        <div key={idx} className="my-4">
          <p className="text-sm font-medium text-gray-600">{file.filename}</p>
          <ReactMarkdown
            children={`\`\`\`${file.language}\n${file.code}\n\`\`\``}
            components={{
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <SyntaxHighlighter style={atomDark} language={file.language} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      ))}

      {component.command && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Command</h3>
          <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center mt-2">
            <code className="text-sm">{component.command}</code>
            <button
              onClick={() => navigator.clipboard.writeText(component.command)}
              className="ml-4 text-sm text-blue-600 hover:underline"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-700">
        <p>
          File type: <strong>{component.fileType || "N/A"}</strong>
        </p>
        <p>
          Created by:{" "}
          <a
            href={`/users/${component.creator.name}`}
            className="text-indigo-600 hover:underline"
          >
            {component.creator.name}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ComponentDetail;
