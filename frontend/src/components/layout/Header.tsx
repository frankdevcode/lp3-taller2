import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth-context'
import { Menu, X, Search, Play, Home, FilmIcon, Heart, User, LogOut } from 'lucide-react'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearchClick = () => {
    navigate('/search')
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground">
              <Play className="w-5 h-5 fill-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground group-hover:text-primary transition-colors">
              CineStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                to="/home" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Inicio
              </Link>
              <Link 
                to="/search" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                Explorar
              </Link>
              <Link 
                to="/movies" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-colors"
              >
                <FilmIcon className="w-4 h-4" />
                Películas
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </Link>
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {isAuthenticated && (
              <button
                onClick={handleSearchClick}
                className="p-2 hover:bg-card rounded-lg transition-colors"
                title="Buscar películas"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {isAuthenticated ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l border-border">
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Hola</p>
                    <p className="font-semibold text-foreground text-sm truncate max-w-[150px]">
                      {user?.nombre_usuario || user?.correo?.split('@')[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/profile')}
                    className="p-2 hover:bg-card rounded-lg transition-colors"
                    title="Mi perfil"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Public Links */}
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg hover:bg-card transition-colors text-sm font-medium"
                >
                  Inicia Sesión
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
                >
                  Registrarse
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-card rounded-lg"
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-1 animate-slide-in">
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </Link>
                <Link
                  to="/search"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="w-5 h-5" />
                  <span>Explorar</span>
                </Link>
                <Link
                  to="/movies"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FilmIcon className="w-5 h-5" />
                  <span>Películas</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span>Favoritos</span>
                </Link>
                <div className="pt-2 border-t border-border mt-2 space-y-1">
                  <button
                    onClick={() => {
                      navigate('/profile')
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card/50 transition-colors text-left"
                  >
                    <User className="w-5 h-5" />
                    <span>Mi Perfil</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 transition-colors text-destructive text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-lg hover:bg-card/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicia Sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
