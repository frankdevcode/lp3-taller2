"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  onSearch: (query: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por título, director..."
          className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <Button type="submit" className="mt-4 w-full bg-primary hover:bg-primary-hover text-white">
        Buscar
      </Button>
    </form>
  )
}
