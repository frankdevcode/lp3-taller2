"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearchClick = () => {
    router.push("/search")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white">C</div>
            <span className="font-bold text-lg hidden sm:inline text-foreground group-hover:text-primary transition-colors">
              CineStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Explorar
            </Link>
            {isAuthenticated && (
              <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mi Perfil
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSearchClick}
              className="p-2 hover:bg-card rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                <div className="hidden sm:block text-sm">
                  <p className="text-muted-foreground">{user?.correo}</p>
                </div>
                <Button variant="ghost" onClick={logout} className="hidden sm:inline-flex text-sm">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/login">Inicia Sesión</Link>
                </Button>
                <Button asChild className="hidden sm:inline-flex">
                  <Link href="/register">Regístrate</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-card rounded-lg">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-3">
            <Link href="/" className="block text-sm py-2 hover:text-primary">
              Inicio
            </Link>
            <Link href="/search" className="block text-sm py-2 hover:text-primary">
              Explorar
            </Link>
            {isAuthenticated && (
              <Link href="/profile" className="block text-sm py-2 hover:text-primary">
                Mi Perfil
              </Link>
            )}
            <div className="pt-2 border-t border-border space-y-2">
              {isAuthenticated ? (
                <Button variant="ghost" onClick={logout} className="w-full justify-start">
                  Cerrar Sesión
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/login">Inicia Sesión</Link>
                  </Button>
                  <Button asChild className="w-full justify-start">
                    <Link href="/register">Regístrate</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
