"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  IndianRupee,
  Search,
} from "lucide-react";

type TDSStatus = "Pending" | "Deducted" | "Deposited" | "Filed";

type TDSRecord = {
  id: number;
  deductee: string;
  pan: string;
  section: string;
  paymentDate: string;
  grossAmount: number;
  rate: number;
  tdsAmount: number;
  status: TDSStatus;
};

const initialRecords: TDSRecord[] = [
  {
    id: 1,
    deductee: "Apex Consulting Pvt. Ltd.",
    pan: "ABCDE1234F",
    section: "194J",
    paymentDate: "2026-07-05",
    grossAmount: 125000,
    rate: 10,
    tdsAmount: 12500,
    status: "Deposited",
  },
  {
    id: 2,
    deductee: "Nova Logistics",
    pan: "AAACN5678K",
    section: "194C",
    paymentDate: "2026-07-08",
    grossAmount: 85000,
    rate: 2,
    tdsAmount: 1700,
    status: "Deducted",
  },
  {
    id: 3,
    deductee: "Rohan Mehta",
    pan: "BBRPM2345T",
    section: "192",
    paymentDate: "2026-07-10",
    grossAmount: 95000,
    rate: 8,
    tdsAmount: 7600,
    status: "Filed",
  },
  {
    id: 4,
    deductee: "Urban Media House",
    pan: "AAACU4589P",
    section: "194J",
    paymentDate: "2026-07-15",
    grossAmount: 62000,
    rate: 10,
    tdsAmount: 6200,
    status: "Pending",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TDSManagementPage() {
  const [records, setRecords] = useState<TDSRecord[]>(initialRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.deductee.toLowerCase().includes(query) ||
        record.pan.toLowerCase().includes(query) ||
        record.section.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const totalTDS = useMemo(
    () => records.reduce((sum, record) => sum + record.tdsAmount, 0),
    [records],
  );

  const depositedTDS = useMemo(
    () =>
      records
        .filter(
          (record) =>
            record.status === "Deposited" || record.status === "Filed",
        )
        .reduce((sum, record) => sum + record.tdsAmount, 0),
    [records],
  );

  const pendingTDS = totalTDS - depositedTDS;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function updateStatus(id: number, status: TDSStatus) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id ? { ...record, status } : record,
      ),
    );

    showMessage(`TDS record marked as ${status}.`);
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
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            aria-label="Back to finance"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-black text-slate-950">
              TDS Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              TDS deductions, deposits, filing records and certificates
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total TDS"
            value={formatCurrency(totalTDS)}
            description="Total tax deducted"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Deposited TDS"
            value={formatCurrency(depositedTDS)}
            description="Deposited or filed amount"
            icon={<CheckCircle2 size={22} />}
          />

          <SummaryCard
            title="Pending TDS"
            value={formatCurrency(pendingTDS)}
            description="Awaiting deposit or filing"
            icon={<Clock3 size={22} />}
          />

          <SummaryCard
            title="Total Records"
            value={String(records.length)}
            description="TDS transaction records"
            icon={<FileSpreadsheet size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                TDS Deduction Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review deduction, deposit and filing status
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search deductee, PAN or section"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 sm:w-72"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Deducted">Deducted</option>
                <option value="Deposited">Deposited</option>
                <option value="Filed">Filed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Deductee</th>
                  <th className="px-6 py-4">Section</th>
                  <th className="px-6 py-4">Payment Date</th>
                  <th className="px-6 py-4 text-right">Gross Amount</th>
                  <th className="px-6 py-4 text-right">Rate</th>
                  <th className="px-6 py-4 text-right">TDS Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-900">
                        {record.deductee}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        PAN: {record.pan}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-700">
                      {record.section}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {record.paymentDate}
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-slate-800">
                      {formatCurrency(record.grossAmount)}
                    </td>

                    <td className="px-6 py-5 text-right text-slate-600">
                      {record.rate}%
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(record.tdsAmount)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={record.status} />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(record.id, "Deposited")
                          }
                          className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-100"
                        >
                          Deposit
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(record.id, "Filed")}
                          className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-100"
                        >
                          File
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center text-sm font-bold text-slate-400"
                    >
                      No TDS records found
                    </td>
                  </tr>
                )}
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
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">{title}</p>

          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TDSStatus }) {
  const className =
    status === "Filed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Deposited"
        ? "bg-blue-100 text-blue-700"
        : status === "Deducted"
          ? "bg-violet-100 text-violet-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}