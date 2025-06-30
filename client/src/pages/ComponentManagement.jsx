import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const ComponentManagement = () => {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    api.get("/admin/components")
      .then(res => setComps(res.data.components))
      .catch(console.error);
  }, []);

  const deleteComp = (id) => {
    if (!confirm("Delete this component?")) return;
    api.delete(`/admin/components/${id}`)
      .then(() => setComps(prev => prev.filter(c => c._id !== id)))
      .catch(console.error);
  };

  return (
    <div className="overflow-auto bg-white rounded shadow p-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Name</th><th>Creator</th><th>Version</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comps.map(c => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td>
                <Link to={`/components/${c.slug}`} className="text-blue-600 hover:underline">
                  {c.name}
                </Link>
              </td>
              <td>{c.creator.name}</td>
              <td>{c.version}</td>
              <td>
                <button onClick={() => deleteComp(c._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentManagement;
