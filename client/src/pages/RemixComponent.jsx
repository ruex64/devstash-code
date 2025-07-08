import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RemixComponent = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    version: "1.0.0",
    tags: "",
    commands: "",
  });

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [codeFiles, setCodeFiles] = useState([]);
  const [remixedFrom, setRemixedFrom] = useState(null);

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/components/${slug}`);
        setOriginal(data);
        setRemixedFrom(data._id);
        setForm({
          name: `${data.name} (Remix)`,
          description: data.description || "",
          version: "1.0.0",
          tags: data.tags.join(", "),
          commands: data.commands || "",
        });
        setCodeFiles(data.codeFiles || []);
        setImage(data.image || "");
      } catch (err) {
        console.error("Error fetching original component:", err);
      }
    };

    fetchOriginal();
  }, [slug]);

  const handleFileChange = (index, key, value) => {
    const updated = [...codeFiles];
    updated[index][key] = value;
    setCodeFiles(updated);
  };

  const addCodeFile = () => {
    setCodeFiles([...codeFiles, { filename: "", fileType: "js", code: "" }]);
  };

  const removeCodeFile = (index) => {
    setCodeFiles(codeFiles.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formData);
      setImage(res.data.secure_url);
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
      image,
      codeFiles,
      remixedFrom,
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/components`, payload, {
        withCredentials: true,
      });
      alert("Component remixed successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Remix failed");
    }
  };

  if (!original) return <div>Loading original component...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Remixing: {original.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Component Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Version (e.g. 1.0.0)"
          value={form.version}
          onChange={(e) => setForm({ ...form, version: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="CLI Command"
          value={form.commands}
          onChange={(e) => setForm({ ...form, commands: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <div>
          <label className="block font-medium mb-1">Component Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {image && <img src={image} alt="Preview" className="w-32 mt-2" />}
        </div>

        <div>
          <h3 className="font-medium mb-2">Code Files</h3>
          {codeFiles.map((file, index) => (
            <div key={index} className="space-y-2 mb-4 border p-3 rounded">
              <input
                type="text"
                placeholder="Filename"
                value={file.filename}
                onChange={(e) => handleFileChange(index, "filename", e.target.value)}
                className="w-full border px-3 py-1 rounded"
              />
              <select
                value={file.fileType}
                onChange={(e) => handleFileChange(index, "fileType", e.target.value)}
                className="w-full border px-3 py-1 rounded"
              >
                <option value="js">JavaScript</option>
                <option value="jsx">JSX</option>
                <option value="ts">TypeScript</option>
                <option value="tsx">TSX</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
              </select>
              <textarea
                placeholder="Code"
                value={file.code}
                onChange={(e) => handleFileChange(index, "code", e.target.value)}
                className="w-full border px-3 py-1 rounded h-32"
              />
              {codeFiles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCodeFile(index)}
                  className="text-red-500 text-sm"
                >
                  Remove File
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCodeFile}
            className="text-indigo-600 text-sm font-medium"
          >
            + Add Another File
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Remix Component
        </button>
      </form>
    </div>
  );
};

export default RemixComponent;
