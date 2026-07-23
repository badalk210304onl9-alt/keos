"use client";

import Link from "next/link";
import { useState } from "react";
import CreateInvoiceDrawer from "./components/create-invoice-drawer";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BadgeIndianRupee,
  Banknote,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Coins,
  CreditCard,
  FileBarChart,
  FileCheck2,
  FileClock,
  FileSpreadsheet,
  Landmark,
  LineChart,
  ListFilter,
  Plus,
  Receipt,
  ReceiptText,
  ReceiptIndianRupee,
  RefreshCcw,
  Scale,
  Search,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const financeStats = [
  {
    title: "Revenue Today",
    value: "₹84,620",
    change: "+18.4%",
    description: "Compared with yesterday",
    icon: BadgeIndianRupee,
    positive: true,
  },
  {
    title: "Monthly Revenue",
    value: "₹18.42L",
    change: "+24.8%",
    description: "July revenue performance",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Net Profit",
    value: "₹4.86L",
    change: "+11.2%",
    description: "Current financial month",
    icon: LineChart,
    positive: true,
  },
  {
    title: "Pending Payments",
    value: "₹2.14L",
    change: "18 pending",
    description: "Vendor and operating dues",
    icon: FileClock,
    positive: false,
  },
];

const financeModules = [
  {
    title: "Finance Dashboard",
    description: "Financial health, revenue, profit, cash and alerts",
    href: "/finance/dashboard",
    icon: BarChart3,
  },
  {
    title: "Revenue Management",
    description: "Sales revenue, channels, settlements and collections",
    href: "/finance/revenue",
    icon: TrendingUp,
  },
  {
    title: "Expense Management",
    description: "Operating, employee, vendor and business expenses",
    href: "/finance/expenses",
    icon: TrendingDown,
  },
  {
    title: "Sales Invoices",
    description: "Create, issue, track and reconcile customer invoices",
    href: "/finance/sales-invoices",
    icon: ReceiptIndianRupee,
  },
  {
    title: "Purchase Bills",
    description: "Vendor bills, purchase invoices and payment status",
    href: "/finance/purchase-bills",
    icon: FileSpreadsheet,
  },
  {
    title: "Payments",
    description: "Outgoing payments, approvals and payment records",
    href: "/finance/payments",
    icon: CreditCard,
  },
  {
    title: "Receipts",
    description: "Customer receipts, collections and payment allocation",
    href: "/finance/receipts",
    icon: WalletCards,
  },
  {
    title: "Refunds",
    description: "Order refunds, approval workflow and refund tracking",
    href: "/finance/refunds",
    icon: RefreshCcw,
  },
  {
    title: "Vendor Management",
    description: "Vendor profiles, ledgers, dues and payment history",
    href: "/finance/vendors",
    icon: Building2,
  },
  {
    title: "Purchase Orders",
    description: "Purchase requests, approvals and vendor commitments",
    href: "/finance/purchase-orders",
    icon: ClipboardCheck,
  },
  {
    title: "Bank Accounts",
    description: "Company accounts, balances and banking details",
    href: "/finance/bank-accounts",
    icon: Landmark,
  },
  {
    title: "Bank Transactions",
    description: "Deposits, withdrawals, transfers and statement records",
    href: "/finance/bank-transactions",
    icon: Banknote,
  },
  {
  title: "Accounts Payable",
  description:
    "Vendor invoices, approvals, payment scheduling and accounts payable management.",
  href: "/finance/accounts-payable",
  icon: ReceiptText,
},
  {
  title: "Treasury & Liquidity",
  description:
    "Corporate treasury, liquidity, cash positioning, fund transfers and financial forecasting",
  href: "/finance/treasury",
  icon: Landmark,
},
{
  title: "Cost Centers",
  description:
    "Department budgets, expense allocation and profitability control",
  href: "/finance/cost-centers",
  icon: Building2,
},

  {
    title: "Bank Reconciliation",
    description: "Match bank statements with internal transactions",
    href: "/finance/reconciliation",
    icon: BookOpenCheck,
  },
  {
  title: "Cash Management",
  description: "Petty cash, cash registers and branch cash control",
  href: "/finance/cash-management",
  icon: CircleDollarSign,
},
  {
    title: "Cash Flow",
    description: "Operating, investing and financing cash movement",
    href: "/finance/cash-flow",
    icon: Activity,
  },
  {
    title: "Budget Management",
    description: "Company and department budgets with utilization",
    href: "/finance/budgets",
    icon: Scale,
  },
  {
  title: "Budget Allocation",
  description: "Allocate and monitor departmental financial limits",
  href: "/finance/budget-allocation",
  icon: CircleDollarSign,
},
  {
  title: "Financial Planning",
  description: "Forecasts, targets, scenarios and growth planning",
  href: "/finance/financial-planning",
  icon: LineChart,
},
  {
  title: "Payroll Approval",
  description: "Review salary inputs and approve monthly payroll",
  href: "/finance/payroll-approval",
  icon: BadgeCheck,
},

{
  title: "Employee Reimbursements",
  description:
    "Submit, review and approve employee expense claims",
  href: "/finance/reimbursements",
  icon: ReceiptText,
},

{
  title: "GST Center",
  description: "GST collections, input credits, returns and reports",
  href: "/finance/gst-center",
  icon: FileCheck2,
},
  {
  title: "TDS Management",
  description: "TDS deductions, certificates and filing records",
  href: "/finance/tds-management",
  icon: FileSpreadsheet,
},
{
  title: "Tax Calendar",
  description: "Tax deadlines, filings and compliance reminders",
  href: "/finance/tax-calendar",
  icon: CalendarDays,
},
{
  title: "Fixed Assets",
  description: "Assets, depreciation, disposal and asset valuation",
  href: "/finance/fixed-assets",
  icon: Building2,
},
  {
    title: "Loans & Liabilities",
    description: "Loans, repayments, interest and liability schedules",
    href: "/finance/liabilities",
    icon: Landmark,
  },
  {
    title: "Investments",
    description: "Company investments, returns and portfolio records",
    href: "/finance/investments",
    icon: TrendingUp,
  },
  {
    title: "Profit & Loss",
    description: "Income, costs, expenses and net profitability",
    href: "/finance/profit-loss",
    icon: FileBarChart,
  },
  {
    title: "Balance Sheet",
    description: "Assets, liabilities and equity position",
    href: "/finance/balance-sheet",
    icon: Scale,
  },
  {
    title: "General Ledger",
    description: "Account ledgers, journal entries and posting records",
    href: "/finance/general-ledger",
    icon: BookOpenCheck,
  },
  {
    title: "Chart of Accounts",
    description: "Manage accounting groups and financial accounts",
    href: "/finance/chart-of-accounts",
    icon: FileSpreadsheet,
  },
  {
    title: "Journal Entries",
    description: "Manual journals, adjustments and approval workflow",
    href: "/finance/journal-entries",
    icon: FileCheck2,
  },
  {
    title: "Financial Reports",
    description: "Revenue, expenses, tax, cash and management reports",
    href: "/finance/reports",
    icon: FileBarChart,
  },
  {
    title: "Financial Analytics",
    description: "Margins, trends, ratios, forecasts and performance",
    href: "/finance/analytics",
    icon: BarChart3,
  },
  {
    title: "Finance Compliance",
    description: "Financial policies, controls and statutory compliance",
    href: "/finance/compliance",
    icon: ShieldCheck,
  },
  {
    title: "Finance Audit Logs",
    description: "Track every finance action, approval and record change",
    href: "/finance/audit",
    icon: BookOpenCheck,
  },
];

