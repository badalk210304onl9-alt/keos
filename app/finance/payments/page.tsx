"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Landmark,
  ListFilter,
  MoreHorizontal,
  Plus,
  ReceiptIndianRupee,
  RefreshCcw,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Upload,
  WalletCards,
  X,
  XCircle,
  Zap,
} from "lucide-react";

type PaymentStatus =
  | "Paid"
  | "Pending Approval"
  | "Scheduled"
  | "Processing"
  | "Failed"
  | "Cancelled";

type PaymentMethod =
  | "Bank Transfer"
  | "UPI"
  | "Corporate Card"
  | "NEFT"
  | "RTGS"
  | "IMPS";

type PaymentPriority = "Normal" | "Medium" | "High" | "Urgent";

type ReconciliationStatus =
  | "Reconciled"
  | "Unreconciled"
  | "Exception"
  | "Pending";

type Payment = {
  id: string;
  paymentReference: string;
  beneficiary: string;
  beneficiaryType: string;
  vendorId: string;
  billReference: string;
  department: string;
  amount: number;
  taxDeducted: number;
  netAmount: number;
  paymentMethod: PaymentMethod;
  bankAccount: string;
  transactionId: string;
  requestedBy: string;
  approvedBy: string;
  paymentDate: string;
  scheduledDate: string;
  status: PaymentStatus;
  reconciliation: ReconciliationStatus;
  priority: PaymentPriority;
  notes: string;
};

const paymentStats = [
  {
    title: "Total Payments",
    value: "₹12.84L",
    change: "+18.4%",
    description: "Payments processed this month",
    icon: CircleDollarSign,
    tone: "positive",
  },
  {
    title: "Pending Approval",
    value: "₹2.46L",
    change: "16 requests",
    description: "Payments awaiting authorization",
    icon: Clock3,
    tone: "warning",
  },
  {
    title: "Scheduled Payments",
    value: "₹3.18L",
    change: "Next 7 days",
    description: "Approved upcoming payments",
    icon: CalendarDays,
    tone: "neutral",
  },
  {
    title: "Failed Payments",
    value: "₹42,800",
    change: "4 transactions",
    description: "Payments requiring attention",
    icon: AlertTriangle,
    tone: "danger",
  },
];

const monthlyOutflow = [
  { month: "Aug", value: 6.1 },
  { month: "Sep", value: 6.8 },
  { month: "Oct", value: 7.2 },
  { month: "Nov", value: 7.9 },
  { month: "Dec", value: 9.6 },
  { month: "Jan", value: 8.4 },
  { month: "Feb", value: 8.9 },
  { month: "Mar", value: 9.4 },
  { month: "Apr", value: 10.2 },
  { month: "May", value: 11.1 },
  { month: "Jun", value: 11.7 },
  { month: "Jul", value: 12.84 },
];

const paymentMethods = [
  {
    method: "Bank Transfer",
    amount: "₹5.42L",
    percentage: 42.2,
    transactions: 48,
    icon: Landmark,
  },
  {
    method: "NEFT",
    amount: "₹2.86L",
    percentage: 22.3,
    transactions: 36,
    icon: Banknote,
  },
  {
    method: "Corporate Card",
    amount: "₹1.92L",
    percentage: 15,
    transactions: 42,
    icon: CreditCard,
  },
  {
    method: "UPI",
    amount: "₹1.38L",
    percentage: 10.7,
    transactions: 64,
    icon: Smartphone,
  },
  {
    method: "RTGS",
    amount: "₹84,000",
    percentage: 6.5,
    transactions: 8,
    icon: Send,
  },
  {
    method: "IMPS",
    amount: "₹42,000",
    percentage: 3.3,
    transactions: 12,
    icon: Zap,
  },
];

const bankAccounts = [
  {
    bank: "HDFC Bank",
    account: "•••• 4821",
    type: "Current Account",
    balance: "₹18.64L",
    available: "₹17.82L",
    status: "Connected",
  },
  {
    bank: "ICICI Bank",
    account: "•••• 6194",
    type: "Collection Account",
    balance: "₹9.42L",
    available: "₹9.16L",
    status: "Connected",
  },
  {
    bank: "Axis Bank",
    account: "•••• 8836",
    type: "Payroll Account",
    balance: "₹6.28L",
    available: "₹5.96L",
    status: "Connected",
  },
];

