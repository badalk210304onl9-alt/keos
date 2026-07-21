"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileSpreadsheet,
  Filter,
  Landmark,
  LineChart,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type CostCenterStatus = "Active" | "Warning" | "Critical" | "Inactive";

type CostCenter = {
  id: string;
  name: string;
  code: string;
  department: string;
  manager: string;
  employees: number;
  annualBudget: number;
  allocatedBudget: number;
  usedBudget: number;
  committedBudget: number;
  monthlyExpense: number;
  previousMonthExpense: number;
  revenue: number;
  status: CostCenterStatus;
  location: string;
  description: string;
};

type Allocation = {
  id: string;
  costCenter: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
  status: "Approved" | "Pending" | "Rejected";
};

const costCenters: CostCenter[] = [
  {
    id: "CC-001",
    name: "Marketing Operations",
    code: "MKT-001",
    department: "Marketing",
    manager: "Aarav Mehta",
    employees: 18,
    annualBudget: 4800000,
    allocatedBudget: 3600000,
    usedBudget: 2860000,
    committedBudget: 420000,
    monthlyExpense: 485000,
    previousMonthExpense: 420000,
    revenue: 12400000,
    status: "Warning",
    location: "Corporate Office",
    description:
      "Brand campaigns, digital marketing, customer acquisition and promotional operations.",
  },
  {
    id: "CC-002",
    name: "Technology & AI",
    code: "TEC-001",
    department: "Technology",
    manager: "Rohan Verma",
    employees: 26,
    annualBudget: 7200000,
    allocatedBudget: 6100000,
    usedBudget: 4280000,
    committedBudget: 680000,
    monthlyExpense: 715000,
    previousMonthExpense: 694000,
    revenue: 0,
    status: "Active",
    location: "Technology Center",
    description:
      "Platform engineering, AI systems, cloud infrastructure and cybersecurity.",
  },
  {
    id: "CC-003",
    name: "Warehouse & Fulfilment",
    code: "WH-001",
    department: "Operations",
    manager: "Vikram Singh",
    employees: 42,
    annualBudget: 5600000,
    allocatedBudget: 4700000,
    usedBudget: 3980000,
    committedBudget: 390000,
    monthlyExpense: 624000,
    previousMonthExpense: 578000,
    revenue: 0,
    status: "Warning",
    location: "Delhi Fulfilment Center",
    description:
      "Inventory handling, packaging, dispatch, logistics and warehouse operations.",
  },
  {
    id: "CC-004",
    name: "Sales Division",
    code: "SAL-001",
    department: "Sales",
    manager: "Ananya Sharma",
    employees: 31,
    annualBudget: 6400000,
    allocatedBudget: 5300000,
    usedBudget: 3440000,
    committedBudget: 510000,
    monthlyExpense: 582000,
    previousMonthExpense: 548000,
    revenue: 26800000,
    status: "Active",
    location: "Corporate Office",
    description:
      "Enterprise sales, online revenue, partnerships and customer relationship management.",
  },
  {
    id: "CC-005",
    name: "Human Resources",
    code: "HR-001",
    department: "Human Resources",
    manager: "Neha Kapoor",
    employees: 12,
    annualBudget: 2800000,
    allocatedBudget: 2400000,
    usedBudget: 1640000,
    committedBudget: 180000,
    monthlyExpense: 286000,
    previousMonthExpense: 275000,
    revenue: 0,
    status: "Active",
    location: "Corporate Office",
    description:
      "Recruitment, employee engagement, training, payroll coordination and workforce planning.",
  },
  {
    id: "CC-006",
    name: "Creative Studio",
    code: "CR-001",
    department: "Creative",
    manager: "Ishita Malhotra",
    employees: 16,
    annualBudget: 3600000,
    allocatedBudget: 3100000,
    usedBudget: 2780000,
    committedBudget: 260000,
    monthlyExpense: 425000,
    previousMonthExpense: 365000,
    revenue: 0,
    status: "Critical",
    location: "Mumbai Studio",
    description:
      "Fashion design, photography, video production, visual branding and campaign assets.",
  },
  {
    id: "CC-007",
    name: "Customer Experience",
    code: "CX-001",
    department: "Customer Support",
    manager: "Kabir Arora",
    employees: 22,
    annualBudget: 3200000,
    allocatedBudget: 2700000,
    usedBudget: 1860000,
    committedBudget: 220000,
    monthlyExpense: 318000,
    previousMonthExpense: 304000,
    revenue: 0,
    status: "Active",
    location: "Customer Experience Center",
    description:
      "Customer support, returns, escalations, customer retention and service quality.",
  },
  {
    id: "CC-008",
    name: "Finance & Compliance",
    code: "FIN-001",
    department: "Finance",
    manager: "Aditya Rao",
    employees: 14,
    annualBudget: 3400000,
    allocatedBudget: 2900000,
    usedBudget: 1920000,
    committedBudget: 240000,
    monthlyExpense: 334000,
    previousMonthExpense: 320000,
    revenue: 0,
    status: "Active",
    location: "Corporate Office",
    description:
      "Accounting, treasury, taxation, audit, compliance and management reporting.",
  },
];

