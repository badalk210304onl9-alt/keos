"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  Filter,
  Fuel,
  Landmark,
  Laptop,
  ListFilter,
  Megaphone,
  MoreHorizontal,
  Package,
  Plane,
  Plus,
  ReceiptIndianRupee,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Upload,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type ExpenseStatus =
  | "Approved"
  | "Pending"
  | "Rejected"
  | "Paid"
  | "Processing";

type ExpensePriority = "Normal" | "Medium" | "High" | "Urgent";

type ExpenseRecord = {
  id: string;
  title: string;
  category: string;
  department: string;
  vendor: string;
  amount: number;
  tax: number;
  totalAmount: number;
  paymentMethod: string;
  requestedBy: string;
  approvedBy: string;
  date: string;
  dueDate: string;
  status: ExpenseStatus;
  priority: ExpensePriority;
  reference: string;
  notes: string;
};

const expenseStats = [
  {
    title: "Total Expenses",
    value: "₹8.64L",
    change: "+11.6%",
    description: "Compared with last month",
    icon: CircleDollarSign,
    positive: false,
  },
  {
    title: "Approved Expenses",
    value: "₹6.42L",
    change: "74.3%",
    description: "Approved during this month",
    icon: CheckCircle2,
    positive: true,
  },
  {
    title: "Pending Approval",
    value: "₹1.46L",
    change: "18 requests",
    description: "Awaiting finance action",
    icon: AlertTriangle,
    positive: false,
  },
  {
    title: "Monthly Budget Used",
    value: "68.4%",
    change: "₹3.98L left",
    description: "Against allocated budget",
    icon: WalletCards,
    positive: true,
  },
];

const expenseCategories = [
  {
    name: "Marketing & Advertising",
    amount: "₹2.18L",
    percentage: 25.2,
    transactions: 42,
    icon: Megaphone,
  },
  {
    name: "Payroll & Benefits",
    amount: "₹1.86L",
    percentage: 21.5,
    transactions: 28,
    icon: Users,
  },
  {
    name: "Warehouse & Logistics",
    amount: "₹1.42L",
    percentage: 16.4,
    transactions: 36,
    icon: Package,
  },
  {
    name: "Technology & Software",
    amount: "₹1.08L",
    percentage: 12.5,
    transactions: 24,
    icon: Laptop,
  },
  {
    name: "Office & Utilities",
    amount: "₹84,600",
    percentage: 9.8,
    transactions: 32,
    icon: Building2,
  },
  {
    name: "Travel & Business",
    amount: "₹72,400",
    percentage: 8.4,
    transactions: 18,
    icon: Plane,
  },
  {
    name: "Miscellaneous",
    amount: "₹53,000",
    percentage: 6.2,
    transactions: 14,
    icon: ReceiptIndianRupee,
  },
];

const departmentExpenses = [
  {
    department: "Marketing",
    amount: "₹2.42L",
    budget: "₹3.00L",
    utilization: 80.7,
  },
  {
    department: "Operations",
    amount: "₹1.86L",
    budget: "₹2.80L",
    utilization: 66.4,
  },
  {
    department: "Warehouse",
    amount: "₹1.42L",
    budget: "₹2.20L",
    utilization: 64.5,
  },
  {
    department: "Technology",
    amount: "₹1.08L",
    budget: "₹1.50L",
    utilization: 72,
  },
  {
    department: "HR",
    amount: "₹96,000",
    budget: "₹1.40L",
    utilization: 68.6,
  },
  {
    department: "Administration",
    amount: "₹90,000",
    budget: "₹1.20L",
    utilization: 75,
  },
];

const monthlyExpenses = [
  { month: "Aug", value: 4.8 },
  { month: "Sep", value: 5.2 },
  { month: "Oct", value: 5.8 },
  { month: "Nov", value: 6.4 },
  { month: "Dec", value: 7.8 },
  { month: "Jan", value: 6.9 },
  { month: "Feb", value: 7.2 },
  { month: "Mar", value: 7.6 },
  { month: "Apr", value: 7.9 },
  { month: "May", value: 8.1 },
  { month: "Jun", value: 8.3 },
  { month: "Jul", value: 8.64 },
];

