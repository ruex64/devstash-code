import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Sandpack } from "@codesandbox/sandpack-react";

const ComponentDetail = () => {
  const { slug } = useParams();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/components/${slug}`)
      .then((res) => setComponent(res.data))
      .catch(console.error);
  }, [slug]);

  if (!component) return <p className="p-6">Loading...</p>;

  const codeMap = {};
  component.codeFiles.forEach(file => {
    codeMap[file.filename] = { code: file.code };
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{component.name}</h1>
      <p className="text-sm text-gray-600">Version: {component.version}</p>

      <div className="my-4">
        <Sandpack
          template="react"
          files={codeMap}
          options={{ showTabs: true, editorHeight: 300 }}
        />
      </div>

      <div className="my-2">
        <h3 className="font-semibold">Command:</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm">{component.command}</pre>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {component.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{tag}</span>
        ))}
      </div>

      <p className="text-sm">
        Created by{" "}
        <Link to={`/users/${component.creator.name}`} className="text-indigo-600 hover:underline">
          {component.creator.name}
        </Link>
      </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(component.command)}
          className="bg-indigo-600 text-white px-4 py-1 rounded"
        >
          Copy CLI
        </button>
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(component, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${component.slug}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="bg-gray-800 text-white px-4 py-1 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ComponentDetail;
