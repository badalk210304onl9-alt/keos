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
  CircleDollarSign,
  Download,
  FileSpreadsheet,
  IndianRupee,
  LineChart,
  Percent,
  PieChart,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Period = "6 Months" | "12 Months" | "Financial Year";

type MetricTone =
  | "positive"
  | "negative"
  | "neutral"
  | "warning";

type InsightType =
  | "positive"
  | "warning"
  | "negative"
  | "information";

type RatioStatus = "Healthy" | "Watch" | "Strong";

type RevenueRecord = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
};

type ExpenseRecord = {
  name: string;
  value: number;
};

type RatioRecord = {
  name: string;
  value: string;
  benchmark: string;
  status: RatioStatus;
};

type InsightRecord = {
  id: number;
  title: string;
  description: string;
  type: InsightType;
};

const twelveMonthData: RevenueRecord[] = [
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
  { name: "Inventory", value: 34 },
  { name: "Payroll", value: 24 },
  { name: "Marketing", value: 17 },
  { name: "Operations", value: 13 },
  { name: "Technology", value: 8 },
  { name: "Administration", value: 4 },
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
    status: "Watch",
  },
];

const insightData: InsightRecord[] = [
  {
    id: 1,
    title: "Revenue momentum is improving",
    description:
      "Revenue increased for three consecutive months and is currently 14.7% above the quarterly average.",
    type: "positive",
  },
  {
    id: 2,
    title: "Inventory cost requires attention",
    description:
      "Inventory represents 34% of total operating expenses and turnover remains below the internal target.",
    type: "warning",
  },
  {
    id: 3,
    title: "Debt position remains manageable",
    description:
      "The debt-to-equity ratio is 0.72 and interest coverage remains comfortably above the minimum benchmark.",
    type: "information",
  },
  {
    id: 4,
    title: "Profit margin is above target",
    description:
      "Net profit margin stands at 18.4%, exceeding the management target of 15%.",
    type: "positive",
  },
];

const expenseColors = [
  "#102844",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#64748b",
];

function formatLakh(value: number): string {
  return `₹${value.toFixed(1)}L`;
}

function formatCrore(value: number): string {
  return `₹${value.toFixed(2)}Cr`;
}

