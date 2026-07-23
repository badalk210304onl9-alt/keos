"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Download,
  IndianRupee,
  Percent,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type Period = "6 Months" | "12 Months" | "Financial Year";

type MonthlyRecord = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
};

type ExpenseRecord = {
  name: string;
  percentage: number;
};

type RatioStatus = "Strong" | "Healthy" | "Review";

type RatioRecord = {
  name: string;
  value: string;
  benchmark: string;
  status: RatioStatus;
};

type InsightTone = "positive" | "warning" | "information";

type InsightRecord = {
  id: number;
  title: string;
  description: string;
  tone: InsightTone;
};

const monthlyData: MonthlyRecord[] = [
  {
    month: "Aug",
    revenue: 42,
    expenses: 29,
    profit: 13,
    cashFlow: 8,
  },
  {
    month: "Sep",
    revenue: 46,
    expenses: 31,
    profit: 15,
    cashFlow: 10,
  },
  {
    month: "Oct",
    revenue: 44,
    expenses: 30,
    profit: 14,
    cashFlow: 9,
  },
  {
    month: "Nov",
    revenue: 51,
    expenses: 33,
    profit: 18,
    cashFlow: 13,
  },
  {
    month: "Dec",
    revenue: 55,
    expenses: 35,
    profit: 20,
    cashFlow: 14,
  },
  {
    month: "Jan",
    revenue: 58,
    expenses: 36,
    profit: 22,
    cashFlow: 16,
  },
  {
    month: "Feb",
    revenue: 61,
    expenses: 38,
    profit: 23,
    cashFlow: 17,
  },
  {
    month: "Mar",
    revenue: 65,
    expenses: 40,
    profit: 25,
    cashFlow: 19,
  },
  {
    month: "Apr",
    revenue: 63,
    expenses: 41,
    profit: 22,
    cashFlow: 15,
  },
  {
    month: "May",
    revenue: 68,
    expenses: 42,
    profit: 26,
    cashFlow: 20,
  },
  {
    month: "Jun",
    revenue: 72,
    expenses: 44,
    profit: 28,
    cashFlow: 22,
  },
  {
    month: "Jul",
    revenue: 78,
    expenses: 46,
    profit: 32,
    cashFlow: 26,
  },
];

const expenseData: ExpenseRecord[] = [
  {
    name: "Inventory",
    percentage: 34,
  },
  {
    name: "Payroll",
    percentage: 24,
  },
  {
    name: "Marketing",
    percentage: 17,
  },
  {
    name: "Operations",
    percentage: 13,
  },
  {
    name: "Technology",
    percentage: 8,
  },
  {
    name: "Administration",
    percentage: 4,
  },
];

const ratioData: RatioRecord[] = [
  {
    name: "Current Ratio",
    value: "2.18",
    benchmark: "Above 1.50",
    status: "Healthy",
  },
  {
    name: "Quick Ratio",
    value: "1.64",
    benchmark: "Above 1.00",
    status: "Healthy",
  },
  {
    name: "Debt-to-Equity",
    value: "0.72",
    benchmark: "Below 1.00",
    status: "Healthy",
  },
  {
    name: "Gross Margin",
    value: "41.6%",
    benchmark: "Target 40%",
    status: "Strong",
  },
  {
    name: "Net Profit Margin",
    value: "18.4%",
    benchmark: "Target 15%",
    status: "Strong",
  },
  {
    name: "Return on Equity",
    value: "21.7%",
    benchmark: "Target 18%",
    status: "Strong",
  },
  {
    name: "Interest Coverage",
    value: "5.8×",
    benchmark: "Above 3.00×",
    status: "Healthy",
  },
  {
    name: "Inventory Turnover",
    value: "4.2×",
    benchmark: "Target 5.00×",
    status: "Review",
  },
];

const insightData: InsightRecord[] = [
  {
    id: 1,
    title: "Revenue momentum is improving",
    description:
      "Revenue has increased consistently during the latest reporting period.",
    tone: "positive",
  },
  {
    id: 2,
    title: "Inventory cost requires attention",
    description:
      "Inventory currently represents the largest share of operating expenses.",
    tone: "warning",
  },
  {
    id: 3,
    title: "Debt exposure remains controlled",
    description:
      "Debt-to-equity and interest coverage ratios remain within healthy limits.",
    tone: "information",
  },
  {
    id: 4,
    title: "Profit margin is above target",
    description:
      "Net profit margin is currently higher than the management target.",
    tone: "positive",
  },
];

