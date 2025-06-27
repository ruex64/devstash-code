import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600">Hello {user?.name}, you have full control here.</p>
      {/* Later: User list, component list, promote user, etc. */}
    </div>
  );
};

export default AdminDashboard;