const pendingApprovals = [
  {
    id: "EXP-2026-2148",
    title: "Festive Campaign Media Budget",
    department: "Marketing",
    amount: "₹1,25,000",
    requestedBy: "Aarav Mehta",
    priority: "Urgent",
  },
  {
    id: "EXP-2026-2146",
    title: "Premium Packaging Materials",
    department: "Warehouse",
    amount: "₹72,500",
    requestedBy: "Rohan Singh",
    priority: "High",
  },
  {
    id: "EXP-2026-2142",
    title: "Annual Design Software Renewal",
    department: "Technology",
    amount: "₹46,800",
    requestedBy: "Neha Sharma",
    priority: "Medium",
  },
  {
    id: "EXP-2026-2139",
    title: "Business Travel Reimbursement",
    department: "Sales",
    amount: "₹18,650",
    requestedBy: "Kabir Verma",
    priority: "Normal",
  },
];

const expenseRecords: ExpenseRecord[] = [
  {
    id: "EXP-2026-2158",
    title: "Meta Advertising Campaign",
    category: "Marketing & Advertising",
    department: "Marketing",
    vendor: "Meta Platforms",
    amount: 25000,
    tax: 4500,
    totalAmount: 29500,
    paymentMethod: "Corporate Card",
    requestedBy: "Aarav Mehta",
    approvedBy: "Badal Kumar",
    date: "21 Jul 2026",
    dueDate: "21 Jul 2026",
    status: "Paid",
    priority: "High",
    reference: "META-JUL-2481",
    notes: "Luxury collection performance campaign for July 2026.",
  },
  {
    id: "EXP-2026-2157",
    title: "Premium Packaging Supply",
    category: "Warehouse & Logistics",
    department: "Warehouse",
    vendor: "Elite Packaging Pvt. Ltd.",
    amount: 42500,
    tax: 7650,
    totalAmount: 50150,
    paymentMethod: "Bank Transfer",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    date: "21 Jul 2026",
    dueDate: "28 Jul 2026",
    status: "Processing",
    priority: "High",
    reference: "EP-7841",
    notes: "Black rigid boxes, gold foil bags and luxury tissue paper.",
  },
  {
    id: "EXP-2026-2156",
    title: "Adobe Creative Cloud Renewal",
    category: "Technology & Software",
    department: "Creative",
    vendor: "Adobe Systems",
    amount: 46800,
    tax: 8424,
    totalAmount: 55224,
    paymentMethod: "Corporate Card",
    requestedBy: "Neha Sharma",
    approvedBy: "Pending",
    date: "21 Jul 2026",
    dueDate: "25 Jul 2026",
    status: "Pending",
    priority: "Medium",
    reference: "ADB-2026-9914",
    notes: "Annual subscription renewal for creative department.",
  },
  {
    id: "EXP-2026-2155",
    title: "Employee Travel Reimbursement",
    category: "Travel & Business",
    department: "Sales",
    vendor: "Employee Reimbursement",
    amount: 18650,
    tax: 0,
    totalAmount: 18650,
    paymentMethod: "Bank Transfer",
    requestedBy: "Kabir Verma",
    approvedBy: "Ritika Jain",
    date: "20 Jul 2026",
    dueDate: "24 Jul 2026",
    status: "Approved",
    priority: "Normal",
    reference: "TRV-KV-0726",
    notes: "Client meeting travel and accommodation reimbursement.",
  },
  {
    id: "EXP-2026-2154",
    title: "Office Electricity Bill",
    category: "Office & Utilities",
    department: "Administration",
    vendor: "Electricity Department",
    amount: 28400,
    tax: 0,
    totalAmount: 28400,
    paymentMethod: "UPI",
    requestedBy: "Anjali Singh",
    approvedBy: "Badal Kumar",
    date: "20 Jul 2026",
    dueDate: "22 Jul 2026",
    status: "Paid",
    priority: "High",
    reference: "ELEC-JUL-2026",
    notes: "Monthly electricity expense for headquarters.",
  },
  {
    id: "EXP-2026-2153",
    title: "Warehouse Fuel Expense",
    category: "Warehouse & Logistics",
    department: "Warehouse",
    vendor: "Indian Oil",
    amount: 12400,
    tax: 2232,
    totalAmount: 14632,
    paymentMethod: "Corporate Card",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    date: "20 Jul 2026",
    dueDate: "20 Jul 2026",
    status: "Paid",
    priority: "Normal",
    reference: "FUEL-WH-1852",
    notes: "Fuel expense for warehouse delivery vehicles.",
  },
  {
    id: "EXP-2026-2152",
    title: "Recruitment Portal Subscription",
    category: "Technology & Software",
    department: "HR",
    vendor: "LinkedIn India",
    amount: 32000,
    tax: 5760,
    totalAmount: 37760,
    paymentMethod: "Bank Transfer",
    requestedBy: "Ritika Jain",
    approvedBy: "Pending",
    date: "19 Jul 2026",
    dueDate: "26 Jul 2026",
    status: "Pending",
    priority: "Medium",
    reference: "LI-HR-2026-47",
    notes: "Recruiter access and job posting credits.",
  },
  {
    id: "EXP-2026-2151",
    title: "Sample Product Procurement",
    category: "Product Development",
    department: "Products",
    vendor: "Royal Textile House",
    amount: 38500,
    tax: 6930,
    totalAmount: 45430,
    paymentMethod: "Bank Transfer",
    requestedBy: "Arjun Kapoor",
    approvedBy: "Badal Kumar",
    date: "19 Jul 2026",
    dueDate: "29 Jul 2026",
    status: "Approved",
    priority: "High",
    reference: "RTH-2026-614",
    notes: "Fabric and sample procurement for upcoming collection.",
  },
  {
    id: "EXP-2026-2150",
    title: "Office Refreshment Supplies",
    category: "Office & Utilities",
    department: "Administration",
    vendor: "Fresh Office Supply",
    amount: 6800,
    tax: 816,
    totalAmount: 7616,
    paymentMethod: "UPI",
    requestedBy: "Anjali Singh",
    approvedBy: "Ritika Jain",
    date: "18 Jul 2026",
    dueDate: "18 Jul 2026",
    status: "Paid",
    priority: "Normal",
    reference: "FOS-7812",
    notes: "Monthly pantry and refreshment supplies.",
  },
  {
    id: "EXP-2026-2149",
    title: "Influencer Campaign Advance",
    category: "Marketing & Advertising",
    department: "Marketing",
    vendor: "Creator Network India",
    amount: 65000,
    tax: 11700,
    totalAmount: 76700,
    paymentMethod: "Bank Transfer",
    requestedBy: "Aarav Mehta",
    approvedBy: "Rejected",
    date: "18 Jul 2026",
    dueDate: "23 Jul 2026",
    status: "Rejected",
    priority: "Urgent",
    reference: "CNI-INF-2026",
    notes: "Advance payment for influencer campaign collaboration.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseRecord | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenseRecords.filter((expense) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        expense.id.toLowerCase().includes(query) ||
        expense.title.toLowerCase().includes(query) ||
        expense.vendor.toLowerCase().includes(query) ||
        expense.requestedBy.toLowerCase().includes(query) ||
        expense.reference.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || expense.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        expense.department === departmentFilter;

      const matchesCategory =
        categoryFilter === "All" || expense.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesCategory
      );
    });
  }, [searchQuery, statusFilter, departmentFilter, categoryFilter]);

  const filteredTotal = filteredExpenses.reduce(
    (total, expense) => total + expense.totalAmount,
    0,
  );

  const maxMonthlyExpense = Math.max(
    ...monthlyExpenses.map((item) => item.value),
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCategoryFilter("All");
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
                Finance / Expense Management
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Expense Management
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Control company expenses, budgets, approvals, vendors,
                reimbursements and payment records.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <Link
              href="/finance/expenses/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {expenseStats.map((stat) => {
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
                      "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black",
                      stat.positive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600",
                    ].join(" ")}
                  >
                    {stat.positive ? (
                      <ArrowDownRight className="h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
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

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.45fr)_minmax(350px,0.55fr)]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Monthly Expense Trend
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Company-wide expense movement over the financial year
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                FY 2025–26
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Current Month
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹8.64L
                </p>
                <p className="mt-2 text-xs font-black text-amber-600">
                  +11.6% vs June
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Monthly Budget
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹12.62L
                </p>
                <p className="mt-2 text-xs font-black text-emerald-600">
                  31.6% available
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Average Daily
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹41,142
                </p>
                <p className="mt-2 text-xs font-black text-slate-500">
                  210 transactions
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="flex h-[280px] min-w-[760px] items-end gap-4">
                {monthlyExpenses.map((item) => {
                  const height =
                    (item.value / maxMonthlyExpense) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex h-full min-w-0 flex-1 flex-col justify-end"
                    >
                      <div className="flex h-full items-end justify-center">
                        <div
                          title={`${item.month}: ₹${item.value}L`}
                          className="w-full max-w-[34px] rounded-t-lg bg-[#10233b] transition hover:bg-[#d02b3f]"
                          style={{ height: `${height}%` }}
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
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Budget Control
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">68.4%</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Budget Utilized
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <WalletCards className="h-7 w-7 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68.4%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-[10px] font-semibold text-slate-400">
                  Total Budget
                </p>
                <p className="mt-1 text-lg font-black">₹12.62L</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-[10px] font-semibold text-slate-400">
                  Available
                </p>
                <p className="mt-1 text-lg font-black text-emerald-400">
                  ₹3.98L
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Committed Expenses
                  </p>
                  <p className="mt-1 text-lg font-black">₹1.46L</p>
                </div>
                <FileText className="h-5 w-5 text-amber-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Forecasted Expenses
                  </p>
                  <p className="mt-1 text-lg font-black">₹9.84L</p>
                </div>
                <FileBarChart className="h-5 w-5 text-blue-400" />
              </div>
            </div>

            <Link
              href="/finance/budgets"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Budget Center
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Expense by Category
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Category-wise contribution to total company expenses
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {expenseCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <div
                    key={category.name}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {category.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {category.transactions} transactions
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-black text-[#10233b]">
                              {category.amount}
                            </p>
                            <p className="mt-1 text-xs font-black text-slate-400">
                              {category.percentage}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#10233b]"
                            style={{
                              width: `${category.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Department Budget Utilization
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Expense utilization against allocated departmental budgets
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {departmentExpenses.map((department) => (
                <div
                  key={department.department}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {department.department}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Budget {department.budget}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {department.amount}
                      </p>
                      <p
                        className={[
                          "mt-1 text-xs font-black",
                          department.utilization >= 80
                            ? "text-amber-600"
                            : "text-emerald-600",
                        ].join(" ")}
                      >
                        {department.utilization}% used
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={[
                        "h-full rounded-full",
                        department.utilization >= 80
                          ? "bg-amber-500"
                          : "bg-[#10233b]",
                      ].join(" ")}
                      style={{
                        width: `${department.utilization}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Expense Records
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Search, filter and review all company expenses
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 sm:w-[320px]">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search expense, vendor or reference..."
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
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
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <ListFilter className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-4">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </span>

                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        setStatusFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                      <option>Paid</option>
                      <option>Processing</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Department
                    </span>

                    <select
                      value={departmentFilter}
                      onChange={(event) =>
                        setDepartmentFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Marketing</option>
                      <option>Warehouse</option>
                      <option>Creative</option>
                      <option>Sales</option>
                      <option>Administration</option>
                      <option>HR</option>
                      <option>Products</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </span>

                    <select
                      value={categoryFilter}
                      onChange={(event) =>
                        setCategoryFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Marketing & Advertising</option>
                      <option>Warehouse & Logistics</option>
                      <option>Technology & Software</option>
                      <option>Travel & Business</option>
                      <option>Office & Utilities</option>
                      <option>Product Development</option>
                    </select>
                  </label>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b]"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-bold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-[#10233b]">
                    {filteredExpenses.length}
                  </span>{" "}
                  expenses
                </p>

                <p className="text-xs font-bold text-slate-500">
                  Filtered amount:{" "}
                  <span className="font-black text-[#d02b3f]">
                    {formatCurrency(filteredTotal)}
                  </span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Expense
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Department
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Tax
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Total
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Requested By
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Date
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Priority
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
                  {filteredExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {expense.title}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {expense.id} · {expense.reference}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {expense.vendor}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {expense.paymentMethod}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {expense.department}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {expense.category}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {formatCurrency(expense.amount)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-600">
                        {formatCurrency(expense.tax)}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-[#d02b3f]">
                        {formatCurrency(expense.totalAmount)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {expense.requestedBy}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Approver: {expense.approvedBy}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {expense.date}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Due {expense.dueDate}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            expense.priority === "Urgent"
                              ? "bg-red-50 text-red-600"
                              : expense.priority === "High"
                                ? "bg-orange-50 text-orange-600"
                                : expense.priority === "Medium"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-slate-100 text-slate-500",
                          ].join(" ")}
                        >
                          {expense.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            expense.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : expense.status === "Approved"
                                ? "bg-blue-50 text-blue-600"
                                : expense.status === "Pending"
                                  ? "bg-amber-50 text-amber-600"
                                  : expense.status === "Processing"
                                    ? "bg-purple-50 text-purple-600"
                                    : "bg-red-50 text-red-600",
                          ].join(" ")}
                        >
                          {expense.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedExpense(expense)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-[#10233b] transition hover:bg-[#10233b] hover:text-white"
                          >
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

                  {filteredExpenses.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Search className="h-6 w-6" />
                        </div>

                        <p className="mt-4 text-sm font-black text-[#10233b]">
                          No expense records found
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          Change your filters or search query.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold text-slate-500">
                Page 1 of 1 · {filteredExpenses.length} records
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300"
                >
                  <ChevronLeft className="h-4 w-4" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Pending Approvals
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Expense requests requiring action
                </p>
              </div>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-50 px-3 text-sm font-black text-[#d02b3f]">
                18
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {pendingApprovals.map((approval) => (
                <button
                  key={approval.id}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {approval.title}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {approval.id} · {approval.department}
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                        approval.priority === "Urgent"
                          ? "bg-red-50 text-red-600"
                          : approval.priority === "High"
                            ? "bg-orange-50 text-orange-600"
                            : approval.priority === "Medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-slate-100 text-slate-500",
                      ].join(" ")}
                    >
                      {approval.priority}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-black text-[#d02b3f]">
                        {approval.amount}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {approval.requestedBy}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>
                </button>
              ))}
            </div>

            <Link
              href="/finance/expenses/approvals"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Review All Approvals
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Policy Compliance
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              96.8%
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Most expenses comply with company policies and approval limits.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Upcoming Payments
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹2.18L
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Vendor and operating expenses due within the next seven days.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BadgeIndianRupee className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Cost Saving Opportunity
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹74,600
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Potential monthly savings identified through expense analysis.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Expense Management</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Expense systems operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
      </main>

      {selectedExpense && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#071321]/55 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close expense details"
            onClick={() => setSelectedExpense(null)}
            className="absolute inset-0"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Expense Record
                </p>

                <h2 className="mt-1 text-xl font-black text-[#10233b]">
                  {selectedExpense.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExpense(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Total Expense
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(selectedExpense.totalAmount)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-[10px] font-black uppercase",
                      selectedExpense.status === "Paid"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedExpense.status === "Approved"
                          ? "bg-blue-400/15 text-blue-300"
                          : selectedExpense.status === "Pending"
                            ? "bg-amber-400/15 text-amber-300"
                            : selectedExpense.status === "Processing"
                              ? "bg-purple-400/15 text-purple-300"
                              : "bg-red-400/15 text-red-300",
                    ].join(" ")}
                  >
                    {selectedExpense.status}
                  </span>

                  <span className="text-xs font-semibold text-slate-300">
                    {selectedExpense.date}
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Expense Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Expense Title
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Category
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedExpense.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Department
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedExpense.department}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.vendor}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Reference
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.reference}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Payment Breakdown
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      Base Amount
                    </span>
                    <span className="text-sm font-black text-[#10233b]">
                      {formatCurrency(selectedExpense.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      Tax
                    </span>
                    <span className="text-sm font-black text-slate-700">
                      {formatCurrency(selectedExpense.tax)}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-[#10233b]">
                        Total Amount
                      </span>
                      <span className="text-lg font-black text-[#d02b3f]">
                        {formatCurrency(selectedExpense.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
                    <span className="text-sm font-semibold text-slate-500">
                      Payment Method
                    </span>
                    <span className="text-sm font-black text-[#10233b]">
                      {selectedExpense.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Approval Details
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Requested By
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.requestedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Approved By
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.approvedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Priority
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.priority}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Due Date
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedExpense.dueDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Notes
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {selectedExpense.notes}
                </p>
              </div>

              {selectedExpense.status === "Pending" && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>

                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-black text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b]"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white"
                >
                  <Filter className="h-4 w-4" />
                  Edit Expense
                </button>
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 text-sm font-black text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete Expense
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}