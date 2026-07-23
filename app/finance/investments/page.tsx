"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  IndianRupee,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type InvestmentStatus = "Active" | "Matured" | "Sold";

type InvestmentRecord = {
  id: number;
  investmentId: string;
  investmentName: string;
  category: string;
  institution: string;
  purchaseDate: string;
  maturityDate: string;
  investedAmount: number;
  currentValue: number;
  expectedReturn: number;
  status: InvestmentStatus;
};

const initialInvestments: InvestmentRecord[] = [
  {
    id: 1,
    investmentId: "INVEST-001",
    investmentName: "SBI Corporate Bond Fund",
    category: "Debt Mutual Fund",
    institution: "SBI Mutual Fund",
    purchaseDate: "2025-08-10",
    maturityDate: "2028-08-10",
    investedAmount: 1200000,
    currentValue: 1325000,
    expectedReturn: 8.2,
    status: "Active",
  },
  {
    id: 2,
    investmentId: "INVEST-002",
    investmentName: "Reliance Industries Ltd.",
    category: "Equity Shares",
    institution: "NSE",
    purchaseDate: "2025-11-15",
    maturityDate: "Long Term",
    investedAmount: 850000,
    currentValue: 970000,
    expectedReturn: 14.1,
    status: "Active",
  },
  {
    id: 3,
    investmentId: "INVEST-003",
    investmentName: "HDFC Fixed Deposit",
    category: "Fixed Deposit",
    institution: "HDFC Bank",
    purchaseDate: "2024-07-01",
    maturityDate: "2026-07-01",
    investedAmount: 500000,
    currentValue: 573500,
    expectedReturn: 7.1,
    status: "Matured",
  },
  {
    id: 4,
    investmentId: "INVEST-004",
    investmentName: "Gold ETF",
    category: "Exchange Traded Fund",
    institution: "NSE",
    purchaseDate: "2026-01-12",
    maturityDate: "Long Term",
    investedAmount: 400000,
    currentValue: 382000,
    expectedReturn: -4.5,
    status: "Active",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InvestmentsPage() {
  const [investments, setInvestments] =
    useState<InvestmentRecord[]>(initialInvestments);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredInvestments = useMemo(() => {
    const query = search.toLowerCase();

    return investments.filter((investment) => {
      const matchesSearch =
        investment.investmentName.toLowerCase().includes(query) ||
        investment.institution.toLowerCase().includes(query) ||
        investment.investmentId.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        investment.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [investments, search, categoryFilter]);

  const totalInvested = investments.reduce(
    (sum, investment) => sum + investment.investedAmount,
    0,
  );

  const currentPortfolioValue = investments.reduce(
    (sum, investment) => sum + investment.currentValue,
    0,
  );

  const totalGain = currentPortfolioValue - totalInvested;

  const returnPercentage =
    totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function markSold(id: number) {
    setInvestments((currentInvestments) =>
      currentInvestments.map((investment) =>
        investment.id === id
          ? { ...investment, status: "Sold" }
          : investment,
      ),
    );

    showMessage("Investment marked as sold.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">
          {message}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Investments
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage company investments, returns and portfolio records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              showMessage("New investment form will open here.")
            }
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
          >
            <Plus size={17} />
            Add Investment
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Invested"
            value={formatCurrency(totalInvested)}
            description="Original invested capital"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Portfolio Value"
            value={formatCurrency(currentPortfolioValue)}
            description="Current estimated market value"
            icon={<BriefcaseBusiness size={22} />}
          />

          <SummaryCard
            title="Total Gain / Loss"
            value={formatCurrency(totalGain)}
            description={`${returnPercentage.toFixed(2)}% portfolio return`}
            icon={
              totalGain >= 0 ? (
                <TrendingUp size={22} />
              ) : (
                <TrendingDown size={22} />
              )
            }
          />

          <SummaryCard
            title="Active Investments"
            value={String(
              investments.filter(
                (investment) => investment.status === "Active",
              ).length,
            )}
            description="Current investment positions"
            icon={<WalletCards size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Investment Portfolio
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track investment values and portfolio performance
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
                  placeholder="Search investment"
                  className="h-11 rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Debt Mutual Fund</option>
                <option>Equity Shares</option>
                <option>Fixed Deposit</option>
                <option>Exchange Traded Fund</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Investment</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Institution</th>
                  <th className="px-6 py-4">Maturity</th>
                  <th className="px-6 py-4 text-right">Invested</th>
                  <th className="px-6 py-4 text-right">
                    Current Value
                  </th>
                  <th className="px-6 py-4 text-right">Return</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredInvestments.map((investment) => {
                  const gain =
                    investment.currentValue -
                    investment.investedAmount;

                  return (
                    <tr key={investment.id} className="text-sm">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                            <BarChart3 size={18} />
                          </div>

                          <div>
                            <p className="font-black text-slate-900">
                              {investment.investmentName}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {investment.investmentId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 font-semibold text-slate-700">
                        {investment.category}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {investment.institution}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {investment.maturityDate}
                      </td>

                      <td className="px-6 py-5 text-right font-bold">
                        {formatCurrency(investment.investedAmount)}
                      </td>

                      <td className="px-6 py-5 text-right font-black text-[#102844]">
                        {formatCurrency(investment.currentValue)}
                      </td>

                      <td
                        className={`px-6 py-5 text-right font-black ${
                          gain >= 0
                            ? "text-emerald-700"
                            : "text-rose-700"
                        }`}
                      >
                        {formatCurrency(gain)}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={investment.status} />
                      </td>

                      <td className="px-6 py-5 text-right">
                        {investment.status === "Active" ? (
                          <button
                            type="button"
                            onClick={() => markSold(investment.id)}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-xs font-black text-rose-700 hover:bg-rose-100"
                          >
                            Mark Sold
                          </button>
                        ) : (
                          <span className="text-xs font-black text-slate-400">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredInvestments.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center text-sm font-bold text-slate-400"
                    >
                      No investments found
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
  icon: ReactNode;
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

function StatusBadge({
  status,
}: {
  status: InvestmentStatus;
}) {
  const className =
    status === "Active"
      ? "bg-blue-100 text-blue-700"
      : status === "Matured"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-slate-200 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}