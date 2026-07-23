"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Download,
  IndianRupee,
  Landmark,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type BalanceCategory =
  | "Current Asset"
  | "Non-Current Asset"
  | "Current Liability"
  | "Non-Current Liability"
  | "Equity";

type BalanceRecord = {
  id: number;
  code: string;
  accountName: string;
  category: BalanceCategory;
  currentAmount: number;
  previousAmount: number;
};

const initialRecords: BalanceRecord[] = [
  {
    id: 1,
    code: "1101",
    accountName: "Cash and Cash Equivalents",
    category: "Current Asset",
    currentAmount: 1850000,
    previousAmount: 1520000,
  },
  {
    id: 2,
    code: "1102",
    accountName: "Trade Receivables",
    category: "Current Asset",
    currentAmount: 2450000,
    previousAmount: 2180000,
  },
  {
    id: 3,
    code: "1103",
    accountName: "Inventory",
    category: "Current Asset",
    currentAmount: 1725000,
    previousAmount: 1580000,
  },
  {
    id: 4,
    code: "1201",
    accountName: "Property, Plant and Equipment",
    category: "Non-Current Asset",
    currentAmount: 4850000,
    previousAmount: 5125000,
  },
  {
    id: 5,
    code: "1202",
    accountName: "Long-Term Investments",
    category: "Non-Current Asset",
    currentAmount: 1850000,
    previousAmount: 1625000,
  },
  {
    id: 6,
    code: "2101",
    accountName: "Trade Payables",
    category: "Current Liability",
    currentAmount: 1325000,
    previousAmount: 1180000,
  },
  {
    id: 7,
    code: "2102",
    accountName: "Short-Term Borrowings",
    category: "Current Liability",
    currentAmount: 850000,
    previousAmount: 920000,
  },
  {
    id: 8,
    code: "2201",
    accountName: "Long-Term Loans",
    category: "Non-Current Liability",
    currentAmount: 3480000,
    previousAmount: 3850000,
  },
  {
    id: 9,
    code: "3101",
    accountName: "Share Capital",
    category: "Equity",
    currentAmount: 5000000,
    previousAmount: 5000000,
  },
  {
    id: 10,
    code: "3102",
    accountName: "Retained Earnings",
    category: "Equity",
    currentAmount: 2070000,
    previousAmount: 1450000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BalanceSheetPage() {
  const [records] = useState<BalanceRecord[]>(initialRecords);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [period, setPeriod] = useState("2026-07");
  const [message, setMessage] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.accountName.toLowerCase().includes(query) ||
        record.code.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        record.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [records, search, categoryFilter]);

  const currentAssets = records
    .filter((record) => record.category === "Current Asset")
    .reduce((sum, record) => sum + record.currentAmount, 0);

  const nonCurrentAssets = records
    .filter((record) => record.category === "Non-Current Asset")
    .reduce((sum, record) => sum + record.currentAmount, 0);

  const currentLiabilities = records
    .filter((record) => record.category === "Current Liability")
    .reduce((sum, record) => sum + record.currentAmount, 0);

  const nonCurrentLiabilities = records
    .filter(
      (record) => record.category === "Non-Current Liability",
    )
    .reduce((sum, record) => sum + record.currentAmount, 0);

  const totalEquity = records
    .filter((record) => record.category === "Equity")
    .reduce((sum, record) => sum + record.currentAmount, 0);

  const totalAssets = currentAssets + nonCurrentAssets;

  const totalLiabilities =
    currentLiabilities + nonCurrentLiabilities;

  const liabilitiesAndEquity =
    totalLiabilities + totalEquity;

  const difference = totalAssets - liabilitiesAndEquity;

  function exportReport() {
    setMessage("Balance sheet report prepared successfully.");

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
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Back to finance"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Balance Sheet
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Assets, liabilities and shareholders&apos; equity
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="month"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-bold outline-none"
              />
            </div>

            <button
              type="button"
              onClick={exportReport}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17385f]"
            >
              <Download size={17} />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Assets"
            value={formatCurrency(totalAssets)}
            description="Current and non-current assets"
            icon={<Building2 size={22} />}
          />

          <SummaryCard
            title="Total Liabilities"
            value={formatCurrency(totalLiabilities)}
            description="Short-term and long-term liabilities"
            icon={<Landmark size={22} />}
          />

          <SummaryCard
            title="Total Equity"
            value={formatCurrency(totalEquity)}
            description="Capital and retained earnings"
            icon={<WalletCards size={22} />}
          />

          <SummaryCard
            title="Balance Difference"
            value={formatCurrency(difference)}
            description={
              difference === 0
                ? "Balance sheet is balanced"
                : "Review accounting balances"
            }
            icon={
              difference === 0 ? (
                <ShieldCheck size={22} />
              ) : (
                <Scale size={22} />
              )
            }
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Balance Sheet Accounts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Financial position for reporting period {period}
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
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search account"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none sm:w-60"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Current Asset">
                    Current Asset
                  </option>
                  <option value="Non-Current Asset">
                    Non-Current Asset
                  </option>
                  <option value="Current Liability">
                    Current Liability
                  </option>
                  <option value="Non-Current Liability">
                    Non-Current Liability
                  </option>
                  <option value="Equity">Equity</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">
                      Current Period
                    </th>
                    <th className="px-6 py-4 text-right">
                      Previous Period
                    </th>
                    <th className="px-6 py-4 text-right">
                      Change
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => {
                    const change =
                      record.previousAmount !== 0
                        ? ((record.currentAmount -
                            record.previousAmount) /
                            record.previousAmount) *
                          100
                        : 0;

                    return (
                      <tr
                        key={record.id}
                        className="text-sm transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-black text-slate-900">
                            {record.accountName}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Account code: {record.code}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <CategoryBadge
                            category={record.category}
                          />
                        </td>

                        <td className="px-6 py-5 text-right font-black text-slate-900">
                          {formatCurrency(record.currentAmount)}
                        </td>

                        <td className="px-6 py-5 text-right font-bold text-slate-500">
                          {formatCurrency(record.previousAmount)}
                        </td>

                        <td
                          className={`px-6 py-5 text-right font-black ${
                            change >= 0
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }`}
                        >
                          {change >= 0 ? "+" : ""}
                          {change.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center text-sm font-bold text-slate-400"
                      >
                        No balance sheet accounts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-[#102844] p-6 text-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Scale size={22} />
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-widest text-blue-200">
                Accounting Equation
              </p>

              <p className="mt-3 text-xl font-black">
                Assets = Liabilities + Equity
              </p>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                {difference === 0
                  ? "The balance sheet is fully balanced."
                  : `There is a difference of ${formatCurrency(
                      Math.abs(difference),
                    )}.`}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-950">
                Financial Position
              </h3>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Current Assets"
                  value={formatCurrency(currentAssets)}
                />

                <SummaryRow
                  label="Non-Current Assets"
                  value={formatCurrency(nonCurrentAssets)}
                />

                <SummaryRow
                  label="Current Liabilities"
                  value={formatCurrency(currentLiabilities)}
                />

                <SummaryRow
                  label="Long-Term Liabilities"
                  value={formatCurrency(nonCurrentLiabilities)}
                />

                <SummaryRow
                  label="Liabilities + Equity"
                  value={formatCurrency(liabilitiesAndEquity)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp
                  size={20}
                  className="text-emerald-700"
                />

                <h3 className="font-black text-slate-950">
                  Working Capital
                </h3>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-950">
                {formatCurrency(
                  currentAssets - currentLiabilities,
                )}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Current assets minus current liabilities
              </p>
            </div>
          </aside>
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
  icon: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
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

function CategoryBadge({
  category,
}: {
  category: BalanceCategory;
}) {
  const className =
    category === "Current Asset" ||
    category === "Non-Current Asset"
      ? "bg-emerald-100 text-emerald-700"
      : category === "Equity"
        ? "bg-violet-100 text-violet-700"
        : "bg-rose-100 text-rose-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {category}
    </span>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-none last:pb-0">
      <span className="text-sm font-semibold text-slate-500">
        {label}
      </span>

      <span className="text-sm font-black text-slate-900">
        {value}
      </span>
    </div>
  );
}