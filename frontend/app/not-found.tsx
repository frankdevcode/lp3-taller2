import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">La página que buscas no existe</p>
        <Button asChild className="bg-primary hover:bg-primary-hover text-white">
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
      <Footer />
    </main>
  )
}
