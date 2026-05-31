import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RegisterPayload } from "../types/auth";
import { registerUser } from "../api/auth";

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterPayload>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterPayload) => {
    try {
      await registerUser(data);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-pink-50 to-sky-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account
        </h2>

        <p className="text-center text-slate-500 mb-8">
          Register to access the RBAC dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

          <select
            {...register("role")}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;