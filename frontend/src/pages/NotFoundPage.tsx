import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
