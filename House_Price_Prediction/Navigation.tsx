import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  const navLinks = [
    { href: "/predict", label: "Predict Price" },
    { href: "/analytics", label: "Analytics" },
    { href: "/advisor", label: "AI Advisor" },
    { href: "/calculator", label: "Calculator" },
    { href: "/compare", label: "Compare" },
    { href: "/map", label: "Map" },
    { href: "/recommendations", label: "Recommendations" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity">
          <Building2 className="w-6 h-6 text-accent" />
          <span>RealEstateAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="text-sm">
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-accent">
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="sm">Sign In</Button>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
