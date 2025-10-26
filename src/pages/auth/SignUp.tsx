/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { mockAuthAPI } from "../../services/useMockAuth";
import Logo from "../../components/Logo";
import Footer from "../../components/layout/Footer";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [inlineError, setInlineError] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError({});
    setToast(null);

    const errors: any = {};
    if (!fullName) errors.fullName = "Full name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirm) errors.confirm = "Passwords do not match";
    if (Object.keys(errors).length) {
      setInlineError(errors);
      return;
    }

    try {
      await mockAuthAPI.signup(email, password, fullName);
      setToast("Account created successfully! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setToast(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px]  items-center justify-center bg-gray-50 p-4 relative">
      {toast && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}

      <div className="w-full max-w-md bg-white mx-auto p-8 rounded-xl shadow-md relative">
    
        <button
          onClick={() => navigate("/")}
          className="absolute top-12 right-4 text-green-500 hover:text-green-400 text-xl font-bold"
        >
          ✕
        </button>

        <Logo />
        <h2 className="text-1xl font-normal text-left mb-6 mt-5 text-green-600">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            />
            {inlineError.fullName && <p className="text-red-500 text-sm">{inlineError.fullName}</p>}
          </div>

          <div>
            <label>Email</label>
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
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {inlineError.password && <p className="text-red-500 text-sm">{inlineError.password}</p>}
          </div>

          <div>
            <label>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {inlineError.confirm && <p className="text-red-500 text-sm">{inlineError.confirm}</p>}
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
