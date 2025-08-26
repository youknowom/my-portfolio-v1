import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"; // social icons

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const XIcon = ({ size = 22, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 1200 1227"
    className={className}
    fill="currentColor"
  >
    <path d="M714.163 519.284L1160.89 0H1057.9L668.33 450.887L356.364 0H0L468.043 681.821L0 1226.37H103.004L511.163 749.679L843.636 1226.37H1200L714.137 519.284H714.163ZM561.48 686.351L516.648 621.981L140.011 79.6946H305.24L606.756 511.545L651.588 575.915L1057.95 1150.3H892.725L561.48 686.351Z" />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Omkar &nbsp;
            <span className="sm:block hidden"> | youknowom</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}

          {/* Social Icons */}
          <li>
            <a
              href="https://www.linkedin.com/in/omkar-bagul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-[22px]"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/youknowom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-[22px]"
            >
              <FaGithub />
            </a>
          </li>
          {/* X (Twitter) */}
          <li>
            <a
              href="https://x.com/omkaar_jsx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-[22px]"
            >
              <XIcon />
            </a>
          </li>

          {/* Resume Button */}
          <li>
            <motion.a
              href="/resume.pdf" // <-- place your resume file in public folder
              download
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-primary font-semibold rounded-xl shadow-md hover:bg-gray-200 transition-all"
            >
              Download Resume
            </motion.a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile Dropdown */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              {/* Mobile Socials */}
              <li className="flex gap-3 text-[20px]">
                <a
                  href="https://www.linkedin.com/in/omkar-bagul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-white"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/youknowom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-white"
                >
                  <FaGithub />
                </a>
              </li>

              {/* Mobile Resume */}
              <li>
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white text-primary font-semibold rounded-xl shadow-md hover:bg-gray-200 transition-all"
                >
                  Download Resume
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
