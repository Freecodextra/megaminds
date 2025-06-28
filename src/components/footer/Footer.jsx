import { Logo } from "../navbar/Navbar";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="w-full bg-gray-100 py-10 mt-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 gap-4">
        {/* Left: Logo */}
        <motion.div
          className="flex-1 flex flex-col items-start -mb-4 lg:mb-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Logo />
        </motion.div>
        {/* Middle: Copyright + Nav Links */}
        <motion.div
          className="flex-[2] flex flex-col items-start w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="break-words text-lg lg:text-xl lg:mb-4">
            Copyright &copy; {new Date().getFullYear()} Megeminds. All rights
            reserved.
          </span>
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
          <div className="mt-10 text-base text-gray-600 leading-relaxed">
            Website design by{" "}
            <span className="font-semibold">Creative_Awhy & Codextra</span> -
            08144005426,
            09016242310
          </div>
        </motion.div>
        {/* Right: Socials */}
        <motion.div
          className="flex-1 flex flex-col items-start lg:items-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;