const allocations: Allocation[] = [
  {
    id: "ALC-1028",
    costCenter: "Marketing Operations",
    category: "Digital Advertising",
    description: "Luxury festive collection campaign",
    amount: 325000,
    date: "21 Jul 2026",
    approvedBy: "Founder Office",
    status: "Approved",
  },
  {
    id: "ALC-1027",
    costCenter: "Technology & AI",
    category: "Cloud Infrastructure",
    description: "Enterprise cloud capacity expansion",
    amount: 480000,
    date: "20 Jul 2026",
    approvedBy: "Finance Director",
    status: "Approved",
  },
  {
    id: "ALC-1026",
    costCenter: "Creative Studio",
    category: "Production",
    description: "Seasonal campaign production budget",
    amount: 275000,
    date: "20 Jul 2026",
    approvedBy: "Pending approval",
    status: "Pending",
  },
  {
    id: "ALC-1025",
    costCenter: "Warehouse & Fulfilment",
    category: "Logistics",
    description: "Regional delivery capacity expansion",
    amount: 390000,
    date: "19 Jul 2026",
    approvedBy: "COO Office",
    status: "Approved",
  },
  {
    id: "ALC-1024",
    costCenter: "Human Resources",
    category: "Training",
    description: "Leadership development programme",
    amount: 145000,
    date: "18 Jul 2026",
    approvedBy: "Finance Director",
    status: "Approved",
  },
];

const monthlySpend = [
  { month: "Aug", value: 44 },
  { month: "Sep", value: 48 },
  { month: "Oct", value: 51 },
  { month: "Nov", value: 55 },
  { month: "Dec", value: 64 },
  { month: "Jan", value: 59 },
  { month: "Feb", value: 67 },
  { month: "Mar", value: 71 },
  { month: "Apr", value: 69 },
  { month: "May", value: 77 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 88 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function getStatusClass(status: CostCenterStatus) {
  if (status === "Active") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Warning") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Critical") {
    return "bg-red-50 text-red-600";
  }

  return "bg-slate-100 text-slate-500";
}

function getAllocationStatusClass(status: Allocation["status"]) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Pending") {
    return "bg-amber-50 text-amber-600";
  }

  return "bg-red-50 text-red-600";
}

