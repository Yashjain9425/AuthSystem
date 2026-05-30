import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { fetchPublicContent, fetchUserContent, fetchAdminContent } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const publicQuery = useQuery({
    queryKey: ["public"],
    queryFn: fetchPublicContent,
  });

  const userQuery = useQuery({
    queryKey: ["user-content"],
    queryFn: fetchUserContent,
    enabled: user?.role === "USER" || user?.role === "ADMIN",
  });

  const adminQuery = useQuery({
    queryKey: ["admin-content"],
    queryFn: fetchAdminContent,
    enabled: user?.role === "ADMIN",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">RBAC Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, <strong>{user?.name}</strong>
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
              user?.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}>{user?.role}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">

        {/* Public Content Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">🌐 Public Content</h2>
          {publicQuery.isLoading && <p className="text-gray-400">Loading...</p>}
          {publicQuery.data && <p className="text-gray-600">{publicQuery.data}</p>}
        </div>

        {/* User Content Card */}
        {(user?.role === "USER" || user?.role === "ADMIN") && (
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold mb-2 text-green-700">👤 User Content</h2>
            {userQuery.isLoading && <p className="text-gray-400">Loading...</p>}
            {userQuery.data && <p className="text-gray-600">{userQuery.data}</p>}
            {userQuery.isError && <p className="text-red-500">Access denied.</p>}
          </div>
        )}

        {/* Admin Content Card */}
        {user?.role === "ADMIN" && (
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold mb-2 text-red-700">🔐 Admin Content</h2>
            {adminQuery.isLoading && <p className="text-gray-400">Loading...</p>}
            {adminQuery.data && <p className="text-gray-600">{adminQuery.data}</p>}
            {adminQuery.isError && <p className="text-red-500">Access denied.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;