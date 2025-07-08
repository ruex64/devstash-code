import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const RemixComponent = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState({ name: "", version: "1.0.0", tags: "", command: "" });
  const [codeFiles, setCodeFiles] = useState([]);

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const { data } = await api.get(`/components/${slug}`);
        setOriginal(data);
        setCodeFiles(data.codeFiles);
        setForm({
          name: `${data.name} Remix`,
          version: data.version,
          tags: data.tags.join(", "),
          command: data.command || "",
        });
      } catch (err) {
        console.error("Error loading component:", err);
      }
    };
    fetchOriginal();
  }, [slug]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/components/remix/${slug}`, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
        codeFiles,
        image: original?.image,
      });
      navigate("/");
    } catch (err) {
      console.error("Remix failed:", err);
      alert("Remix failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Remix: {original?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Component Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Version"
          value={form.version}
          onChange={(e) => handleChange("version", e.target.value)}
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Tags"
          value={form.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
        <textarea
          className="w-full border px-4 py-2 rounded"
          placeholder="Command"
          value={form.command}
          onChange={(e) => handleChange("command", e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit Remix
        </button>
      </form>
    </div>
  );
};

export default RemixComponent;
