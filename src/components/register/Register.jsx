import { useState } from "react"
import { Input } from "../login/Login"
import { NavLink } from "react-router-dom"
import { Logo } from "../navbar/Navbar"
import Authenticate from "../../assets/images/sign-in-or-sign-up-animation-ANLtTakGP7.png"
import GoogleIcon from "../../assets/images/Rectangle.png"

function Register() {
    const [firtName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    function handleRegister() {
        setLoading(true)
        setError("")
        if (!firtName || !lastName || !email || !password) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }
        // Add registration logic here
    }
  return (
    <div className="mt-36 lg:mx-52 mx-20 flex lg:gap-10 items-center justify-center">
      <div className="left flex max-md:hidden flex-col items-center justify-center">
                  <Logo />
                  <img src={Authenticate} alt="" />
              </div>
              <div className="right">
        <div className="head flex flex-col justify-center gap-10">
        <h1 className="text-4xl font-bold">Create Account</h1>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center mt-14">
            <div className="flex lg:gap-5 flex-col lg:flex-row">
            <Input type="text" label="First Name" width="lg:w-[265px]" value={firtName} onChange={(event) => setFirstName(event.target.value)} />
            <Input type="text" label="Last Name" width="lg:w-[265px]" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            </div>
            <Input type="email" label="Email" width="lg:w-[550px]" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input type="password" label="Password" width="lg:w-[550px]" onChange={(event) => setPassword(event.target.value)} value={password} />
            <button className="lg:px-[100px] lg:w-[550px] px-14 max-md:w-72 lg:py-4 py-3 rounded-[8px] font-bold bg-dark-blue hover:bg-[#000074] text-white lg:text-2xl text-xl" onClick={handleRegister} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
            <p className="lg:w-[550px] w-[293px] mt-4 text-[#575757]">Already have an account? <NavLink to="/login" className="text-dark-blue font-bold">Login</NavLink></p>
        </div>
        <div className="line flex items-center justify-center relative mt-12">
            <hr className="lg:w-[374px] w-[200px] h-[2px] bg-black/50" />
            <span className="absolute text-[#575757] bg-white font-semibold text-xl lg:px-8 px-4 text-center">or</span>
        </div>
        <div className="flex items-center justify-center mt-6 w-full">
        <button className="lg:px-[162px] px-8 lg:py-2 rounded-[8px] font-bold border border-black text-[#575757] flex items-center justify-center"><img src={GoogleIcon} alt="" />Sign In with Google</button>
        </div>
        </div>
    </div>
  )
}

export default Register