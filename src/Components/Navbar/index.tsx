import React, { FC, useState, useEffect, useRef } from "react";
import styles from "../common.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [activeLink, setActiveLink] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown("");
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateTo = (path: string) => {
    setActiveLink(path);
    navigate(path);
    setMenuOpen(false);
    setActiveDropdown("");
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown("");
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleScroll = () => {
      const header = dropdownRef.current;
      if (header) {
        if (window.scrollY > window.innerHeight * 0.01) {
          header.classList.add(styles.scrolled);
        } else {
          header.classList.remove(styles.scrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={styles.header} ref={dropdownRef}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} />

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <a
                className={`${styles.navLink} ${
                  activeLink === "/" ? styles.active : ""
                }`}
                onClick={() => navigateTo("/")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={`${styles.navLink} ${
                  activeLink === "/findTherapist" ? styles.active : ""
                }`}
                onClick={() => navigateTo("/findTherapist")}
              >
                Find a Therapist
              </a>
            </li>
            <li>
              <a
                className={`${styles.navLink} ${
                  activeLink === "/findCoach" ? styles.active : ""
                }`}
                onClick={() => navigateTo("/findCoach")}
              >
                Find a Coach
              </a>
            </li>

            <li className={styles.dropdown}>
              <span
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => toggleDropdown("about")}
                className={`${styles.navLink} ${
                  activeDropdown === "about" ? styles.active : ""
                }`}
              >
                <p>About</p> <FaAngleDown style={{ marginTop: "2px" }} />
              </span>
              <AnimatePresence>
                {activeDropdown === "about" && (
                  <motion.ul
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <a onClick={() => navigateTo("/joinAsATherapist")}>
                        Join As A Therapist
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/joinAsACoach")}>
                        Join As A Coach
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/ourTeam")}>
                        Meet Our Team
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/boardMembers")}>
                        Board Members
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/termsOfUse")}>
                        Terms of Use
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/privacyPolicy")}>
                        Privacy Policy
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className={styles.dropdown}>
              <span
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => toggleDropdown("resources")}
                className={`${styles.navLink} ${
                  activeDropdown === "resources" ? styles.active : ""
                }`}
              >
                <p> Resources</p> <FaAngleDown style={{ marginTop: "2px" }} />
              </span>
              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <motion.ul
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <a onClick={() => navigateTo("/findTherapist")}>
                        Find a Therapist
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/findCoach")}>
                        Find a Coach
                      </a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/blog")}>Blog</a>
                    </li>
                    <li>
                      <a onClick={() => navigateTo("/contactUs")}>Contact Us</a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <a
                className={`${styles.navLink} ${
                  activeLink === "/store" ? styles.active : ""
                }`}
                onClick={() => navigateTo("/store")}
              >
                Store
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.donate} onClick={() => navigateTo("/donate")}>
          <p>❤️ Donate</p>
        </div>

        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
