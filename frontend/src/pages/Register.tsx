import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, fetchCurrentUser } from "../api/auth";
import type { RegisterPayload } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      const profile = await fetchCurrentUser();
      login({ token: data.token, role: profile.role, name: profile.name });
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: RegisterPayload) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)/,
                  message: "Must contain letters and numbers"
                }
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm text-center">Registration failed. Try again.</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;