const approvalQueue = [
  {
    id: "PAY-2026-4284",
    beneficiary: "Royal Textile House",
    amount: "₹2,18,400",
    requestedBy: "Arjun Kapoor",
    priority: "Urgent",
  },
  {
    id: "PAY-2026-4281",
    beneficiary: "Nexora Consulting",
    amount: "₹1,25,000",
    requestedBy: "Founder Office",
    priority: "High",
  },
  {
    id: "PAY-2026-4278",
    beneficiary: "Creator Network India",
    amount: "₹76,700",
    requestedBy: "Aarav Mehta",
    priority: "High",
  },
  {
    id: "PAY-2026-4275",
    beneficiary: "Adobe Systems India",
    amount: "₹55,224",
    requestedBy: "Neha Sharma",
    priority: "Medium",
  },
];

const payments: Payment[] = [
  {
    id: "PAY-2026-4292",
    paymentReference: "KEOS-PAY-4292",
    beneficiary: "Elite Packaging Pvt. Ltd.",
    beneficiaryType: "Vendor",
    vendorId: "VEN-2026-001",
    billReference: "PB-2026-1842",
    department: "Warehouse",
    amount: 142500,
    taxDeducted: 0,
    netAmount: 142500,
    paymentMethod: "Bank Transfer",
    bankAccount: "HDFC Bank •••• 4821",
    transactionId: "HDFC20260721482194",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    paymentDate: "21 Jul 2026",
    scheduledDate: "21 Jul 2026",
    status: "Paid",
    reconciliation: "Reconciled",
    priority: "High",
    notes:
      "Payment against premium packaging materials and warehouse supply invoice.",
  },
  {
    id: "PAY-2026-4291",
    paymentReference: "KEOS-PAY-4291",
    beneficiary: "Royal Textile House",
    beneficiaryType: "Vendor",
    vendorId: "VEN-2026-002",
    billReference: "PB-2026-1841",
    department: "Products",
    amount: 218400,
    taxDeducted: 2184,
    netAmount: 216216,
    paymentMethod: "RTGS",
    bankAccount: "HDFC Bank •••• 4821",
    transactionId: "Pending",
    requestedBy: "Arjun Kapoor",
    approvedBy: "Pending",
    paymentDate: "Not Paid",
    scheduledDate: "25 Jul 2026",
    status: "Pending Approval",
    reconciliation: "Pending",
    priority: "Urgent",
    notes:
      "Final payment against premium textile procurement for upcoming collection.",
  },
  {
    id: "PAY-2026-4290",
    paymentReference: "KEOS-PAY-4290",
    beneficiary: "SwiftLogix India",
    beneficiaryType: "Vendor",
    vendorId: "VEN-2026-003",
    billReference: "PB-2026-1839",
    department: "Warehouse",
    amount: 86240,
    taxDeducted: 862,
    netAmount: 85378,
    paymentMethod: "NEFT",
    bankAccount: "ICICI Bank •••• 6194",
    transactionId: "ICIC2026072186420",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    paymentDate: "21 Jul 2026",
    scheduledDate: "21 Jul 2026",
    status: "Processing",
    reconciliation: "Pending",
    priority: "Medium",
    notes:
      "Intercity logistics and warehouse transportation payment.",
  },
  {
    id: "PAY-2026-4289",
    paymentReference: "KEOS-PAY-4289",
    beneficiary: "Adobe Systems India",
    beneficiaryType: "Technology Vendor",
    vendorId: "VEN-2026-004",
    billReference: "PB-2026-1840",
    department: "Creative",
    amount: 55224,
    taxDeducted: 0,
    netAmount: 55224,
    paymentMethod: "Corporate Card",
    bankAccount: "HDFC Corporate Card •••• 9482",
    transactionId: "Scheduled",
    requestedBy: "Neha Sharma",
    approvedBy: "Badal Kumar",
    paymentDate: "Not Paid",
    scheduledDate: "25 Jul 2026",
    status: "Scheduled",
    reconciliation: "Pending",
    priority: "Medium",
    notes:
      "Annual Adobe Creative Cloud subscription renewal.",
  },
  {
    id: "PAY-2026-4288",
    paymentReference: "KEOS-PAY-4288",
    beneficiary: "Creator Network India",
    beneficiaryType: "Marketing Vendor",
    vendorId: "VEN-2026-005",
    billReference: "PB-2026-1838",
    department: "Marketing",
    amount: 76700,
    taxDeducted: 1534,
    netAmount: 75166,
    paymentMethod: "Bank Transfer",
    bankAccount: "HDFC Bank •••• 4821",
    transactionId: "Pending",
    requestedBy: "Aarav Mehta",
    approvedBy: "Pending",
    paymentDate: "Not Paid",
    scheduledDate: "29 Jul 2026",
    status: "Pending Approval",
    reconciliation: "Pending",
    priority: "High",
    notes:
      "Influencer campaign advance for festive luxury campaign.",
  },
  {
    id: "PAY-2026-4287",
    paymentReference: "KEOS-PAY-4287",
    beneficiary: "Fresh Office Supply",
    beneficiaryType: "Vendor",
    vendorId: "VEN-2026-006",
    billReference: "PB-2026-1837",
    department: "Administration",
    amount: 7616,
    taxDeducted: 0,
    netAmount: 7616,
    paymentMethod: "UPI",
    bankAccount: "ICICI Bank •••• 6194",
    transactionId: "UPI607218472916",
    requestedBy: "Anjali Singh",
    approvedBy: "Ritika Jain",
    paymentDate: "18 Jul 2026",
    scheduledDate: "18 Jul 2026",
    status: "Paid",
    reconciliation: "Reconciled",
    priority: "Normal",
    notes: "Monthly pantry and office supply payment.",
  },
  {
    id: "PAY-2026-4286",
    paymentReference: "KEOS-PAY-4286",
    beneficiary: "Nexora Consulting",
    beneficiaryType: "Consultant",
    vendorId: "VEN-2026-007",
    billReference: "PB-2026-1836",
    department: "Founder Office",
    amount: 125000,
    taxDeducted: 12500,
    netAmount: 112500,
    paymentMethod: "NEFT",
    bankAccount: "HDFC Bank •••• 4821",
    transactionId: "Pending",
    requestedBy: "Founder Office",
    approvedBy: "Pending",
    paymentDate: "Not Paid",
    scheduledDate: "29 Jul 2026",
    status: "Pending Approval",
    reconciliation: "Pending",
    priority: "High",
    notes: "Business strategy and market expansion consulting payment.",
  },
  {
    id: "PAY-2026-4285",
    paymentReference: "KEOS-PAY-4285",
    beneficiary: "CloudGrid Technologies",
    beneficiaryType: "Technology Vendor",
    vendorId: "VEN-2026-009",
    billReference: "PB-2026-1834",
    department: "Technology",
    amount: 542800,
    taxDeducted: 0,
    netAmount: 542800,
    paymentMethod: "RTGS",
    bankAccount: "HDFC Bank •••• 4821",
    transactionId: "HDFC20260702542800",
    requestedBy: "Neha Sharma",
    approvedBy: "Badal Kumar",
    paymentDate: "02 Jul 2026",
    scheduledDate: "02 Jul 2026",
    status: "Paid",
    reconciliation: "Reconciled",
    priority: "High",
    notes:
      "Annual cloud infrastructure, database and security service payment.",
  },
  {
    id: "PAY-2026-4284",
    paymentReference: "KEOS-PAY-4284",
    beneficiary: "Urban Loom Traders",
    beneficiaryType: "Vendor",
    vendorId: "VEN-2026-008",
    billReference: "PB-2026-1835",
    department: "Products",
    amount: 82556,
    taxDeducted: 826,
    netAmount: 81730,
    paymentMethod: "IMPS",
    bankAccount: "ICICI Bank •••• 6194",
    transactionId: "IMPSFAIL4284",
    requestedBy: "Arjun Kapoor",
    approvedBy: "Finance Manager",
    paymentDate: "20 Jul 2026",
    scheduledDate: "20 Jul 2026",
    status: "Failed",
    reconciliation: "Exception",
    priority: "Urgent",
    notes:
      "Payment failed because vendor bank account details require reverification.",
  },
  {
    id: "PAY-2026-4283",
    paymentReference: "KEOS-PAY-4283",
    beneficiary: "Kabir Verma",
    beneficiaryType: "Employee Reimbursement",
    vendorId: "EMP-2026-104",
    billReference: "EXP-2026-2155",
    department: "Sales",
    amount: 18650,
    taxDeducted: 0,
    netAmount: 18650,
    paymentMethod: "IMPS",
    bankAccount: "Axis Bank •••• 8836",
    transactionId: "AXISIMPS1865026",
    requestedBy: "Kabir Verma",
    approvedBy: "Ritika Jain",
    paymentDate: "20 Jul 2026",
    scheduledDate: "20 Jul 2026",
    status: "Paid",
    reconciliation: "Unreconciled",
    priority: "Normal",
    notes: "Employee travel and accommodation reimbursement.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: PaymentStatus) {
  if (status === "Paid") return "bg-emerald-50 text-emerald-600";
  if (status === "Pending Approval")
    return "bg-amber-50 text-amber-600";
  if (status === "Scheduled") return "bg-blue-50 text-blue-600";
  if (status === "Processing") return "bg-purple-50 text-purple-600";
  if (status === "Failed") return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-500";
}

function getReconciliationClass(status: ReconciliationStatus) {
  if (status === "Reconciled")
    return "bg-emerald-50 text-emerald-600";
  if (status === "Unreconciled")
    return "bg-amber-50 text-amber-600";
  if (status === "Exception") return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-500";
}

function getPriorityClass(priority: PaymentPriority) {
  if (priority === "Urgent") return "bg-red-50 text-red-600";
  if (priority === "High") return "bg-orange-50 text-orange-600";
  if (priority === "Medium") return "bg-amber-50 text-amber-600";
  return "bg-slate-100 text-slate-500";
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [reconciliationFilter, setReconciliationFilter] =
    useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        payment.id.toLowerCase().includes(query) ||
        payment.paymentReference.toLowerCase().includes(query) ||
        payment.beneficiary.toLowerCase().includes(query) ||
        payment.billReference.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ||
        payment.paymentMethod === methodFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        payment.department === departmentFilter;

      const matchesReconciliation =
        reconciliationFilter === "All" ||
        payment.reconciliation === reconciliationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesDepartment &&
        matchesReconciliation
      );
    });
  }, [
    searchQuery,
    statusFilter,
    methodFilter,
    departmentFilter,
    reconciliationFilter,
  ]);

  const filteredTotal = filteredPayments.reduce(
    (total, payment) => total + payment.netAmount,
    0,
  );

  const maxOutflow = Math.max(
    ...monthlyOutflow.map((item) => item.value),
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setMethodFilter("All");
    setDepartmentFilter("All");
    setReconciliationFilter("All");
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
                Finance / Payment Center
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Enterprise Payment Center
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Manage vendor payments, approvals, schedules, banking,
                transaction status and reconciliation.
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
              href="/finance/payments/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              New Payment
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {paymentStats.map((stat) => {
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
                        : stat.tone === "warning"
                          ? "bg-amber-50 text-amber-600"
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

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.45fr)_minmax(350px,0.55fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Monthly Cash Outflow
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Total outgoing payments across the financial year
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
                  ₹12.84L
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs font-black text-amber-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  18.4% vs June
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Average Daily Outflow
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹61,142
                </p>

                <p className="mt-2 text-xs font-black text-slate-500">
                  210 payment entries
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Available Bank Balance
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹32.94L
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs font-black text-emerald-600">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  Healthy liquidity
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="flex h-[280px] min-w-[760px] items-end gap-4">
                {monthlyOutflow.map((item) => {
                  const height = (item.value / maxOutflow) * 100;

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
              Payment Health
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">94</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Payment health score
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[94%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Successful Payments
                  </p>

                  <p className="mt-1 text-lg font-black">97.2%</p>
                </div>

                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Reconciliation Rate
                  </p>

                  <p className="mt-1 text-lg font-black">91.8%</p>
                </div>

                <FileCheck2 className="h-5 w-5 text-blue-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Failed Transaction Rate
                  </p>

                  <p className="mt-1 text-lg font-black">2.8%</p>
                </div>

                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
            </div>

            <Link
              href="/finance/bank-reconciliation"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Reconciliation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Payment Methods
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Distribution of company payments by transaction method
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <div
                    key={method.method}
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
                              {method.method}
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {method.transactions} transactions
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-black text-[#10233b]">
                              {method.amount}
                            </p>

                            <p className="mt-1 text-xs font-black text-slate-400">
                              {method.percentage}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#10233b]"
                            style={{
                              width: `${method.percentage}%`,
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Connected Bank Accounts
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Live banking balances used for company payments
                </p>
              </div>

              <Landmark className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              {bankAccounts.map((account) => (
                <div
                  key={`${account.bank}-${account.account}`}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10233b] text-white">
                        <Landmark className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {account.bank}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {account.type} · {account.account}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase text-emerald-600">
                      {account.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Current Balance
                      </p>

                      <p className="mt-1 text-lg font-black text-[#10233b]">
                        {account.balance}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Available Balance
                      </p>

                      <p className="mt-1 text-lg font-black text-emerald-600">
                        {account.available}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/finance/banking"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Manage Bank Accounts
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Payment Register
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Search, monitor and manage all company payments
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative sm:w-[340px]">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search payment, beneficiary or UTR..."
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
                <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-5">
                  <label>
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
                      <option>Paid</option>
                      <option>Pending Approval</option>
                      <option>Scheduled</option>
                      <option>Processing</option>
                      <option>Failed</option>
                      <option>Cancelled</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Method
                    </span>

                    <select
                      value={methodFilter}
                      onChange={(event) =>
                        setMethodFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                      <option>Corporate Card</option>
                      <option>NEFT</option>
                      <option>RTGS</option>
                      <option>IMPS</option>
                    </select>
                  </label>

                  <label>
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
                      <option>Warehouse</option>
                      <option>Products</option>
                      <option>Creative</option>
                      <option>Marketing</option>
                      <option>Administration</option>
                      <option>Founder Office</option>
                      <option>Technology</option>
                      <option>Sales</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Reconciliation
                    </span>

                    <select
                      value={reconciliationFilter}
                      onChange={(event) =>
                        setReconciliationFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Reconciled</option>
                      <option>Unreconciled</option>
                      <option>Exception</option>
                      <option>Pending</option>
                    </select>
                  </label>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b]"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-bold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-[#10233b]">
                    {filteredPayments.length}
                  </span>{" "}
                  payments
                </p>

                <p className="text-xs font-bold text-slate-500">
                  Filtered payment amount:{" "}
                  <span className="font-black text-[#d02b3f]">
                    {formatCurrency(filteredTotal)}
                  </span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1550px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Payment
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Beneficiary
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Bill Reference
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Department
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      TDS
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Net Payment
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Method
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Transaction ID
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Date
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Reconciliation
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
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {payment.id}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {payment.paymentReference}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {payment.beneficiary}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {payment.beneficiaryType} · {payment.vendorId}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#10233b]">
                          {payment.billReference}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {payment.department}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                        {formatCurrency(payment.amount)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-600">
                        {formatCurrency(payment.taxDeducted)}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-[#d02b3f]">
                        {formatCurrency(payment.netAmount)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {payment.paymentMethod}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {payment.bankAccount}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[160px] truncate text-sm font-bold text-slate-700">
                          {payment.transactionId}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {payment.paymentDate}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Scheduled {payment.scheduledDate}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getReconciliationClass(
                              payment.reconciliation,
                            ),
                          ].join(" ")}
                        >
                          {payment.reconciliation}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-2">
                          <span
                            className={[
                              "inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                              getStatusClass(payment.status),
                            ].join(" ")}
                          >
                            {payment.status}
                          </span>

                          <div>
                            <span
                              className={[
                                "rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider",
                                getPriorityClass(payment.priority),
                              ].join(" ")}
                            >
                              {payment.priority}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedPayment(payment)
                            }
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:bg-[#10233b] hover:text-white"
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

                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={13} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Search className="h-6 w-6" />
                        </div>

                        <p className="mt-4 text-sm font-black text-[#10233b]">
                          No payments found
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          Change your search query or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold text-slate-500">
                Page 1 of 1 · {filteredPayments.length} payment records
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
                  Approval Queue
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Payments requiring authorization
                </p>
              </div>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-50 px-3 text-sm font-black text-[#d02b3f]">
                16
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {approvalQueue.map((approval) => (
                <button
                  key={approval.id}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {approval.beneficiary}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {approval.id}
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                        approval.priority === "Urgent"
                          ? "bg-red-50 text-red-600"
                          : approval.priority === "High"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-amber-50 text-amber-600",
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
              href="/finance/payments/approvals"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Review All Payments
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Payment Success Rate
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              97.2%
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Payments completed successfully without banking errors.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Average Approval Time
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              2.4 Hours
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Average time required to authorize payment requests.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BadgeIndianRupee className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Early Payment Savings
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹68,400
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Discounts earned through early vendor payment settlement.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Enterprise Payment Center</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Payment systems operational</span>
            <span>·</span>
            <span>Bank synchronization completed</span>
          </div>
        </footer>
      </main>

      {selectedPayment && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#071321]/55 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close payment details"
            onClick={() => setSelectedPayment(null)}
            className="absolute inset-0"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Payment Record
                </p>

                <h2 className="mt-1 text-xl font-black text-[#10233b]">
                  {selectedPayment.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Net Payment Amount
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(selectedPayment.netAmount)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider",
                      selectedPayment.status === "Paid"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedPayment.status === "Pending Approval"
                          ? "bg-amber-400/15 text-amber-300"
                          : selectedPayment.status === "Scheduled"
                            ? "bg-blue-400/15 text-blue-300"
                            : selectedPayment.status === "Processing"
                              ? "bg-purple-400/15 text-purple-300"
                              : "bg-red-400/15 text-red-300",
                    ].join(" ")}
                  >
                    {selectedPayment.status}
                  </span>

                  <span className="text-xs font-semibold text-slate-300">
                    {selectedPayment.paymentDate}
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Beneficiary Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Beneficiary
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedPayment.beneficiary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Beneficiary Type
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.beneficiaryType}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Vendor / Employee ID
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.vendorId}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Bill Reference
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.billReference}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Department
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.department}
                      </p>
                    </div>
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
                      Gross Amount
                    </span>

                    <span className="text-sm font-black text-[#10233b]">
                      {formatCurrency(selectedPayment.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      TDS Deducted
                    </span>

                    <span className="text-sm font-black text-red-500">
                      -{formatCurrency(selectedPayment.taxDeducted)}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-[#10233b]">
                        Net Payment
                      </span>

                      <span className="text-lg font-black text-[#d02b3f]">
                        {formatCurrency(selectedPayment.netAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Transaction Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Payment Method
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Scheduled Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedPayment.scheduledDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Source Bank Account
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedPayment.bankAccount}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      UTR / Transaction ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-slate-700">
                      {selectedPayment.transactionId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Approval & Reconciliation
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Requested By
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedPayment.requestedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Approved By
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedPayment.approvedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Reconciliation
                    </p>

                    <span
                      className={[
                        "mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                        getReconciliationClass(
                          selectedPayment.reconciliation,
                        ),
                      ].join(" ")}
                    >
                      {selectedPayment.reconciliation}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Priority
                    </p>

                    <span
                      className={[
                        "mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                        getPriorityClass(selectedPayment.priority),
                      ].join(" ")}
                    >
                      {selectedPayment.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Notes
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {selectedPayment.notes}
                </p>
              </div>

              {selectedPayment.status === "Pending Approval" && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600"
                  >
                    <XCircle className="h-4 w-4" />
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

              {selectedPayment.status === "Failed" && (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#d02b3f] text-sm font-black text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retry Payment
                </button>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b]"
                >
                  <Download className="h-4 w-4" />
                  Receipt
                </button>

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white"
                >
                  <Filter className="h-4 w-4" />
                  Edit Payment
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}