"use client";

import { useState } from "react";
import { ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils";
import type { DemoComponentProps } from "./types";

interface AccountingEntry {
  readonly id: string;
  readonly journal: "VT" | "AC" | "BQ";
  readonly desc: string;
  readonly amount: string;
  readonly reconciled: boolean;
}

const JOURNAL_FILTERS = ["Tous", "VT", "AC", "BQ"] as const;
const BASE_RECONCILED_COUNT = 188;
const BASE_PENDING_COUNT = 54;

const INITIAL_ENTRIES: readonly AccountingEntry[] = [
  {
    id: "FV2024-045",
    journal: "VT",
    desc: "Vente produits finis",
    amount: "2 500,00 €",
    reconciled: true,
  },
  {
    id: "FA2024-023",
    journal: "AC",
    desc: "Achat fournitures bureau",
    amount: "450,00 €",
    reconciled: false,
  },
  {
    id: "VIR-2024-1025",
    journal: "BQ",
    desc: "Prélèvement bancaire",
    amount: "3 200,00 €",
    reconciled: false,
  },
];

export default function ExpertResourceDemo({ mobile }: DemoComponentProps) {
  const [tab, setTab] = useState<"compta" | "2fa">("compta");
  const [entries, setEntries] = useState<AccountingEntry[]>([...INITIAL_ENTRIES]);
  const [journalFilter, setJournalFilter] =
    useState<(typeof JOURNAL_FILTERS)[number]>("Tous");
  const [otp, setOtp] = useState("482910");
  const [verified, setVerified] = useState(false);

  const reconciledCount =
    BASE_RECONCILED_COUNT + entries.filter((e) => e.reconciled).length;
  const pendingCount =
    BASE_PENDING_COUNT + entries.filter((e) => !e.reconciled).length;

  const visibleEntries = entries.filter(
    (entry) => journalFilter === "Tous" || entry.journal === journalFilter
  );

  const reconcileEntry = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, reconciled: true } : entry
      )
    );
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 flex flex-col text-xs">
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
        <span className="font-bold text-[#0E5A6D] truncate">
          Afym · ERP Comptable
        </span>
        <div className="flex gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setTab("compta")}
            className={cn(
              "px-2.5 py-1 rounded-md font-semibold cursor-pointer",
              tab === "compta"
                ? "bg-[#0E5A6D] text-white"
                : "bg-slate-100 text-slate-600"
            )}
          >
            Comptabilité
          </button>
          <button
            type="button"
            onClick={() => setTab("2fa")}
            className={cn(
              "px-2.5 py-1 rounded-md font-semibold cursor-pointer inline-flex items-center gap-1",
              tab === "2fa"
                ? "bg-[#0E5A6D] text-white"
                : "bg-slate-100 text-slate-600"
            )}
          >
            <ShieldCheck size={13} />
            2FA
          </button>
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-3">
        {tab === "compta" ? (
          <>
            <div className={cn("grid gap-2", mobile ? "grid-cols-2" : "grid-cols-3")}>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500">Écritures</div>
                <div className="text-sm font-bold tabular-nums">245</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500">Rapprochées</div>
                <div className="text-sm font-bold text-emerald-600 tabular-nums">
                  {reconciledCount}
                </div>
              </div>
              <div
                className={cn(
                  "bg-white p-2.5 rounded-xl border border-slate-200",
                  mobile && "col-span-2"
                )}
              >
                <div className="text-[10px] text-slate-500">En attente</div>
                <div className="text-sm font-bold text-amber-600 tabular-nums">
                  {pendingCount}
                </div>
              </div>
            </div>

            <div className="flex gap-1.5">
              {JOURNAL_FILTERS.map((journal) => (
                <button
                  key={journal}
                  type="button"
                  aria-pressed={journalFilter === journal}
                  onClick={() => setJournalFilter(journal)}
                  className={cn(
                    "px-2.5 py-1 rounded-full font-semibold cursor-pointer",
                    journalFilter === journal
                      ? "bg-[#0E5A6D] text-white"
                      : "bg-white border border-slate-200 text-slate-600"
                  )}
                >
                  {journal}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-2.5 space-y-2">
              <div className="font-bold text-slate-800">
                Écritures récentes (rapprochement en 1 clic)
              </div>
              {visibleEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="min-w-0">
                    <div className="font-semibold flex items-center gap-1.5">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 shrink-0">
                        {entry.journal}
                      </span>
                      <span className="truncate">{entry.desc}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                      {entry.id} · {entry.amount}
                    </div>
                  </div>
                  {entry.reconciled ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold shrink-0">
                      Rapprochée
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => reconcileEntry(entry.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#0E5A6D] text-white font-semibold hover:opacity-90 shrink-0 cursor-pointer"
                    >
                      Rapprocher
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-4 max-w-xs mx-auto text-center space-y-3 my-4">
            <ShieldCheck
              size={32}
              className="mx-auto text-[#0E5A6D]"
              weight="duotone"
            />
            <div>
              <div className="font-bold text-sm">Authentification 2FA</div>
              <p className="text-[11px] text-slate-500">
                Testez la vérification par code TOTP à 6 chiffres
              </p>
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                setVerified(false);
              }}
              aria-label="Code de vérification 2FA de démonstration"
              className="w-full text-center font-mono tracking-[0.4em] text-base py-2 rounded-lg border-2 border-[#0E5A6D]/40 focus:outline-none focus:border-[#0E5A6D]"
            />
            {verified ? (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-semibold">
                Session sécurisée validée ✓
              </div>
            ) : (
              <button
                type="button"
                disabled={otp.length !== 6}
                onClick={() => setVerified(true)}
                className="w-full py-2 rounded-lg bg-[#0E5A6D] text-white font-semibold disabled:opacity-40 cursor-pointer"
              >
                Vérifier le code
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
