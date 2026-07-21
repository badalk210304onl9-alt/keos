"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileDown,
  FileSpreadsheet,
  Gauge,
  IndianRupee,
  Landmark,
  Layers3,
  Lightbulb,
  LineChart,
  Lock,
  MoreHorizontal,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type ScenarioType = "Best Case" | "Expected Case" | "Worst Case";

type ForecastHealth =
  | "Strong"
  | "Stable"
  | "Watch"
  | "Critical";

type ForecastStatus =
  | "Draft"
  | "Generated"
  | "Under Review"
  | "Approved"
  | "Locked";

type ForecastRecord = {
  id: string;
  month: string;
  quarter: string;
  revenue: number;
  expenses: number;
  ebitda: number;
  profit: number;
  cashBalance: number;
  growth: number;
  margin: number;
  confidence: number;
  health: ForecastHealth;
  status: ForecastStatus;
};

type DepartmentForecast = {
  department: string;
  revenue: number;
  expenses: number;
  variance: number;
  confidence: number;
  health: ForecastHealth;
};

type ForecastRecommendation = {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
};

const forecastRecords: ForecastRecord[] = [
  {
    id: "FC-2026-001",
    month: "April 2026",
    quarter: "Q1 FY27",
    revenue: 4200000,
    expenses: 3150000,
    ebitda: 1050000,
    profit: 780000,
    cashBalance: 6200000,
    growth: 8.4,
    margin: 18.6,
    confidence: 94,
    health: "Strong",
    status: "Approved",
  },
  {
    id: "FC-2026-002",
    month: "May 2026",
    quarter: "Q1 FY27",
    revenue: 4550000,
    expenses: 3290000,
    ebitda: 1260000,
    profit: 910000,
    cashBalance: 6730000,
    growth: 9.2,
    margin: 20,
    confidence: 93,
    health: "Strong",
    status: "Approved",
  },
  {
    id: "FC-2026-003",
    month: "June 2026",
    quarter: "Q1 FY27",
    revenue: 4880000,
    expenses: 3460000,
    ebitda: 1420000,
    profit: 1040000,
    cashBalance: 7440000,
    growth: 10.1,
    margin: 21.3,
    confidence: 92,
    health: "Strong",
    status: "Locked",
  },
  {
    id: "FC-2026-004",
    month: "July 2026",
    quarter: "Q2 FY27",
    revenue: 5150000,
    expenses: 3810000,
    ebitda: 1340000,
    profit: 960000,
    cashBalance: 7860000,
    growth: 7.8,
    margin: 18.6,
    confidence: 91,
    health: "Stable",
    status: "Generated",
  },
  {
    id: "FC-2026-005",
    month: "August 2026",
    quarter: "Q2 FY27",
    revenue: 5490000,
    expenses: 4050000,
    ebitda: 1440000,
    profit: 1050000,
    cashBalance: 8420000,
    growth: 8.7,
    margin: 19.1,
    confidence: 90,
    health: "Stable",
    status: "Generated",
  },
  {
    id: "FC-2026-006",
    month: "September 2026",
    quarter: "Q2 FY27",
    revenue: 5780000,
    expenses: 4290000,
    ebitda: 1490000,
    profit: 1100000,
    cashBalance: 9010000,
    growth: 9.4,
    margin: 19,
    confidence: 89,
    health: "Stable",
    status: "Under Review",
  },
  {
    id: "FC-2026-007",
    month: "October 2026",
    quarter: "Q3 FY27",
    revenue: 6320000,
    expenses: 4680000,
    ebitda: 1640000,
    profit: 1210000,
    cashBalance: 9680000,
    growth: 11.6,
    margin: 19.1,
    confidence: 87,
    health: "Stable",
    status: "Draft",
  },
  {
    id: "FC-2026-008",
    month: "November 2026",
    quarter: "Q3 FY27",
    revenue: 6880000,
    expenses: 5120000,
    ebitda: 1760000,
    profit: 1290000,
    cashBalance: 10300000,
    growth: 12.2,
    margin: 18.8,
    confidence: 86,
    health: "Watch",
    status: "Draft",
  },
  {
    id: "FC-2026-009",
    month: "December 2026",
    quarter: "Q3 FY27",
    revenue: 7450000,
    expenses: 5630000,
    ebitda: 1820000,
    profit: 1320000,
    cashBalance: 10900000,
    growth: 13.1,
    margin: 17.7,
    confidence: 84,
    health: "Watch",
    status: "Draft",
  },
  {
    id: "FC-2026-010",
    month: "January 2027",
    quarter: "Q4 FY27",
    revenue: 7020000,
    expenses: 5580000,
    ebitda: 1440000,
    profit: 1020000,
    cashBalance: 11200000,
    growth: 6.8,
    margin: 14.5,
    confidence: 82,
    health: "Watch",
    status: "Draft",
  },
  {
    id: "FC-2026-011",
    month: "February 2027",
    quarter: "Q4 FY27",
    revenue: 7280000,
    expenses: 5790000,
    ebitda: 1490000,
    profit: 1060000,
    cashBalance: 11500000,
    growth: 7.2,
    margin: 14.6,
    confidence: 81,
    health: "Watch",
    status: "Draft",
  },
  {
    id: "FC-2026-012",
    month: "March 2027",
    quarter: "Q4 FY27",
    revenue: 7760000,
    expenses: 6080000,
    ebitda: 1680000,
    profit: 1200000,
    cashBalance: 12100000,
    growth: 8.5,
    margin: 15.5,
    confidence: 80,
    health: "Stable",
    status: "Draft",
  },
];

