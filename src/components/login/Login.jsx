import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../navbar/Navbar";
import Authenticate from "../../assets/images/sign-in-or-sign-up-animation-ANLtTakGP7.png";
import GoogleIcon from "../../assets/images/Rectangle.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="mt-36 lg:mx-52 mx-20 flex lg:gap-10 items-center justify-center">
      <div className="left flex max-md:hidden flex-col items-center justify-center">
        <Logo />
        <img src={Authenticate} alt="" />
      </div>
      <div className="right">
        <div className="head flex flex-col justify-center gap-10">
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-14">
          <Input
            type="email"
            label="Email"
            width="lg:w-[550px]"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            label="Password"
            width="lg:w-[550px]"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button className="lg:px-[240px] px-28 lg:py-4 py-3 rounded-[8px] font-bold bg-dark-blue hover:bg-[#000074] text-white text-2xl">
            Login
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
          <button className="lg:px-[100px] px-4 lg:py-2 rounded-[8px] font-bold border border-black text-[#575757] flex items-center justify-center">
            <img src={GoogleIcon} alt="" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export function Input({
  htmlFor,
  type,
  placeholder,
  value,
  label,
  onChange,
  width,
}) {
  return (
    <div className="relative lg:mb-6 mb-3">
      <label htmlFor={htmlFor} className="absolute top-1 left-5 bg-white p-2">
        {label}
      </label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-black/50 ${width} w-[293px] h-14 rounded-lg px-4 focus:outline-dark-blue focus:outline focus:border-dark-blue`}
      />
    </div>
  );
}

export default Login;