const transactions = [
  {
    id: "TXN-240721-1842",
    type: "Customer Payment",
    party: "Rohit Sharma",
    reference: "Order #KRVE-1058",
    amount: "₹18,999",
    method: "Razorpay",
    date: "21 Jul 2026",
    status: "Completed",
    incoming: true,
  },
  {
    id: "TXN-240721-1837",
    type: "Vendor Payment",
    party: "Elite Packaging",
    reference: "Bill #EP-7841",
    amount: "₹42,500",
    method: "Bank Transfer",
    date: "21 Jul 2026",
    status: "Processing",
    incoming: false,
  },
  {
    id: "TXN-240721-1824",
    type: "Customer Payment",
    party: "Ananya Mehta",
    reference: "Order #KRVE-1057",
    amount: "₹12,499",
    method: "UPI",
    date: "21 Jul 2026",
    status: "Completed",
    incoming: true,
  },
  {
    id: "TXN-240721-1809",
    type: "Refund",
    party: "Vikram Singh",
    reference: "Refund #RF-1042",
    amount: "₹8,999",
    method: "Original Method",
    date: "21 Jul 2026",
    status: "Pending",
    incoming: false,
  },
  {
    id: "TXN-240721-1788",
    type: "Operating Expense",
    party: "Meta Ads",
    reference: "Campaign Expense",
    amount: "₹25,000",
    method: "Corporate Card",
    date: "21 Jul 2026",
    status: "Completed",
    incoming: false,
  },
];

