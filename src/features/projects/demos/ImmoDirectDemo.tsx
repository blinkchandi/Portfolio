"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Heart,
  MapPin,
  CheckCircle,
  Buildings,
} from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils";
import type { DemoComponentProps } from "./types";

interface DemoProperty {
  readonly id: number;
  readonly title: string;
  readonly type: "Villa" | "Appartement" | "Terrain";
  readonly city: string;
  readonly priceEur: number;
  readonly area: string;
  readonly rooms: string;
  readonly gradient: string;
}

const PROPERTY_TYPES = ["Tous", "Villa", "Appartement", "Terrain"] as const;

const INITIAL_PROPERTIES: readonly DemoProperty[] = [
  {
    id: 1,
    title: "Belle villa contemporaine",
    type: "Villa",
    city: "Saint-Denis",
    priceEur: 420_000,
    area: "350 m²",
    rooms: "4 ch.",
    gradient: "from-sky-500/80 to-blue-700/90",
  },
  {
    id: 2,
    title: "Villa avec piscine",
    type: "Villa",
    city: "Saint-Louis",
    priceEur: 350_000,
    area: "150 m²",
    rooms: "4 ch.",
    gradient: "from-amber-500/80 to-slate-800/90",
  },
  {
    id: 3,
    title: "Appartement T3 centre-ville",
    type: "Appartement",
    city: "Saint-Louis",
    priceEur: 180_000,
    area: "75 m²",
    rooms: "3 ch.",
    gradient: "from-slate-600/85 to-slate-900/90",
  },
  {
    id: 4,
    title: "Terrain constructible",
    type: "Terrain",
    city: "Saint-Louis",
    priceEur: 95_000,
    area: "500 m²",
    rooms: "Viabilisé",
    gradient: "from-emerald-600/80 to-teal-900/90",
  },
];

export default function ImmoDirectDemo({ mobile }: DemoComponentProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<(typeof PROPERTY_TYPES)[number]>("Tous");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [visitRequested, setVisitRequested] = useState<number[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = INITIAL_PROPERTIES.filter((item) => {
    const matchType = typeFilter === "Tous" || item.type === typeFilter;
    const matchQuery =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.city.toLowerCase().includes(normalizedQuery);
    return matchType && matchQuery;
  });

  const selected =
    INITIAL_PROPERTIES.find((property) => property.id === selectedId) ?? null;

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-full bg-white text-slate-900 flex flex-col text-xs">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-2 bg-white">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <Buildings size={16} weight="bold" className="text-blue-600" />
          <span>NAS IMMO</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold tabular-nums">
          <Heart size={12} weight="fill" />
          {favorites.length}
        </span>
      </div>

      <div className="p-3 bg-slate-50 border-b border-slate-100 space-y-2">
        <div className="relative">
          <MagnifyingGlass
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher Saint-Denis, villa..."
            aria-label="Rechercher un bien dans la démo ImmoDirect"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={typeFilter === type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                "px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer",
                typeFilter === type
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        {selected ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              ← Retour au catalogue
            </button>
            <div
              className={cn(
                "rounded-xl p-4 text-white bg-gradient-to-br",
                selected.gradient
              )}
            >
              <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                {selected.type}
              </span>
              <h4 className="text-base font-bold mt-2">{selected.title}</h4>
              <p className="text-lg font-bold mt-1 tabular-nums">
                {selected.priceEur.toLocaleString("fr-FR")} €
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[10px]">Commune</div>
                <div className="font-semibold">{selected.city}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[10px]">Surface</div>
                <div className="font-semibold tabular-nums">{selected.area}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[10px]">Config.</div>
                <div className="font-semibold">{selected.rooms}</div>
              </div>
            </div>
            {visitRequested.includes(selected.id) ? (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-2">
                <CheckCircle size={16} weight="fill" />
                Demande de visite enregistrée (mode démo).
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setVisitRequested((prev) => [...prev, selected.id])
                }
                className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Planifier une visite
              </button>
            )}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <p className="font-semibold text-slate-700">
              Aucun bien ne correspond à votre recherche.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTypeFilter("Tous");
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] text-slate-500 mb-2 tabular-nums">
              {filtered.length} bien{filtered.length > 1 ? "s" : ""} trouvé
              {filtered.length > 1 ? "s" : ""} · cliquez sur un bien pour voir sa
              fiche
            </p>
            <div
              className={cn(
                "grid gap-2.5",
                mobile ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {filtered.map((item) => {
                const isFav = favorites.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 overflow-hidden bg-white hover:border-blue-400 transition-colors"
                  >
                    <div
                      className={cn(
                        "h-16 p-2 flex items-start justify-between bg-gradient-to-br text-white",
                        item.gradient
                      )}
                    >
                      <span className="text-[10px] font-semibold bg-black/25 px-2 py-0.5 rounded-full">
                        {item.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.id)}
                        aria-label={`Ajouter ${item.title} aux favoris`}
                        aria-pressed={isFav}
                        className="w-7 h-7 rounded-full bg-white/90 text-slate-700 flex items-center justify-center cursor-pointer"
                      >
                        <Heart
                          size={13}
                          weight={isFav ? "fill" : "regular"}
                          className={isFav ? "text-rose-500" : "text-slate-600"}
                        />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className="w-full text-left p-2.5 space-y-1 cursor-pointer"
                    >
                      <div className="font-bold text-slate-900 truncate">
                        {item.title}
                      </div>
                      <div className="font-bold text-blue-600 tabular-nums">
                        {item.priceEur.toLocaleString("fr-FR")} €
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-0.5">
                          <MapPin size={11} />
                          {item.city}
                        </span>
                        <span className="tabular-nums">
                          {item.area} · {item.rooms}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
