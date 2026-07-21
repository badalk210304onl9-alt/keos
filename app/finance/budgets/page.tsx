"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  Filter,
  Gauge,
  Landmark,
  Layers3,
  ListFilter,
  MoreHorizontal,
  PieChart,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
  WalletCards,
  X,
  XCircle,
} from "lucide-react";

type BudgetStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Active"
  | "Closed"
  | "Rejected";

type BudgetHealth =
  | "Healthy"
  | "Watch"
  | "Critical"
  | "Exceeded";

type BudgetPriority =
  | "Normal"
  | "Medium"
  | "High"
  | "Urgent";

type BudgetPeriod =
  | "Monthly"
  | "Quarterly"
  | "Half-Yearly"
  | "Annual"
  | "Project Based";

type Budget = {
  id: string;
  budgetName: string;
  department: string;
  costCenter: string;
  fiscalYear: string;
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
  allocatedAmount: number;
  committedAmount: number;
  actualSpend: number;
  availableAmount: number;
  forecastAmount: number;
  utilization: number;
  variance: number;
  owner: string;
  approver: string;
  status: BudgetStatus;
  health: BudgetHealth;
  priority: BudgetPriority;
  description: string;
  lastUpdated: string;
};

type MonthlyBudgetPoint = {
  month: string;
  budget: number;
  actual: number;
  forecast: number;
};

const budgetStats = [
  {
    title: "Total Approved Budget",
    value: "₹4.86Cr",
    change: "+12.8%",
    description: "Approved annual operating budget",
    icon: CircleDollarSign,
    tone: "positive",
  },
  {
    title: "Actual Utilization",
    value: "₹3.12Cr",
    change: "64.2%",
    description: "Budget consumed across departments",
    icon: Gauge,
    tone: "neutral",
  },
  {
    title: "Available Budget",
    value: "₹1.74Cr",
    change: "35.8%",
    description: "Remaining available allocation",
    icon: WalletCards,
    tone: "positive",
  },
  {
    title: "Budget Exceptions",
    value: "8",
    change: "3 critical",
    description: "Budgets requiring immediate review",
    icon: AlertTriangle,
    tone: "danger",
  },
];

const monthlyBudgetTrend: MonthlyBudgetPoint[] = [
  {
    month: "Apr",
    budget: 32,
    actual: 28,
    forecast: 29,
  },
  {
    month: "May",
    budget: 34,
    actual: 31,
    forecast: 32,
  },
  {
    month: "Jun",
    budget: 36,
    actual: 35,
    forecast: 35,
  },
  {
    month: "Jul",
    budget: 38,
    actual: 36,
    forecast: 38,
  },
  {
    month: "Aug",
    budget: 39,
    actual: 0,
    forecast: 40,
  },
  {
    month: "Sep",
    budget: 41,
    actual: 0,
    forecast: 42,
  },
  {
    month: "Oct",
    budget: 43,
    actual: 0,
    forecast: 44,
  },
  {
    month: "Nov",
    budget: 44,
    actual: 0,
    forecast: 45,
  },
  {
    month: "Dec",
    budget: 46,
    actual: 0,
    forecast: 48,
  },
  {
    month: "Jan",
    budget: 43,
    actual: 0,
    forecast: 44,
  },
  {
    month: "Feb",
    budget: 42,
    actual: 0,
    forecast: 43,
  },
  {
    month: "Mar",
    budget: 48,
    actual: 0,
    forecast: 49,
  },
];

const departmentBudgets = [
  {
    department: "Products & Merchandising",
    budget: 12800000,
    actual: 8420000,
    utilization: 65.8,
    variance: 340000,
    health: "Healthy",
  },
  {
    department: "Marketing",
    budget: 8400000,
    actual: 6180000,
    utilization: 73.6,
    variance: -220000,
    health: "Watch",
  },
  {
    department: "Technology",
    budget: 7200000,
    actual: 4860000,
    utilization: 67.5,
    variance: 180000,
    health: "Healthy",
  },
  {
    department: "Warehouse & Logistics",
    budget: 6100000,
    actual: 4520000,
    utilization: 74.1,
    variance: -310000,
    health: "Watch",
  },
  {
    department: "Human Resources",
    budget: 5200000,
    actual: 2980000,
    utilization: 57.3,
    variance: 420000,
    health: "Healthy",
  },
  {
    department: "Founder Office",
    budget: 4600000,
    actual: 3910000,
    utilization: 85,
    variance: -480000,
    health: "Critical",
  },
  {
    department: "Customer Experience",
    budget: 2600000,
    actual: 1380000,
    utilization: 53.1,
    variance: 210000,
    health: "Healthy",
  },
  {
    department: "Creative Studio",
    budget: 1900000,
    actual: 1730000,
    utilization: 91.1,
    variance: -160000,
    health: "Critical",
  },
];

const approvalQueue = [
  {
    id: "BGT-2026-118",
    name: "Festive Campaign Expansion",
    department: "Marketing",
    amount: 1850000,
    requestedBy: "Aarav Mehta",
    priority: "Urgent",
  },
  {
    id: "BGT-2026-116",
    name: "AI Infrastructure Upgrade",
    department: "Technology",
    amount: 1280000,
    requestedBy: "Neha Sharma",
    priority: "High",
  },
  {
    id: "BGT-2026-114",
    name: "Warehouse Capacity Expansion",
    department: "Warehouse & Logistics",
    amount: 960000,
    requestedBy: "Rohan Singh",
    priority: "High",
  },
  {
    id: "BGT-2026-111",
    name: "Leadership Hiring Program",
    department: "Human Resources",
    amount: 640000,
    requestedBy: "Ritika Jain",
    priority: "Medium",
  },
];

