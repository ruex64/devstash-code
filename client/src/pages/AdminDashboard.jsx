import { useSelector } from "react-redux";
import AdminProfileEditor from "./AdminProfileEditor";
import UserManagement from "./UserManagement";
import ComponentManagement from "./ComponentManagement";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Admin profile management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <AdminProfileEditor user={user} />
      </section>

      {/* User role management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <UserManagement />
      </section>

      {/* Component management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Component Management</h2>
        <ComponentManagement />
      </section>
    </div>
  );
};

export default AdminDashboard;
