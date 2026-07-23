"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  IndianRupee,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

type ITCStatus = "Eligible" | "Partially Eligible" | "Blocked";

type ITCRecord = {
  id: number;
  invoiceNumber: string;
  vendor: string;
  gstin: string;
  invoiceDate: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  eligibleCredit: number;
  status: ITCStatus;
};

const initialRecords: ITCRecord[] = [
  {
    id: 1,
    invoiceNumber: "INV-ITC-1001",
    vendor: "Apex Textiles Pvt. Ltd.",
    gstin: "09ABCDE1234F1Z5",
    invoiceDate: "2026-07-03",
    taxableValue: 125000,
    cgst: 11250,
    sgst: 11250,
    igst: 0,
    eligibleCredit: 22500,
    status: "Eligible",
  },
  {
    id: 2,
    invoiceNumber: "INV-ITC-1002",
    vendor: "Nova Digital Solutions",
    gstin: "27AAACN5678K1Z2",
    invoiceDate: "2026-07-08",
    taxableValue: 85000,
    cgst: 0,
    sgst: 0,
    igst: 15300,
    eligibleCredit: 15300,
    status: "Eligible",
  },
  {
    id: 3,
    invoiceNumber: "INV-ITC-1003",
    vendor: "Urban Logistics",
    gstin: "07AAACU4567M1Z9",
    invoiceDate: "2026-07-12",
    taxableValue: 48000,
    cgst: 4320,
    sgst: 4320,
    igst: 0,
    eligibleCredit: 4320,
    status: "Partially Eligible",
  },
  {
    id: 4,
    invoiceNumber: "INV-ITC-1004",
    vendor: "Prime Hospitality",
    gstin: "09AAACP7890R1Z4",
    invoiceDate: "2026-07-15",
    taxableValue: 32000,
    cgst: 2880,
    sgst: 2880,
    igst: 0,
    eligibleCredit: 0,
    status: "Blocked",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InputTaxCreditPage() {
  const [records] = useState<ITCRecord[]>(initialRecords);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.vendor.toLowerCase().includes(search.toLowerCase()) ||
        record.invoiceNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        record.gstin.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || record.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, status]);

  const totalCredit = records.reduce(
    (sum, record) => sum + record.eligibleCredit,
    0,
  );

  const totalTax = records.reduce(
    (sum, record) =>
      sum + record.cgst + record.sgst + record.igst,
    0,
  );

  const eligibleInvoices = records.filter(
    (record) => record.status === "Eligible",
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
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
              Input Tax Credit
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track eligible, utilised and blocked GST credits
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Eligible ITC"
            value={formatCurrency(totalCredit)}
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Total GST on Purchases"
            value={formatCurrency(totalTax)}
            icon={<TrendingUp size={22} />}
          />

          <SummaryCard
            title="Eligible Invoices"
            value={String(eligibleInvoices)}
            icon={<CheckCircle2 size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Purchase ITC Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                GST credit details from vendor invoices
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search invoice or vendor"
                  className="h-11 rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Eligible</option>
                <option>Partially Eligible</option>
                <option>Blocked</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Vendor</th>
                  <th className="px-6 py-4">Invoice Date</th>
                  <th className="px-6 py-4 text-right">
                    Taxable Value
                  </th>
                  <th className="px-6 py-4 text-right">CGST</th>
                  <th className="px-6 py-4 text-right">SGST</th>
                  <th className="px-6 py-4 text-right">IGST</th>
                  <th className="px-6 py-4 text-right">
                    Eligible ITC
                  </th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="text-sm">
                    <td className="px-6 py-5 font-black text-slate-900">
                      {record.invoiceNumber}
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800">
                        {record.vendor}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {record.gstin}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {record.invoiceDate}
                    </td>

                    <td className="px-6 py-5 text-right font-bold">
                      {formatCurrency(record.taxableValue)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      {formatCurrency(record.cgst)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      {formatCurrency(record.sgst)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      {formatCurrency(record.igst)}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-emerald-700">
                      {formatCurrency(record.eligibleCredit)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={record.status} />
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
      <div className="flex items-center justify-between gap-4">
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

function StatusBadge({ status }: { status: ITCStatus }) {
  const className =
    status === "Eligible"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Blocked"
        ? "bg-rose-100 text-rose-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}