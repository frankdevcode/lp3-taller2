"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterPanelProps {
  genres: string[]
  filters: {
    genre: string
    year: string
    director: string
  }
  onFilterChange: (filters: any) => void
}

export function FilterPanel({ genres, filters, onFilterChange }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    genre: true,
    year: true,
    director: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterUpdate = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      {/* Genre Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("genre")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-card-hover transition-colors"
        >
          <h3 className="font-semibold">Género</h3>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.genre ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.genre && (
          <div className="border-t border-border px-4 py-3 space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="genre"
                value=""
                checked={filters.genre === ""}
                onChange={(e) => handleFilterUpdate("genre", e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Todos</span>
            </label>
            {genres.map((genre) => (
              <label
                key={genre}
                className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
              >
                <input
                  type="radio"
                  name="genre"
                  value={genre}
                  checked={filters.genre === genre}
                  onChange={(e) => handleFilterUpdate("genre", e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{genre}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Year Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("year")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-card-hover transition-colors"
        >
          <h3 className="font-semibold">Año</h3>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.year ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.year && (
          <div className="border-t border-border px-4 py-3 space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="year"
                value=""
                checked={filters.year === ""}
                onChange={(e) => handleFilterUpdate("year", e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Todos</span>
            </label>
            {years.map((year) => (
              <label key={year} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                <input
                  type="radio"
                  name="year"
                  value={year}
                  checked={filters.year === year.toString()}
                  onChange={(e) => handleFilterUpdate("year", e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{year}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Director Filter */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("director")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-card-hover transition-colors"
        >
          <h3 className="font-semibold">Director</h3>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.director ? "" : "-rotate-90"}`} />
        </button>
        {expandedSections.director && (
          <div className="border-t border-border px-4 py-3">
            <input
              type="text"
              value={filters.director}
              onChange={(e) => handleFilterUpdate("director", e.target.value)}
              placeholder="Escribe un director..."
              className="w-full px-3 py-2 bg-card-hover border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>
    </div>
  )
}