const pendingApprovals = [
  {
    title: "Marketing Campaign Budget",
    description: "Festive luxury collection promotion",
    amount: "₹1,25,000",
    requestedBy: "Marketing Department",
    priority: "High",
  },
  {
    title: "Vendor Payment",
    description: "Premium packaging material supply",
    amount: "₹72,500",
    requestedBy: "Warehouse Department",
    priority: "Medium",
  },
  {
    title: "Employee Reimbursement",
    description: "Business travel and client meeting",
    amount: "₹18,650",
    requestedBy: "Sales Department",
    priority: "Normal",
  },
  {
    title: "Software Subscription",
    description: "Annual design and analytics tools",
    amount: "₹46,800",
    requestedBy: "IT Department",
    priority: "Medium",
  },
];

const financialHealth = [
  {
    title: "Gross Margin",
    value: "48.6%",
    target: "Target 45%",
    icon: TrendingUp,
    good: true,
  },
  {
    title: "Operating Margin",
    value: "26.4%",
    target: "Target 24%",
    icon: LineChart,
    good: true,
  },
  {
    title: "Expense Ratio",
    value: "31.8%",
    target: "Limit 30%",
    icon: TrendingDown,
    good: false,
  },
  {
    title: "Collection Rate",
    value: "94.2%",
    target: "Target 92%",
    icon: CheckCircle2,
    good: true,
  },
];

const quickActions = [
  {
    title: "Create Invoice",
    description: "Generate a new customer invoice",
    href: "/finance/sales-invoices/create",
    icon: ReceiptIndianRupee,
  },
  {
    title: "Record Expense",
    description: "Add a new business expense",
    href: "/finance/expenses/create",
    icon: TrendingDown,
  },
  {
    title: "Add Vendor",
    description: "Create a new vendor account",
    href: "/finance/vendors/create",
    icon: Building2,
  },
  {
    title: "Record Payment",
    description: "Add an outgoing payment",
    href: "/finance/payments/create",
    icon: CreditCard,
  },
  {
    title: "Bank Reconciliation",
    description: "Match bank and company records",
    href: "/finance/reconciliation",
    icon: BookOpenCheck,
  },
  {
    title: "Financial Report",
    description: "Generate finance statements",
    href: "/finance/reports",
    icon: FileBarChart,
  },
];

const revenueBars = [
  { month: "Aug", value: 48 },
  { month: "Sep", value: 54 },
  { month: "Oct", value: 59 },
  { month: "Nov", value: 66 },
  { month: "Dec", value: 74 },
  { month: "Jan", value: 69 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 76 },
  { month: "Apr", value: 84 },
  { month: "May", value: 88 },
  { month: "Jun", value: 92 },
  { month: "Jul", value: 98 },
];

