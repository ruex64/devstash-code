import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadComponent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    version: "1.0.0",
    tags: "",
    command: "",
  });

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [codeFiles, setCodeFiles] = useState([
    { filename: "", fileType: "jsx", code: "" },
  ]);

  const handleFileChange = (index, key, value) => {
    const updated = [...codeFiles];
    updated[index][key] = value;
    setCodeFiles(updated);
  };

  const addCodeFile = () => {
    setCodeFiles([...codeFiles, { filename: "", fileType: "js", code: "" }]);
  };

  const removeCodeFile = (index) => {
    const updated = codeFiles.filter((_, i) => i !== index);
    setCodeFiles(updated);
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
      codeFiles,
      image,
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/components`, payload, {
        withCredentials: true,
      });
      alert("Component uploaded successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Upload a New Component</h2>
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
          value={form.command}
          onChange={(e) => setForm({ ...form, command: e.target.value })}
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
          Upload Component
        </button>
      </form>
    </div>
  );
};

export default UploadComponent;
