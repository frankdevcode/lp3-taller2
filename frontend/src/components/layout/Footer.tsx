import { Link } from 'react-router-dom'
import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">CineStream</h3>
            <p className="text-sm text-muted-foreground">
              La mejor plataforma para descubrir y disfrutar tus películas favoritas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary transition-colors">
                  Explorar
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-primary transition-colors">
                  Películas
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-primary transition-colors">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} CineStream. Todos los derechos reservados.</p>
          <p>Hecho con pasión por películas</p>
        </div>
      </div>
    </footer>
  )
}
