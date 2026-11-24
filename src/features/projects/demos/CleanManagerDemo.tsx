"use client";

import { useState } from "react";
import { CheckCircle, Receipt, CurrencyEur } from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils";
import type { DemoComponentProps } from "./types";

type InterventionStatus = "Terminée" | "En cours";

interface Intervention {
  readonly id: number;
  readonly site: string;
  readonly team: string;
  readonly amountCents: number;
  readonly status: InterventionStatus;
}

interface UnpaidInvoice {
  readonly id: string;
  readonly client: string;
  readonly amountCents: number;
  readonly reminded: boolean;
}

const INITIAL_INTERVENTIONS: readonly Intervention[] = [
  {
    id: 1,
    site: "Site A — Siège Nord",
    team: "Équipe 1",
    amountCents: 145_000,
    status: "Terminée",
  },
  {
    id: 2,
    site: "Clinique Lumière",
    team: "Équipe 2",
    amountCents: 220_000,
    status: "En cours",
  },
  {
    id: 3,
    site: "Résidence Horizon",
    team: "Équipe 3",
    amountCents: 98_000,
    status: "En cours",
  },
];

const INITIAL_INVOICES: readonly UnpaidInvoice[] = [
  { id: "FAC-204", client: "Groupe Océan", amountCents: 340_000, reminded: false },
  { id: "FAC-209", client: "Clinique Lumière", amountCents: 220_000, reminded: false },
  { id: "FAC-212", client: "Hôtel Belvédère", amountCents: 185_000, reminded: false },
];

const formatEurosFromCents = (cents: number) =>
  `${(cents / 100).toLocaleString("fr-FR")} €`;

export default function CleanManagerDemo({ mobile }: DemoComponentProps) {
  const [tab, setTab] = useState<"dashboard" | "factures">("dashboard");
  const [interventions, setInterventions] = useState<Intervention[]>([
    ...INITIAL_INTERVENTIONS,
  ]);
  const [invoices, setInvoices] = useState<UnpaidInvoice[]>([...INITIAL_INVOICES]);

  const completedRevenueCents = interventions
    .filter((item) => item.status === "Terminée")
    .reduce((sum, item) => sum + item.amountCents, 0);
  const completedCount = interventions.filter(
    (item) => item.status === "Terminée"
  ).length;
  const unpaidCount = invoices.filter((inv) => !inv.reminded).length;

  const markInterventionDone = (id: number) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Terminée" } : item
      )
    );
  };

  const remindInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, reminded: true } : inv))
    );
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 flex text-xs">
      {!mobile && (
        <aside className="w-36 bg-white border-r border-slate-200 p-3 flex flex-col gap-1 shrink-0">
          <div className="font-bold text-slate-900 text-sm mb-3">
            ERP Nettoyage
          </div>
          <button
            type="button"
            onClick={() => setTab("dashboard")}
            className={cn(
              "text-left px-2.5 py-2 rounded-lg font-medium transition-colors cursor-pointer",
              tab === "dashboard"
                ? "bg-sky-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setTab("factures")}
            className={cn(
              "text-left px-2.5 py-2 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer",
              tab === "factures"
                ? "bg-sky-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <span>Factures</span>
            {unpaidCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500 text-white tabular-nums">
                {unpaidCount}
              </span>
            )}
          </button>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {mobile && (
          <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2">
            <span className="font-bold truncate">ERP Nettoyage</span>
            <div className="flex gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setTab("dashboard")}
                className={cn(
                  "px-2 py-1 rounded-md font-medium cursor-pointer",
                  tab === "dashboard"
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                Opérations
              </button>
              <button
                type="button"
                onClick={() => setTab("factures")}
                className={cn(
                  "px-2 py-1 rounded-md font-medium cursor-pointer tabular-nums",
                  tab === "factures"
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                Factures ({unpaidCount})
              </button>
            </div>
          </div>
        )}

        <div className="p-3 flex-1 overflow-y-auto space-y-3">
          <div className={cn("grid gap-2", mobile ? "grid-cols-2" : "grid-cols-3")}>
            <div className="bg-white rounded-xl p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <CurrencyEur size={12} className="text-sky-600" /> CA validé
              </div>
              <div className="text-sm font-bold mt-1 tabular-nums">
                {formatEurosFromCents(completedRevenueCents)}
              </div>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <CheckCircle size={12} className="text-emerald-600" /> Terminées
              </div>
              <div className="text-sm font-bold mt-1 tabular-nums">
                {completedCount} / {interventions.length}
              </div>
            </div>
            <div
              className={cn(
                "bg-white rounded-xl p-2.5 border border-slate-200",
                mobile && "col-span-2"
              )}
            >
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <Receipt size={12} className="text-rose-500" /> Impayées
              </div>
              <div className="text-sm font-bold mt-1 tabular-nums">
                {unpaidCount}
              </div>
            </div>
          </div>

          {tab === "dashboard" ? (
            <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
              <div className="font-bold text-slate-800">
                Interventions du jour (cliquez pour valider)
              </div>
              <div className="space-y-2">
                {interventions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{item.site}</div>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        {item.team} · {formatEurosFromCents(item.amountCents)}
                      </div>
                    </div>
                    {item.status === "Terminée" ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold shrink-0">
                        Terminée
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markInterventionDone(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 shrink-0 cursor-pointer"
                      >
                        Valider
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
              <div className="font-bold text-slate-800">
                Suivi des factures impayées
              </div>
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold truncate">
                        {inv.id} · {inv.client}
                      </div>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        {formatEurosFromCents(inv.amountCents)}
                      </div>
                    </div>
                    {inv.reminded ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold shrink-0">
                        Relancée
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => remindInvoice(inv.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 shrink-0 cursor-pointer"
                      >
                        Relancer
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
