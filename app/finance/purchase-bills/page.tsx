"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  FileText,
  Filter,
  Landmark,
  ListFilter,
  MoreHorizontal,
  Paperclip,
  Plus,
  ReceiptIndianRupee,
  RefreshCcw,
  Search,
  ShieldCheck,
  Upload,
  WalletCards,
  X,
} from "lucide-react";

type BillStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Partially Paid"
  | "Paid"
  | "Overdue"
  | "Rejected";

type BillPriority = "Normal" | "Medium" | "High" | "Urgent";

type PurchaseBill = {
  id: string;
  billNumber: string;
  vendor: string;
  vendorId: string;
  purchaseOrder: string;
  category: string;
  department: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balance: number;
  paymentTerms: string;
  paymentMethod: string;
  status: BillStatus;
  priority: BillPriority;
  requestedBy: string;
  approvedBy: string;
  reference: string;
  notes: string;
};

const billStats = [
  {
    title: "Total Purchase Bills",
    value: "184",
    change: "+22 this month",
    description: "Bills recorded in current period",
    icon: ReceiptIndianRupee,
    tone: "positive",
  },
  {
    title: "Outstanding Amount",
    value: "₹8.42L",
    change: "32 bills",
    description: "Total unpaid vendor balance",
    icon: WalletCards,
    tone: "warning",
  },
  {
    title: "Pending Approval",
    value: "₹2.18L",
    change: "14 requests",
    description: "Bills awaiting approval",
    icon: FileClock,
    tone: "warning",
  },
  {
    title: "Overdue Payables",
    value: "₹1.26L",
    change: "7 overdue",
    description: "Vendor bills past due date",
    icon: AlertTriangle,
    tone: "danger",
  },
];

const monthlyBills = [
  { month: "Aug", value: 4.2 },
  { month: "Sep", value: 4.8 },
  { month: "Oct", value: 5.4 },
  { month: "Nov", value: 5.9 },
  { month: "Dec", value: 7.2 },
  { month: "Jan", value: 6.4 },
  { month: "Feb", value: 6.8 },
  { month: "Mar", value: 7.1 },
  { month: "Apr", value: 7.6 },
  { month: "May", value: 7.9 },
  { month: "Jun", value: 8.1 },
  { month: "Jul", value: 8.42 },
];

const categorySpend = [
  {
    category: "Textiles & Materials",
    amount: "₹3.18L",
    percentage: 37.8,
    bills: 42,
  },
  {
    category: "Packaging",
    amount: "₹1.64L",
    percentage: 19.5,
    bills: 28,
  },
  {
    category: "Marketing Services",
    amount: "₹1.28L",
    percentage: 15.2,
    bills: 24,
  },
  {
    category: "Technology",
    amount: "₹96,400",
    percentage: 11.4,
    bills: 18,
  },
  {
    category: "Logistics",
    amount: "₹82,600",
    percentage: 9.8,
    bills: 32,
  },
  {
    category: "Office & Professional",
    amount: "₹53,000",
    percentage: 6.3,
    bills: 16,
  },
];

const upcomingPayments = [
  {
    vendor: "Elite Packaging Pvt. Ltd.",
    bill: "EP-7841",
    amount: "₹1,42,500",
    date: "22 Jul 2026",
    status: "Due Tomorrow",
  },
  {
    vendor: "Royal Textile House",
    bill: "RTH-614",
    amount: "₹2,18,400",
    date: "25 Jul 2026",
    status: "Upcoming",
  },
  {
    vendor: "SwiftLogix India",
    bill: "SL-2486",
    amount: "₹86,240",
    date: "27 Jul 2026",
    status: "Upcoming",
  },
  {
    vendor: "Nexora Consulting",
    bill: "NC-2942",
    amount: "₹1,25,000",
    date: "29 Jul 2026",
    status: "Approval Pending",
  },
];

