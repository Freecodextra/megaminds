import logo from "../../assets/images/logo.png";
import downArrow from "../../assets/images/down-arrow.png";
import sideArrow from "../../assets/images/side-arrow.png";
import close from "../../assets/images/Close search bar button.png";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { FiLogOut, FiLogIn } from "react-icons/fi"; // Logout icon
import ProfileIcon from "../ProfileIcon"; // Import the new ProfileIcon component
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { navigate, cart, searchTerm, setSearchTerm, user, logout } =
    useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [clothingDropdownOpen, setClothingDropdownOpen] = useState(false); // <-- add this
  const [searchOpen, setSearchOpen] = useState(true);
  const navbar = useRef(0);
  const searchbar = useRef(0);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
    setClothingDropdownOpen(false); // close dropdown when menu closes
  };

  const openSearch = () => {
    setSearchOpen((search) => !search);
    searchOpen
      ? searchbar.current.classList.remove("hidden")
      : searchbar.current.classList.add("hidden");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      setSearchOpen(false);
      searchbar.current.classList.add("hidden");
      navigate(`/all-products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <motion.div
      className="flex item-center justify-between lg:justify-center gap-x-[140px] w-full py-4 lg:py-5 px-5 lg:px-36 text-xl fixed top-0 bg-white z-50 shadow-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Logo />
      <div
        className="hamburger lg:hidden flex items-center justify-end pointer"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="22"
          viewBox="0 0 30 22"
          fill="none"
        >
          <path d="M0 2H30" stroke="black" strokeWidth="3" />
          <path d="M0 11H30" stroke="black" strokeWidth="3" />
          <path d="M0 20H30" stroke="black" strokeWidth="3" />
        </svg>
      </div>
      {/* Mobile NavBar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navbar"
            className="lg:hidden absolute top-24 left-0 bg-white w-full px-8 h-screen transition-all duration-200"
            ref={navbar}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
          >
            <ul>
              <li
                className="hover:text-dark-blue hover:underline my-3"
                onClick={toggleMenu}
              >
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="my-4">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setClothingDropdownOpen((open) => !open)}
                >
                  <span>Clothing</span>
                  <img
                    src={downArrow}
                    alt="down-arrow"
                    className={`w-[10px] h-[9px] transition-transform duration-200 ${clothingDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {clothingDropdownOpen && (
                  <ul className="mx-4">
                    <li
                      className="hover:text-dark-blue hover:underline my-4"
                      onClick={toggleMenu}
                    >
                      <NavLink to="/men">Men</NavLink>
                    </li>
                    <li
                      className="hover:text-dark-blue hover:underline my-4"
                      onClick={toggleMenu}
                    >
                      <NavLink to="/women">Women</NavLink>
                    </li>
                    <li
                      className="hover:text-dark-blue hover:underline my-4"
                      onClick={toggleMenu}
                    >
                      <NavLink to="/shoes">Shoes</NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className="hover:text-dark-blue hover:underline my-4"
                onClick={toggleMenu}
              >
                <NavLink to="/accessories">Accessories</NavLink>
              </li>
              <li
                className="hover:text-dark-blue hover:underline my-4"
                onClick={toggleMenu}
              >
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li
                className="hover:text-dark-blue hover:underline my-4"
                onClick={toggleMenu}
              >
                <NavLink to="/cart">My Cart</NavLink>
              </li>
              <li
                className="hover:text-dark-blue hover:underline my-4"
                onClick={toggleMenu}
              >
                <NavLink to="/profile">My Profile</NavLink>
              </li>
              {user ? (
                <li
                  className="hover:text-dark-blue hover:underline my-4"
                  onClick={() => { logout(); toggleMenu() }}
                >
                  Logout
                </li>
              ) : (
                <li
                  className="hover:text-dark-blue hover:underline my-4"
                  onClick={() => { navigate("/login"); toggleMenu() }}
                >
                  Login
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="links lg:flex items-center hidden">
        <ul className="flex list-none space-x-10 text-xl items-center">
          <li className="hover:text-dark-blue hover:underline">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="drop-down flex gap-2 items-center relative group">
            <span>Clothing</span>
            <img
              src={downArrow}
              alt="down-arrow"
              className="w-[10px] h-[9px]"
            />
            {/* drop Down */}
            <div className="absolute bg-white w-60 h-36 -bottom-36 flex flex-col justify-center px-4 gap-3 rounded-b-xl rounded-tr-xl shadow invisible group-hover:visible">
              <div
                className="list group flex justify-between items-center p-3 rounded-xl hover:text-dark-blue hover:bg-black hover:bg-opacity-20 cursor-pointer"
                onClick={() => navigate("/men")}
              >
                <span>Men</span>
                <img
                  src={sideArrow}
                  alt="down-arrow"
                  className="w-[8px] h-[11px]"
                />
              </div>
              <div
                className="list group flex justify-between items-center p-3 rounded-xl hover:text-dark-blue hover:bg-black hover:bg-opacity-20 cursor-pointer"
                onClick={() => navigate("/women")}
              >
                <span>Women</span>
                <img
                  src={sideArrow}
                  alt="down-arrow"
                  className="w-[8px] h-[11px]"
                />
              </div>
            </div>
          </li>
          <li className="hover:text-dark-blue hover:underline">
            <NavLink to="/accessories">Accessories</NavLink>
          </li>
          <li className="hover:text-dark-blue hover:underline">
            <NavLink to="/about">About Us</NavLink>
          </li>
          {/* <li>
            <OrderNow />
          </li> */}
        </ul>
      </div>
      <div className="icons lg:flex space-x-5 items-center relative hidden">
        <div className="search absolute right-36 top-24 hidden" ref={searchbar}>
          <input
            type="search"
            name=""
            id=""
            value={searchTerm}
            style={{
              boxShadow: "0px 26px 100px 0px #fffff",
            }}
            className="w-[777px] bg-gray-100 p-7 rounded-[20px] focus:outline-0"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            src={close}
            alt=""
            className="absolute right-5 top-7 z-10 cursor-pointer"
            onClick={openSearch}
          />
        </div>
        {/* search */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group cursor-pointer"
          onClick={openSearch}
        >
          <g clipPath="url(#clip0_259_2271)">
            <path
              d="M21.7312 20.4359L16.2596 14.9643C17.7507 13.1407 18.4838 10.8137 18.3073 8.46475C18.1308 6.11577 17.0582 3.92447 15.3114 2.34413C13.5646 0.763789 11.2772 -0.0846942 8.92231 -0.025815C6.56743 0.0330642 4.32528 0.994801 2.65961 2.66047C0.993947 4.32613 0.0322097 6.56829 -0.0266695 8.92316C-0.0855486 11.278 0.762935 13.5655 2.34328 15.3123C3.92362 17.0591 6.11491 18.1317 8.4639 18.3082C10.8129 18.4847 13.1398 17.7516 14.9635 16.2605L20.4351 21.7321C20.6079 21.8991 20.8395 21.9914 21.0798 21.9894C21.3202 21.9873 21.5501 21.8909 21.7201 21.7209C21.89 21.551 21.9864 21.321 21.9885 21.0807C21.9906 20.8403 21.8982 20.6088 21.7312 20.4359ZM9.16647 16.5007C7.71607 16.5007 6.29825 16.0706 5.09228 15.2648C3.88632 14.459 2.94639 13.3137 2.39135 11.9737C1.83631 10.6337 1.69108 9.15919 1.97404 7.73666C2.257 6.31413 2.95543 5.00746 3.98102 3.98187C5.0066 2.95629 6.31328 2.25785 7.7358 1.9749C9.15833 1.69194 10.6328 1.83716 11.9728 2.3922C13.3128 2.94725 14.4581 3.88718 15.2639 5.09314C16.0697 6.2991 16.4998 7.71693 16.4998 9.16732C16.4976 11.1116 15.7243 12.9756 14.3495 14.3504C12.9747 15.7252 11.1107 16.4985 9.16647 16.5007Z"
              fill="black"
              className="group-hover:fill-dark-blue"
            />
          </g>
          <defs>
            <clipPath id="clip0_259_2271">
              <rect width="22" height="22" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {/* Profile */}
        <ProfileIcon />
        {/* Cart */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <g clipPath="url(#clip0_259_2273)">
            <path
              d="M24 3.375H4.242L4.2 3.03863C4.11405 2.33944 3.76338 1.69479 3.21449 1.22687C2.6656 0.758964 1.95663 0.500328 1.222 0.5L0 0.5V2.41667H1.222C1.46693 2.4167 1.70334 2.50287 1.88637 2.65885C2.06941 2.81483 2.18634 3.02976 2.215 3.26288L3.8 16.1697C3.88595 16.8689 4.23662 17.5135 4.78551 17.9815C5.3344 18.4494 6.04337 18.708 6.778 18.7083H20V16.7917H6.778C6.53291 16.7916 6.29638 16.7053 6.11333 16.5491C5.93027 16.393 5.81343 16.1778 5.785 15.9445L5.654 14.875H21.836L24 3.375ZM20.164 12.9583H5.419L4.478 5.29167H21.607L20.164 12.9583Z"
              fill="black"
              className="group-hover:fill-dark-blue"
            />
            <path
              d="M7.00012 23.5006C8.10469 23.5006 9.00011 22.6424 9.00011 21.5839C9.00011 20.5254 8.10469 19.6672 7.00012 19.6672C5.89555 19.6672 5.00012 20.5254 5.00012 21.5839C5.00012 22.6424 5.89555 23.5006 7.00012 23.5006Z"
              fill="black"
              className="group-hover:fill-dark-blue"
            />
            <path
              d="M17 23.5006C18.1046 23.5006 19 22.6424 19 21.5839C19 20.5254 18.1046 19.6672 17 19.6672C15.8954 19.6672 15 20.5254 15 21.5839C15 22.6424 15.8954 23.5006 17 23.5006Z"
              fill="black"
              className="group-hover:fill-dark-blue"
            />
          </g>
          <defs>
            <clipPath id="clip0_259_2273">
              <rect
                width="24"
                height="23"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <div
          className="cart-value w-5 h-5 absolute top-4 right-12 bg-[#ff0000] rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <span className="text-center text-white font-bold text-[13px]">
            {cart.length}
          </span>
        </div>
        {user ? (
          <button
            onClick={logout}
            title="Logout"
            className="ml-4 p-2 rounded hover:bg-gray-200 transition lg:block hidden"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FiLogOut size={22} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            title="Login"
            className="ml-4 p-2 rounded hover:bg-gray-200 transition lg:block hidden"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FiLogIn size={22} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function OrderNow() {
  const { navigate } = useAppContext();
  return (
    <button
      className="px-5 py-3 border-2 border-dark-blue/50 rounded-md bg-white text-dark-blue font-bold hover:bg-dark-blue hover:text-white"
      onClick={() => navigate("/all-products")}
    >
      Order Now
    </button>
  );
}

export function Logo() {
  return (
    <div className="logo object-center">
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Navbar;
