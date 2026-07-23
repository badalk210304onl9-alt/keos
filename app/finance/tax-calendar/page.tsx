"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
} from "lucide-react";

type TaxStatus = "Completed" | "Upcoming" | "Due Soon" | "Overdue";

type TaxEvent = {
  id: number;
  title: string;
  taxType: string;
  period: string;
  dueDate: string;
  status: TaxStatus;
  description: string;
};

const initialEvents: TaxEvent[] = [
  {
    id: 1,
    title: "GSTR-1 Filing",
    taxType: "GST",
    period: "June 2026",
    dueDate: "2026-07-11",
    status: "Completed",
    description: "Monthly outward supply return.",
  },
  {
    id: 2,
    title: "TDS Deposit",
    taxType: "TDS",
    period: "June 2026",
    dueDate: "2026-07-07",
    status: "Completed",
    description: "Deposit TDS deducted during June.",
  },
  {
    id: 3,
    title: "GSTR-3B Filing",
    taxType: "GST",
    period: "June 2026",
    dueDate: "2026-07-20",
    status: "Due Soon",
    description: "Monthly summary GST return.",
  },
  {
    id: 4,
    title: "Advance Tax Instalment",
    taxType: "Income Tax",
    period: "Q2 FY 2026-27",
    dueDate: "2026-09-15",
    status: "Upcoming",
    description: "Second instalment of advance income tax.",
  },
  {
    id: 5,
    title: "TDS Return Form 26Q",
    taxType: "TDS",
    period: "Q1 FY 2026-27",
    dueDate: "2026-07-31",
    status: "Upcoming",
    description: "Quarterly TDS return for non-salary payments.",
  },
];

export default function TaxCalendarPage() {
  const [events, setEvents] = useState<TaxEvent[]>(initialEvents);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredEvents = events.filter(
    (event) => filter === "All" || event.taxType === filter,
  );

  const completed = events.filter(
    (event) => event.status === "Completed",
  ).length;

  const upcoming = events.filter(
    (event) => event.status === "Upcoming",
  ).length;

  const urgent = events.filter(
    (event) =>
      event.status === "Due Soon" || event.status === "Overdue",
  ).length;

  function markCompleted(id: number) {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id
          ? { ...event, status: "Completed" }
          : event,
      ),
    );

    setMessage("Tax compliance marked as completed.");

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">
          {message}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-5 lg:px-8">
          <Link
            href="/finance"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-black text-slate-950">
              Tax Calendar
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track tax filing deadlines and compliance reminders
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Completed"
            value={String(completed)}
            icon={<CheckCircle2 size={22} />}
          />

          <SummaryCard
            title="Upcoming"
            value={String(upcoming)}
            icon={<Clock3 size={22} />}
          />

          <SummaryCard
            title="Urgent Attention"
            value={String(urgent)}
            icon={<AlertTriangle size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Compliance Schedule
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upcoming statutory tax filings and payments
              </p>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
            >
              <option>All</option>
              <option>GST</option>
              <option>TDS</option>
              <option>Income Tax</option>
            </select>
          </div>

          <div className="grid gap-4 p-6 lg:grid-cols-2">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-slate-950">
                          {event.title}
                        </h3>

                        <StatusBadge status={event.status} />
                      </div>

                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {event.taxType} · {event.period}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Due date
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-800">
                      {event.dueDate}
                    </p>
                  </div>

                  {event.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => markCompleted(event.id)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#102844] px-4 text-xs font-black text-white"
                    >
                      <FileCheck2 size={15} />
                      Mark Completed
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TaxStatus }) {
  const style =
    status === "Completed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Due Soon"
        ? "bg-amber-100 text-amber-700"
        : status === "Overdue"
          ? "bg-rose-100 text-rose-700"
          : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-black ${style}`}
    >
      {status}
    </span>
  );
}