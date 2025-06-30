import React, { useEffect, useState } from "react";
import api from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data.users));
  }, []);

  const updateRole = (userId, role) => {
    api.put("/admin/user/role", { userId, role })
      .then(res => {
        setUsers(prev => prev.map(u => (u._id === userId ? res.data.user : u)));
      })
      .catch(console.error);
  };

  return (
    <div className="overflow-auto bg-white rounded shadow p-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td>{u.name}</td>
              <td className="text-sm text-gray-600">{u.email}</td>
              <td>{u.role}</td>
              <td className="space-x-2">
                <button onClick={() => updateRole(u._id, "viewer")} className="text-sm text-gray-700">Viewer</button>
                <button onClick={() => updateRole(u._id, "collaborator")} className="text-sm text-blue-600">Collaborator</button>
                <button onClick={() => updateRole(u._id, "admin")} className="text-sm text-red-600">Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