export default function FinancePage() {
  const [activeQuickAction, setActiveQuickAction] = useState<
    "invoice" | null
  >(null);
  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
              Financial Operations
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
              Finance
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Revenue, accounting, expenses, banking, taxation and financial
              control
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Search className="h-4 w-4" />
              Search Finance
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <ListFilter className="h-4 w-4" />
              Filters
            </button>

            <Link
              href="/finance/transactions/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              New Transaction
            </Link>
          </div>
        </div>
      </section>

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financeStats.map((stat) => {
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
                      stat.positive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600",
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

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.45fr)_minmax(350px,0.55fr)]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monthly revenue performance and financial growth
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-50"
              >
                Financial Year 2026
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              <div className="flex h-[280px] items-end gap-2 sm:gap-4">
                {revenueBars.map((bar) => (
                  <div
                    key={bar.month}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-[#10233b] transition hover:bg-[#d02b3f]"
                        style={{ height: `${bar.value}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Total Revenue
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹1.82Cr
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-black text-emerald-600">
                  <ArrowUpRight className="h-4 w-4" />
                  24.8% growth
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Total Expenses
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹1.08Cr
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-black text-amber-600">
                  <ArrowUpRight className="h-4 w-4" />
                  11.6% increase
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Net Profit
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹74.2L
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-black text-emerald-600">
                  <ArrowUpRight className="h-4 w-4" />
                  18.2% margin
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Financial Health
            </p>

            <h2 className="mt-3 text-3xl font-black">92 / 100</h2>

            <p className="mt-2 text-sm font-medium text-slate-300">
              Strong financial position
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[92%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              {financialHealth.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-300">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm font-black text-white">
                        {item.value}
                      </p>
                    </div>

                    <span
                      className={[
                        "text-[10px] font-black",
                        item.good ? "text-emerald-400" : "text-amber-400",
                      ].join(" ")}
                    >
                      {item.target}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Financial Analysis
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Latest incoming and outgoing finance activity
                </p>
              </div>

              <Link
                href="/finance/transactions"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
              >
                View All Transactions
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Transaction
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Party
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Reference
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Method
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                              transaction.incoming
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-[#d02b3f]",
                            ].join(" ")}
                          >
                            {transaction.incoming ? (
                              <ArrowDownRight className="h-5 w-5" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {transaction.type}
                            </p>
                            <p className="mt-0.5 text-xs font-medium text-slate-400">
                              {transaction.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm font-semibold text-slate-600">
                        {transaction.party}
                      </td>

                      <td className="px-3 py-4">
                        <p className="text-sm font-semibold text-slate-600">
                          {transaction.reference}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          {transaction.date}
                        </p>
                      </td>

                      <td className="px-3 py-4 text-sm font-semibold text-slate-600">
                        {transaction.method}
                      </td>

                      <td
                        className={[
                          "px-3 py-4 text-sm font-black",
                          transaction.incoming
                            ? "text-emerald-600"
                            : "text-[#d02b3f]",
                        ].join(" ")}
                      >
                        {transaction.incoming ? "+" : "-"}
                        {transaction.amount}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            transaction.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : transaction.status === "Processing"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600",
                          ].join(" ")}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Pending Approvals
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Finance action required
                </p>
              </div>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-50 px-3 text-sm font-black text-[#d02b3f]">
                12
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {pendingApprovals.map((approval) => (
                <button
                  key={approval.title}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#10233b]">
                        {approval.title}
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        {approval.description}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-[#d02b3f]">
                      {approval.amount}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider",
                        approval.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : approval.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500",
                      ].join(" ")}
                    >
                      {approval.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {approval.requestedBy}
                  </p>
                </button>
              ))}
            </div>

            <Link
              href="/finance/approvals"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Review All Approvals
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Quick Finance Actions
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Frequently used finance controls
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-[#10233b]">
              Finance Executive Access
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-[#10233b] hover:bg-[#10233b] hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#10233b] transition group-hover:bg-white/10 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-[#10233b] transition group-hover:text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500 transition group-hover:text-slate-300">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Finance Operations
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Complete financial management and accounting workspace
              </p>
            </div>

            <span className="rounded-full bg-[#eef3f8] px-3 py-1.5 text-xs font-black text-[#10233b]">
              {financeModules.length} Modules
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {financeModules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group flex min-h-[155px] flex-col rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-[#10233b] hover:bg-[#10233b] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#10233b] transition group-hover:bg-white/10 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:text-white" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-[#10233b] transition group-hover:text-white">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500 transition group-hover:text-slate-300">
                    {module.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <span className="text-xs font-black text-emerald-600">
                Healthy
              </span>
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Cash Position
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹32.48L
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Sufficient liquidity available for 94 operating days.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <span className="text-xs font-black text-amber-600">
                Attention
              </span>
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Outstanding Receivables
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹6.72L
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              11 invoices are overdue and require collection follow-up.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CalendarDays className="h-5 w-5" />
              </div>

              <span className="text-xs font-black text-blue-600">
                Upcoming
              </span>
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Tax Compliance
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              4 Deadlines
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              GST and TDS filings are due within the next 14 days.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance Department</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Financial systems operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
            </div>

      <CreateInvoiceDrawer
        open={activeQuickAction === "invoice"}
        onClose={() => setActiveQuickAction(null)}
      />
    </div>
  );
}