const purchaseBills: PurchaseBill[] = [
  {
    id: "PB-2026-1842",
    billNumber: "EP-7841",
    vendor: "Elite Packaging Pvt. Ltd.",
    vendorId: "VEN-2026-001",
    purchaseOrder: "PO-2026-194",
    category: "Packaging",
    department: "Warehouse",
    invoiceDate: "18 Jul 2026",
    dueDate: "22 Jul 2026",
    subtotal: 120763,
    tax: 21737,
    discount: 0,
    total: 142500,
    paidAmount: 0,
    balance: 142500,
    paymentTerms: "Net 30",
    paymentMethod: "Bank Transfer",
    status: "Approved",
    priority: "High",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    reference: "EP-JUL-7841",
    notes:
      "Premium packaging material including rigid boxes, gold foil bags and tissue paper.",
  },
  {
    id: "PB-2026-1841",
    billNumber: "RTH-614",
    vendor: "Royal Textile House",
    vendorId: "VEN-2026-002",
    purchaseOrder: "PO-2026-188",
    category: "Textiles & Materials",
    department: "Products",
    invoiceDate: "16 Jul 2026",
    dueDate: "25 Jul 2026",
    subtotal: 185085,
    tax: 33315,
    discount: 0,
    total: 218400,
    paidAmount: 100000,
    balance: 118400,
    paymentTerms: "Net 45",
    paymentMethod: "Bank Transfer",
    status: "Partially Paid",
    priority: "High",
    requestedBy: "Arjun Kapoor",
    approvedBy: "Badal Kumar",
    reference: "RTH-FAB-614",
    notes:
      "Premium wool and cotton blend fabric procurement for upcoming collection.",
  },
  {
    id: "PB-2026-1840",
    billNumber: "ADB-9914",
    vendor: "Adobe Systems India",
    vendorId: "VEN-2026-004",
    purchaseOrder: "PO-2026-181",
    category: "Technology",
    department: "Creative",
    invoiceDate: "21 Jul 2026",
    dueDate: "25 Jul 2026",
    subtotal: 46800,
    tax: 8424,
    discount: 0,
    total: 55224,
    paidAmount: 0,
    balance: 55224,
    paymentTerms: "Immediate",
    paymentMethod: "Corporate Card",
    status: "Pending Approval",
    priority: "Medium",
    requestedBy: "Neha Sharma",
    approvedBy: "Pending",
    reference: "ADB-CC-9914",
    notes:
      "Annual Adobe Creative Cloud subscription for design and marketing teams.",
  },
  {
    id: "PB-2026-1839",
    billNumber: "SL-2486",
    vendor: "SwiftLogix India",
    vendorId: "VEN-2026-003",
    purchaseOrder: "PO-2026-176",
    category: "Logistics",
    department: "Warehouse",
    invoiceDate: "17 Jul 2026",
    dueDate: "27 Jul 2026",
    subtotal: 73085,
    tax: 13155,
    discount: 0,
    total: 86240,
    paidAmount: 0,
    balance: 86240,
    paymentTerms: "Net 15",
    paymentMethod: "Bank Transfer",
    status: "Approved",
    priority: "Medium",
    requestedBy: "Rohan Singh",
    approvedBy: "Priya Nair",
    reference: "SL-JUL-2486",
    notes:
      "Intercity warehouse transportation and fulfilment charges.",
  },
  {
    id: "PB-2026-1838",
    billNumber: "CNI-188",
    vendor: "Creator Network India",
    vendorId: "VEN-2026-005",
    purchaseOrder: "PO-2026-172",
    category: "Marketing Services",
    department: "Marketing",
    invoiceDate: "18 Jul 2026",
    dueDate: "29 Jul 2026",
    subtotal: 65000,
    tax: 11700,
    discount: 0,
    total: 76700,
    paidAmount: 0,
    balance: 76700,
    paymentTerms: "50% Advance",
    paymentMethod: "Bank Transfer",
    status: "Pending Approval",
    priority: "Urgent",
    requestedBy: "Aarav Mehta",
    approvedBy: "Pending",
    reference: "CNI-INF-188",
    notes:
      "Influencer campaign advance for luxury festive collection.",
  },
  {
    id: "PB-2026-1837",
    billNumber: "FOS-7812",
    vendor: "Fresh Office Supply",
    vendorId: "VEN-2026-006",
    purchaseOrder: "PO-2026-168",
    category: "Office & Professional",
    department: "Administration",
    invoiceDate: "18 Jul 2026",
    dueDate: "18 Jul 2026",
    subtotal: 6800,
    tax: 816,
    discount: 0,
    total: 7616,
    paidAmount: 7616,
    balance: 0,
    paymentTerms: "Net 15",
    paymentMethod: "UPI",
    status: "Paid",
    priority: "Normal",
    requestedBy: "Anjali Singh",
    approvedBy: "Ritika Jain",
    reference: "FOS-JUL-7812",
    notes: "Monthly pantry and office refreshment supplies.",
  },
  {
    id: "PB-2026-1836",
    billNumber: "NC-2942",
    vendor: "Nexora Consulting",
    vendorId: "VEN-2026-007",
    purchaseOrder: "PO-2026-160",
    category: "Office & Professional",
    department: "Founder Office",
    invoiceDate: "12 Jul 2026",
    dueDate: "29 Jul 2026",
    subtotal: 105932,
    tax: 19068,
    discount: 0,
    total: 125000,
    paidAmount: 0,
    balance: 125000,
    paymentTerms: "Milestone Based",
    paymentMethod: "Bank Transfer",
    status: "Pending Approval",
    priority: "High",
    requestedBy: "Founder Office",
    approvedBy: "Pending",
    reference: "NC-STR-2942",
    notes: "Business strategy and market expansion consulting fee.",
  },
  {
    id: "PB-2026-1835",
    billNumber: "ULT-4428",
    vendor: "Urban Loom Traders",
    vendorId: "VEN-2026-008",
    purchaseOrder: "PO-2026-142",
    category: "Textiles & Materials",
    department: "Products",
    invoiceDate: "14 May 2026",
    dueDate: "28 May 2026",
    subtotal: 74200,
    tax: 13356,
    discount: 5000,
    total: 82556,
    paidAmount: 0,
    balance: 82556,
    paymentTerms: "Net 30",
    paymentMethod: "Bank Transfer",
    status: "Overdue",
    priority: "Urgent",
    requestedBy: "Arjun Kapoor",
    approvedBy: "Under Review",
    reference: "ULT-MAY-4428",
    notes:
      "Payment held due to material quality deviation and incomplete delivery.",
  },
  {
    id: "PB-2026-1834",
    billNumber: "CGT-7416",
    vendor: "CloudGrid Technologies",
    vendorId: "VEN-2026-009",
    purchaseOrder: "PO-2026-136",
    category: "Technology",
    department: "Technology",
    invoiceDate: "02 Jul 2026",
    dueDate: "02 Jul 2026",
    subtotal: 460000,
    tax: 82800,
    discount: 0,
    total: 542800,
    paidAmount: 542800,
    balance: 0,
    paymentTerms: "Annual Advance",
    paymentMethod: "Bank Transfer",
    status: "Paid",
    priority: "High",
    requestedBy: "Neha Sharma",
    approvedBy: "Badal Kumar",
    reference: "CGT-AN-7416",
    notes:
      "Annual cloud infrastructure, database and security service renewal.",
  },
  {
    id: "PB-2026-1833",
    billNumber: "TMP-2026-72",
    vendor: "Temporary Vendor",
    vendorId: "VEN-TEMP-72",
    purchaseOrder: "PO-2026-129",
    category: "Marketing Services",
    department: "Marketing",
    invoiceDate: "10 Jul 2026",
    dueDate: "20 Jul 2026",
    subtotal: 24000,
    tax: 4320,
    discount: 0,
    total: 28320,
    paidAmount: 0,
    balance: 28320,
    paymentTerms: "Net 10",
    paymentMethod: "Bank Transfer",
    status: "Rejected",
    priority: "Normal",
    requestedBy: "Aarav Mehta",
    approvedBy: "Finance Manager",
    reference: "TMP-MKT-72",
    notes:
      "Rejected because supporting campaign documents were incomplete.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: BillStatus) {
  if (status === "Paid") return "bg-emerald-50 text-emerald-600";
  if (status === "Approved") return "bg-blue-50 text-blue-600";
  if (status === "Partially Paid") return "bg-purple-50 text-purple-600";
  if (status === "Pending Approval") return "bg-amber-50 text-amber-600";
  if (status === "Overdue") return "bg-red-50 text-red-600";
  if (status === "Rejected") return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-500";
}

function getPriorityClass(priority: BillPriority) {
  if (priority === "Urgent") return "bg-red-50 text-red-600";
  if (priority === "High") return "bg-orange-50 text-orange-600";
  if (priority === "Medium") return "bg-amber-50 text-amber-600";
  return "bg-slate-100 text-slate-500";
}

export default function PurchaseBillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBill, setSelectedBill] =
    useState<PurchaseBill | null>(null);

  const filteredBills = useMemo(() => {
    return purchaseBills.filter((bill) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        bill.id.toLowerCase().includes(query) ||
        bill.billNumber.toLowerCase().includes(query) ||
        bill.vendor.toLowerCase().includes(query) ||
        bill.purchaseOrder.toLowerCase().includes(query) ||
        bill.reference.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || bill.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        bill.department === departmentFilter;

      const matchesCategory =
        categoryFilter === "All" || bill.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesCategory
      );
    });
  }, [
    searchQuery,
    statusFilter,
    departmentFilter,
    categoryFilter,
  ]);

  const filteredOutstanding = filteredBills.reduce(
    (total, bill) => total + bill.balance,
    0,
  );

  const maxBillValue = Math.max(
    ...monthlyBills.map((item) => item.value),
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
                Finance / Purchase Bills
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Purchase Bills
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Record vendor invoices, monitor approvals, track due
                payments and control outstanding liabilities.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" />
              Import Bills
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <Link
              href="/finance/purchase-bills/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Add Purchase Bill
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {billStats.map((stat) => {
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
                          : "bg-red-50 text-red-600",
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
                  Monthly Purchase Bill Trend
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Total vendor bills recorded during the financial year
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
                  Current Month Bills
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹8.42L
                </p>
                <p className="mt-2 text-xs font-black text-amber-600">
                  +4.2% vs June
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Paid Amount
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹5.68L
                </p>
                <p className="mt-2 text-xs font-black text-emerald-600">
                  67.4% settled
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Average Bill Value
                </p>
                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  ₹45,760
                </p>
                <p className="mt-2 text-xs font-black text-slate-500">
                  184 purchase bills
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="flex h-[280px] min-w-[760px] items-end gap-4">
                {monthlyBills.map((item) => {
                  const height = (item.value / maxBillValue) * 100;

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
              Accounts Payable Health
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">88</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Payables health score
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Landmark className="h-7 w-7 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[88%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Payment Compliance
                  </p>
                  <p className="mt-1 text-lg font-black">93.2%</p>
                </div>

                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Average Approval Time
                  </p>
                  <p className="mt-1 text-lg font-black">1.8 Days</p>
                </div>

                <Clock3 className="h-5 w-5 text-blue-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Overdue Ratio
                  </p>
                  <p className="mt-1 text-lg font-black">6.8%</p>
                </div>

                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
            </div>

            <Link
              href="/finance/payments"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Payment Center
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Bill Spend by Category
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Purchase bill value grouped by expense category
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {categorySpend.map((item) => (
                <div
                  key={item.category}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {item.category}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {item.bills} purchase bills
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {item.amount}
                      </p>

                      <p className="mt-1 text-xs font-black text-slate-400">
                        {item.percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#10233b]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Upcoming Vendor Payments
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Purchase bills approaching payment due date
                </p>
              </div>

              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-3">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.bill}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {payment.vendor}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Bill #{payment.bill}
                      </p>
                    </div>

                    <p className="text-sm font-black text-[#d02b3f]">
                      {payment.amount}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      {payment.date}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                        payment.status === "Due Tomorrow"
                          ? "bg-red-50 text-red-600"
                          : payment.status === "Approval Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600",
                      ].join(" ")}
                    >
                      {payment.status}
                    </span>
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
                <h2 className="text-lg font-black text-[#10233b]">
                  Purchase Bill Register
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Search, filter and manage all vendor purchase bills
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-[330px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search bill, vendor or purchase order..."
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
                <label>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Bill Status
                  </span>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                  >
                    <option>All</option>
                    <option>Draft</option>
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>Partially Paid</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                    <option>Rejected</option>
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
                  </select>
                </label>

                <label>
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
                    <option>Textiles & Materials</option>
                    <option>Packaging</option>
                    <option>Marketing Services</option>
                    <option>Technology</option>
                    <option>Logistics</option>
                    <option>Office & Professional</option>
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
                  {filteredBills.length}
                </span>{" "}
                purchase bills
              </p>

              <p className="text-xs font-bold text-slate-500">
                Outstanding balance:{" "}
                <span className="font-black text-[#d02b3f]">
                  {formatCurrency(filteredOutstanding)}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Bill
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Vendor
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Purchase Order
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Department
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Total
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Paid
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Balance
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Invoice Date
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Due Date
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
                {filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {bill.id}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Vendor bill #{bill.billNumber}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {bill.vendor}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {bill.vendorId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-[#10233b]">
                        {bill.purchaseOrder}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {bill.reference}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {bill.department}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {bill.category}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {formatCurrency(bill.total)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-emerald-600">
                      {formatCurrency(bill.paidAmount)}
                    </td>

                    <td className="px-5 py-4">
                      <p
                        className={[
                          "text-sm font-black",
                          bill.balance > 0
                            ? "text-[#d02b3f]"
                            : "text-emerald-600",
                        ].join(" ")}
                      >
                        {formatCurrency(bill.balance)}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {bill.paymentTerms}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {bill.invoiceDate}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {bill.dueDate}
                      </p>

                      {bill.status === "Overdue" && (
                        <p className="mt-1 text-xs font-black text-red-600">
                          Payment overdue
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getPriorityClass(bill.priority),
                        ].join(" ")}
                      >
                        {bill.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getStatusClass(bill.status),
                        ].join(" ")}
                      >
                        {bill.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedBill(bill)}
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

                {filteredBills.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search className="h-6 w-6" />
                      </div>

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No purchase bills found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change your search or filter selection.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Page 1 of 1 · {filteredBills.length} purchase bills
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
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FileCheck2 className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Three-Way Matching
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              94.6%
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Bills successfully matched with purchase orders and receipts.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Due This Week
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹4.72L
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Approved purchase bills scheduled for payment this week.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Tax Validation
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              98.2%
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Vendor GST and invoice tax details successfully validated.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Purchase Bills</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Purchase bill systems operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
      </main>

      {selectedBill && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#071321]/55 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close purchase bill details"
            onClick={() => setSelectedBill(null)}
            className="absolute inset-0"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Purchase Bill
                </p>

                <h2 className="mt-1 text-xl font-black text-[#10233b]">
                  {selectedBill.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBill(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Total Bill Amount
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(selectedBill.total)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider",
                      selectedBill.status === "Paid"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedBill.status === "Approved"
                          ? "bg-blue-400/15 text-blue-300"
                          : selectedBill.status === "Pending Approval"
                            ? "bg-amber-400/15 text-amber-300"
                            : selectedBill.status === "Overdue"
                              ? "bg-red-400/15 text-red-300"
                              : "bg-white/10 text-white",
                    ].join(" ")}
                  >
                    {selectedBill.status}
                  </span>

                  <span className="text-xs font-semibold text-slate-300">
                    Due {selectedBill.dueDate}
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Vendor & Bill Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedBill.vendor}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Vendor Bill Number
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedBill.billNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Purchase Order
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedBill.purchaseOrder}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Invoice Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedBill.invoiceDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Due Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedBill.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Bill Breakdown
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      Subtotal
                    </span>

                    <span className="text-sm font-black text-[#10233b]">
                      {formatCurrency(selectedBill.subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      Tax
                    </span>

                    <span className="text-sm font-black text-slate-700">
                      {formatCurrency(selectedBill.tax)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-500">
                      Discount
                    </span>

                    <span className="text-sm font-black text-red-500">
                      -{formatCurrency(selectedBill.discount)}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-[#10233b]">
                        Total
                      </span>

                      <span className="text-lg font-black text-[#10233b]">
                        {formatCurrency(selectedBill.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
                    <span className="text-sm font-semibold text-slate-500">
                      Paid Amount
                    </span>

                    <span className="text-sm font-black text-emerald-600">
                      {formatCurrency(selectedBill.paidAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-black text-[#10233b]">
                      Outstanding Balance
                    </span>

                    <span className="text-lg font-black text-[#d02b3f]">
                      {formatCurrency(selectedBill.balance)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Approval Information
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Requested By
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedBill.requestedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Approved By
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedBill.approvedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Payment Terms
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedBill.paymentTerms}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Payment Method
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedBill.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Notes
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {selectedBill.notes}
                </p>
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b]"
              >
                <Paperclip className="h-4 w-4" />
                View Invoice Attachment
              </button>

              {selectedBill.status === "Pending Approval" && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600"
                  >
                    Reject Bill
                  </button>

                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white"
                  >
                    Approve Bill
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
                  Edit Bill
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}