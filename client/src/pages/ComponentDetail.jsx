import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";

const ComponentDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this component?");
    if (!confirm) return;

    try {
      await api.delete(`/components/${slug}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  if (!component) return <div>Loading...</div>;

  const isOwnerOrAdmin =
    user?.role === "admin" || user?.id === component.creator?._id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
      <p className="text-sm text-gray-500">Version: {component.version}</p>

      <div className="flex flex-wrap gap-2 my-4">
        {component.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {component.image && (
        <img
          src={component.image}
          alt={component.name}
          className="rounded-lg shadow mb-6"
        />
      )}

      <h3 className="text-xl font-semibold mt-6">Code Files</h3>
      {component.codeFiles.map((file, idx) => (
        <div key={idx} className="my-6">
          <p className="text-sm font-medium text-gray-600 mb-2">{file.filename}</p>
          <SyntaxHighlighter
            style={atomDark}
            language={file.fileType}
            PreTag="div"
          >
            {file.code}
          </SyntaxHighlighter>
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
            href={`/users/${component.creator?.name}`}
            className="text-indigo-600 hover:underline"
          >
            {component.creator?.name}
          </a>
        </p>
      </div>

      {isOwnerOrAdmin && (
        <button
          onClick={handleDelete}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Component
        </button>
      )}
    </div>
  );
};

export default ComponentDetail;