const budgetAlerts = [
  {
    title: "Creative Studio budget at 91%",
    description:
      "Only ₹1.70L remains for the current fiscal period.",
    level: "Critical",
    icon: AlertTriangle,
  },
  {
    title: "Marketing forecast exceeds plan",
    description:
      "Projected overspend of ₹2.20L by end of Q2.",
    level: "Warning",
    icon: TrendingUp,
  },
  {
    title: "Product sourcing below budget",
    description:
      "Potential savings of ₹3.40L against approved plan.",
    level: "Positive",
    icon: TrendingDown,
  },
  {
    title: "8 budget requests need review",
    description:
      "Total approval value currently stands at ₹47.30L.",
    level: "Review",
    icon: Clock3,
  },
];

const budgets: Budget[] = [
  {
    id: "BGT-2026-120",
    budgetName: "Annual Product Procurement",
    department: "Products & Merchandising",
    costCenter: "CC-PROD-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 12800000,
    committedAmount: 2160000,
    actualSpend: 8420000,
    availableAmount: 2220000,
    forecastAmount: 12460000,
    utilization: 65.8,
    variance: 340000,
    owner: "Arjun Kapoor",
    approver: "Badal Kumar",
    status: "Active",
    health: "Healthy",
    priority: "High",
    description:
      "Annual allocation for premium textiles, accessories, trims and product sourcing.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-119",
    budgetName: "Digital Marketing Master Budget",
    department: "Marketing",
    costCenter: "CC-MKT-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 8400000,
    committedAmount: 1240000,
    actualSpend: 6180000,
    availableAmount: 980000,
    forecastAmount: 8620000,
    utilization: 73.6,
    variance: -220000,
    owner: "Aarav Mehta",
    approver: "Badal Kumar",
    status: "Active",
    health: "Watch",
    priority: "High",
    description:
      "Performance marketing, social media, influencers, content and campaign production.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-118",
    budgetName: "Festive Campaign Expansion",
    department: "Marketing",
    costCenter: "CC-MKT-004",
    fiscalYear: "FY 2026–27",
    period: "Project Based",
    startDate: "01 Aug 2026",
    endDate: "31 Oct 2026",
    allocatedAmount: 1850000,
    committedAmount: 0,
    actualSpend: 0,
    availableAmount: 1850000,
    forecastAmount: 1920000,
    utilization: 0,
    variance: -70000,
    owner: "Aarav Mehta",
    approver: "Pending",
    status: "Pending Approval",
    health: "Watch",
    priority: "Urgent",
    description:
      "Additional campaign allocation for the festive luxury collection launch.",
    lastUpdated: "20 Jul 2026",
  },
  {
    id: "BGT-2026-117",
    budgetName: "Core Technology Operations",
    department: "Technology",
    costCenter: "CC-TECH-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 7200000,
    committedAmount: 1180000,
    actualSpend: 4860000,
    availableAmount: 1160000,
    forecastAmount: 7020000,
    utilization: 67.5,
    variance: 180000,
    owner: "Neha Sharma",
    approver: "Badal Kumar",
    status: "Active",
    health: "Healthy",
    priority: "High",
    description:
      "Cloud infrastructure, software subscriptions, security, AI and development tools.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-116",
    budgetName: "AI Infrastructure Upgrade",
    department: "Technology",
    costCenter: "CC-TECH-006",
    fiscalYear: "FY 2026–27",
    period: "Project Based",
    startDate: "01 Aug 2026",
    endDate: "31 Dec 2026",
    allocatedAmount: 1280000,
    committedAmount: 0,
    actualSpend: 0,
    availableAmount: 1280000,
    forecastAmount: 1240000,
    utilization: 0,
    variance: 40000,
    owner: "Neha Sharma",
    approver: "Pending",
    status: "Pending Approval",
    health: "Healthy",
    priority: "High",
    description:
      "GPU infrastructure, AI APIs and model-serving resources for KRVE AI systems.",
    lastUpdated: "19 Jul 2026",
  },
  {
    id: "BGT-2026-115",
    budgetName: "Warehouse & Logistics Operations",
    department: "Warehouse & Logistics",
    costCenter: "CC-WHS-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 6100000,
    committedAmount: 980000,
    actualSpend: 4520000,
    availableAmount: 600000,
    forecastAmount: 6410000,
    utilization: 74.1,
    variance: -310000,
    owner: "Rohan Singh",
    approver: "Priya Nair",
    status: "Active",
    health: "Watch",
    priority: "High",
    description:
      "Warehousing, packaging, fulfilment, transportation and reverse logistics.",
    lastUpdated: "20 Jul 2026",
  },
  {
    id: "BGT-2026-114",
    budgetName: "Warehouse Capacity Expansion",
    department: "Warehouse & Logistics",
    costCenter: "CC-WHS-005",
    fiscalYear: "FY 2026–27",
    period: "Project Based",
    startDate: "01 Sep 2026",
    endDate: "31 Dec 2026",
    allocatedAmount: 960000,
    committedAmount: 0,
    actualSpend: 0,
    availableAmount: 960000,
    forecastAmount: 930000,
    utilization: 0,
    variance: 30000,
    owner: "Rohan Singh",
    approver: "Pending",
    status: "Pending Approval",
    health: "Healthy",
    priority: "High",
    description:
      "Temporary storage expansion and automation equipment for peak-season demand.",
    lastUpdated: "18 Jul 2026",
  },
  {
    id: "BGT-2026-113",
    budgetName: "People Operations Budget",
    department: "Human Resources",
    costCenter: "CC-HR-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 5200000,
    committedAmount: 820000,
    actualSpend: 2980000,
    availableAmount: 1400000,
    forecastAmount: 4780000,
    utilization: 57.3,
    variance: 420000,
    owner: "Ritika Jain",
    approver: "Badal Kumar",
    status: "Active",
    health: "Healthy",
    priority: "Medium",
    description:
      "Recruitment, training, employee engagement, benefits and HR technology.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-112",
    budgetName: "Founder Strategic Initiatives",
    department: "Founder Office",
    costCenter: "CC-FO-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 4600000,
    committedAmount: 480000,
    actualSpend: 3910000,
    availableAmount: 210000,
    forecastAmount: 5080000,
    utilization: 85,
    variance: -480000,
    owner: "Founder Office",
    approver: "Badal Kumar",
    status: "Active",
    health: "Critical",
    priority: "Urgent",
    description:
      "Strategic consulting, investor relations, legal advisory and expansion projects.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-111",
    budgetName: "Leadership Hiring Program",
    department: "Human Resources",
    costCenter: "CC-HR-006",
    fiscalYear: "FY 2026–27",
    period: "Project Based",
    startDate: "01 Aug 2026",
    endDate: "31 Dec 2026",
    allocatedAmount: 640000,
    committedAmount: 0,
    actualSpend: 0,
    availableAmount: 640000,
    forecastAmount: 610000,
    utilization: 0,
    variance: 30000,
    owner: "Ritika Jain",
    approver: "Pending",
    status: "Pending Approval",
    health: "Healthy",
    priority: "Medium",
    description:
      "Executive search, onboarding and leadership assessment program.",
    lastUpdated: "17 Jul 2026",
  },
  {
    id: "BGT-2026-110",
    budgetName: "Creative Production Budget",
    department: "Creative Studio",
    costCenter: "CC-CR-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 1900000,
    committedAmount: 120000,
    actualSpend: 1730000,
    availableAmount: 50000,
    forecastAmount: 2060000,
    utilization: 91.1,
    variance: -160000,
    owner: "Meera Sethi",
    approver: "Aarav Mehta",
    status: "Active",
    health: "Critical",
    priority: "Urgent",
    description:
      "Photography, video production, creative tools, studio equipment and campaign assets.",
    lastUpdated: "21 Jul 2026",
  },
  {
    id: "BGT-2026-109",
    budgetName: "Customer Experience Operations",
    department: "Customer Experience",
    costCenter: "CC-CX-001",
    fiscalYear: "FY 2026–27",
    period: "Annual",
    startDate: "01 Apr 2026",
    endDate: "31 Mar 2027",
    allocatedAmount: 2600000,
    committedAmount: 420000,
    actualSpend: 1380000,
    availableAmount: 800000,
    forecastAmount: 2390000,
    utilization: 53.1,
    variance: 210000,
    owner: "Ishita Rao",
    approver: "Priya Nair",
    status: "Active",
    health: "Healthy",
    priority: "Medium",
    description:
      "Customer support tools, service operations, refunds and loyalty initiatives.",
    lastUpdated: "20 Jul 2026",
  },
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

  return formatCurrency(value);
}

