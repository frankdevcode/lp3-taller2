export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CineStream</h3>
            <p className="text-sm text-muted-foreground">
              La mejor plataforma para descubrir y disfrutar tus películas favoritas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Explorar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Mi Perfil
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
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
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
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
