"use client";

import { useState } from "react";
import { Clock, Warning, Plus, Ticket } from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils";
import type { DemoComponentProps } from "./types";

type TicketStatus = "En cours" | "En attente" | "Terminé";
type TicketPriority = "Urgente" | "Haute" | "Normale";

interface DemoTicket {
  readonly id: string;
  readonly client: string;
  readonly type: string;
  readonly status: TicketStatus;
  readonly priority: TicketPriority;
  readonly late?: boolean;
}

const STATUS_CYCLE: readonly TicketStatus[] = [
  "En attente",
  "En cours",
  "Terminé",
];

const STATUS_FILTERS = ["Tous", "En cours", "En attente", "Terminé"] as const;

const INITIAL_TICKETS: readonly DemoTicket[] = [
  {
    id: "#3BB5ABFE",
    client: "TechStart SAS",
    type: "Consultation juridique",
    status: "En cours",
    priority: "Urgente",
    late: true,
  },
  {
    id: "#3BB5ABFC",
    client: "ServicesPro EURL",
    type: "Modification statuts",
    status: "En attente",
    priority: "Normale",
  },
  {
    id: "#3BB5ABFA",
    client: "InnovCorp SARL",
    type: "Rédaction contrat",
    status: "Terminé",
    priority: "Normale",
  },
];

export default function ExpertTicketingDemo({ mobile }: DemoComponentProps) {
  const [tickets, setTickets] = useState<DemoTicket[]>([...INITIAL_TICKETS]);
  const [nextTicketSeq, setNextTicketSeq] = useState(1);
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number]>("Tous");
  const [creating, setCreating] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newPriority, setNewPriority] = useState<TicketPriority>("Haute");

  const lateCount = tickets.filter(
    (ticket) => ticket.late && ticket.status !== "Terminé"
  ).length;
  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === "En cours"
  ).length;

  const visible = tickets.filter(
    (ticket) => statusFilter === "Tous" || ticket.status === statusFilter
  );

  const cycleStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== id) return ticket;
        const nextIdx = (STATUS_CYCLE.indexOf(ticket.status) + 1) % STATUS_CYCLE.length;
        return { ...ticket, status: STATUS_CYCLE[nextIdx] };
      })
    );
  };

  const addTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const client = newClient.trim();
    if (!client) return;

    const code = `#3BB5${String(1000 + nextTicketSeq).padStart(4, "0")}`;
    setNextTicketSeq((prev) => prev + 1);
    setTickets((prev) => [
      {
        id: code,
        client,
        type: "Nouvelle demande client",
        status: "En cours",
        priority: newPriority,
      },
      ...prev,
    ]);
    setNewClient("");
    setCreating(false);
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 flex flex-col text-xs">
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
        <div className="font-bold text-teal-800 flex items-center gap-1.5 truncate">
          <Ticket size={16} weight="bold" className="shrink-0" />
          <span className="truncate">Afym · Pôle Juridique</span>
        </div>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 cursor-pointer shrink-0"
        >
          <Plus size={12} weight="bold" />
          Nouveau
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-2.5">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500">Total</div>
            <div className="text-sm font-bold tabular-nums">{tickets.length}</div>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500">En cours</div>
            <div className="text-sm font-bold text-amber-600 tabular-nums">
              {inProgressCount}
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl border border-rose-200">
            <div className="text-[10px] text-rose-500">En retard</div>
            <div className="text-sm font-bold text-rose-600 tabular-nums">
              {lateCount}
            </div>
          </div>
        </div>

        {lateCount > 0 && (
          <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 font-medium">
            <Warning size={15} weight="fill" className="shrink-0" />
            <span>
              {lateCount} ticket en retard · cliquez sur son statut pour le
              clôturer
            </span>
          </div>
        )}

        {creating && (
          <form
            onSubmit={addTicket}
            className="p-2.5 bg-white rounded-xl border border-teal-300 space-y-2"
          >
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="Nom du client (ex: Atlas SAS)"
              aria-label="Nom du client pour le nouveau ticket"
              required
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600"
            />
            <div className="flex items-center justify-between gap-2">
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as TicketPriority)
                }
                aria-label="Priorité du ticket"
                className="px-2 py-1 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Urgente">Urgente</option>
                <option value="Haute">Haute</option>
                <option value="Normale">Normale</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-teal-700 text-white font-semibold cursor-pointer"
              >
                Créer
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              aria-pressed={statusFilter === st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-2.5 py-1 rounded-full font-medium cursor-pointer",
                statusFilter === st
                  ? "bg-teal-700 text-white"
                  : "bg-white border border-slate-200 text-slate-600"
              )}
            >
              {st}
            </button>
          ))}
        </div>

        <div
          className={cn("grid gap-2", mobile ? "grid-cols-1" : "grid-cols-2")}
        >
          {visible.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-slate-200 p-2.5 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono font-bold text-[11px]">{t.id}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                    t.priority === "Urgente"
                      ? "bg-rose-100 text-rose-700"
                      : t.priority === "Haute"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  )}
                >
                  {t.priority}
                </span>
              </div>
              <div className="font-semibold text-slate-900">{t.client}</div>
              <div className="text-[11px] text-slate-500">{t.type}</div>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 inline-flex items-center gap-1">
                  <Clock size={11} />
                  {t.late && t.status !== "Terminé" ? "Retard (2j)" : "À jour"}
                </span>
                <button
                  type="button"
                  onClick={() => cycleStatus(t.id)}
                  className={cn(
                    "px-2 py-0.5 rounded-md font-semibold cursor-pointer transition-colors",
                    t.status === "Terminé"
                      ? "bg-emerald-100 text-emerald-700"
                      : t.status === "En cours"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700"
                  )}
                >
                  {t.status} ↻
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