function getStatusClass(status: BudgetStatus) {
  if (status === "Active") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Approved") {
    return "bg-blue-50 text-blue-600";
  }

  if (status === "Pending Approval") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Draft") {
    return "bg-slate-100 text-slate-600";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-600";
  }

  return "bg-purple-50 text-purple-600";
}

function getHealthClass(health: BudgetHealth) {
  if (health === "Healthy") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (health === "Watch") {
    return "bg-amber-50 text-amber-600";
  }

  if (health === "Critical") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-red-50 text-red-600";
}

function getPriorityClass(priority: BudgetPriority) {
  if (priority === "Urgent") {
    return "bg-red-50 text-red-600";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-600";
  }

  if (priority === "Medium") {
    return "bg-amber-50 text-amber-600";
  }

  return "bg-slate-100 text-slate-600";
}

function getUtilizationBarClass(utilization: number) {
  if (utilization >= 100) {
    return "bg-red-500";
  }

  if (utilization >= 85) {
    return "bg-orange-500";
  }

  if (utilization >= 70) {
    return "bg-amber-500";
  }

  return "bg-emerald-500";
}

function getAlertClass(level: string) {
  if (level === "Critical") {
    return "border-red-200 bg-red-50 text-red-600";
  }

  if (level === "Warning") {
    return "border-amber-200 bg-amber-50 text-amber-600";
  }

  if (level === "Positive") {
    return "border-emerald-200 bg-emerald-50 text-emerald-600";
  }

  return "border-blue-200 bg-blue-50 text-blue-600";
}

