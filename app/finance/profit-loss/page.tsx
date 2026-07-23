"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  FileBarChart2,
  IndianRupee,
  ReceiptText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type PLRecord = {
  id: number;
  category: string;
  type: "Income" | "Expense";
  currentMonth: number;
  previousMonth: number;
  yearToDate: number;
};

const initialRecords: PLRecord[] = [
  {
    id: 1,
    category: "Product Sales",
    type: "Income",
    currentMonth: 1850000,
    previousMonth: 1675000,
    yearToDate: 10650000,
  },
  {
    id: 2,
    category: "Service Revenue",
    type: "Income",
    currentMonth: 425000,
    previousMonth: 390000,
    yearToDate: 2320000,
  },
  {
    id: 3,
    category: "Cost of Goods Sold",
    type: "Expense",
    currentMonth: 920000,
    previousMonth: 875000,
    yearToDate: 5350000,
  },
  {
    id: 4,
    category: "Employee Salaries",
    type: "Expense",
    currentMonth: 485000,
    previousMonth: 470000,
    yearToDate: 2820000,
  },
  {
    id: 5,
    category: "Marketing Expenses",
    type: "Expense",
    currentMonth: 175000,
    previousMonth: 210000,
    yearToDate: 1190000,
  },
  {
    id: 6,
    category: "Office and Administration",
    type: "Expense",
    currentMonth: 115000,
    previousMonth: 108000,
    yearToDate: 650000,
  },
  {
    id: 7,
    category: "Interest Income",
    type: "Income",
    currentMonth: 28000,
    previousMonth: 24000,
    yearToDate: 145000,
  },
  {
    id: 8,
    category: "Interest Expense",
    type: "Expense",
    currentMonth: 72000,
    previousMonth: 74000,
    yearToDate: 435000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProfitLossPage() {
  const [records] = useState<PLRecord[]>(initialRecords);
  const [period, setPeriod] = useState("July 2026");

  const currentIncome = useMemo(
    () =>
      records
        .filter((record) => record.type === "Income")
        .reduce(
          (sum, record) => sum + record.currentMonth,
          0,
        ),
    [records],
  );

  const currentExpenses = useMemo(
    () =>
      records
        .filter((record) => record.type === "Expense")
        .reduce(
          (sum, record) => sum + record.currentMonth,
          0,
        ),
    [records],
  );

  const previousIncome = records
    .filter((record) => record.type === "Income")
    .reduce((sum, record) => sum + record.previousMonth, 0);

  const previousExpenses = records
    .filter((record) => record.type === "Expense")
    .reduce((sum, record) => sum + record.previousMonth, 0);

  const netProfit = currentIncome - currentExpenses;
  const previousProfit = previousIncome - previousExpenses;

  const profitMargin =
    currentIncome > 0 ? (netProfit / currentIncome) * 100 : 0;

  const profitGrowth =
    previousProfit !== 0
      ? ((netProfit - previousProfit) / previousProfit) * 100
      : 0;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Profit & Loss
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Income, expenses and company profitability statement
              </p>
            </div>
          </div>

          <div className="relative">
            <CalendarDays
              size={16}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-5 text-sm font-bold outline-none"
            >
              <option>July 2026</option>
              <option>June 2026</option>
              <option>May 2026</option>
              <option>FY 2026-27</option>
            </select>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Income"
            value={formatCurrency(currentIncome)}
            description={`Reporting period: ${period}`}
            icon={<TrendingUp size={22} />}
          />

          <SummaryCard
            title="Total Expenses"
            value={formatCurrency(currentExpenses)}
            description="Operating and finance costs"
            icon={<TrendingDown size={22} />}
          />

          <SummaryCard
            title="Net Profit"
            value={formatCurrency(netProfit)}
            description={`${profitGrowth.toFixed(1)}% versus previous month`}
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Profit Margin"
            value={`${profitMargin.toFixed(2)}%`}
            description="Net profit as percentage of income"
            icon={<FileBarChart2 size={22} />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-black text-slate-950">
                Profit & Loss Statement
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Comparative income and expense performance
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">Account Category</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">
                      Current Month
                    </th>
                    <th className="px-6 py-4 text-right">
                      Previous Month
                    </th>
                    <th className="px-6 py-4 text-right">
                      Year to Date
                    </th>
                    <th className="px-6 py-4 text-right">
                      Change
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => {
                    const change =
                      record.previousMonth !== 0
                        ? ((record.currentMonth -
                            record.previousMonth) /
                            record.previousMonth) *
                          100
                        : 0;

                    return (
                      <tr key={record.id} className="text-sm">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                              {record.type === "Income" ? (
                                <BriefcaseBusiness size={18} />
                              ) : (
                                <ReceiptText size={18} />
                              )}
                            </div>

                            <span className="font-black text-slate-900">
                              {record.category}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <TypeBadge type={record.type} />
                        </td>

                        <td className="px-6 py-5 text-right font-black text-slate-900">
                          {formatCurrency(record.currentMonth)}
                        </td>

                        <td className="px-6 py-5 text-right font-bold text-slate-500">
                          {formatCurrency(record.previousMonth)}
                        </td>

                        <td className="px-6 py-5 text-right font-bold text-[#102844]">
                          {formatCurrency(record.yearToDate)}
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
                </tbody>

                <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-5 text-sm font-black text-slate-950"
                    >
                      Net Profit
                    </td>

                    <td className="px-6 py-5 text-right text-lg font-black text-emerald-700">
                      {formatCurrency(netProfit)}
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-black text-slate-600">
                      {formatCurrency(previousProfit)}
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-black text-[#102844]">
                      {formatCurrency(
                        records.reduce(
                          (sum, record) =>
                            record.type === "Income"
                              ? sum + record.yearToDate
                              : sum - record.yearToDate,
                          0,
                        ),
                      )}
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-black text-emerald-700">
                      {profitGrowth >= 0 ? "+" : ""}
                      {profitGrowth.toFixed(1)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-[#102844] p-6 text-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ArrowUpRight size={22} />
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-widest text-blue-200">
                Net Profit
              </p>

              <p className="mt-3 text-3xl font-black">
                {formatCurrency(netProfit)}
              </p>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Profit margin for {period} is{" "}
                {profitMargin.toFixed(2)}%.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-950">
                Financial Summary
              </h3>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Gross Revenue"
                  value={formatCurrency(currentIncome)}
                />

                <SummaryRow
                  label="Operating Expenses"
                  value={formatCurrency(currentExpenses)}
                />

                <SummaryRow
                  label="Previous Profit"
                  value={formatCurrency(previousProfit)}
                />

                <SummaryRow
                  label="Profit Growth"
                  value={`${profitGrowth.toFixed(1)}%`}
                />
              </div>
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

function TypeBadge({
  type,
}: {
  type: "Income" | "Expense";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${
        type === "Income"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      {type}
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