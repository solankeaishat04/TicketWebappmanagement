/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { mockAuthAPI } from "../../services/useMockAuth";
import Logo from "../../components/Logo";
import Footer from "../../components/layout/Footer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inlineError, setInlineError] = useState<{ email?: string; password?: string }>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError({});
    setToast(null);

    const errors: any = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length) {
      setInlineError(errors);
      return;
    }

    try {
      const res = await mockAuthAPI.login(email, password);
      localStorage.setItem("ticketapp_session", res.token);
      localStorage.setItem("user", JSON.stringify({ ...res.user, firstName: res.user.name?.split(" ")[0] }));
      setToast({ message: "User Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setToast({ message: err.message || "Invalid email or password", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] items-center justify-center mx-auto bg-gray-50 p-4 relative">
      {toast && (
        <div
          className={`fixed top-5 right-5 px-14 py-5 rounded shadow text-white font-medium text-1xl ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-fadeIn`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 mx-auto rounded-xl shadow-md relative">
        
        <button
          onClick={() => navigate("/")}
          className="absolute top-12 right-4 text-green-500 hover:text-green-300 text-xl font-bold"
        >
          ✕
        </button>

        <Logo />
        <h2 className="text-1xl font-bold text-left mb-6 mt-5 text-green-600">Welcome Back</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            />
            {inlineError.email && <p className="text-red-500 text-sm">{inlineError.email}</p>}
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {inlineError.password && <p className="text-red-500 text-sm">{inlineError.password}</p>}
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600">
            Sign up
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