export default function BudgetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [healthFilter, setHealthFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBudget, setSelectedBudget] =
    useState<Budget | null>(null);

  const filteredBudgets = useMemo(() => {
    return budgets.filter((budget) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        budget.id.toLowerCase().includes(query) ||
        budget.budgetName.toLowerCase().includes(query) ||
        budget.department.toLowerCase().includes(query) ||
        budget.costCenter.toLowerCase().includes(query) ||
        budget.owner.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        budget.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        budget.status === statusFilter;

      const matchesHealth =
        healthFilter === "All" ||
        budget.health === healthFilter;

      const matchesPeriod =
        periodFilter === "All" ||
        budget.period === periodFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesHealth &&
        matchesPeriod
      );
    });
  }, [
    searchQuery,
    departmentFilter,
    statusFilter,
    healthFilter,
    periodFilter,
  ]);

  const filteredAllocation = filteredBudgets.reduce(
    (total, budget) => total + budget.allocatedAmount,
    0,
  );

  const filteredSpend = filteredBudgets.reduce(
    (total, budget) => total + budget.actualSpend,
    0,
  );

  const filteredAvailable = filteredBudgets.reduce(
    (total, budget) => total + budget.availableAmount,
    0,
  );

  const maxMonthlyValue = Math.max(
    ...monthlyBudgetTrend.flatMap((item) => [
      item.budget,
      item.actual,
      item.forecast,
    ]),
  );

  function resetFilters() {
    setSearchQuery("");
    setDepartmentFilter("All");
    setStatusFilter("All");
    setHealthFilter("All");
    setPeriodFilter("All");
  }

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-[#f5f7fa]">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
                Finance / Budget Management
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Enterprise Budget Management
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Plan departmental budgets, monitor utilization,
                control variances and manage approval workflows.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" />
              Import Budget
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <Link
              href="/finance/budgets/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Create Budget
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {budgetStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={[
                      "rounded-full px-2.5 py-1 text-[10px] font-black",
                      stat.tone === "positive"
                        ? "bg-emerald-50 text-emerald-600"
                        : stat.tone === "danger"
                          ? "bg-red-50 text-red-600"
                          : "bg-blue-50 text-blue-600",
                    ].join(" ")}
                  >
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-black tracking-tight text-[#10233b]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(350px,0.5fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Budget vs Actual vs Forecast
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monthly operating budget performance for FY
                  2026–27
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                FY 2026–27
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Annual Budget
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹4.86Cr
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs font-black text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  12.8% growth
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Actual Spend
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹3.12Cr
                </p>

                <p className="mt-2 text-xs font-black text-blue-600">
                  64.2% utilized
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Full-Year Forecast
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹4.93Cr
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs font-black text-red-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  ₹7L over plan
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="min-w-[820px]">
                <div className="mb-6 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[#10233b]" />
                    <span className="text-xs font-bold text-slate-500">
                      Budget
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[#d02b3f]" />
                    <span className="text-xs font-bold text-slate-500">
                      Actual
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-slate-300" />
                    <span className="text-xs font-bold text-slate-500">
                      Forecast
                    </span>
                  </div>
                </div>

                <div className="flex h-[300px] items-end gap-5">
                  {monthlyBudgetTrend.map((item) => {
                    const budgetHeight =
                      (item.budget / maxMonthlyValue) * 100;
                    const actualHeight =
                      (item.actual / maxMonthlyValue) * 100;
                    const forecastHeight =
                      (item.forecast / maxMonthlyValue) * 100;

                    return (
                      <div
                        key={item.month}
                        className="flex h-full min-w-[48px] flex-1 flex-col justify-end"
                      >
                        <div className="flex h-full items-end justify-center gap-1.5">
                          <div
                            className="w-3 rounded-t bg-[#10233b]"
                            title={`Budget: ₹${item.budget}L`}
                            style={{
                              height: `${budgetHeight}%`,
                            }}
                          />

                          <div
                            className="w-3 rounded-t bg-[#d02b3f]"
                            title={`Actual: ₹${item.actual}L`}
                            style={{
                              height:
                                item.actual === 0
                                  ? "0%"
                                  : `${actualHeight}%`,
                            }}
                          />

                          <div
                            className="w-3 rounded-t bg-slate-300"
                            title={`Forecast: ₹${item.forecast}L`}
                            style={{
                              height: `${forecastHeight}%`,
                            }}
                          />
                        </div>

                        <p className="mt-3 text-center text-[10px] font-black uppercase text-slate-400">
                          {item.month}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Budget Health Score
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">86</p>

                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Overall financial control
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[86%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Budget Compliance
                  </p>

                  <p className="mt-1 text-lg font-black">
                    91.4%
                  </p>
                </div>

                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Forecast Accuracy
                  </p>

                  <p className="mt-1 text-lg font-black">
                    88.7%
                  </p>
                </div>

                <Target className="h-5 w-5 text-blue-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Critical Budgets
                  </p>

                  <p className="mt-1 text-lg font-black">3</p>
                </div>

                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              <Sparkles className="h-4 w-4" />
              Generate AI Forecast
            </button>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Department Budget Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Allocation, spend and forecast health by department
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                <BarChart3 className="h-4 w-4" />
                View Analysis
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {departmentBudgets.map((item) => (
                <div
                  key={item.department}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-[#10233b]">
                          {item.department}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                            item.health === "Healthy"
                              ? "bg-emerald-50 text-emerald-600"
                              : item.health === "Watch"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-red-50 text-red-600",
                          ].join(" ")}
                        >
                          {item.health}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {formatCompactCurrency(item.actual)} spent
                        from{" "}
                        {formatCompactCurrency(item.budget)}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-lg font-black text-[#10233b]">
                        {item.utilization}%
                      </p>

                      <p
                        className={[
                          "mt-1 text-xs font-black",
                          item.variance >= 0
                            ? "text-emerald-600"
                            : "text-red-600",
                        ].join(" ")}
                      >
                        {item.variance >= 0 ? "+" : ""}
                        {formatCompactCurrency(item.variance)}{" "}
                        variance
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={[
                        "h-full rounded-full",
                        getUtilizationBarClass(
                          item.utilization,
                        ),
                      ].join(" ")}
                      style={{
                        width: `${Math.min(
                          item.utilization,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-5">
            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Budget Alerts
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Exceptions requiring finance attention
                  </p>
                </div>

                <AlertTriangle className="h-5 w-5 text-slate-400" />
              </div>

              <div className="mt-5 space-y-3">
                {budgetAlerts.map((alert) => {
                  const Icon = alert.icon;

                  return (
                    <div
                      key={alert.title}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                            getAlertClass(alert.level),
                          ].join(" ")}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            {alert.title}
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Budget Approval Queue
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Requests awaiting authorization
                  </p>
                </div>

                <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-50 px-3 text-sm font-black text-[#d02b3f]">
                  8
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {approvalQueue.map((request) => (
                  <button
                    key={request.id}
                    type="button"
                    className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {request.name}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {request.department} · {request.id}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                          request.priority === "Urgent"
                            ? "bg-red-50 text-red-600"
                            : request.priority === "High"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-amber-50 text-amber-600",
                        ].join(" ")}
                      >
                        {request.priority}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-black text-[#d02b3f]">
                          {formatCompactCurrency(
                            request.amount,
                          )}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {request.requestedBy}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-300" />
                    </div>
                  </button>
                ))}
              </div>

              <Link
                href="/finance/budgets/approvals"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
              >
                Review All Requests
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </section>

               <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Budget Control Register
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Enterprise Budget Register
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Search, review and monitor all departmental and
                  project-based budgets.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-[360px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search budget, department or cost center..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#10233b]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters((current) => !current)
                  }
                  className={[
                    "flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-black transition",
                    showFilters
                      ? "border-[#10233b] bg-[#10233b] text-white"
                      : "border-slate-200 bg-white text-[#10233b] hover:bg-slate-50",
                  ].join(" ")}
                >
                  <ListFilter className="h-4 w-4" />
                  Advanced Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Department
                    </span>

                    <select
                      value={departmentFilter}
                      onChange={(event) =>
                        setDepartmentFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="All">All Departments</option>
                      <option value="Products & Merchandising">
                        Products & Merchandising
                      </option>
                      <option value="Marketing">
                        Marketing
                      </option>
                      <option value="Technology">
                        Technology
                      </option>
                      <option value="Warehouse & Logistics">
                        Warehouse & Logistics
                      </option>
                      <option value="Human Resources">
                        Human Resources
                      </option>
                      <option value="Founder Office">
                        Founder Office
                      </option>
                      <option value="Creative Studio">
                        Creative Studio
                      </option>
                      <option value="Customer Experience">
                        Customer Experience
                      </option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Budget Status
                    </span>

                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        setStatusFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Draft">Draft</option>
                      <option value="Pending Approval">
                        Pending Approval
                      </option>
                      <option value="Approved">Approved</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Budget Health
                    </span>

                    <select
                      value={healthFilter}
                      onChange={(event) =>
                        setHealthFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="All">All Health Levels</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Watch">Watch</option>
                      <option value="Critical">Critical</option>
                      <option value="Exceeded">Exceeded</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Budget Period
                    </span>

                    <select
                      value={periodFilter}
                      onChange={(event) =>
                        setPeriodFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="All">All Periods</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Half-Yearly">
                        Half-Yearly
                      </option>
                      <option value="Annual">Annual</option>
                      <option value="Project Based">
                        Project Based
                      </option>
                    </select>
                  </label>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Filtered Allocation
                    </p>

                    <p className="mt-2 text-xl font-black text-[#10233b]">
                      {formatCompactCurrency(filteredAllocation)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#10233b] shadow-sm">
                    <WalletCards className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Filtered Actual Spend
                    </p>

                    <p className="mt-2 text-xl font-black text-[#d02b3f]">
                      {formatCompactCurrency(filteredSpend)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#d02b3f] shadow-sm">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Filtered Available Balance
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      {formatCompactCurrency(filteredAvailable)}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <BadgeIndianRupee className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold text-slate-500">
                Showing{" "}
                <span className="font-black text-[#10233b]">
                  {filteredBudgets.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-[#10233b]">
                  {budgets.length}
                </span>{" "}
                budgets
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {departmentFilter !== "All" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-600">
                    {departmentFilter}
                  </span>
                )}

                {statusFilter !== "All" && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black text-amber-600">
                    {statusFilter}
                  </span>
                )}

                {healthFilter !== "All" && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-600">
                    {healthFilter}
                  </span>
                )}

                {periodFilter !== "All" && (
                  <span className="rounded-full bg-purple-50 px-3 py-1.5 text-[10px] font-black text-purple-600">
                    {periodFilter}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1900px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Budget ID
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Budget Name
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Department
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Cost Center
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Period
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Allocation
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Committed
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Actual Spend
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Available
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Utilization
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Forecast
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Variance
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Owner
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Health
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBudgets.map((budget) => (
                  <tr
                    key={budget.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {budget.id}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {budget.fiscalYear}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="max-w-[250px]">
                        <p className="text-sm font-black text-[#10233b]">
                          {budget.budgetName}
                        </p>

                        <p className="mt-1 truncate text-xs font-medium text-slate-400">
                          Updated {budget.lastUpdated}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                          <Building2 className="h-4 w-4" />
                        </div>

                        <p className="max-w-[170px] text-sm font-bold text-slate-700">
                          {budget.department}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {budget.costCenter}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {budget.period}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {budget.startDate} – {budget.endDate}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(
                          budget.allocatedAmount,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-amber-600">
                        {formatCompactCurrency(
                          budget.committedAmount,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#d02b3f]">
                        {formatCompactCurrency(
                          budget.actualSpend,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-emerald-600">
                        {formatCompactCurrency(
                          budget.availableAmount,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="w-[150px]">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-black text-[#10233b]">
                            {budget.utilization}%
                          </span>

                          <span className="text-[10px] font-bold text-slate-400">
                            Used
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={[
                              "h-full rounded-full",
                              getUtilizationBarClass(
                                budget.utilization,
                              ),
                            ].join(" ")}
                            style={{
                              width: `${Math.min(
                                budget.utilization,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(
                          budget.forecastAmount,
                        )}
                      </p>

                      <p
                        className={[
                          "mt-1 text-xs font-black",
                          budget.forecastAmount >
                          budget.allocatedAmount
                            ? "text-red-600"
                            : "text-emerald-600",
                        ].join(" ")}
                      >
                        {budget.forecastAmount >
                        budget.allocatedAmount
                          ? "Over plan"
                          : "Within plan"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {budget.variance >= 0 ? (
                          <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        )}

                        <p
                          className={[
                            "text-sm font-black",
                            budget.variance >= 0
                              ? "text-emerald-600"
                              : "text-red-600",
                          ].join(" ")}
                        >
                          {budget.variance >= 0 ? "+" : ""}
                          {formatCompactCurrency(
                            budget.variance,
                          )}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {budget.owner}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Approver: {budget.approver}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getHealthClass(budget.health),
                        ].join(" ")}
                      >
                        {budget.health}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <span
                          className={[
                            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getStatusClass(budget.status),
                          ].join(" ")}
                        >
                          {budget.status}
                        </span>

                        <div>
                          <span
                            className={[
                              "inline-flex rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider",
                              getPriorityClass(
                                budget.priority,
                              ),
                            ].join(" ")}
                          >
                            {budget.priority}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedBudget(budget)
                          }
                          className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBudgets.length === 0 && (
                  <tr>
                    <td
                      colSpan={16}
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search className="h-6 w-6" />
                      </div>

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No budget records found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change the search query or reset the active
                        filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white"
                      >
                        <RefreshCcw className="h-4 w-4" />
                        Reset Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">
                Page 1 of 1 · {filteredBudgets.length} records
              </p>

              <p className="mt-1 text-[10px] font-semibold text-slate-400">
                Budget data last synchronized on 21 July 2026
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-xs font-black text-slate-300"
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
                className="flex h-9 items-center justify-center rounded-xl border border-slate-200 px-3 text-xs font-black text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Layers3 className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">
                12 budgets
              </span>
            </div>

            <h3 className="mt-5 text-sm font-black text-[#10233b]">
              Active Cost Centers
            </h3>

            <p className="mt-2 text-3xl font-black tracking-tight text-[#10233b]">
              8
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Cost centers currently carrying active operating or
              project-based budget allocations.
            </p>

            <Link
              href="/finance/cost-centers"
              className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Manage Cost Centers
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Target className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
                88.7%
              </span>
            </div>

            <h3 className="mt-5 text-sm font-black text-[#10233b]">
              Forecast Accuracy
            </h3>

            <p className="mt-2 text-3xl font-black tracking-tight text-[#10233b]">
              Strong
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Current expenditure forecasting remains within the
              accepted enterprise accuracy threshold.
            </p>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Open Forecast Model
              <ChevronRight className="h-4 w-4" />
            </button>
          </article>

          <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <FileCheck2 className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black text-red-600">
                8 pending
              </span>
            </div>

            <h3 className="mt-5 text-sm font-black text-[#10233b]">
              Approval Compliance
            </h3>

            <p className="mt-2 text-3xl font-black tracking-tight text-[#10233b]">
              94.6%
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Budget requests following defined approval authority and
              finance governance rules.
            </p>

            <Link
              href="/finance/budgets/approvals"
              className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Review Approvals
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(350px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Budget Governance Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Control indicators across allocation, approvals and
                  utilization.
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Governance Report
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Budgets Within Approved Limit
                    </p>

                    <p className="mt-2 text-2xl font-black text-[#10233b]">
                      9 / 12
                    </p>
                  </div>

                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[75%] rounded-full bg-emerald-500" />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  75% of monitored budgets are within allocation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Approval SLA Compliance
                    </p>

                    <p className="mt-2 text-2xl font-black text-[#10233b]">
                      92.4%
                    </p>
                  </div>

                  <Clock3 className="h-6 w-6 text-blue-500" />
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[92.4%] rounded-full bg-blue-500" />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  Most approval requests are resolved within 24 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Budget Commitment Coverage
                    </p>

                    <p className="mt-2 text-2xl font-black text-[#10233b]">
                      18.7%
                    </p>
                  </div>

                  <Landmark className="h-6 w-6 text-amber-500" />
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[18.7%] rounded-full bg-amber-500" />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  Approved purchase commitments not yet recognized as
                  actual expenditure.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Forecast Risk Exposure
                    </p>

                    <p className="mt-2 text-2xl font-black text-[#10233b]">
                      ₹8.60L
                    </p>
                  </div>

                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[32%] rounded-full bg-red-500" />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  Potential overspend identified across three budgets.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.16)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              KEOS AI Budget Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight">
              Forecasted overspend requires early intervention.
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              Founder Office, Creative Studio and Marketing are likely
              to exceed their approved plans unless current
              commitments are revised.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Potential overspend
                  </span>

                  <span className="text-sm font-black text-red-300">
                    ₹8.60L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Savings opportunity
                  </span>

                  <span className="text-sm font-black text-emerald-300">
                    ₹6.40L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Recommended transfers
                  </span>

                  <span className="text-sm font-black text-blue-300">
                    4 actions
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              <Sparkles className="h-4 w-4" />
              View AI Recommendations
            </button>
          </aside>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Enterprise Budget Management</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Budget systems operational</span>
            <span>·</span>
            <span>FY 2026–27 active</span>
            <span>·</span>
            <span>Last sync: 21 Jul 2026</span>
          </div>
        </footer>

                {selectedBudget && (
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close budget details"
              onClick={() => setSelectedBudget(null)}
              className="absolute inset-0 bg-[#07111f]/60 backdrop-blur-[3px]"
            />

            <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f5f7fa] shadow-[-24px_0_70px_rgba(15,35,59,0.22)] sm:max-w-[720px]">
              <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                      <WalletCards className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                          {selectedBudget.id}
                        </span>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
                            getStatusClass(selectedBudget.status),
                          ].join(" ")}
                        >
                          {selectedBudget.status}
                        </span>
                      </div>

                      <h2 className="mt-2 truncate text-xl font-black text-[#10233b] sm:text-2xl">
                        {selectedBudget.budgetName}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {selectedBudget.department} ·{" "}
                        {selectedBudget.costCenter}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedBudget(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-[#10233b]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-7">
                <section className="rounded-[26px] bg-[#10233b] p-5 text-white shadow-[0_20px_55px_rgba(15,35,59,0.18)] sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                        Approved Allocation
                      </p>

                      <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                        {formatCompactCurrency(
                          selectedBudget.allocatedAmount,
                        )}
                      </p>

                      <p className="mt-2 text-sm font-medium text-slate-300">
                        {selectedBudget.fiscalYear} ·{" "}
                        {selectedBudget.period}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                        Utilization
                      </p>

                      <p className="mt-1 text-2xl font-black">
                        {selectedBudget.utilization}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={[
                        "h-full rounded-full",
                        selectedBudget.utilization >= 85
                          ? "bg-orange-400"
                          : selectedBudget.utilization >= 70
                            ? "bg-amber-400"
                            : "bg-emerald-400",
                      ].join(" ")}
                      style={{
                        width: `${Math.min(
                          selectedBudget.utilization,
                          100,
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Actual
                      </p>

                      <p className="mt-2 text-sm font-black">
                        {formatCompactCurrency(
                          selectedBudget.actualSpend,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Committed
                      </p>

                      <p className="mt-2 text-sm font-black">
                        {formatCompactCurrency(
                          selectedBudget.committedAmount,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Available
                      </p>

                      <p className="mt-2 text-sm font-black text-emerald-300">
                        {formatCompactCurrency(
                          selectedBudget.availableAmount,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Forecast
                      </p>

                      <p className="mt-2 text-sm font-black">
                        {formatCompactCurrency(
                          selectedBudget.forecastAmount,
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <PieChart className="h-4 w-4" />
                      </div>

                      <span
                        className={[
                          "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                          getHealthClass(selectedBudget.health),
                        ].join(" ")}
                      >
                        {selectedBudget.health}
                      </span>
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Budget Health
                    </p>

                    <p className="mt-1 text-lg font-black text-[#10233b]">
                      {selectedBudget.health}
                    </p>
                  </article>

                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Target className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Forecast Variance
                    </p>

                    <p
                      className={[
                        "mt-1 text-lg font-black",
                        selectedBudget.variance >= 0
                          ? "text-emerald-600"
                          : "text-red-600",
                      ].join(" ")}
                    >
                      {selectedBudget.variance >= 0 ? "+" : ""}
                      {formatCompactCurrency(
                        selectedBudget.variance,
                      )}
                    </p>
                  </article>

                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <Gauge className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Priority Level
                    </p>

                    <span
                      className={[
                        "mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                        getPriorityClass(selectedBudget.priority),
                      ].join(" ")}
                    >
                      {selectedBudget.priority}
                    </span>
                  </article>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Budget Information
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Core allocation and ownership details
                      </p>
                    </div>

                    <FileCheck2 className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Department
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#10233b]" />

                        <p className="text-sm font-black text-[#10233b]">
                          {selectedBudget.department}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Cost Center
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedBudget.costCenter}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Budget Owner
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedBudget.owner}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Approver
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedBudget.approver}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Effective From
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />

                        <p className="text-sm font-black text-[#10233b]">
                          {selectedBudget.startDate}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Effective Until
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />

                        <p className="text-sm font-black text-[#10233b]">
                          {selectedBudget.endDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Budget Description
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      {selectedBudget.description}
                    </p>
                  </div>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Allocation Breakdown
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Current budget consumption and commitments
                      </p>
                    </div>

                    <BarChart3 className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500">
                          Actual expenditure
                        </span>

                        <span className="text-xs font-black text-[#10233b]">
                          {formatCompactCurrency(
                            selectedBudget.actualSpend,
                          )}
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#d02b3f]"
                          style={{
                            width: `${Math.min(
                              (selectedBudget.actualSpend /
                                selectedBudget.allocatedAmount) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500">
                          Purchase commitments
                        </span>

                        <span className="text-xs font-black text-[#10233b]">
                          {formatCompactCurrency(
                            selectedBudget.committedAmount,
                          )}
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{
                            width: `${Math.min(
                              (selectedBudget.committedAmount /
                                selectedBudget.allocatedAmount) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500">
                          Available allocation
                        </span>

                        <span className="text-xs font-black text-emerald-600">
                          {formatCompactCurrency(
                            selectedBudget.availableAmount,
                          )}
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${Math.min(
                              (selectedBudget.availableAmount /
                                selectedBudget.allocatedAmount) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Total Consumed + Committed
                      </p>

                      <p className="mt-2 text-xl font-black text-[#10233b]">
                        {formatCompactCurrency(
                          selectedBudget.actualSpend +
                            selectedBudget.committedAmount,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Forecast Difference
                      </p>

                      <p
                        className={[
                          "mt-2 text-xl font-black",
                          selectedBudget.forecastAmount >
                          selectedBudget.allocatedAmount
                            ? "text-red-600"
                            : "text-emerald-600",
                        ].join(" ")}
                      >
                        {formatCompactCurrency(
                          Math.abs(
                            selectedBudget.allocatedAmount -
                              selectedBudget.forecastAmount,
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                        KEOS AI Analysis
                      </p>

                      <h3 className="mt-2 text-base font-black text-[#10233b]">
                        Budget Intelligence Summary
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        {selectedBudget.forecastAmount >
                        selectedBudget.allocatedAmount ? (
                          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                        ) : (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        )}

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Forecast Position
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedBudget.forecastAmount >
                            selectedBudget.allocatedAmount
                              ? `The current forecast is ${formatCompactCurrency(
                                  selectedBudget.forecastAmount -
                                    selectedBudget.allocatedAmount,
                                )} above the approved allocation. Review open commitments and discretionary expenses.`
                              : `The budget is forecast to remain ${formatCompactCurrency(
                                  selectedBudget.allocatedAmount -
                                    selectedBudget.forecastAmount,
                                )} below the approved allocation.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Utilization Assessment
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedBudget.utilization >= 85
                              ? "Utilization is above the early-warning threshold. Additional spending should require enhanced finance authorization."
                              : selectedBudget.utilization >= 70
                                ? "Utilization is approaching the control threshold. Monitor weekly commitments and vendor invoices."
                                : "Utilization remains within the normal operating range with sufficient allocation available."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <Target className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Recommended Control
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedBudget.health === "Critical"
                              ? "Freeze non-essential expenditure, review all open purchase commitments and prepare a revised allocation request."
                              : selectedBudget.health === "Watch"
                                ? "Apply weekly variance monitoring and require owner comments for new commitments."
                                : "Continue standard monthly monitoring and maintain current approval controls."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Detailed AI Report
                  </button>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Approval & Activity Timeline
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Budget lifecycle and control history
                      </p>
                    </div>

                    <Clock3 className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-6 space-y-0">
                    <div className="relative flex gap-4 pb-6">
                      <div className="absolute left-[17px] top-9 h-full w-px bg-slate-200" />

                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Budget record updated
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Latest financial utilization and forecast
                          synchronized.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {selectedBudget.lastUpdated}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 pb-6">
                      <div className="absolute left-[17px] top-9 h-full w-px bg-slate-200" />

                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <ShieldCheck className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Finance control review completed
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Allocation checked against department and
                          cost-center policy.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Finance Operations
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                        <FileCheck2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Budget created
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Record initiated by {selectedBudget.owner} for{" "}
                          {selectedBudget.fiscalYear}.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {selectedBudget.startDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div>
                    <h3 className="text-base font-black text-[#10233b]">
                      Budget Actions
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Execute authorized budget-control operations
                    </p>
                  </div>

                  {selectedBudget.status === "Pending Approval" && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                        <div>
                          <p className="text-sm font-black text-amber-800">
                            Approval Required
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-amber-700">
                            This budget request is awaiting authorized
                            finance or founder approval.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => {
                            window.alert(
                              `${selectedBudget.id} has been approved.`,
                            );
                            setSelectedBudget(null);
                          }}
                          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve Budget
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            window.alert(
                              `${selectedBudget.id} has been rejected.`,
                            );
                            setSelectedBudget(null);
                          }}
                          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject Request
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening revision workflow for ${selectedBudget.id}.`,
                        )
                      }
                      className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <RefreshCcw className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-xs font-black text-[#10233b]">
                            Revise Budget
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                            Change approved amount
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening allocation transfer for ${selectedBudget.id}.`,
                        )
                      }
                      className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-xs font-black text-[#10233b]">
                            Transfer Allocation
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                            Move available balance
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Budget statement exported for ${selectedBudget.id}.`,
                        )
                      }
                      className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <Download className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-xs font-black text-[#10233b]">
                            Export Statement
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                            Download budget report
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Are you sure you want to close ${selectedBudget.id}?`,
                        );

                        if (confirmed) {
                          window.alert(
                            `${selectedBudget.id} has been submitted for closure.`,
                          );
                          setSelectedBudget(null);
                        }
                      }}
                      className="flex h-12 items-center justify-between rounded-2xl border border-red-200 px-4 text-left transition hover:bg-red-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          <XCircle className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-xs font-black text-red-600">
                            Close Budget
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                            End further expenditure
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-red-300" />
                    </button>
                  </div>
                </section>

                <div className="flex flex-col gap-3 pb-5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedBudget(null)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" />
                    Close Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Opening complete budget workspace for ${selectedBudget.id}.`,
                      )
                    }
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    Open Full Workspace
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}