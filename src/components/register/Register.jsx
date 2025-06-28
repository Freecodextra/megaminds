import { useState, useContext } from "react"
import { useAppContext } from "../../contexts/AppContext"
import { Input } from "../login/Login"
import { NavLink } from "react-router-dom"
import { Logo } from "../navbar/Navbar"
import Authenticate from "../../assets/images/sign-in-or-sign-up-animation-ANLtTakGP7.png"
import GoogleIcon from "../../assets/images/Rectangle.png"
import { register } from "../../api/auth"
import { mapUser } from "../../utils/mapUser"
import toast from "react-hot-toast"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../../api/auth"; // add this import
import { motion } from "framer-motion";
import LoadingSpinner from "../common/LoadingSpinner";

function Register() {
    const { setUser, navigate } = useAppContext();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false);
    async function handleRegister() {
        setLoading(true)
        setError("")
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }
        try {
            const res = await register({
                firstName,
                lastName,
                email,
                password,
            })
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            setUser(mapUser(res.data.user));
            navigate("/");
            toast.success("Registration successful!");
        } catch (err) {
            setError(
                err.response?.data?.email?.[0] ||
                err.response?.data?.password?.[0] ||
                err?.message ||
                "Registration failed"
            )
            console.log(err);
            
        }
        setLoading(false)
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
                username: decoded.email,
                password: decoded.sub,
            };
            try {
                const res = await register(userData);
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                setUser(mapUser(res.data.user));
                navigate("/");
                toast.success("Registration successful!");
            } catch (err) {
                // If user already exists, try to login
                if (
                    err.response?.data?.email?.[0]?.includes("already exists") ||
                    err.response?.data?.username?.[0]?.includes("already exists") ||
                    err.response?.status === 400
                ) {
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
                    } catch (loginErr) {
                        setError("Google login failed.");
                    }
                } else {
                    setError("Google registration failed.");
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
        <h1 className="text-4xl font-bold">Create Account</h1>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center mt-14 w-full lg:w-[550px]">
          <div className="flex lg:gap-5 flex-col lg:flex-row w-full">
            <Input type="text" label="First Name" width="lg:w-[265px] w-full" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            <Input type="text" label="Last Name" width="lg:w-[265px] w-full" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </div>
          <Input type="email" label="Email" width="lg:w-[550px] w-full" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input type="password" label="Password" width="lg:w-[550px] w-full" onChange={(event) => setPassword(event.target.value)} value={password} />
          <button
            className="btn-primary lg:w-[550px] w-full mt-4"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Create Account"}
          </button>
          <p className="lg:w-[550px] w-full mt-4 text-[#575757]">Already have an account? <NavLink to="/login" className="text-dark-blue font-bold">Login</NavLink></p>
        </div>
        <div className="line flex items-center justify-center relative mt-12">
            <hr className="lg:w-[374px] w-[200px] h-[2px] bg-black/50" />
            <span className="absolute text-[#575757] bg-white font-semibold text-xl lg:px-8 px-4 text-center">or</span>
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
  )
}

export default Register