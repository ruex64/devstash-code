import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="text-gray-600">This is your dashboard. You can add or edit your components here.</p>
    </div>
  );
};

export default UserDashboard;
