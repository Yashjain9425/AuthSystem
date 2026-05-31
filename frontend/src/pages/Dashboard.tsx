import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  fetchPublicContent,
  fetchUserContent,
  fetchAdminContent,
} from "../api/auth";
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
    enabled: !!user,
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

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Role Banner */}
        <div
          className={`rounded-2xl p-6 shadow-sm border ${
            isAdmin
              ? "bg-rose-100 border-rose-200"
              : "bg-emerald-100 border-emerald-200"
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {user?.name}
          </h2>

          <p className="text-slate-700 text-lg">
            You are logged in as
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                isAdmin
                  ? "bg-rose-200 text-rose-800"
                  : "bg-emerald-200 text-emerald-800"
              }`}
            >
              {user?.role}
            </span>
          </p>
        </div>

        {/* Public Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Public Content
          </h3>

          <p className="text-slate-600 mb-4">
            This section is accessible to everyone, including guests,
            USER accounts, and ADMIN accounts.
          </p>

          {publicQuery.isLoading && <p>Loading...</p>}

          {publicQuery.data && (
            <div className="bg-slate-50 p-4 rounded-lg text-slate-700">
              {publicQuery.data}
            </div>
          )}
        </div>

        {/* User Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-emerald-400">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">
            User Access Area
          </h3>

          <p className="text-slate-600 mb-4">
            This section is available to authenticated users.
            Both USER and ADMIN roles can access this content.
          </p>

          {userQuery.isLoading && <p>Loading...</p>}

          {userQuery.data && (
            <div className="bg-emerald-50 p-4 rounded-lg text-slate-700">
              {userQuery.data}
            </div>
          )}
        </div>

        {/* Admin Content */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-rose-400">
            <h3 className="text-xl font-semibold text-rose-700 mb-3">
              Admin Access Area
            </h3>

            <p className="text-slate-600 mb-4">
              This section is restricted to ADMIN users only.
              It demonstrates role-based authorization using protected API endpoints.
            </p>

            {adminQuery.isLoading && <p>Loading...</p>}

            {adminQuery.data && (
              <div className="bg-rose-50 p-4 rounded-lg text-slate-700">
                {adminQuery.data}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;