const departmentForecasts: DepartmentForecast[] = [
  {
    department: "Products & Merchandising",
    revenue: 28600000,
    expenses: 17200000,
    variance: 1250000,
    confidence: 94,
    health: "Strong",
  },
  {
    department: "Marketing",
    revenue: 12800000,
    expenses: 8900000,
    variance: -760000,
    confidence: 86,
    health: "Watch",
  },
  {
    department: "Technology",
    revenue: 5400000,
    expenses: 6800000,
    variance: -1100000,
    confidence: 84,
    health: "Watch",
  },
  {
    department: "Warehouse & Logistics",
    revenue: 7800000,
    expenses: 5900000,
    variance: 420000,
    confidence: 89,
    health: "Stable",
  },
  {
    department: "Creative Studio",
    revenue: 6800000,
    expenses: 4900000,
    variance: 650000,
    confidence: 88,
    health: "Stable",
  },
  {
    department: "Customer Experience",
    revenue: 4600000,
    expenses: 3200000,
    variance: 310000,
    confidence: 91,
    health: "Strong",
  },
];

const recommendations: ForecastRecommendation[] = [
  {
    id: 1,
    title: "Reduce paid acquisition concentration",
    description:
      "Shift 12% of underperforming paid-social allocation into creator partnerships and high-intent search campaigns.",
    category: "Cost Optimization",
    impact: "₹8.4L annual savings",
    priority: "High",
  },
  {
    id: 2,
    title: "Accelerate premium product launches",
    description:
      "The model predicts stronger contribution margins from premium outerwear and signature accessories.",
    category: "Revenue Growth",
    impact: "+₹18.6L revenue",
    priority: "High",
  },
  {
    id: 3,
    title: "Delay non-critical technology hiring",
    description:
      "Move two planned hires from Q2 to Q3 while completing current automation initiatives.",
    category: "Workforce Planning",
    impact: "₹5.2L cash protection",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Reallocate warehouse capacity",
    description:
      "Increase festive inventory capacity before October to reduce fulfillment delays and lost orders.",
    category: "Operational Planning",
    impact: "+7.8% fulfillment capacity",
    priority: "Medium",
  },
];

const scenarios = {
  "Best Case": {
    revenue: 79800000,
    expenses: 57000000,
    profit: 17100000,
    cash: 14300000,
    growth: 24.8,
    margin: 21.4,
    confidence: 76,
  },
  "Expected Case": {
    revenue: 70310000,
    expenses: 52930000,
    profit: 12890000,
    cash: 12100000,
    growth: 16.7,
    margin: 18.3,
    confidence: 89,
  },
  "Worst Case": {
    revenue: 59400000,
    expenses: 50800000,
    profit: 6200000,
    cash: 7400000,
    growth: 5.1,
    margin: 10.4,
    confidence: 71,
  },
};

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getHealthClass(health: ForecastHealth) {
  switch (health) {
    case "Strong":
      return "bg-emerald-50 text-emerald-700";
    case "Stable":
      return "bg-blue-50 text-blue-700";
    case "Watch":
      return "bg-amber-50 text-amber-700";
    case "Critical":
      return "bg-red-50 text-red-700";
  }
}

