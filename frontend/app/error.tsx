"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Algo salió mal</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Parece que ocurrió un error. Por favor, intenta nuevamente.
        </p>
        <Button onClick={reset} className="bg-primary hover:bg-primary-hover text-white">
          Intentar de Nuevo
        </Button>
      </div>
      <Footer />
    </main>
  )
}
