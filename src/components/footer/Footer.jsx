import { Logo } from "../navbar/Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 gap-4">
        {/* Left: Logo */}
        <div className="flex-1 flex flex-col items-start -mb-4 lg:mb-0">
          <Logo />
        </div>
        {/* Middle: Copyright + Nav Links (largest column) */}
        <div className="flex-[2] flex flex-col items-start w-full">
          <span className="break-words text-lg lg:text-xl lg:mb-4">
           Copyright &copy; {new Date().getFullYear()} Megeminds. All rights reserved.
          </span>
          {/* Nav links: 3 columns, spaced evenly */}
          <div className="flex flex-col lg:flex-row w-full gap-6 mt-5 justify-between text-gray-700">
            <ul className="flex-1 space-y-7 underline underline-offset-4">
              <li>About Us</li>
              <li>Clothes</li>
              <li>Blogs</li>
              <li>FAQs</li>
            </ul>
            <ul className="flex-1 space-y-7 underline underline-offset-4">
              <li>Home</li>
              <li>Offer</li>
              <li>Men</li>
              <li>Reservation</li>
            </ul>
            <ul className="flex-1 space-y-7 underline underline-offset-4">
              <li>megeminds.ng</li>
              <li>+62 958 248 966</li>
            </ul>
          </div>
          {/* Designer credit */}
          <div className="mt-10 text-base text-gray-600 leading-relaxed">
            Website design by{" "}
            <span className="font-semibold">Creative_Awhy & Codextra</span> -
            08144005426,
            09016242310
          </div>
        </div>
        {/* Right: Socials */}
        <div className="flex-1 flex flex-col items-start lg:items-end">
          <div className="flex gap-4 mt-4 lg:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-dark-blue"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-dark-blue"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-dark-blue"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;