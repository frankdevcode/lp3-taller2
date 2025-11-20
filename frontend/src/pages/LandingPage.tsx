import { Play, Search, Heart, Zap, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-8 h-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-foreground">CineStream</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 text-foreground hover:text-primary transition-colors font-semibold"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 overflow-hidden flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Descubre tu próxima <span className="text-gradient">película favorita</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Explora miles de películas, crea tu propia biblioteca, y comparte recomendaciones con otros amantes del cine. Todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-glow text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Comenzar Ahora
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all text-lg"
              >
                Tengo Cuenta
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                <p className="text-sm text-muted-foreground">Películas Disponibles</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">50K+</div>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">4.8⭐</div>
                <p className="text-sm text-muted-foreground">Calificación Media</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-card border-2 border-primary/30 shadow-2xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              
              {/* Movie Grid Visual */}
              <div className="absolute inset-4 grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg border border-primary/20 hover:border-primary/60 transition-all hover:scale-105 flex items-center justify-center"
                  >
                    <Film className="w-8 h-8 text-primary/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Por qué elegir <span className="text-gradient">CineStream</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma diseñada para los verdaderos amantes del cine
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-glow group">
            <Search className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Búsqueda Avanzada</h3>
            <p className="text-muted-foreground">
              Encuentra películas por título, director, género y más con nuestro potente sistema de búsqueda.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all hover:shadow-glow group">
            <Heart className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Guarda Favoritos</h3>
            <p className="text-muted-foreground">
              Crea tu propia biblioteca de películas favoritas y accede a ellas en cualquier momento.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-glow group">
            <Star className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Califica Películas</h3>
            <p className="text-muted-foreground">
              Comparte tu opinión y ayuda a otros a encontrar las mejores películas con tus calificaciones.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all hover:shadow-glow group">
            <Zap className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Recomendaciones</h3>
            <p className="text-muted-foreground">
              Recibe sugerencias personalizadas basadas en tus películas favoritas y calificaciones.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-glow group">
            <Users className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Comunidad</h3>
            <p className="text-muted-foreground">
              Conecta con otros cinéfilos y descubre nuevas películas a través de las recomendaciones de la comunidad.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all hover:shadow-glow group">
            <Play className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Fácil de Usar</h3>
            <p className="text-muted-foreground">
              Interfaz intuitiva diseñada para que disfrutes navegando sin complicaciones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 p-12 md:p-16 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ¿Listo para explorar miles de películas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad de cinéfilos y comienza tu viaje hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-glow text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Crear Cuenta Gratis
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all text-lg"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-6 h-6 text-primary fill-primary" />
                <span className="text-xl font-bold text-foreground">CineStream</span>
              </div>
              <p className="text-muted-foreground text-sm">
                La mejor plataforma para descubrir y compartir películas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Seguridad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 CineStream. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Icon component for the grid
function Film() {
  return (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
    </svg>
  )
}
