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

  const isCourse = ["/syllabus", "/calendar", "/projects", "/about"].includes(pathname);

  const courseLinks = [
    { href: "/syllabus", label: "Syllabus" },
    { href: "/calendar", label: "Calendar" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav className={`top-nav ${isCourse ? "top-nav-dark" : ""}`}>
        <Link href="/" className="nav-logo">Post Training</Link>
        <Link href="/syllabus" className="nav-course">Course</Link>
      </nav>
      {isCourse && (
        <nav className="course-nav">
          {courseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`course-nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
