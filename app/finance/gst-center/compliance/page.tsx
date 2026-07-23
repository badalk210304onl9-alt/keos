"use client";

import { useState } from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

type ComplianceStatus =
  | "Filed"
  | "Due Soon"
  | "Pending"
  | "Overdue";

type ComplianceRecord = {
  id: number;
  returnType: string;
  period: string;
  dueDate: string;
  filedDate: string;
  status: ComplianceStatus;
  remarks: string;
};

const initialRecords: ComplianceRecord[] = [
  {
    id: 1,
    returnType: "GSTR-1",
    period: "June 2026",
    dueDate: "2026-07-11",
    filedDate: "2026-07-09",
    status: "Filed",
    remarks: "Filed successfully.",
  },
  {
    id: 2,
    returnType: "GSTR-3B",
    period: "June 2026",
    dueDate: "2026-07-20",
    filedDate: "",
    status: "Due Soon",
    remarks: "Tax payment verification pending.",
  },
  {
    id: 3,
    returnType: "GSTR-1",
    period: "July 2026",
    dueDate: "2026-08-11",
    filedDate: "",
    status: "Pending",
    remarks: "Sales reconciliation in progress.",
  },
  {
    id: 4,
    returnType: "GSTR-9",
    period: "FY 2025-26",
    dueDate: "2026-12-31",
    filedDate: "",
    status: "Pending",
    remarks: "Annual reconciliation not started.",
  },
];

export default function GSTCompliancePage() {
  const [records, setRecords] =
    useState<ComplianceRecord[]>(initialRecords);

  const [message, setMessage] = useState("");

  const filed = records.filter(
    (record) => record.status === "Filed",
  ).length;

  const pending = records.filter(
    (record) =>
      record.status === "Pending" ||
      record.status === "Due Soon",
  ).length;

  const overdue = records.filter(
    (record) => record.status === "Overdue",
  ).length;

  function markFiled(id: number) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Filed",
              filedDate: new Date().toISOString().slice(0, 10),
              remarks: "Filed successfully.",
            }
          : record,
      ),
    );

    setMessage("GST return marked as filed.");

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
            href="/finance/gst-center"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-black text-slate-950">
              GST Compliance
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review filing deadlines and statutory compliance status
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Returns Filed"
            value={String(filed)}
            icon={<CheckCircle2 size={22} />}
          />

          <SummaryCard
            title="Pending Compliance"
            value={String(pending)}
            icon={<Clock3 size={22} />}
          />

          <SummaryCard
            title="Overdue"
            value={String(overdue)}
            icon={<AlertTriangle size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-950">
                  GST Filing Calendar
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track statutory filing deadlines and completion
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Return Type</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Filed Date</th>
                  <th className="px-6 py-4">Remarks</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.id} className="text-sm">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <FileCheck2
                          size={18}
                          className="text-[#102844]"
                        />

                        <span className="font-black text-slate-900">
                          {record.returnType}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {record.period}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <CalendarDays size={15} />
                        {record.dueDate}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {record.filedDate || "Not filed"}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {record.remarks}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={record.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      {record.status !== "Filed" ? (
                        <button
                          type="button"
                          onClick={() => markFiled(record.id)}
                          className="rounded-xl bg-[#102844] px-4 py-2 text-xs font-black text-white transition hover:bg-[#17385f]"
                        >
                          Mark Filed
                        </button>
                      ) : (
                        <span className="text-xs font-black text-emerald-700">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

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

function StatusBadge({
  status,
}: {
  status: ComplianceStatus;
}) {
  const className =
    status === "Filed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Overdue"
        ? "bg-rose-100 text-rose-700"
        : status === "Due Soon"
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}