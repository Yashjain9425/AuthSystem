import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../types/auth";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { register, handleSubmit } = useForm<LoginPayload>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await loginUser(data);

      login({
        token: response.token,
        name: response.name,
        role: response.role,
      });

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-slate-500 mb-8">
          Sign in to continue to your dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;