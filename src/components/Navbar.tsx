"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORY_LABELS } from "@/lib/categories";

const categories = Object.entries(CATEGORY_LABELS);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="font-bold text-xl text-navy-900 text-gray-900">
              TheClaw<span className="text-amber-500">Tips</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/blog"
              className="text-gray-600 hover:text-amber-500 font-medium transition-colors"
            >
              Blog
            </Link>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="text-gray-600 hover:text-amber-500 font-medium transition-colors flex items-center gap-1"
              >
                Categories
                <svg
                  className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {categories.map(([slug, label]) => (
                    <Link
                      key={slug}
                      href={`/categories/${slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-gray-600 hover:text-amber-500 font-medium transition-colors"
            >
              About
            </Link>

            <a
              href="https://substack.com/@theopenclawinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Newsletter
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:text-amber-500 font-medium"
            >
              Blog
            </Link>
            <div className="px-2 py-2">
              <div className="text-gray-500 text-sm font-medium mb-2">
                Categories
              </div>
              {categories.map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-gray-700 hover:text-amber-500 pl-3 text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:text-amber-500 font-medium"
            >
              About
            </Link>
            <a
              href="https://substack.com/@theopenclawinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-2 mt-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg text-center"
            >
              Newsletter
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
