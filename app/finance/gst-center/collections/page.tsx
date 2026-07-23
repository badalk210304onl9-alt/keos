"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  CircleDollarSign,
  IndianRupee,
  ReceiptText,
  Search,
  TrendingUp,
} from "lucide-react";

type CollectionStatus = "Collected" | "Pending" | "Partially Paid";

type GSTCollection = {
  id: number;
  invoiceNumber: string;
  customer: string;
  invoiceDate: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  status: CollectionStatus;
};

const initialCollections: GSTCollection[] = [
  {
    id: 1,
    invoiceNumber: "SALE-2026-1001",
    customer: "Orion Retail Pvt. Ltd.",
    invoiceDate: "2026-07-02",
    taxableValue: 180000,
    cgst: 16200,
    sgst: 16200,
    igst: 0,
    totalGST: 32400,
    status: "Collected",
  },
  {
    id: 2,
    invoiceNumber: "SALE-2026-1002",
    customer: "Zenith Fashion House",
    invoiceDate: "2026-07-06",
    taxableValue: 225000,
    cgst: 0,
    sgst: 0,
    igst: 40500,
    totalGST: 40500,
    status: "Collected",
  },
  {
    id: 3,
    invoiceNumber: "SALE-2026-1003",
    customer: "Urban Style Co.",
    invoiceDate: "2026-07-11",
    taxableValue: 95000,
    cgst: 8550,
    sgst: 8550,
    igst: 0,
    totalGST: 17100,
    status: "Pending",
  },
  {
    id: 4,
    invoiceNumber: "SALE-2026-1004",
    customer: "Metro Lifestyle",
    invoiceDate: "2026-07-16",
    taxableValue: 150000,
    cgst: 13500,
    sgst: 13500,
    igst: 0,
    totalGST: 27000,
    status: "Partially Paid",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GSTCollectionsPage() {
  const [collections] =
    useState<GSTCollection[]>(initialCollections);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredCollections = useMemo(() => {
    return collections.filter((record) => {
      const matchesSearch =
        record.invoiceNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        record.customer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || record.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [collections, search, status]);

  const totalGST = collections.reduce(
    (sum, record) => sum + record.totalGST,
    0,
  );

  const collectedGST = collections
    .filter((record) => record.status === "Collected")
    .reduce((sum, record) => sum + record.totalGST, 0);

  const pendingGST = totalGST - collectedGST;

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
              GST Collections
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor output GST collected from customer invoices
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Total GST Raised"
            value={formatCurrency(totalGST)}
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="GST Collected"
            value={formatCurrency(collectedGST)}
            icon={<CircleDollarSign size={22} />}
          />

          <SummaryCard
            title="GST Pending"
            value={formatCurrency(pendingGST)}
            icon={<TrendingUp size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Output GST Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                GST liability generated from sales invoices
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
                  placeholder="Search invoice or customer"
                  className="h-11 rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Collected</option>
                <option>Pending</option>
                <option>Partially Paid</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">
                    Taxable Value
                  </th>
                  <th className="px-6 py-4 text-right">CGST</th>
                  <th className="px-6 py-4 text-right">SGST</th>
                  <th className="px-6 py-4 text-right">IGST</th>
                  <th className="px-6 py-4 text-right">
                    Total GST
                  </th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCollections.map((record) => (
                  <tr key={record.id} className="text-sm">
                    <td className="px-6 py-5 font-black text-slate-900">
                      {record.invoiceNumber}
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-700">
                      {record.customer}
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

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(record.totalGST)}
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
  status: CollectionStatus;
}) {
  const className =
    status === "Collected"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Pending"
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