export default function CostCentersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCostCenter, setSelectedCostCenter] =
    useState<CostCenter | null>(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const totals = useMemo(() => {
    return costCenters.reduce(
      (total, center) => {
        total.annualBudget += center.annualBudget;
        total.allocatedBudget += center.allocatedBudget;
        total.usedBudget += center.usedBudget;
        total.committedBudget += center.committedBudget;
        total.monthlyExpense += center.monthlyExpense;
        total.revenue += center.revenue;
        return total;
      },
      {
        annualBudget: 0,
        allocatedBudget: 0,
        usedBudget: 0,
        committedBudget: 0,
        monthlyExpense: 0,
        revenue: 0,
      },
    );
  }, []);

  const filteredCostCenters = useMemo(() => {
    return costCenters.filter((center) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        center.name.toLowerCase().includes(query) ||
        center.code.toLowerCase().includes(query) ||
        center.department.toLowerCase().includes(query) ||
        center.manager.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || center.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const budgetUtilization =
    totals.allocatedBudget > 0
      ? (totals.usedBudget / totals.allocatedBudget) * 100
      : 0;

  const remainingBudget =
    totals.allocatedBudget - totals.usedBudget - totals.committedBudget;

  const criticalCenters = costCenters.filter(
    (center) => center.status === "Critical" || center.status === "Warning",
  ).length;

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-[#f6f8fb]">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
                Financial Planning & Control
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Cost Centers
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Department budgets, expense allocation, variance and
                profitability control
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>

            <button
              type="button"
              onClick={() => setShowCreatePanel(true)}
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Create Cost Center
            </button>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10233b] text-white">
              <Building2 className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Cost Centers
            </p>

            <p className="mt-1 text-3xl font-black text-[#10233b]">
              {costCenters.length}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Across 8 departments
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CircleDollarSign className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Annual Budget
            </p>

            <p className="mt-1 text-3xl font-black text-[#10233b]">
              {formatCompactCurrency(totals.annualBudget)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              FY 2026–27 approved
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <WalletCards className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Allocated Budget
            </p>

            <p className="mt-1 text-3xl font-black text-[#10233b]">
              {formatCompactCurrency(totals.allocatedBudget)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Released to departments
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Budget Utilized
            </p>

            <p className="mt-1 text-3xl font-black text-[#10233b]">
              {budgetUtilization.toFixed(1)}%
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              {formatCompactCurrency(totals.usedBudget)} consumed
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Budget Alerts
            </p>

            <p className="mt-1 text-3xl font-black text-[#10233b]">
              {criticalCenters}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Require financial review
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.4fr)_minmax(350px,0.6fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Budget Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Company-wide cost center allocation and utilization
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-[#10233b]">
                FY 2026–27
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Total Allocation
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(totals.allocatedBudget)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Actual Spend
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(totals.usedBudget)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Committed
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(totals.committedBudget)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Available
                </p>
                <p className="mt-2 text-2xl font-black text-emerald-600">
                  {formatCompactCurrency(remainingBudget)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-500">Overall utilization</span>
                <span className="text-[#10233b]">
                  {budgetUtilization.toFixed(1)}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#10233b]"
                  style={{
                    width: `${Math.min(budgetUtilization, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              <div className="flex h-[230px] items-end gap-2 sm:gap-4">
                {monthlySpend.map((item) => (
                  <div
                    key={item.month}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-[#10233b] transition hover:bg-[#d02b3f]"
                        style={{ height: `${item.value}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              AI Cost Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Budget efficiency is stable
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              KEOS AI identified three areas where departmental spending can be
              optimized without affecting operational performance.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                  <div>
                    <p className="text-sm font-black">
                      Marketing optimization
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Shift ₹1.4L from low-performing campaigns to high-ROI
                      acquisition channels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-sm font-black">
                      Creative Studio threshold
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Current consumption may exceed its approved allocation
                      within 18 days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                  <div>
                    <p className="text-sm font-black">Technology forecasting</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Cloud infrastructure expenditure remains 6.8% below
                      forecast.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open AI Analysis
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Cost Center Register
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Department budget ownership and financial performance
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search cost centers..."
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b] sm:w-72"
                />
              </div>

              <div className="relative">
                <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Warning">Warning</option>
                  <option value="Critical">Critical</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Cost Center
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Manager
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Allocation
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Used
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Utilization
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Monthly Expense
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCostCenters.map((center) => {
                  const utilization =
                    (center.usedBudget / center.allocatedBudget) * 100;

                  const monthlyChange =
                    ((center.monthlyExpense - center.previousMonthExpense) /
                      center.previousMonthExpense) *
                    100;

                  return (
                    <tr
                      key={center.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCostCenter(center)}
                          className="flex items-center gap-3 text-left"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-white">
                            <Building2 className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {center.name}
                            </p>

                            <p className="mt-0.5 text-xs font-medium text-slate-400">
                              {center.code} · {center.department}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-sm font-bold text-slate-600">
                          {center.manager}
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          {center.employees} employees
                        </p>
                      </td>

                      <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(center.allocatedBudget)}
                      </td>

                      <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(center.usedBudget)}
                      </td>

                      <td className="px-3 py-4">
                        <div className="w-36">
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span className="text-slate-400">Used</span>
                            <span
                              className={
                                utilization >= 90
                                  ? "text-red-600"
                                  : utilization >= 75
                                    ? "text-amber-600"
                                    : "text-emerald-600"
                              }
                            >
                              {utilization.toFixed(1)}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={[
                                "h-full rounded-full",
                                utilization >= 90
                                  ? "bg-red-500"
                                  : utilization >= 75
                                    ? "bg-amber-500"
                                    : "bg-emerald-500",
                              ].join(" ")}
                              style={{
                                width: `${Math.min(utilization, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {formatCompactCurrency(center.monthlyExpense)}
                        </p>

                        <p
                          className={[
                            "mt-0.5 flex items-center gap-1 text-xs font-black",
                            monthlyChange > 0
                              ? "text-red-500"
                              : "text-emerald-600",
                          ].join(" ")}
                        >
                          {monthlyChange > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}

                          {Math.abs(monthlyChange).toFixed(1)}%
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getStatusClass(center.status),
                          ].join(" ")}
                        >
                          {center.status}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCostCenter(center)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-[#10233b]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCostCenters.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-black text-[#10233b]">
                No cost centers found
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Change your search or filter selection.
              </p>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Recent Budget Allocations
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Latest departmental allocation activity
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
              >
                View All Allocations
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Allocation
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Cost Center
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Approval
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allocations.map((allocation) => (
                    <tr
                      key={allocation.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {allocation.category}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          {allocation.id} · {allocation.date}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-sm font-bold text-slate-600">
                          {allocation.costCenter}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          {allocation.description}
                        </p>
                      </td>

                      <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                        {formatCurrency(allocation.amount)}
                      </td>

                      <td className="px-3 py-4 text-sm font-semibold text-slate-600">
                        {allocation.approvedBy}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getAllocationStatusClass(allocation.status),
                          ].join(" ")}
                        >
                          {allocation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d02b3f]">
              Budget Controls
            </p>

            <h2 className="mt-3 text-xl font-black text-[#10233b]">
              Founder-level safeguards
            </h2>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm font-black text-[#10233b]">
                      Approval thresholds
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Expenses above ₹2.5L require founder approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />

                  <div>
                    <p className="text-sm font-black text-[#10233b]">
                      Utilization alerts
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Department heads are alerted at 75%, 90% and 100%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-sm font-black text-[#10233b]">
                      Monthly review cycle
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Budget variance review scheduled on 31 July 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Configure Controls
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </aside>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Cost Center Management</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Budget controls operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
      </main>

      {selectedCostCenter && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#10233b]/35 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close cost center drawer"
            onClick={() => setSelectedCostCenter(null)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative h-full w-full max-w-[620px] overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    {selectedCostCenter.code}
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#10233b]">
                    {selectedCostCenter.name}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {selectedCostCenter.department}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCostCenter(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Allocated Budget
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {formatCompactCurrency(
                        selectedCostCenter.allocatedBudget,
                      )}
                    </p>
                  </div>

                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                      selectedCostCenter.status === "Active"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedCostCenter.status === "Warning"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-red-400/15 text-red-300",
                    ].join(" ")}
                  >
                    {selectedCostCenter.status}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-slate-300">Budget utilized</span>
                    <span>
                      {(
                        (selectedCostCenter.usedBudget /
                          selectedCostCenter.allocatedBudget) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width: `${Math.min(
                          (selectedCostCenter.usedBudget /
                            selectedCostCenter.allocatedBudget) *
                            100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Actual Spend
                  </p>
                  <p className="mt-2 text-xl font-black text-[#10233b]">
                    {formatCompactCurrency(selectedCostCenter.usedBudget)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Committed
                  </p>
                  <p className="mt-2 text-xl font-black text-[#10233b]">
                    {formatCompactCurrency(
                      selectedCostCenter.committedBudget,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Monthly Expense
                  </p>
                  <p className="mt-2 text-xl font-black text-[#10233b]">
                    {formatCompactCurrency(
                      selectedCostCenter.monthlyExpense,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Generated Revenue
                  </p>
                  <p className="mt-2 text-xl font-black text-emerald-600">
                    {formatCompactCurrency(selectedCostCenter.revenue)}
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Cost Center Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Manager
                      </p>
                      <p className="text-sm font-black text-[#10233b]">
                        {selectedCostCenter.manager}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Location
                      </p>
                      <p className="text-sm font-black text-[#10233b]">
                        {selectedCostCenter.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BadgeIndianRupee className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Annual Budget
                      </p>
                      <p className="text-sm font-black text-[#10233b]">
                        {formatCurrency(selectedCostCenter.annualBudget)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Workforce
                      </p>
                      <p className="text-sm font-black text-[#10233b]">
                        {selectedCostCenter.employees} employees
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Description
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                  {selectedCostCenter.description}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 text-[#d02b3f]" />

                  <div>
                    <h3 className="text-sm font-black text-[#10233b]">
                      AI Financial Analysis
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Automated budget intelligence
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                  This cost center is currently using{" "}
                  {(
                    (selectedCostCenter.usedBudget /
                      selectedCostCenter.allocatedBudget) *
                    100
                  ).toFixed(1)}
                  % of its allocated budget. Monthly spending is{" "}
                  {selectedCostCenter.monthlyExpense >
                  selectedCostCenter.previousMonthExpense
                    ? "higher"
                    : "lower"}{" "}
                  than the previous month. KEOS recommends reviewing committed
                  expenses before approving additional allocations.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  Allocate Budget
                  <CircleDollarSign className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  View Expense Ledger
                  <FileSpreadsheet className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {showCreatePanel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#10233b]/35 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close create panel"
            onClick={() => setShowCreatePanel(false)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative h-full w-full max-w-[560px] overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Financial Structure
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Create Cost Center
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowCreatePanel(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              className="space-y-5 p-5 sm:p-6"
              onSubmit={(event) => {
                event.preventDefault();
                setShowCreatePanel(false);
              }}
            >
              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Cost Center Name
                </label>

                <input
                  required
                  placeholder="Example: Retail Operations"
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Cost Center Code
                  </label>

                  <input
                    required
                    placeholder="RTL-001"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Department
                  </label>

                  <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]">
                    <option>Marketing</option>
                    <option>Technology</option>
                    <option>Operations</option>
                    <option>Sales</option>
                    <option>Human Resources</option>
                    <option>Finance</option>
                    <option>Creative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Cost Center Manager
                </label>

                <input
                  required
                  placeholder="Enter manager name"
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Annual Budget
                </label>

                <div className="relative mt-2">
                  <BadgeIndianRupee className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    required
                    type="number"
                    placeholder="0"
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Location
                </label>

                <div className="relative mt-2">
                  <Landmark className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    placeholder="Corporate Office"
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe the purpose and responsibilities of this cost center..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                  <p className="text-xs font-medium leading-5 text-blue-700">
                    The new cost center will be created in draft status.
                    Financial limits will become active after finance and
                    founder approval.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreatePanel(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  Create Cost Center
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}