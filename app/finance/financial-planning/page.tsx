"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileBarChart,
  IndianRupee,
  Landmark,
  LineChart,
  RefreshCcw,
  Save,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type Scenario = "Expected Case" | "Best Case" | "Worst Case";
type PlanStatus = "Draft" | "Submitted" | "Approved";

type ForecastRow = {
  id: number;
  month: string;
  revenue: number;
  expenses: number;
  cashInflow: number;
  cashOutflow: number;
};

const forecastData: ForecastRow[] = [
  {
    id: 1,
    month: "April",
    revenue: 2500000,
    expenses: 1750000,
    cashInflow: 2300000,
    cashOutflow: 1680000,
  },
  {
    id: 2,
    month: "May",
    revenue: 2700000,
    expenses: 1850000,
    cashInflow: 2500000,
    cashOutflow: 1780000,
  },
  {
    id: 3,
    month: "June",
    revenue: 2950000,
    expenses: 1980000,
    cashInflow: 2750000,
    cashOutflow: 1910000,
  },
  {
    id: 4,
    month: "July",
    revenue: 3200000,
    expenses: 2100000,
    cashInflow: 2980000,
    cashOutflow: 2050000,
  },
  {
    id: 5,
    month: "August",
    revenue: 3450000,
    expenses: 2250000,
    cashInflow: 3220000,
    cashOutflow: 2180000,
  },
  {
    id: 6,
    month: "September",
    revenue: 3700000,
    expenses: 2380000,
    cashInflow: 3500000,
    cashOutflow: 2290000,
  },
  {
    id: 7,
    month: "October",
    revenue: 4100000,
    expenses: 2570000,
    cashInflow: 3850000,
    cashOutflow: 2470000,
  },
  {
    id: 8,
    month: "November",
    revenue: 4550000,
    expenses: 2800000,
    cashInflow: 4270000,
    cashOutflow: 2680000,
  },
  {
    id: 9,
    month: "December",
    revenue: 5200000,
    expenses: 3150000,
    cashInflow: 4900000,
    cashOutflow: 2980000,
  },
  {
    id: 10,
    month: "January",
    revenue: 4800000,
    expenses: 2950000,
    cashInflow: 4500000,
    cashOutflow: 2810000,
  },
  {
    id: 11,
    month: "February",
    revenue: 5100000,
    expenses: 3050000,
    cashInflow: 4760000,
    cashOutflow: 2920000,
  },
  {
    id: 12,
    month: "March",
    revenue: 5600000,
    expenses: 3280000,
    cashInflow: 5250000,
    cashOutflow: 3110000,
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function FinancialPlanningPage() {
  const [status, setStatus] = useState<PlanStatus>("Draft");
  const [message, setMessage] = useState("");

  const [planNumber] = useState("FPL-2026-00012");
  const [planName, setPlanName] = useState(
    "KRVE Annual Growth and Financial Plan",
  );
  const [financialYear, setFinancialYear] = useState("FY 2026–27");
  const [scenario, setScenario] = useState<Scenario>("Expected Case");
  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [branch, setBranch] = useState("All Branches");
  const [department, setDepartment] = useState("Enterprise Wide");
  const [growthTarget, setGrowthTarget] = useState(28);
  const [grossMarginTarget, setGrossMarginTarget] = useState(48);
  const [operatingMarginTarget, setOperatingMarginTarget] = useState(18);
  const [minimumCashReserve, setMinimumCashReserve] = useState(2500000);
  const [fundingRequirement, setFundingRequirement] = useState(7500000);
  const [capitalExpenditure, setCapitalExpenditure] = useState(4200000);
  const [workingCapitalRequirement, setWorkingCapitalRequirement] =
    useState(5800000);
  const [notes, setNotes] = useState(
    "Growth planning assumes expansion in digital sales, AI virtual studio adoption and controlled operating expenses.",
  );

  const [forecastRows, setForecastRows] =
    useState<ForecastRow[]>(forecastData);

  const scenarioMultiplier =
    scenario === "Best Case"
      ? 1.18
      : scenario === "Worst Case"
        ? 0.82
        : 1;

  const expenseMultiplier =
    scenario === "Best Case"
      ? 1.08
      : scenario === "Worst Case"
        ? 0.92
        : 1;

  const adjustedRows = useMemo(
    () =>
      forecastRows.map((row) => ({
        ...row,
        revenue: row.revenue * scenarioMultiplier,
        expenses: row.expenses * expenseMultiplier,
        cashInflow: row.cashInflow * scenarioMultiplier,
        cashOutflow: row.cashOutflow * expenseMultiplier,
      })),
    [forecastRows, scenarioMultiplier, expenseMultiplier],
  );

  const totalRevenue = useMemo(
    () =>
      adjustedRows.reduce(
        (total, row) => total + Number(row.revenue || 0),
        0,
      ),
    [adjustedRows],
  );

  const totalExpenses = useMemo(
    () =>
      adjustedRows.reduce(
        (total, row) => total + Number(row.expenses || 0),
        0,
      ),
    [adjustedRows],
  );

  const totalCashInflow = useMemo(
    () =>
      adjustedRows.reduce(
        (total, row) => total + Number(row.cashInflow || 0),
        0,
      ),
    [adjustedRows],
  );

  const totalCashOutflow = useMemo(
    () =>
      adjustedRows.reduce(
        (total, row) => total + Number(row.cashOutflow || 0),
        0,
      ),
    [adjustedRows],
  );

  const projectedProfit = totalRevenue - totalExpenses;
  const projectedCashSurplus = totalCashInflow - totalCashOutflow;

  const projectedEbitda =
    projectedProfit + totalExpenses * 0.08;

  const projectedTax = Math.max(projectedProfit * 0.25, 0);
  const projectedNetProfit = projectedProfit - projectedTax;

  const netProfitMargin =
    totalRevenue > 0 ? (projectedNetProfit / totalRevenue) * 100 : 0;

  const expenseRatio =
    totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;

  const fundingGap =
    fundingRequirement +
    capitalExpenditure +
    workingCapitalRequirement -
    Math.max(projectedCashSurplus, 0);

  const breakEvenRevenue =
    operatingMarginTarget > 0
      ? totalExpenses / (1 - operatingMarginTarget / 100)
      : 0;

  const returnOnInvestment =
    fundingRequirement > 0
      ? (projectedNetProfit / fundingRequirement) * 100
      : 0;

  const riskScore =
    scenario === "Worst Case"
      ? 76
      : scenario === "Best Case"
        ? 28
        : 46;

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const updateForecast = (
    id: number,
    field: keyof Pick<
      ForecastRow,
      "revenue" | "expenses" | "cashInflow" | "cashOutflow"
    >,
    value: number,
  ) => {
    setForecastRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: Math.max(0, Number(value || 0)),
            }
          : row,
      ),
    );
  };

  const refreshForecast = () => {
    setForecastRows(forecastData);
    showMessage("Financial forecast refreshed.");
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Financial plan saved as draft.");
  };

  const submitPlan = () => {
    if (!planName.trim()) {
      showMessage("Please enter the financial plan name.");
      return;
    }

    if (totalRevenue <= 0) {
      showMessage("Revenue forecast must be greater than zero.");
      return;
    }

    setStatus("Submitted");
    showMessage("Financial plan submitted for approval.");
  };

  const approvePlan = () => {
    if (totalRevenue <= 0) {
      showMessage("Complete the forecast before approval.");
      return;
    }

    setStatus("Approved");
    showMessage("Financial plan approved successfully.");
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={18} />
          </div>

          <p className="text-sm font-bold text-slate-800">{message}</p>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight">
                  Financial Planning
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                    status === "Approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : status === "Submitted"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Forecast revenue, expenses, profits, cash requirements and
                business growth.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={refreshForecast}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
            >
              <RefreshCcw size={17} />
              Refresh
            </button>

            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
            >
              <Save size={17} />
              Save Draft
            </button>

            <button
              type="button"
              onClick={submitPlan}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
            >
              <Send size={17} />
              Submit
            </button>

            <button
              type="button"
              onClick={approvePlan}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white"
            >
              <BadgeCheck size={17} />
              Approve
            </button>

            <button
              type="button"
              onClick={() => showMessage("Financial report exported.")}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white"
            >
              <Download size={17} />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1680px] px-5 py-6 lg:px-8">
        <section className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                <FileBarChart size={21} />
              </div>

              <div>
                <h2 className="font-black">Plan Information</h2>
                <p className="text-xs text-slate-500">
                  Scenario, organization and planning period
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Plan Number
              </p>

              <p className="mt-1 text-sm font-black">{planNumber}</p>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Financial Plan Name</label>

              <input
                value={planName}
                onChange={(event) => setPlanName(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Financial Year</label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <select
                  value={financialYear}
                  onChange={(event) => setFinancialYear(event.target.value)}
                  className={`${inputClass} appearance-none pl-10 pr-10`}
                >
                  <option>FY 2026–27</option>
                  <option>FY 2027–28</option>
                  <option>FY 2028–29</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Planning Scenario</label>

              <div className="relative">
                <select
                  value={scenario}
                  onChange={(event) =>
                    setScenario(event.target.value as Scenario)
                  }
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option>Expected Case</option>
                  <option>Best Case</option>
                  <option>Worst Case</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Company</label>

              <div className="relative">
                <Building2
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <select
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className={`${inputClass} pl-10`}
                >
                  <option>KRVE Fashion Studio Private Limited</option>
                  <option>KRVE Technologies Private Limited</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Branch</label>

              <select
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                className={inputClass}
              >
                <option>All Branches</option>
                <option>Varanasi Head Office</option>
                <option>Delhi Corporate Office</option>
                <option>Mumbai Operations</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Department</label>

              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className={inputClass}
              >
                <option>Enterprise Wide</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Technology</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Revenue Forecast"
            value={formatCurrency(totalRevenue)}
            description={`${growthTarget}% annual growth target`}
            icon={<TrendingUp size={21} />}
            positive
          />

          <MetricCard
            title="Expense Forecast"
            value={formatCurrency(totalExpenses)}
            description={`${expenseRatio.toFixed(1)}% of revenue`}
            icon={<TrendingDown size={21} />}
            negative
          />

          <MetricCard
            title="Projected Net Profit"
            value={formatCurrency(projectedNetProfit)}
            description={`${netProfitMargin.toFixed(1)}% net margin`}
            icon={<IndianRupee size={21} />}
            positive={projectedNetProfit >= 0}
            negative={projectedNetProfit < 0}
          />

          <MetricCard
            title="Projected EBITDA"
            value={formatCurrency(projectedEbitda)}
            description="Operating earnings projection"
            icon={<BarChart3 size={21} />}
            positive
          />

          <MetricCard
            title="Cash Surplus"
            value={formatCurrency(projectedCashSurplus)}
            description="Forecast cash inflow less outflow"
            icon={<WalletCards size={21} />}
            positive={projectedCashSurplus >= 0}
            negative={projectedCashSurplus < 0}
          />

          <MetricCard
            title="Funding Gap"
            value={formatCurrency(Math.max(fundingGap, 0))}
            description="Estimated external funding need"
            icon={<Landmark size={21} />}
            negative={fundingGap > 0}
          />

          <MetricCard
            title="Break-even Revenue"
            value={formatCurrency(breakEvenRevenue)}
            description="Minimum required revenue"
            icon={<Target size={21} />}
          />

          <MetricCard
            title="Projected ROI"
            value={`${returnOnInvestment.toFixed(1)}%`}
            description="Return on proposed funding"
            icon={<CircleDollarSign size={21} />}
            positive={returnOnInvestment >= 0}
          />
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Target size={21} />
                </div>

                <div>
                  <h2 className="font-black">Financial Targets</h2>
                  <p className="text-xs text-slate-500">
                    Set growth, margin, reserve and funding targets
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Growth Target %</label>

                  <input
                    type="number"
                    value={growthTarget}
                    onChange={(event) =>
                      setGrowthTarget(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Gross Margin Target %</label>

                  <input
                    type="number"
                    value={grossMarginTarget}
                    onChange={(event) =>
                      setGrossMarginTarget(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Operating Margin Target %
                  </label>

                  <input
                    type="number"
                    value={operatingMarginTarget}
                    onChange={(event) =>
                      setOperatingMarginTarget(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Minimum Cash Reserve</label>

                  <input
                    type="number"
                    min="0"
                    value={minimumCashReserve}
                    onChange={(event) =>
                      setMinimumCashReserve(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Funding Requirement</label>

                  <input
                    type="number"
                    min="0"
                    value={fundingRequirement}
                    onChange={(event) =>
                      setFundingRequirement(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Capital Expenditure</label>

                  <input
                    type="number"
                    min="0"
                    value={capitalExpenditure}
                    onChange={(event) =>
                      setCapitalExpenditure(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label className={labelClass}>
                    Working Capital Requirement
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={workingCapitalRequirement}
                    onChange={(event) =>
                      setWorkingCapitalRequirement(
                        Number(event.target.value),
                      )
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <LineChart size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Monthly Forecast</h2>
                    <p className="text-xs text-slate-500">
                      Revenue, expenses, cash movement and profit planning
                    </p>
                  </div>
                </div>

                <span className="rounded-xl bg-slate-50 px-4 py-2 text-xs font-black text-slate-700">
                  {scenario}
                </span>
              </div>

              <div className="overflow-x-auto p-6">
                <table className="min-w-[1100px] w-full">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-3 py-4">Month</th>
                      <th className="px-3 py-4 text-right">Revenue</th>
                      <th className="px-3 py-4 text-right">Expenses</th>
                      <th className="px-3 py-4 text-right">Profit</th>
                      <th className="px-3 py-4 text-right">Cash Inflow</th>
                      <th className="px-3 py-4 text-right">Cash Outflow</th>
                      <th className="px-3 py-4 text-right">Net Cash</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {adjustedRows.map((row) => {
                      const baseRow =
                        forecastRows.find((item) => item.id === row.id) ??
                        row;

                      const profit = row.revenue - row.expenses;
                      const netCash = row.cashInflow - row.cashOutflow;

                      return (
                        <tr key={row.id}>
                          <td className="px-3 py-4 text-sm font-black text-slate-900">
                            {row.month}
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              value={baseRow.revenue}
                              onChange={(event) =>
                                updateForecast(
                                  row.id,
                                  "revenue",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-36 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              value={baseRow.expenses}
                              onChange={(event) =>
                                updateForecast(
                                  row.id,
                                  "expenses",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-36 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td
                            className={`px-3 py-4 text-right text-sm font-black ${
                              profit >= 0
                                ? "text-emerald-700"
                                : "text-rose-700"
                            }`}
                          >
                            {formatCurrency(profit)}
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              value={baseRow.cashInflow}
                              onChange={(event) =>
                                updateForecast(
                                  row.id,
                                  "cashInflow",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-36 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              value={baseRow.cashOutflow}
                              onChange={(event) =>
                                updateForecast(
                                  row.id,
                                  "cashOutflow",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-36 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td
                            className={`px-3 py-4 text-right text-sm font-black ${
                              netCash >= 0
                                ? "text-emerald-700"
                                : "text-rose-700"
                            }`}
                          >
                            {formatCurrency(netCash)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                  <tfoot className="bg-[#102844] text-white">
                    <tr>
                      <td className="px-4 py-5 text-sm font-black">
                        Annual Total
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(totalRevenue)}
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(totalExpenses)}
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(projectedProfit)}
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(totalCashInflow)}
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(totalCashOutflow)}
                      </td>

                      <td className="px-4 py-5 text-right text-sm font-black">
                        {formatCurrency(projectedCashSurplus)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className={labelClass}>Planning Notes</label>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                  Plan Summary
                </p>

                <h3 className="mt-2 text-lg font-black">{planNumber}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine label="Scenario" value={scenario} />

                <SummaryLine
                  label="Revenue"
                  value={formatCurrency(totalRevenue)}
                />

                <SummaryLine
                  label="Expenses"
                  value={formatCurrency(totalExpenses)}
                />

                <SummaryLine
                  label="EBITDA"
                  value={formatCurrency(projectedEbitda)}
                />

                <SummaryLine
                  label="Net Profit"
                  value={formatCurrency(projectedNetProfit)}
                />

                <SummaryLine
                  label="Cash Surplus"
                  value={formatCurrency(projectedCashSurplus)}
                />

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Projected Net Margin
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {netProfitMargin.toFixed(1)}%
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-violet-700">
                  <BrainCircuit size={21} />
                </div>

                <div>
                  <p className="text-sm font-black text-violet-950">
                    KEOS AI Planning
                  </p>
                  <p className="text-xs text-violet-600">
                    Automated financial observations
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <AiRecommendation
                  title="Revenue Outlook"
                  description={
                    scenario === "Best Case"
                      ? "Strong expansion potential with increased digital demand."
                      : scenario === "Worst Case"
                        ? "Revenue protection and cost control should be prioritized."
                        : "Forecast indicates stable growth with moderate execution risk."
                  }
                />

                <AiRecommendation
                  title="Cash Recommendation"
                  description={
                    projectedCashSurplus < minimumCashReserve
                      ? "Projected cash surplus is below the minimum reserve target."
                      : "Projected liquidity is above the minimum reserve requirement."
                  }
                />

                <AiRecommendation
                  title="Funding Strategy"
                  description={
                    fundingGap > 0
                      ? `Arrange approximately ${formatCurrency(
                          fundingGap,
                        )} through equity, debt or phased investment.`
                      : "Internal cash generation may cover planned investment requirements."
                  }
                />

                <AiRecommendation
                  title="Margin Control"
                  description={
                    netProfitMargin < operatingMarginTarget
                      ? "Review pricing, procurement and operating costs to improve margins."
                      : "Projected profitability is aligned with the operating margin target."
                  }
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Risk Assessment</h3>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p
                    className={`text-3xl font-black ${
                      riskScore >= 70
                        ? "text-rose-700"
                        : riskScore >= 40
                          ? "text-amber-600"
                          : "text-emerald-700"
                    }`}
                  >
                    {riskScore}/100
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Planning risk score
                  </p>
                </div>

                <AlertTriangle
                  size={30}
                  className={
                    riskScore >= 70
                      ? "text-rose-500"
                      : riskScore >= 40
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }
                />
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    riskScore >= 70
                      ? "bg-rose-600"
                      : riskScore >= 40
                        ? "bg-amber-500"
                        : "bg-emerald-600"
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Approval Workflow</h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep title="Plan Created" complete />

                <WorkflowStep
                  title="Submitted for Review"
                  complete={status !== "Draft"}
                />

                <WorkflowStep
                  title="Founder Approval"
                  complete={status === "Approved"}
                />
              </div>
            </section>
          </aside>
        </div>
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
  icon: ReactNode;
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

function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-semibold text-blue-200">{label}</span>

      <span className="max-w-[190px] text-right text-xs font-black">
        {value}
      </span>
    </div>
  );
}

function AiRecommendation({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-white/70 p-4">
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="text-violet-600" />

        <p className="text-xs font-black text-violet-950">{title}</p>
      </div>

      <p className="mt-2 text-xs leading-5 text-violet-700">
        {description}
      </p>
    </div>
  );
}

function WorkflowStep({
  title,
  complete,
}: {
  title: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          complete
            ? "bg-emerald-100 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {complete ? (
          <Check size={15} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>

      <p
        className={`text-xs font-bold ${
          complete ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {title}
      </p>
    </div>
  );
}