import logo from "../../assets/images/logo.png";
import downArrow from "../../assets/images/down-arrow.png";
import sideArrow from "../../assets/images/side-arrow.png";
import close from "../../assets/images/Close search bar button.png";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";

function Navbar() {
  const { navigate, cart, searchTerm, setSearchTerm } = useAppContext();
  const [isOpen, setIsOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);
  const navbar = useRef(0);
  const searchbar = useRef(0);
  const toggleMenu = () => {
    if (isOpen) {
      navbar.current.classList.add("left-0");
      navbar.current.classList.remove("-left-full");
      document.body.style.overflow = "hidden";
    } else {
      navbar.current.classList.remove("left-0");
      navbar.current.classList.add("-left-full");
      document.body.style.overflow = "auto";
    }
    setIsOpen(!isOpen);
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
    <div className="flex item-center justify-between lg:justify-center gap-x-[140px] w-full py-4 lg:py-5 px-5 lg:px-36 text-xl fixed top-0 bg-white z-50 shadow-md">
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
      <div
        id="mobile-navbar"
        className="lg:hidden absolute top-24 -left-full bg-white w-full px-8 h-screen transition-all duration-200"
        ref={navbar}
      >
        <ul>
          <li
            className="hover:text-dark-blue hover:underline my-3"
            onClick={toggleMenu}
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="group my-4">
            <div className="flex gap-2 items-center">
              <span>Clothing</span>
              <img
                src={downArrow}
                alt="down-arrow"
                className="w-[10px] h-[9px]"
              />
            </div>
            <ul className="hidden group-hover:block mx-4">
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
            </ul>
          </li>
          <li
            className="hover:text-dark-blue hover:underline my-4"
            onClick={toggleMenu}
          >
            <NavLink to="/shoes">Shoes</NavLink>
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
        </ul>
      </div>
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
            <NavLink to="/shoes">Shoes</NavLink>
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <g clipPath="url(#clip0_259_2307)">
            <path
              d="M21 24.0005H19V18.9575C18.9992 18.1735 18.6874 17.4218 18.133 16.8675C17.5787 16.3131 16.827 16.0013 16.043 16.0005H7.957C7.173 16.0013 6.42134 16.3131 5.86696 16.8675C5.31259 17.4218 5.00079 18.1735 5 18.9575V24.0005H3V18.9575C3.00159 17.6433 3.52435 16.3834 4.45363 15.4541C5.3829 14.5248 6.64281 14.0021 7.957 14.0005H16.043C17.3572 14.0021 18.6171 14.5248 19.5464 15.4541C20.4756 16.3834 20.9984 17.6433 21 18.9575V24.0005Z"
              fill="black"
            />
            <path
              d="M12 11.9999C10.8133 11.9999 9.65328 11.648 8.66658 10.9887C7.67989 10.3294 6.91085 9.39234 6.45673 8.29598C6.0026 7.19963 5.88378 5.99323 6.11529 4.82934C6.3468 3.66545 6.91825 2.59635 7.75736 1.75724C8.59648 0.918125 9.66558 0.34668 10.8295 0.115169C11.9933 -0.116342 13.1997 0.00247765 14.2961 0.456603C15.3925 0.910729 16.3295 1.67976 16.9888 2.66646C17.6481 3.65315 18 4.81319 18 5.99988C17.9984 7.59069 17.3658 9.11589 16.2409 10.2408C15.116 11.3656 13.5908 11.9983 12 11.9999ZM12 1.99988C11.2089 1.99988 10.4355 2.23448 9.77772 2.674C9.11993 3.11353 8.60724 3.73824 8.30448 4.46915C8.00173 5.20005 7.92252 6.00432 8.07686 6.78024C8.2312 7.55617 8.61217 8.2689 9.17158 8.82831C9.73099 9.38772 10.4437 9.76868 11.2196 9.92302C11.9956 10.0774 12.7998 9.99815 13.5307 9.6954C14.2616 9.39265 14.8864 8.87996 15.3259 8.22216C15.7654 7.56436 16 6.79101 16 5.99988C16 4.93901 15.5786 3.9216 14.8284 3.17145C14.0783 2.42131 13.0609 1.99988 12 1.99988Z"
              fill="black"
              className="group-hover:fill-dark-blue"
            />
          </g>
          <defs>
            <clipPath id="clip0_259_2307">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
          className="cart-value w-5 h-5 absolute top-4 -right-2 bg-[#ff0000] rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <span className="text-center text-white font-bold text-[13px]">
            {cart.length}
          </span>
        </div>
      </div>
    </div>
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
