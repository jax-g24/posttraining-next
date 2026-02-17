"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export function Nav() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const links = [
    { href: "/syllabus", label: "Syllabus" },
    { href: "/calendar", label: "Calendar" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <Link href="/" className="nav-logo">Post Training</Link>
        {!isHomepage && (
          <a href="https://course.posttraining.ai" className="nav-course-badge">Course</a>
        )}
      </div>
      <button
        className={`nav-toggle ${menuOpen ? "active" : ""}`}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span className="hamburger"></span>
      </button>
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