function formatCrore(valueInLakh: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(valueInLakh * 100000);
}

function formatLakh(value: number): string {
  return `₹${value.toFixed(0)}L`;
}

export default function FinancialAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("12 Months");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState("");

  const visibleData = useMemo(() => {
    if (period === "6 Months") {
      return monthlyData.slice(-6);
    }

    return monthlyData;
  }, [period]);

  const totalRevenue = useMemo(() => {
    return visibleData.reduce(
      (total, record) => total + record.revenue,
      0,
    );
  }, [visibleData]);

  const totalExpenses = useMemo(() => {
    return visibleData.reduce(
      (total, record) => total + record.expenses,
      0,
    );
  }, [visibleData]);

  const totalProfit = totalRevenue - totalExpenses;

  const totalCashFlow = useMemo(() => {
    return visibleData.reduce(
      (total, record) => total + record.cashFlow,
      0,
    );
  }, [visibleData]);

  const netMargin =
    totalRevenue > 0
      ? (totalProfit / totalRevenue) * 100
      : 0;

  const latestRevenue =
    visibleData[visibleData.length - 1]?.revenue ?? 0;

  const previousRevenue =
    visibleData[visibleData.length - 2]?.revenue ??
    latestRevenue;

  const revenueGrowth =
    previousRevenue > 0
      ? ((latestRevenue - previousRevenue) /
          previousRevenue) *
        100
      : 0;

  function showNotification(message: string): void {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function handleRefresh(): void {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
      showNotification("Financial analytics refreshed.");
    }, 700);
  }

  function handlePrint(): void {
    window.print();
  }

  function handleExport(): void {
    const headings = [
      "Month",
      "Revenue (Lakh)",
      "Expenses (Lakh)",
      "Profit (Lakh)",
      "Cash Flow (Lakh)",
    ];

    const rows = visibleData.map((record) => [
      record.month,
      String(record.revenue),
      String(record.expenses),
      String(record.profit),
      String(record.cashFlow),
    ]);

    const csvContent = [headings, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download =
      "keos-financial-analytics.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(fileUrl);

    showNotification("Financial analytics exported.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      {notification ? (
        <div className="fixed right-5 top-5 z-[100] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#102844] shadow-2xl">
          {notification}
        </div>
      ) : null}

      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-[1650px] flex-col gap-5 px-5 py-5 sm:px-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              aria-label="Back to Finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black sm:text-3xl">
                  Financial Analytics
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  <Activity size={12} />
                  Live
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Margins, trends, ratios, forecasts and
                performance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value as Period)
                }
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-0 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none"
              >
                <option value="6 Months">
                  Last 6 Months
                </option>

                <option value="12 Months">
                  Last 12 Months
                </option>

                <option value="Financial Year">
                  Financial Year
                </option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw
                size={16}
                className={
                  isRefreshing ? "animate-spin" : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-4 text-sm font-bold text-white transition hover:bg-[#17395f]"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1650px] space-y-6 p-5 sm:p-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatCrore(totalRevenue)}
            change={`+${revenueGrowth.toFixed(1)}%`}
            description="Compared with previous month"
            icon={<IndianRupee size={22} />}
            tone="positive"
          />

          <MetricCard
            title="Operating Expenses"
            value={formatCrore(totalExpenses)}
            change="+6.2%"
            description="Cost growth during selected period"
            icon={<WalletCards size={22} />}
            tone="warning"
          />

          <MetricCard
            title="Net Profit"
            value={formatCrore(totalProfit)}
            change="+18.6%"
            description="Profit after operating expenses"
            icon={<TrendingUp size={22} />}
            tone="positive"
          />

          <MetricCard
            title="Net Profit Margin"
            value={`${netMargin.toFixed(1)}%`}
            change="+2.4%"
            description="Management target: 15%"
            icon={<Percent size={22} />}
            tone="positive"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <Panel
            title="Revenue and Profit Trend"
            description="Monthly revenue, expenses and profit"
            icon={<BarChart3 size={19} />}
          >
            <TrendChart data={visibleData} />
          </Panel>

          <Panel
            title="Expense Distribution"
            description="Share of total operating expenses"
            icon={<WalletCards size={19} />}
          >
            <div className="space-y-5">
              {expenseData.map((expense) => (
                <ProgressItem
                  key={expense.name}
                  label={expense.name}
                  value={expense.percentage}
                />
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Panel
            title="Monthly Cash Flow"
            description="Net cash generated from business activity"
            icon={<IndianRupee size={19} />}
          >
            <CashFlowChart data={visibleData} />
          </Panel>

          <Panel
            title="Performance Summary"
            description="Selected-period financial indicators"
            icon={<Target size={19} />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <PerformanceBox
                label="Total Revenue"
                value={formatCrore(totalRevenue)}
                note="Selected reporting period"
              />

              <PerformanceBox
                label="Total Profit"
                value={formatCrore(totalProfit)}
                note={`${netMargin.toFixed(1)}% net margin`}
              />

              <PerformanceBox
                label="Net Cash Flow"
                value={formatCrore(totalCashFlow)}
                note="Cash generated during period"
              />

              <PerformanceBox
                label="Revenue Growth"
                value={`${revenueGrowth.toFixed(1)}%`}
                note="Latest month comparison"
              />
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <Panel
            title="Financial Ratios"
            description="Liquidity, profitability and leverage"
            icon={<BarChart3 size={19} />}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="pb-4">Ratio</th>
                    <th className="pb-4">Value</th>
                    <th className="pb-4">Benchmark</th>
                    <th className="pb-4 text-right">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {ratioData.map((ratio) => (
                    <tr key={ratio.name}>
                      <td className="py-4 text-sm font-bold text-slate-800">
                        {ratio.name}
                      </td>

                      <td className="py-4 text-sm font-black text-[#102844]">
                        {ratio.value}
                      </td>

                      <td className="py-4 text-sm text-slate-500">
                        {ratio.benchmark}
                      </td>

                      <td className="py-4 text-right">
                        <RatioBadge
                          status={ratio.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel
            title="KEOS AI Insights"
            description="Automated financial observations"
            icon={<BrainCircuit size={19} />}
          >
            <div className="space-y-3">
              {insightData.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                />
              ))}
            </div>
          </Panel>
        </section>

        <section className="overflow-hidden rounded-3xl bg-[#102844] p-6 text-white shadow-xl sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[1fr_1.7fr] xl:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles size={23} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Financial Forecast
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
                Estimated performance based on current
                revenue, expense, profit and cash-flow trends.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ForecastCard
                label="Next Month Revenue"
                value="₹84.6L"
                note="+8.5% expected"
              />

              <ForecastCard
                label="Quarterly Profit"
                value="₹1.04Cr"
                note="Margin: 19.2%"
              />

              <ForecastCard
                label="Cash Requirement"
                value="₹26.8L"
                note="Next 30 days"
              />

              <ForecastCard
                label="Financial Risk"
                value="Low"
                note="Score: 18/100"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            title="Liquidity"
            value="Healthy"
            description="Current ratio is above benchmark"
            icon={<CheckCircle2 size={20} />}
            tone="positive"
          />

          <StatusCard
            title="Debt Exposure"
            value="Controlled"
            description="Debt-equity ratio remains below 1.00"
            icon={<ShieldCheck size={20} />}
            tone="positive"
          />

          <StatusCard
            title="Inventory Efficiency"
            value="Needs Review"
            description="Turnover is below management target"
            icon={<AlertTriangle size={20} />}
            tone="warning"
          />

          <StatusCard
            title="Profit Momentum"
            value="Improving"
            description="Net margin increased by 2.4%"
            icon={<ArrowUpRight size={20} />}
            tone="positive"
          />
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  change,
  description,
  icon,
  tone,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: ReactNode;
  tone: "positive" | "warning";
}) {
  const changeClass =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  const ChangeIcon =
    tone === "positive" ? TrendingUp : TrendingDown;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${changeClass}`}
        >
          <ChangeIcon size={12} />
          {change}
        </span>

        <span className="truncate text-xs text-slate-400">
          {description}
        </span>
      </div>
    </article>
  );
}

function Panel({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-black text-slate-950">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function TrendChart({
  data,
}: {
  data: MonthlyRecord[];
}) {
  const maxValue = Math.max(
    ...data.map((record) => record.revenue),
    1,
  );

  return (
    <div>
      <div className="flex h-[330px] items-end gap-3 overflow-x-auto border-b border-l border-slate-200 px-4 pb-0 pt-6">
        {data.map((record) => {
          const revenueHeight =
            (record.revenue / maxValue) * 250;

          const expenseHeight =
            (record.expenses / maxValue) * 250;

          const profitHeight =
            (record.profit / maxValue) * 250;

          return (
            <div
              key={record.month}
              className="flex min-w-[58px] flex-1 flex-col items-center"
            >
              <div className="flex h-[260px] items-end gap-1">
                <div
                  title={`Revenue: ${formatLakh(
                    record.revenue,
                  )}`}
                  className="w-3 rounded-t-md bg-[#102844]"
                  style={{
                    height: `${revenueHeight}px`,
                  }}
                />

                <div
                  title={`Expenses: ${formatLakh(
                    record.expenses,
                  )}`}
                  className="w-3 rounded-t-md bg-rose-400"
                  style={{
                    height: `${expenseHeight}px`,
                  }}
                />

                <div
                  title={`Profit: ${formatLakh(
                    record.profit,
                  )}`}
                  className="w-3 rounded-t-md bg-emerald-500"
                  style={{
                    height: `${profitHeight}px`,
                  }}
                />
              </div>

              <span className="mt-3 pb-3 text-[11px] font-bold text-slate-500">
                {record.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5">
        <ChartLegend
          className="bg-[#102844]"
          label="Revenue"
        />

        <ChartLegend
          className="bg-rose-400"
          label="Expenses"
        />

        <ChartLegend
          className="bg-emerald-500"
          label="Profit"
        />
      </div>
    </div>
  );
}

function CashFlowChart({
  data,
}: {
  data: MonthlyRecord[];
}) {
  const maxCashFlow = Math.max(
    ...data.map((record) => record.cashFlow),
    1,
  );

  return (
    <div className="flex h-[310px] items-end gap-3 overflow-x-auto border-b border-l border-slate-200 px-4 pt-6">
      {data.map((record) => {
        const barHeight =
          (record.cashFlow / maxCashFlow) * 230;

        return (
          <div
            key={record.month}
            className="flex min-w-[45px] flex-1 flex-col items-center"
          >
            <span className="mb-2 text-[10px] font-black text-slate-500">
              ₹{record.cashFlow}L
            </span>

            <div
              className="w-full max-w-9 rounded-t-lg bg-[#102844]"
              style={{
                height: `${barHeight}px`,
              }}
            />

            <span className="mt-3 pb-3 text-[11px] font-bold text-slate-500">
              {record.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProgressItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-slate-700">
          {label}
        </span>

        <span className="text-sm font-black text-[#102844]">
          {value}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#102844]"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function PerformanceBox({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {note}
      </p>
    </article>
  );
}

function RatioBadge({
  status,
}: {
  status: RatioStatus;
}) {
  const badgeClass =
    status === "Strong"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${badgeClass}`}
    >
      {status}
    </span>
  );
}

function InsightCard({
  insight,
}: {
  insight: InsightRecord;
}) {
  const configuration =
    insight.tone === "positive"
      ? {
          container:
            "border-emerald-100 bg-emerald-50",
          icon: "bg-emerald-100 text-emerald-700",
          element: <TrendingUp size={16} />,
        }
      : insight.tone === "warning"
        ? {
            container:
              "border-amber-100 bg-amber-50",
            icon: "bg-amber-100 text-amber-700",
            element: <AlertTriangle size={16} />,
          }
        : {
            container: "border-blue-100 bg-blue-50",
            icon: "bg-blue-100 text-blue-700",
            element: <Activity size={16} />,
          };

  return (
    <article
      className={`rounded-2xl border p-4 ${configuration.container}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${configuration.icon}`}
        >
          {configuration.element}
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-900">
            {insight.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            {insight.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function ForecastCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
        {label}
      </p>

      <p className="mt-3 text-xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-300">
        {note}
      </p>
    </article>
  );
}

function StatusCard({
  title,
  value,
  description,
  icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone: "positive" | "warning";
}) {
  const iconClass =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-lg font-black text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function ChartLegend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${className}`}
      />

      <span className="text-xs font-bold text-slate-500">
        {label}
      </span>
    </div>
  );
}