export default function FinancialAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("12 Months");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState("");

  const chartData = useMemo(() => {
    if (period === "6 Months") {
      return twelveMonthData.slice(-6);
    }

    return twelveMonthData;
  }, [period]);

  const totalRevenue = useMemo(
    () =>
      chartData.reduce(
        (total, record) => total + record.revenue,
        0,
      ),
    [chartData],
  );

  const totalExpenses = useMemo(
    () =>
      chartData.reduce(
        (total, record) => total + record.expenses,
        0,
      ),
    [chartData],
  );

  const totalProfit = totalRevenue - totalExpenses;

  const netMargin =
    totalRevenue > 0
      ? (totalProfit / totalRevenue) * 100
      : 0;

  const latestRevenue =
    chartData[chartData.length - 1]?.revenue ?? 0;

  const previousRevenue =
    chartData[chartData.length - 2]?.revenue ?? latestRevenue;

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

  function handleCsvExport(): void {
    const header =
      "Month,Revenue (Lakh),Expenses (Lakh),Profit (Lakh),Cash Flow (Lakh)";

    const rows = chartData.map((record) =>
      [
        record.month,
        record.revenue,
        record.expenses,
        record.profit,
        record.cashFlow,
      ].join(","),
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-financial-analytics.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
    showNotification("Analytics CSV exported successfully.");
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
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
                Margins, trends, ratios, forecasts and financial
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
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-0 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-400"
              >
                <option value="6 Months">Last 6 Months</option>
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
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleCsvExport}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FileSpreadsheet size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-4 text-sm font-bold text-white transition hover:bg-[#17395f]"
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
            value={formatCrore(totalRevenue / 100)}
            change={`+${revenueGrowth.toFixed(1)}%`}
            description="Compared with previous month"
            icon={<IndianRupee size={22} />}
            tone="positive"
          />

          <MetricCard
            title="Operating Expenses"
            value={formatCrore(totalExpenses / 100)}
            change="+6.2%"
            description="Cost growth during selected period"
            icon={<WalletCards size={22} />}
            tone="warning"
          />

          <MetricCard
            title="Net Profit"
            value={formatCrore(totalProfit / 100)}
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
          <AnalyticsPanel
            title="Revenue and Profit Trend"
            description="Monthly revenue, operating expenses and net profit"
            icon={<LineChart size={19} />}
          >
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 15,
                    right: 20,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#102844"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="#102844"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    tickFormatter={(value: number) =>
                      `₹${value}L`
                    }
                  />

                  <Tooltip content={<AnalyticsTooltip />} />

                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "18px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#102844"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />

                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="profit"
                    name="Net Profit"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsPanel>

          <AnalyticsPanel
            title="Expense Distribution"
            description="Share of total operating expenses"
            icon={<PieChart size={19} />}
          >
            <div className="h-[270px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          expenseColors[
                            index % expenseColors.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
  formatter={(value) => [
    `${Number(value ?? 0)}%`,
    "Expense Share",
  ]}
/>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {expenseData.map((expense, index) => (
                <div
                  key={expense.name}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          expenseColors[
                            index % expenseColors.length
                          ],
                      }}
                    />

                    <span className="truncate text-xs font-semibold text-slate-600">
                      {expense.name}
                    </span>
                  </div>

                  <span className="text-xs font-black text-slate-900">
                    {expense.value}%
                  </span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <AnalyticsPanel
            title="Monthly Cash Flow"
            description="Net cash generated from business activity"
            icon={<CircleDollarSign size={19} />}
          >
            <div className="h-[310px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 15,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    tickFormatter={(value: number) =>
                      `₹${value}L`
                    }
                  />

                  <Tooltip content={<AnalyticsTooltip />} />

                  <Bar
                    dataKey="cashFlow"
                    name="Cash Flow"
                    fill="#102844"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsPanel>

          <AnalyticsPanel
            title="Revenue vs Forecast"
            description="Actual performance against management forecast"
            icon={<Target size={19} />}
          >
            <div className="h-[310px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={chartData.map((item, index) => ({
                    ...item,
                    forecast:
                      item.revenue *
                      (index % 3 === 0 ? 1.05 : 0.97),
                  }))}
                  margin={{
                    top: 15,
                    right: 20,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    tickFormatter={(value: number) =>
                      `₹${value}L`
                    }
                  />

                  <Tooltip content={<AnalyticsTooltip />} />

                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "15px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Actual Revenue"
                    stroke="#102844"
                    strokeWidth={3}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="forecast"
                    name="Forecast"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="7 7"
                    dot={false}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </AnalyticsPanel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <AnalyticsPanel
            title="Financial Ratios"
            description="Liquidity, profitability and leverage indicators"
            icon={<BarChart3 size={19} />}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="pb-4">Ratio</th>
                    <th className="pb-4">Current Value</th>
                    <th className="pb-4">Benchmark</th>
                    <th className="pb-4 text-right">Status</th>
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
                        <RatioBadge status={ratio.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnalyticsPanel>

          <AnalyticsPanel
            title="KEOS AI Insights"
            description="Automated observations from financial performance"
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
          </AnalyticsPanel>
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
                Estimated performance based on current revenue,
                margin, expense and cash-flow patterns.
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
          <QuickStatusCard
            title="Liquidity"
            value="Healthy"
            description="Current ratio is above benchmark"
            icon={<CheckCircle2 size={20} />}
            status="positive"
          />

          <QuickStatusCard
            title="Debt Exposure"
            value="Controlled"
            description="Debt-equity ratio remains below 1.00"
            icon={<ShieldCheck size={20} />}
            status="positive"
          />

          <QuickStatusCard
            title="Inventory Efficiency"
            value="Needs Review"
            description="Turnover is below management target"
            icon={<AlertTriangle size={20} />}
            status="warning"
          />

          <QuickStatusCard
            title="Profit Momentum"
            value="Improving"
            description="Net margin increased by 2.4%"
            icon={<ArrowUpRight size={20} />}
            status="positive"
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
  tone: MetricTone;
}) {
  const toneClass =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "negative"
        ? "bg-rose-50 text-rose-700"
        : tone === "warning"
          ? "bg-amber-50 text-amber-700"
          : "bg-slate-100 text-slate-700";

  const ChangeIcon =
    tone === "negative" ? TrendingDown : TrendingUp;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
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
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${toneClass}`}
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

function AnalyticsPanel({
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

function RatioBadge({
  status,
}: {
  status: RatioStatus;
}) {
  const className =
    status === "Strong"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Healthy"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
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
  const styles =
    insight.type === "positive"
      ? {
          container: "border-emerald-100 bg-emerald-50",
          icon: "bg-emerald-100 text-emerald-700",
          element: <TrendingUp size={16} />,
        }
      : insight.type === "warning"
        ? {
            container: "border-amber-100 bg-amber-50",
            icon: "bg-amber-100 text-amber-700",
            element: <AlertTriangle size={16} />,
          }
        : insight.type === "negative"
          ? {
              container: "border-rose-100 bg-rose-50",
              icon: "bg-rose-100 text-rose-700",
              element: <TrendingDown size={16} />,
            }
          : {
              container: "border-blue-100 bg-blue-50",
              icon: "bg-blue-100 text-blue-700",
              element: <Activity size={16} />,
            };

  return (
    <article
      className={`rounded-2xl border p-4 ${styles.container}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {styles.element}
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
    <article className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
        {label}
      </p>

      <p className="mt-3 text-xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-300">{note}</p>
    </article>
  );
}

function QuickStatusCard({
  title,
  value,
  description,
  icon,
  status,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  status: "positive" | "warning";
}) {
  const iconClass =
    status === "positive"
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

function AnalyticsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <p className="mb-2 text-xs font-black text-slate-900">
        {label}
      </p>

      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={`${item.name}-${String(item.value)}`}
            className="flex items-center justify-between gap-6"
          >
            <span className="text-xs text-slate-500">
              {item.name}
            </span>

            <span className="text-xs font-black text-slate-900">
              {typeof item.value === "number"
                ? formatLakh(item.value)
                : String(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}