import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../navbar/Navbar";
import Authenticate from "../../assets/images/sign-in-or-sign-up-animation-ANLtTakGP7.png";
import GoogleIcon from "../../assets/images/Rectangle.png";
import { useAppContext } from "../../contexts/AppContext";
import { login, setAuthToken, getUserProfile } from "../../api/auth";
import { mapUser } from "../../utils/mapUser";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import LoadingSpinner from "../common/LoadingSpinner";

function Login() {
  const { setUser, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      const res = await login({ email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setAuthToken(res.data.access);
      // Fetch user profile after login
      const userRes = await getUserProfile();
      setUser(mapUser(userRes.data));
      navigate("/");
      toast.success("Login successful!");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed"
      );
    }
    setLoading(false);
  }

  async function handleGoogleSuccess(credentialResponse) {
    setGoogleLoading(true);
    setError("");
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        firstName: decoded.given_name || "",
        lastName: decoded.family_name || "",
        email: decoded.email,
        username: decoded.email, // Use email as username
        password: decoded.sub,   // Use Google sub as password fallback
      };
      // Try login
      try {
        const { login } = await import("../../api/auth");
        const res = await login({ email: userData.email, password: userData.password });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        // Fetch user profile after login
        const profileRes = await getUserProfile();
        setUser(mapUser(profileRes.data));
        navigate("/");
        toast.success("Login successful!");
      } catch (err) {
        // If login fails, try to register
        try {
          const { register } = await import("../../api/auth");
          const regRes = await register(userData);
          localStorage.setItem("access", regRes.data.access);
          localStorage.setItem("refresh", regRes.data.refresh);
          setUser(mapUser(regRes.data.user));
          navigate("/");
          toast.success("Registration successful!");
        } catch (regErr) {
          setError("Google login failed.");
        }
      }
    } catch (e) {
      setError("Google authentication failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <motion.div
      className="mt-36 lg:mx-52 mx-20 flex lg:gap-10 items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="left flex max-md:hidden flex-col items-center justify-center">
        <Logo />
        <img src={Authenticate} alt="" />
      </div>
      <motion.div
        className="right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="head flex flex-col justify-center gap-10">
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center mt-14 w-full">
          <Input
            type="email"
            label="Email"
            width="lg:w-[550px] w-full"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            label="Password"
            width="lg:w-[550px] w-full"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button
            className="btn-primary lg:w-[550px] w-full mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Login"}
          </button>
          <p className="lg:w-[550px] w-[293px] mt-4 text-[#575757]">
            Dont have an account?{" "}
            <NavLink to="/register" className="text-dark-blue font-bold">
              Create one
            </NavLink>
          </p>
        </div>
        <div className="line flex items-center justify-center relative mt-12">
          <hr className="lg:w-[374px] w-[200px] h-[2px] bg-black/50" />
          <span className="absolute text-[#575757] bg-white font-semibold text-xl lg:px-8 px-4 text-center">
            or
          </span>
        </div>
        <div className="flex items-center justify-center mt-6 w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Sign-In failed")}
            shape="pill"
            text="signup_with" // or "signin_with" for login
            logo_alignment="left"
          />
        </div>
        {googleLoading && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Input({ type, label, width, value, onChange }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={`mb-4 relative ${width}`}>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={isPassword && show ? "text" : type}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      />
      {isPassword && (
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShow((prev) => !prev)}
          tabIndex={0}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
}

export default Login;