function getStatusClass(status: ForecastStatus) {
  switch (status) {
    case "Draft":
      return "bg-slate-100 text-slate-600";
    case "Generated":
      return "bg-blue-50 text-blue-700";
    case "Under Review":
      return "bg-amber-50 text-amber-700";
    case "Approved":
      return "bg-emerald-50 text-emerald-700";
    case "Locked":
      return "bg-purple-50 text-purple-700";
  }
}

function getPriorityClass(priority: "High" | "Medium" | "Low") {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700";
    case "Medium":
      return "bg-amber-50 text-amber-700";
    case "Low":
      return "bg-emerald-50 text-emerald-700";
  }
}

export default function ForecastingPage() {
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioType>("Expected Case");

  const [selectedForecast, setSelectedForecast] =
    useState<ForecastRecord | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [quarterFilter, setQuarterFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const selectedScenarioData = scenarios[selectedScenario];

  const filteredForecasts = useMemo(() => {
    return forecastRecords.filter((forecast) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        forecast.id.toLowerCase().includes(query) ||
        forecast.month.toLowerCase().includes(query) ||
        forecast.quarter.toLowerCase().includes(query);

      const matchesQuarter =
        quarterFilter === "All" ||
        forecast.quarter === quarterFilter;

      const matchesStatus =
        statusFilter === "All" ||
        forecast.status === statusFilter;

      return matchesSearch && matchesQuarter && matchesStatus;
    });
  }, [quarterFilter, searchQuery, statusFilter]);

  const totalRevenue = forecastRecords.reduce(
    (sum, record) => sum + record.revenue,
    0,
  );

  const totalExpenses = forecastRecords.reduce(
    (sum, record) => sum + record.expenses,
    0,
  );

  const totalProfit = forecastRecords.reduce(
    (sum, record) => sum + record.profit,
    0,
  );

  const averageConfidence =
    forecastRecords.reduce(
      (sum, record) => sum + record.confidence,
      0,
    ) / forecastRecords.length;

  const maxRevenue = Math.max(
    ...forecastRecords.map((record) => record.revenue),
  );

  function generateForecast() {
    setIsGenerating(true);

    window.setTimeout(() => {
      setIsGenerating(false);
      window.alert(
        "KEOS AI forecast has been regenerated successfully.",
      );
    }, 1400);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#10233b]">
      <main className="mx-auto w-full max-w-[1900px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <section className="rounded-[30px] bg-[#10233b] p-5 text-white shadow-[0_24px_70px_rgba(15,35,59,0.16)] sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Link
                href="/finance"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-300 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Finance Command Center
              </Link>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                  <BrainCircuit className="h-7 w-7" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      AI Engine Active
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-300">
                      FY 2026–27
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
                    Forecasting & Financial Planning
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-300">
                    AI-powered revenue, expense, profit and cash-flow
                    forecasting with scenario planning, confidence
                    scoring and founder-level financial controls.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generateForecast}
                disabled={isGenerating}
                className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <RefreshCcw
                  className={[
                    "h-4 w-4",
                    isGenerating ? "animate-spin" : "",
                  ].join(" ")}
                />
                {isGenerating
                  ? "Generating..."
                  : "Generate Forecast"}
              </button>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export
              </button>

              <button
                type="button"
                onClick={() => setIsLocked((current) => !current)}
                className={[
                  "flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-black transition",
                  isLocked
                    ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                    : "border-white/15 bg-white/5 text-white hover:bg-white/10",
                ].join(" ")}
              >
                {isLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                {isLocked ? "Forecast Locked" : "Lock Forecast"}
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              title: "Revenue Forecast",
              value: formatCompactCurrency(totalRevenue),
              change: "+16.7%",
              icon: CircleDollarSign,
              iconClass: "bg-blue-50 text-blue-600",
            },
            {
              title: "Expense Forecast",
              value: formatCompactCurrency(totalExpenses),
              change: "+9.4%",
              icon: WalletCards,
              iconClass: "bg-red-50 text-red-600",
            },
            {
              title: "Profit Forecast",
              value: formatCompactCurrency(totalProfit),
              change: "+21.3%",
              icon: TrendingUp,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Closing Cash",
              value: formatCompactCurrency(
                forecastRecords[forecastRecords.length - 1]
                  .cashBalance,
              ),
              change: "+₹59L",
              icon: Landmark,
              iconClass: "bg-purple-50 text-purple-600",
            },
            {
              title: "AI Confidence",
              value: `${averageConfidence.toFixed(1)}%`,
              change: "High",
              icon: BrainCircuit,
              iconClass: "bg-amber-50 text-amber-600",
            },
          ].map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      card.iconClass,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
                    {card.change}
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-black tracking-tight text-[#10233b]">
                  {card.value}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.55fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Rolling Financial Forecast
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Revenue, Expense & Profit Projection
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monthly outlook across FY 2026–27.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Revenue
                </span>

                <span className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Expense
                </span>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <div className="flex min-w-[900px] items-end gap-4">
                {forecastRecords.map((record) => {
                  const revenueHeight =
                    (record.revenue / maxRevenue) * 250;

                  const expenseHeight =
                    (record.expenses / maxRevenue) * 250;

                  return (
                    <div
                      key={record.id}
                      className="flex min-w-[58px] flex-1 flex-col items-center"
                    >
                      <div className="flex h-[270px] items-end gap-1.5">
                        <div
                          className="w-5 rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                          style={{ height: `${revenueHeight}px` }}
                          title={`Revenue: ${formatCurrency(
                            record.revenue,
                          )}`}
                        />

                        <div
                          className="w-5 rounded-t-lg bg-red-400 transition hover:bg-red-500"
                          style={{ height: `${expenseHeight}px` }}
                          title={`Expense: ${formatCurrency(
                            record.expenses,
                          )}`}
                        />
                      </div>

                      <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {record.month.split(" ")[0].slice(0, 3)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Highest Revenue Month
                </p>

                <p className="mt-2 text-sm font-black text-[#10233b]">
                  March 2027
                </p>

                <p className="mt-1 text-lg font-black text-blue-600">
                  ₹77.6L
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Average Monthly Profit
                </p>

                <p className="mt-2 text-sm font-black text-[#10233b]">
                  FY 2026–27
                </p>

                <p className="mt-1 text-lg font-black text-emerald-600">
                  ₹10.7L
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Cash Runway
                </p>

                <p className="mt-2 text-sm font-black text-[#10233b]">
                  Projected
                </p>

                <p className="mt-1 text-lg font-black text-purple-600">
                  18.4 months
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.16)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                <Sparkles className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                89% confidence
              </span>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              KEOS AI Financial Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight">
              Growth remains strong, but margin pressure may increase
              in Q3.
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              Revenue is projected to grow faster than expenses.
              Marketing and technology commitments should be reviewed
              before the festive expansion cycle.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Revenue opportunity
                  </span>

                  <span className="text-sm font-black text-emerald-300">
                    +₹18.6L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Cost-saving potential
                  </span>

                  <span className="text-sm font-black text-amber-300">
                    ₹13.6L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Forecast risk
                  </span>

                  <span className="text-sm font-black text-red-300">
                    Moderate
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              <BrainCircuit className="h-4 w-4" />
              Open AI Planning Assistant
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                Scenario Planning
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Financial Scenario Simulator
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Compare best, expected and downside operating outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  "Best Case",
                  "Expected Case",
                  "Worst Case",
                ] as ScenarioType[]
              ).map((scenario) => (
                <button
                  key={scenario}
                  type="button"
                  onClick={() => setSelectedScenario(scenario)}
                  className={[
                    "rounded-xl px-4 py-2.5 text-xs font-black transition",
                    selectedScenario === scenario
                      ? "bg-[#10233b] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {scenario}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
            {[
              {
                label: "Revenue",
                value: formatCompactCurrency(
                  selectedScenarioData.revenue,
                ),
                icon: CircleDollarSign,
              },
              {
                label: "Expenses",
                value: formatCompactCurrency(
                  selectedScenarioData.expenses,
                ),
                icon: WalletCards,
              },
              {
                label: "Net Profit",
                value: formatCompactCurrency(
                  selectedScenarioData.profit,
                ),
                icon: TrendingUp,
              },
              {
                label: "Closing Cash",
                value: formatCompactCurrency(
                  selectedScenarioData.cash,
                ),
                icon: Landmark,
              },
              {
                label: "Growth",
                value: `${selectedScenarioData.growth}%`,
                icon: Activity,
              },
              {
                label: "Confidence",
                value: `${selectedScenarioData.confidence}%`,
                icon: BrainCircuit,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#10233b] shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>

                  <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-2 text-xl font-black text-[#10233b]">
                    {item.value}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#10233b]">
                  {selectedScenario} Operating Margin
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Projected EBITDA-aligned profitability indicator
                </p>
              </div>

              <p className="text-3xl font-black text-[#10233b]">
                {selectedScenarioData.margin}%
              </p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={[
                  "h-full rounded-full",
                  selectedScenario === "Best Case"
                    ? "bg-emerald-500"
                    : selectedScenario === "Expected Case"
                      ? "bg-blue-500"
                      : "bg-red-500",
                ].join(" ")}
                style={{
                  width: `${Math.min(
                    selectedScenarioData.margin * 4,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Department Forecast
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Department-level financial outlook and variance.
                </p>
              </div>

              <Building2 className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-5 space-y-3">
              {departmentForecasts.map((department) => (
                <div
                  key={department.department}
                  className="rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {department.department}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Revenue{" "}
                        {formatCompactCurrency(department.revenue)} ·
                        Expense{" "}
                        {formatCompactCurrency(department.expenses)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getHealthClass(department.health),
                        ].join(" ")}
                      >
                        {department.health}
                      </span>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">
                        {department.confidence}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-slate-500">
                      Forecast variance
                    </span>

                    <span
                      className={[
                        "flex items-center gap-1 text-sm font-black",
                        department.variance >= 0
                          ? "text-emerald-600"
                          : "text-red-600",
                      ].join(" ")}
                    >
                      {department.variance >= 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}

                      {formatCompactCurrency(
                        Math.abs(department.variance),
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  AI Recommendations
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Recommended actions based on forecast signals.
                </p>
              </div>

              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>

            <div className="mt-5 space-y-3">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-amber-400">
                      <Sparkles className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-[#10233b]">
                          {recommendation.title}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                            getPriorityClass(
                              recommendation.priority,
                            ),
                          ].join(" ")}
                        >
                          {recommendation.priority}
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                        {recommendation.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {recommendation.category}
                        </span>

                        <span className="text-xs font-black text-emerald-600">
                          {recommendation.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Forecast Register
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Monthly Financial Forecast
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Review monthly revenue, expense, profit and cash
                  projections.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-[320px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search month, quarter or ID..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <select
                  value={quarterFilter}
                  onChange={(event) =>
                    setQuarterFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Quarters</option>
                  <option value="Q1 FY27">Q1 FY27</option>
                  <option value="Q2 FY27">Q2 FY27</option>
                  <option value="Q3 FY27">Q3 FY27</option>
                  <option value="Q4 FY27">Q4 FY27</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Draft">Draft</option>
                  <option value="Generated">Generated</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Locked">Locked</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  {[
                    "Forecast ID",
                    "Period",
                    "Revenue",
                    "Expenses",
                    "EBITDA",
                    "Net Profit",
                    "Cash Balance",
                    "Growth",
                    "Margin",
                    "Confidence",
                    "Health",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredForecasts.map((forecast) => (
                  <tr
                    key={forecast.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {forecast.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {forecast.month}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {forecast.quarter}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-blue-600">
                      {formatCompactCurrency(forecast.revenue)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-red-600">
                      {formatCompactCurrency(forecast.expenses)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {formatCompactCurrency(forecast.ebitda)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-emerald-600">
                      {formatCompactCurrency(forecast.profit)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-purple-600">
                      {formatCompactCurrency(
                        forecast.cashBalance,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm font-black text-emerald-600">
                        <ArrowUpRight className="h-4 w-4" />
                        {forecast.growth}%
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {forecast.margin}%
                    </td>

                    <td className="px-5 py-4">
                      <div className="w-[110px]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#10233b]">
                            {forecast.confidence}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${forecast.confidence}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getHealthClass(forecast.health),
                        ].join(" ")}
                      >
                        {forecast.health}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getStatusClass(forecast.status),
                        ].join(" ")}
                      >
                        {forecast.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedForecast(forecast)
                          }
                          className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredForecasts.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      className="px-5 py-16 text-center"
                    >
                      <Search className="mx-auto h-8 w-8 text-slate-300" />

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No forecast records found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change the search term or selected filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Showing {filteredForecasts.length} of{" "}
              {forecastRecords.length} forecast records
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-300"
              >
                Previous
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10233b] text-xs font-black text-white"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <FileSpreadsheet className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Export Excel
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Download forecast workbook
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <FileDown className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Export PDF
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Founder forecast report
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Approve Forecast
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Submit financial plan
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Forecasting & Financial Planning</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Forecast engine operational</span>
            <span>·</span>
            <span>AI confidence 89%</span>
            <span>·</span>
            <span>FY 2026–27 active</span>
          </div>
        </footer>

        {selectedForecast && (
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close forecast details"
              onClick={() => setSelectedForecast(null)}
              className="absolute inset-0 bg-[#07111f]/60 backdrop-blur-[3px]"
            />

            <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f5f7fa] shadow-[-24px_0_70px_rgba(15,35,59,0.22)] sm:max-w-[680px]">
              <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      {selectedForecast.id}
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-[#10233b]">
                      {selectedForecast.month}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedForecast.quarter}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedForecast(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-7">
                <section className="rounded-[26px] bg-[#10233b] p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                        Revenue Forecast
                      </p>

                      <p className="mt-2 text-4xl font-black">
                        {formatCompactCurrency(
                          selectedForecast.revenue,
                        )}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black text-emerald-300">
                      {selectedForecast.confidence}% confidence
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Expenses
                      </p>

                      <p className="mt-2 text-lg font-black">
                        {formatCompactCurrency(
                          selectedForecast.expenses,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Profit
                      </p>

                      <p className="mt-2 text-lg font-black text-emerald-300">
                        {formatCompactCurrency(
                          selectedForecast.profit,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        EBITDA
                      </p>

                      <p className="mt-2 text-lg font-black">
                        {formatCompactCurrency(
                          selectedForecast.ebitda,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Cash Balance
                      </p>

                      <p className="mt-2 text-lg font-black text-purple-300">
                        {formatCompactCurrency(
                          selectedForecast.cashBalance,
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Growth
                    </p>

                    <p className="mt-1 text-xl font-black text-[#10233b]">
                      {selectedForecast.growth}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <Gauge className="h-5 w-5 text-blue-500" />

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Margin
                    </p>

                    <p className="mt-1 text-xl font-black text-[#10233b]">
                      {selectedForecast.margin}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <ShieldCheck className="h-5 w-5 text-purple-500" />

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Health
                    </p>

                    <span
                      className={[
                        "mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                        getHealthClass(selectedForecast.health),
                      ].join(" ")}
                    >
                      {selectedForecast.health}
                    </span>
                  </div>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      <BrainCircuit className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                        AI Risk Analysis
                      </p>

                      <h3 className="mt-2 text-base font-black text-[#10233b]">
                        Forecast Intelligence
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-black text-[#10233b]">
                        Revenue Outlook
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        Revenue growth remains positive, supported by
                        premium product launches and seasonal demand.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-black text-[#10233b]">
                        Expense Risk
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        Marketing and technology commitments may
                        create short-term margin pressure.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-black text-[#10233b]">
                        Recommended Action
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        Maintain weekly variance reviews and restrict
                        unplanned expenditure above ₹1 lakh.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-black text-[#10233b]">
                    Forecast Actions
                  </h3>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </button>

                    <button
                      type="button"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#10233b] hover:bg-slate-50"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Regenerate
                    </button>

                    <button
                      type="button"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#10233b] hover:bg-slate-50"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Export Excel
                    </button>

                    <button
                      type="button"
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#10233b] hover:bg-slate-50"
                    >
                      <FileDown className="h-4 w-4" />
                      Export PDF
                    </button>
                  </div>
                </section>

                <button
                  type="button"
                  onClick={() => setSelectedForecast(null)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white hover:bg-[#183653]"
                >
                  Close Forecast Details
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}