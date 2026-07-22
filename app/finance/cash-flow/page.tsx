"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileBarChart,
  Filter,
  IndianRupee,
  Landmark,
  Printer,
  RefreshCcw,
  Search,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type CashFlowCategory = "Operating" | "Investing" | "Financing";

type CashFlowEntry = {
  id: number;
  date: string;
  reference: string;
  description: string;
  category: CashFlowCategory;
  type: "Inflow" | "Outflow";
  amount: number;
};

const cashFlowEntries: CashFlowEntry[] = [
  {
    id: 1,
    date: "2026-07-01",
    reference: "RCT-2026-00071",
    description: "Customer receipt — Aarav Retail",
    category: "Operating",
    type: "Inflow",
    amount: 245000,
  },
  {
    id: 2,
    date: "2026-07-03",
    reference: "PAY-2026-00128",
    description: "Vendor payment — Luxury Textile Industries",
    category: "Operating",
    type: "Outflow",
    amount: 125000,
  },
  {
    id: 3,
    date: "2026-07-05",
    reference: "AST-2026-00018",
    description: "Purchase of design workstations",
    category: "Investing",
    type: "Outflow",
    amount: 210000,
  },
  {
    id: 4,
    date: "2026-07-08",
    reference: "CAP-2026-00009",
    description: "Founder capital contribution",
    category: "Financing",
    type: "Inflow",
    amount: 500000,
  },
  {
    id: 5,
    date: "2026-07-10",
    reference: "RCT-2026-00076",
    description: "Online store collections",
    category: "Operating",
    type: "Inflow",
    amount: 315000,
  },
  {
    id: 6,
    date: "2026-07-12",
    reference: "PAY-2026-00134",
    description: "Employee salaries",
    category: "Operating",
    type: "Outflow",
    amount: 185000,
  },
  {
    id: 7,
    date: "2026-07-15",
    reference: "INVEST-2026-00011",
    description: "Investment in AI infrastructure",
    category: "Investing",
    type: "Outflow",
    amount: 175000,
  },
  {
    id: 8,
    date: "2026-07-18",
    reference: "LOAN-2026-00004",
    description: "Business loan proceeds",
    category: "Financing",
    type: "Inflow",
    amount: 300000,
  },
  {
    id: 9,
    date: "2026-07-20",
    reference: "LOAN-2026-00005",
    description: "Loan instalment paid",
    category: "Financing",
    type: "Outflow",
    amount: 65000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CashFlowPage() {
  const [period, setPeriod] = useState("July 2026");
  const [category, setCategory] = useState<"All" | CashFlowCategory>(
    "All",
  );
  const [search, setSearch] = useState("");

  const openingCash = 425000;

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cashFlowEntries.filter((entry) => {
      const matchesCategory =
        category === "All" || entry.category === category;

      const matchesSearch =
        !query ||
        entry.description.toLowerCase().includes(query) ||
        entry.reference.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const totalInflows = useMemo(
    () =>
      cashFlowEntries
        .filter((entry) => entry.type === "Inflow")
        .reduce((total, entry) => total + entry.amount, 0),
    [],
  );

  const totalOutflows = useMemo(
    () =>
      cashFlowEntries
        .filter((entry) => entry.type === "Outflow")
        .reduce((total, entry) => total + entry.amount, 0),
    [],
  );

  const operatingCashFlow = useMemo(
    () =>
      cashFlowEntries
        .filter((entry) => entry.category === "Operating")
        .reduce(
          (total, entry) =>
            total +
            (entry.type === "Inflow" ? entry.amount : -entry.amount),
          0,
        ),
    [],
  );

  const investingCashFlow = useMemo(
    () =>
      cashFlowEntries
        .filter((entry) => entry.category === "Investing")
        .reduce(
          (total, entry) =>
            total +
            (entry.type === "Inflow" ? entry.amount : -entry.amount),
          0,
        ),
    [],
  );

  const financingCashFlow = useMemo(
    () =>
      cashFlowEntries
        .filter((entry) => entry.category === "Financing")
        .reduce(
          (total, entry) =>
            total +
            (entry.type === "Inflow" ? entry.amount : -entry.amount),
          0,
        ),
    [],
  );

  const netCashFlow = totalInflows - totalOutflows;
  const closingCash = openingCash + netCashFlow;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-black">Cash Flow Statement</h1>
              <p className="mt-1 text-sm text-slate-500">
                Analyse operating, investing and financing cash movements.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700">
              <RefreshCcw size={17} />
              Refresh
            </button>

            <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700">
              <Printer size={17} />
              Print
            </button>

            <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white">
              <Download size={17} />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1680px] px-5 py-6 lg:px-8">
        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            title="Opening Cash"
            value={formatCurrency(openingCash)}
            description="Beginning balance"
            icon={<WalletCards size={21} />}
          />

          <MetricCard
            title="Total Inflows"
            value={formatCurrency(totalInflows)}
            description="Cash received"
            icon={<ArrowDownRight size={21} />}
            positive
          />

          <MetricCard
            title="Total Outflows"
            value={formatCurrency(totalOutflows)}
            description="Cash paid"
            icon={<ArrowUpRight size={21} />}
            negative
          />

          <MetricCard
            title="Net Cash Flow"
            value={formatCurrency(netCashFlow)}
            description="Net increase in cash"
            icon={<TrendingUp size={21} />}
            positive={netCashFlow >= 0}
            negative={netCashFlow < 0}
          />

          <MetricCard
            title="Closing Cash"
            value={formatCurrency(closingCash)}
            description="Ending cash balance"
            icon={<IndianRupee size={21} />}
          />
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-3">
          <CashFlowCategoryCard
            title="Operating Activities"
            value={operatingCashFlow}
            description="Collections, expenses and working capital"
            icon={<Building2 size={22} />}
          />

          <CashFlowCategoryCard
            title="Investing Activities"
            value={investingCashFlow}
            description="Assets, systems and long-term investments"
            icon={<Landmark size={22} />}
          />

          <CashFlowCategoryCard
            title="Financing Activities"
            value={financingCashFlow}
            description="Capital, loans and repayments"
            icon={<CircleDollarSign size={22} />}
          />
        </section>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Reporting Period
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-semibold outline-none"
                >
                  <option>July 2026</option>
                  <option>June 2026</option>
                  <option>Q1 FY 2026–27</option>
                  <option>FY 2026–27</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Activity Type
              </label>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value as
                        | "All"
                        | CashFlowCategory,
                    )
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-semibold outline-none"
                >
                  <option>All</option>
                  <option>Operating</option>
                  <option>Investing</option>
                  <option>Financing</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Search Transactions
              </label>

              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search reference or description"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                <FileBarChart size={21} />
              </div>

              <div>
                <h2 className="font-black">Cash Flow Transactions</h2>
                <p className="text-xs text-slate-500">
                  Cash movement details for {period}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-black text-slate-700">
              {filteredEntries.length} transactions
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Movement</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="text-sm">
                    <td className="px-6 py-4 font-semibold text-slate-600">
                      {entry.date}
                    </td>

                    <td className="px-6 py-4 font-black text-slate-900">
                      {entry.reference}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {entry.description}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-700">
                        {entry.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black ${
                          entry.type === "Inflow"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {entry.type === "Inflow" ? (
                          <TrendingUp size={13} />
                        ) : (
                          <TrendingDown size={13} />
                        )}
                        {entry.type}
                      </span>
                    </td>

                    <td
                      className={`px-6 py-4 text-right font-black ${
                        entry.type === "Inflow"
                          ? "text-emerald-700"
                          : "text-rose-700"
                      }`}
                    >
                      {entry.type === "Outflow" ? "− " : "+ "}
                      {formatCurrency(entry.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-[#102844] text-white">
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-5 text-sm font-black"
                  >
                    Net Cash Flow
                  </td>

                  <td className="px-6 py-5 text-right text-lg font-black">
                    {formatCurrency(netCashFlow)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
  positive,
  negative,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">{title}</p>

          <p
            className={`mt-3 text-xl font-black ${
              positive
                ? "text-emerald-700"
                : negative
                  ? "text-rose-700"
                  : "text-slate-950"
            }`}
          >
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function CashFlowCategoryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  const positive = value >= 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-900">{title}</p>

          <p
            className={`mt-3 text-2xl font-black ${
              positive ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {formatCurrency(value)}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}