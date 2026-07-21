"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
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
  FileSpreadsheet,
  Filter,
  IndianRupee,
  Landmark,
  ListFilter,
  MoreHorizontal,
  Plus,
  ReceiptText,
  RefreshCcw,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Upload,
  UserRound,
  WalletCards,
  WandSparkles,
  X,
  XCircle,
} from "lucide-react";

type InvoiceStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Scheduled"
  | "Partially Paid"
  | "Paid"
  | "Overdue"
  | "Rejected"
  | "On Hold";

type ApprovalStatus =
  | "Not Submitted"
  | "Department Approval"
  | "Finance Approval"
  | "Founder Approval"
  | "Approved"
  | "Rejected";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

type PaymentPriority = "Low" | "Normal" | "High" | "Urgent";

type Vendor = {
  id: string;
  name: string;
  category: string;
  gstin: string;
  contactPerson: string;
  email: string;
  phone: string;
  paymentTerms: string;
  bankName: string;
  accountNumber: string;
  status: "Active" | "Restricted" | "Blocked";
  outstandingAmount: number;
  overdueAmount: number;
  totalInvoices: number;
  riskLevel: RiskLevel;
};

type PayableInvoice = {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  vendorCategory: string;
  invoiceDate: string;
  dueDate: string;
  postingDate: string;
  amount: number;
  taxAmount: number;
  paidAmount: number;
  balanceAmount: number;
  currency: "INR";
  status: InvoiceStatus;
  approvalStatus: ApprovalStatus;
  priority: PaymentPriority;
  paymentTerms: string;
  purchaseOrder?: string;
  goodsReceipt?: string;
  costCenter: string;
  department: string;
  expenseCategory: string;
  createdBy: string;
  approvedBy: string;
  assignedTo: string;
  riskLevel: RiskLevel;
  riskScore: number;
  duplicateProbability: number;
  daysUntilDue: number;
  notes?: string;
};

type ApprovalHistoryItem = {
  id: string;
  stage: string;
  approver: string;
  action: "Approved" | "Pending" | "Rejected";
  date: string;
  time: string;
  note: string;
};

type AuditLogItem = {
  id: string;
  action: string;
  user: string;
  date: string;
  time: string;
  device: string;
  location: string;
};

const vendors: Vendor[] = [
  {
    id: "VEN-001",
    name: "Nova Luxury Textiles",
    category: "Premium Fabrics",
    gstin: "27AABCN5821K1Z7",
    contactPerson: "Rohan Mehta",
    email: "accounts@novaluxury.in",
    phone: "+91 98204 58214",
    paymentTerms: "Net 30",
    bankName: "ICICI Bank",
    accountNumber: "•••• 7284",
    status: "Active",
    outstandingAmount: 3240000,
    overdueAmount: 820000,
    totalInvoices: 18,
    riskLevel: "Medium",
  },
  {
    id: "VEN-002",
    name: "Fabric Source India",
    category: "Raw Materials",
    gstin: "09AAGCF4182P1Z4",
    contactPerson: "Aditi Sharma",
    email: "finance@fabricsource.in",
    phone: "+91 94152 88410",
    paymentTerms: "Net 15",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4198",
    status: "Active",
    outstandingAmount: 1485000,
    overdueAmount: 275000,
    totalInvoices: 12,
    riskLevel: "Low",
  },
  {
    id: "VEN-003",
    name: "Meta Platforms India",
    category: "Digital Marketing",
    gstin: "29AAFCM3828L1ZX",
    contactPerson: "Digital Billing",
    email: "billing@meta.com",
    phone: "+91 80671 92840",
    paymentTerms: "Immediate",
    bankName: "Citibank",
    accountNumber: "•••• 9102",
    status: "Active",
    outstandingAmount: 418000,
    overdueAmount: 0,
    totalInvoices: 7,
    riskLevel: "Low",
  },
  {
    id: "VEN-004",
    name: "Amazon Web Services India",
    category: "Cloud Infrastructure",
    gstin: "29AAICA3918J1ZD",
    contactPerson: "AWS Billing",
    email: "billing@aws.amazon.com",
    phone: "+91 80419 28000",
    paymentTerms: "Net 30",
    bankName: "Deutsche Bank",
    accountNumber: "•••• 6628",
    status: "Active",
    outstandingAmount: 252000,
    overdueAmount: 84000,
    totalInvoices: 5,
    riskLevel: "Low",
  },
  {
    id: "VEN-005",
    name: "Urban Logistics Network",
    category: "Logistics",
    gstin: "07AACCU9281M1ZQ",
    contactPerson: "Kunal Verma",
    email: "payments@urbanlogistics.in",
    phone: "+91 98117 28190",
    paymentTerms: "Net 15",
    bankName: "Axis Bank",
    accountNumber: "•••• 3182",
    status: "Restricted",
    outstandingAmount: 675000,
    overdueAmount: 410000,
    totalInvoices: 9,
    riskLevel: "High",
  },
];

const payableInvoices: PayableInvoice[] = [
  {
    id: "AP-2026-10482",
    invoiceNumber: "NLT-INV-5821",
    vendorId: "VEN-001",
    vendorName: "Nova Luxury Textiles",
    vendorCategory: "Premium Fabrics",
    invoiceDate: "02 Jul 2026",
    dueDate: "01 Aug 2026",
    postingDate: "03 Jul 2026",
    amount: 1420000,
    taxAmount: 216610,
    paidAmount: 0,
    balanceAmount: 1420000,
    currency: "INR",
    status: "Pending Approval",
    approvalStatus: "Founder Approval",
    priority: "High",
    paymentTerms: "Net 30",
    purchaseOrder: "PO-2026-4181",
    goodsReceipt: "GRN-2026-2791",
    costCenter: "CC-PRODUCTION",
    department: "Procurement",
    expenseCategory: "Inventory Purchase",
    createdBy: "Procurement Finance",
    approvedBy: "Pending",
    assignedTo: "Aditi Sharma",
    riskLevel: "High",
    riskScore: 76,
    duplicateProbability: 8,
    daysUntilDue: 11,
    notes: "High-value premium textile purchase requiring founder approval.",
  },
  {
    id: "AP-2026-10481",
    invoiceNumber: "FSI-INV-8841",
    vendorId: "VEN-002",
    vendorName: "Fabric Source India",
    vendorCategory: "Raw Materials",
    invoiceDate: "05 Jul 2026",
    dueDate: "20 Jul 2026",
    postingDate: "05 Jul 2026",
    amount: 275000,
    taxAmount: 41949,
    paidAmount: 0,
    balanceAmount: 275000,
    currency: "INR",
    status: "Overdue",
    approvalStatus: "Approved",
    priority: "Urgent",
    paymentTerms: "Net 15",
    purchaseOrder: "PO-2026-4168",
    goodsReceipt: "GRN-2026-2768",
    costCenter: "CC-PRODUCTION",
    department: "Procurement",
    expenseCategory: "Raw Material",
    createdBy: "Accounts Payable",
    approvedBy: "Finance Director",
    assignedTo: "Ritika Singh",
    riskLevel: "Medium",
    riskScore: 42,
    duplicateProbability: 14,
    daysUntilDue: -1,
    notes: "Payment became overdue yesterday.",
  },
  {
    id: "AP-2026-10480",
    invoiceNumber: "META-0721-2026",
    vendorId: "VEN-003",
    vendorName: "Meta Platforms India",
    vendorCategory: "Digital Marketing",
    invoiceDate: "18 Jul 2026",
    dueDate: "21 Jul 2026",
    postingDate: "18 Jul 2026",
    amount: 149000,
    taxAmount: 22729,
    paidAmount: 0,
    balanceAmount: 149000,
    currency: "INR",
    status: "Scheduled",
    approvalStatus: "Approved",
    priority: "Normal",
    paymentTerms: "Immediate",
    purchaseOrder: "PO-MKT-2194",
    costCenter: "CC-MARKETING",
    department: "Marketing",
    expenseCategory: "Digital Advertising",
    createdBy: "Marketing Finance",
    approvedBy: "Finance Manager",
    assignedTo: "Rahul Verma",
    riskLevel: "Low",
    riskScore: 18,
    duplicateProbability: 4,
    daysUntilDue: 0,
  },
  {
    id: "AP-2026-10479",
    invoiceNumber: "AWS-IN-72914",
    vendorId: "VEN-004",
    vendorName: "Amazon Web Services India",
    vendorCategory: "Cloud Infrastructure",
    invoiceDate: "20 Jun 2026",
    dueDate: "20 Jul 2026",
    postingDate: "21 Jun 2026",
    amount: 84000,
    taxAmount: 12814,
    paidAmount: 0,
    balanceAmount: 84000,
    currency: "INR",
    status: "Overdue",
    approvalStatus: "Approved",
    priority: "High",
    paymentTerms: "Net 30",
    purchaseOrder: "PO-TECH-1295",
    costCenter: "CC-TECHNOLOGY",
    department: "Technology",
    expenseCategory: "Cloud Infrastructure",
    createdBy: "Technology Finance",
    approvedBy: "CTO Office",
    assignedTo: "Nikhil Anand",
    riskLevel: "Low",
    riskScore: 16,
    duplicateProbability: 2,
    daysUntilDue: -1,
  },
  {
    id: "AP-2026-10478",
    invoiceNumber: "ULN-INV-7218",
    vendorId: "VEN-005",
    vendorName: "Urban Logistics Network",
    vendorCategory: "Logistics",
    invoiceDate: "12 Jun 2026",
    dueDate: "27 Jun 2026",
    postingDate: "12 Jun 2026",
    amount: 410000,
    taxAmount: 62542,
    paidAmount: 0,
    balanceAmount: 410000,
    currency: "INR",
    status: "On Hold",
    approvalStatus: "Finance Approval",
    priority: "Urgent",
    paymentTerms: "Net 15",
    purchaseOrder: "PO-LOG-1821",
    goodsReceipt: "GRN-LOG-824",
    costCenter: "CC-LOGISTICS",
    department: "Operations",
    expenseCategory: "Freight & Logistics",
    createdBy: "Operations Finance",
    approvedBy: "Pending",
    assignedTo: "Aman Raj",
    riskLevel: "High",
    riskScore: 82,
    duplicateProbability: 18,
    daysUntilDue: -24,
    notes: "Vendor account restricted due to delivery dispute.",
  },
  {
    id: "AP-2026-10477",
    invoiceNumber: "FSI-INV-8841-D",
    vendorId: "VEN-002",
    vendorName: "Fabric Source India",
    vendorCategory: "Raw Materials",
    invoiceDate: "05 Jul 2026",
    dueDate: "20 Jul 2026",
    postingDate: "19 Jul 2026",
    amount: 275000,
    taxAmount: 41949,
    paidAmount: 0,
    balanceAmount: 275000,
    currency: "INR",
    status: "Rejected",
    approvalStatus: "Rejected",
    priority: "Normal",
    paymentTerms: "Net 15",
    purchaseOrder: "PO-2026-4168",
    goodsReceipt: "GRN-2026-2768",
    costCenter: "CC-PRODUCTION",
    department: "Procurement",
    expenseCategory: "Raw Material",
    createdBy: "Accounts Payable",
    approvedBy: "Rejected by KEOS",
    assignedTo: "Ritika Singh",
    riskLevel: "Critical",
    riskScore: 96,
    duplicateProbability: 98,
    daysUntilDue: -1,
    notes: "Duplicate invoice number, amount and purchase order detected.",
  },
  {
    id: "AP-2026-10476",
    invoiceNumber: "DESIGN-INV-2941",
    vendorId: "VEN-006",
    vendorName: "Maison Creative Studio",
    vendorCategory: "Creative Services",
    invoiceDate: "15 Jul 2026",
    dueDate: "14 Aug 2026",
    postingDate: "16 Jul 2026",
    amount: 360000,
    taxAmount: 54915,
    paidAmount: 180000,
    balanceAmount: 180000,
    currency: "INR",
    status: "Partially Paid",
    approvalStatus: "Approved",
    priority: "Normal",
    paymentTerms: "Net 30",
    purchaseOrder: "PO-CRT-7281",
    costCenter: "CC-CREATIVE",
    department: "Creative",
    expenseCategory: "Design Services",
    createdBy: "Creative Finance",
    approvedBy: "Creative Director",
    assignedTo: "Nisha Kapoor",
    riskLevel: "Low",
    riskScore: 12,
    duplicateProbability: 3,
    daysUntilDue: 24,
  },
  {
    id: "AP-2026-10475",
    invoiceNumber: "LEASE-0726",
    vendorId: "VEN-007",
    vendorName: "Prestige Commercial Estates",
    vendorCategory: "Real Estate",
    invoiceDate: "01 Jul 2026",
    dueDate: "25 Jul 2026",
    postingDate: "01 Jul 2026",
    amount: 625000,
    taxAmount: 95339,
    paidAmount: 0,
    balanceAmount: 625000,
    currency: "INR",
    status: "Approved",
    approvalStatus: "Approved",
    priority: "High",
    paymentTerms: "Monthly",
    costCenter: "CC-ADMIN",
    department: "Administration",
    expenseCategory: "Office Lease",
    createdBy: "Administration Finance",
    approvedBy: "Finance Director",
    assignedTo: "Vikas Tiwari",
    riskLevel: "Low",
    riskScore: 10,
    duplicateProbability: 1,
    daysUntilDue: 4,
  },
  {
    id: "AP-2026-10474",
    invoiceNumber: "SEC-INV-4192",
    vendorId: "VEN-008",
    vendorName: "Sentinel Facility Services",
    vendorCategory: "Facility Management",
    invoiceDate: "10 Jul 2026",
    dueDate: "09 Aug 2026",
    postingDate: "11 Jul 2026",
    amount: 218000,
    taxAmount: 33254,
    paidAmount: 0,
    balanceAmount: 218000,
    currency: "INR",
    status: "Pending Approval",
    approvalStatus: "Department Approval",
    priority: "Normal",
    paymentTerms: "Net 30",
    purchaseOrder: "PO-ADM-8812",
    costCenter: "CC-ADMIN",
    department: "Administration",
    expenseCategory: "Facility Management",
    createdBy: "Admin Operations",
    approvedBy: "Pending",
    assignedTo: "Vikas Tiwari",
    riskLevel: "Low",
    riskScore: 14,
    duplicateProbability: 4,
    daysUntilDue: 19,
  },
];

const approvalHistory: ApprovalHistoryItem[] = [
  {
    id: "APR-001",
    stage: "Invoice Verification",
    approver: "Accounts Payable Team",
    action: "Approved",
    date: "03 Jul 2026",
    time: "10:42 AM",
    note: "Invoice details matched with purchase order.",
  },
  {
    id: "APR-002",
    stage: "Goods Receipt Validation",
    approver: "Procurement Operations",
    action: "Approved",
    date: "03 Jul 2026",
    time: "11:18 AM",
    note: "Goods receipt quantity and quality confirmed.",
  },
  {
    id: "APR-003",
    stage: "Finance Review",
    approver: "Finance Director",
    action: "Approved",
    date: "04 Jul 2026",
    time: "02:10 PM",
    note: "Budget availability and tax treatment verified.",
  },
  {
    id: "APR-004",
    stage: "Founder Authorization",
    approver: "Founder Office",
    action: "Pending",
    date: "21 Jul 2026",
    time: "12:16 PM",
    note: "High-value invoice awaiting final approval.",
  },
];

const auditLogs: AuditLogItem[] = [
  {
    id: "AUD-AP-9021",
    action: "Invoice uploaded",
    user: "Aditi Sharma",
    date: "03 Jul 2026",
    time: "09:48 AM",
    device: "Windows Desktop",
    location: "Varanasi, India",
  },
  {
    id: "AUD-AP-9022",
    action: "Purchase order linked",
    user: "Procurement Finance",
    date: "03 Jul 2026",
    time: "10:02 AM",
    device: "Chrome Browser",
    location: "Varanasi, India",
  },
  {
    id: "AUD-AP-9023",
    action: "Duplicate scan completed",
    user: "KEOS AP Intelligence",
    date: "03 Jul 2026",
    time: "10:08 AM",
    device: "System Automation",
    location: "KEOS Cloud",
  },
  {
    id: "AUD-AP-9024",
    action: "Founder approval requested",
    user: "Finance Director",
    date: "21 Jul 2026",
    time: "12:16 PM",
    device: "MacBook Pro",
    location: "Mumbai, India",
  },
];

const agingData = [
  {
    label: "Current",
    subtitle: "Not yet due",
    amount: 3124000,
    count: 5,
    percentage: 48,
  },
  {
    label: "1–30 Days",
    subtitle: "Early overdue",
    amount: 1169000,
    count: 3,
    percentage: 18,
  },
  {
    label: "31–60 Days",
    subtitle: "Medium overdue",
    amount: 820000,
    count: 2,
    percentage: 13,
  },
  {
    label: "61–90 Days",
    subtitle: "High overdue",
    amount: 410000,
    count: 1,
    percentage: 7,
  },
  {
    label: "90+ Days",
    subtitle: "Critical overdue",
    amount: 875000,
    count: 2,
    percentage: 14,
  },
];

const paymentForecast = [
  { day: "21 Jul", amount: 149000 },
  { day: "22 Jul", amount: 275000 },
  { day: "23 Jul", amount: 84000 },
  { day: "24 Jul", amount: 410000 },
  { day: "25 Jul", amount: 625000 },
  { day: "26 Jul", amount: 218000 },
  { day: "27 Jul", amount: 1420000 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  const absoluteValue = Math.abs(value);
  const prefix = value < 0 ? "-" : "";

  if (absoluteValue >= 10000000) {
    return `${prefix}₹${(absoluteValue / 10000000).toFixed(2)}Cr`;
  }

  if (absoluteValue >= 100000) {
    return `${prefix}₹${(absoluteValue / 100000).toFixed(2)}L`;
  }

  return `${prefix}₹${absoluteValue.toLocaleString("en-IN")}`;
}

function getStatusClass(status: InvoiceStatus) {
  if (status === "Paid") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Approved") {
    return "bg-blue-50 text-blue-600";
  }

  if (status === "Scheduled") {
    return "bg-violet-50 text-violet-600";
  }

  if (status === "Partially Paid") {
    return "bg-cyan-50 text-cyan-600";
  }

  if (status === "Pending Approval") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Overdue") {
    return "bg-red-50 text-red-600";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-700";
  }

  if (status === "On Hold") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-slate-100 text-slate-500";
}

function getApprovalClass(status: ApprovalStatus) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Founder Approval") {
    return "bg-violet-50 text-violet-600";
  }

  if (status === "Finance Approval") {
    return "bg-blue-50 text-blue-600";
  }

  if (status === "Department Approval") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-600";
  }

  return "bg-slate-100 text-slate-500";
}

function getRiskClass(level: RiskLevel) {
  if (level === "Low") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (level === "Medium") {
    return "bg-amber-50 text-amber-600";
  }

  if (level === "High") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-red-100 text-red-700";
}

function getPriorityClass(priority: PaymentPriority) {
  if (priority === "Urgent") {
    return "bg-red-50 text-red-600";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-600";
  }

  if (priority === "Normal") {
    return "bg-blue-50 text-blue-600";
  }

  return "bg-slate-100 text-slate-500";
}

export default function AccountsPayablePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [selectedInvoice, setSelectedInvoice] =
    useState<PayableInvoice | null>(null);

  const filteredInvoices = useMemo(() => {
    return payableInvoices.filter((invoice) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        invoice.id.toLowerCase().includes(query) ||
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.vendorName.toLowerCase().includes(query) ||
        invoice.department.toLowerCase().includes(query) ||
        invoice.expenseCategory.toLowerCase().includes(query) ||
        invoice.purchaseOrder?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;

      const matchesApproval =
        approvalFilter === "All" ||
        invoice.approvalStatus === approvalFilter;

      const matchesRisk =
        riskFilter === "All" || invoice.riskLevel === riskFilter;

      const matchesPriority =
        priorityFilter === "All" || invoice.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesApproval &&
        matchesRisk &&
        matchesPriority
      );
    });
  }, [
    searchQuery,
    statusFilter,
    approvalFilter,
    riskFilter,
    priorityFilter,
  ]);

  const totals = useMemo(() => {
    return payableInvoices.reduce(
      (result, invoice) => {
        result.totalPayables += invoice.balanceAmount;

        if (invoice.status === "Overdue" || invoice.daysUntilDue < 0) {
          result.overdueAmount += invoice.balanceAmount;
          result.overdueCount += 1;
        }

        if (
          invoice.status === "Pending Approval" ||
          invoice.approvalStatus === "Founder Approval" ||
          invoice.approvalStatus === "Finance Approval" ||
          invoice.approvalStatus === "Department Approval"
        ) {
          result.pendingApprovalAmount += invoice.balanceAmount;
          result.pendingApprovalCount += 1;
        }

        if (
          invoice.status === "Scheduled" ||
          invoice.status === "Approved"
        ) {
          result.readyForPayment += invoice.balanceAmount;
        }

        if (
          invoice.riskLevel === "High" ||
          invoice.riskLevel === "Critical"
        ) {
          result.highRiskCount += 1;
        }

        if (invoice.duplicateProbability >= 80) {
          result.duplicateCount += 1;
        }

        return result;
      },
      {
        totalPayables: 0,
        overdueAmount: 0,
        overdueCount: 0,
        pendingApprovalAmount: 0,
        pendingApprovalCount: 0,
        readyForPayment: 0,
        highRiskCount: 0,
        duplicateCount: 0,
      },
    );
  }, []);

  const paymentForecastMax = Math.max(
    ...paymentForecast.map((item) => item.amount),
  );

  const totalVendorOutstanding = vendors.reduce(
    (total, vendor) => total + vendor.outstandingAmount,
    0,
  );

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-[#f5f7fa]">
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
                Procure-to-Pay
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Accounts Payable
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Manage vendor invoices, approvals, due payments and liabilities
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export AP Report
            </button>

            <button
              type="button"
              onClick={() => setShowCreatePanel(true)}
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              New Vendor Invoice
            </button>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10233b] text-white">
              <WalletCards className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Total Payables
            </p>

            <p className="mt-1 text-2xl font-black text-[#10233b]">
              {formatCompactCurrency(totals.totalPayables)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Outstanding liability
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Overdue
            </p>

            <p className="mt-1 text-2xl font-black text-red-600">
              {formatCompactCurrency(totals.overdueAmount)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              {totals.overdueCount} invoices overdue
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Pending Approval
            </p>

            <p className="mt-1 text-2xl font-black text-[#10233b]">
              {totals.pendingApprovalCount}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              {formatCompactCurrency(totals.pendingApprovalAmount)}
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Ready to Pay
            </p>

            <p className="mt-1 text-2xl font-black text-emerald-600">
              {formatCompactCurrency(totals.readyForPayment)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Approved or scheduled
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              High Risk
            </p>

            <p className="mt-1 text-2xl font-black text-orange-600">
              {totals.highRiskCount}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Invoices require review
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <FileCheck2 className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Duplicate Alerts
            </p>

            <p className="mt-1 text-2xl font-black text-red-700">
              {totals.duplicateCount}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              AI-confirmed matches
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Liability Intelligence
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Accounts Payable Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Vendor liabilities, payment demand and invoice performance
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <CalendarDays className="h-4 w-4" />
                  Jul 2026
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Vendor Outstanding
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(totalVendorOutstanding)}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Across {vendors.length} monitored vendors
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Open Invoices
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {
                    payableInvoices.filter(
                      (invoice) =>
                        invoice.status !== "Paid" &&
                        invoice.status !== "Rejected",
                    ).length
                  }
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Active invoices
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Due This Week
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(
                    payableInvoices
                      .filter(
                        (invoice) =>
                          invoice.daysUntilDue >= 0 &&
                          invoice.daysUntilDue <= 7,
                      )
                      .reduce(
                        (total, invoice) =>
                          total + invoice.balanceAmount,
                        0,
                      ),
                  )}
                </p>

                <p className="mt-2 text-xs font-medium text-amber-600">
                  Immediate cash requirement
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Average Invoice
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(
                    totals.totalPayables / payableInvoices.length,
                  )}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Average open liability
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-[#10233b]">
                    7-Day Payment Forecast
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Expected cash outflow from approved and due invoices
                  </p>
                </div>

                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>

              <div className="mt-6 flex h-[250px] items-end gap-3 sm:gap-5">
                {paymentForecast.map((item) => {
                  const height =
                    (item.amount / paymentForecastMax) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          className="w-full max-w-[48px] rounded-t-xl bg-[#10233b]"
                          style={{
                            height: `${Math.max(height, 8)}%`,
                          }}
                        />
                      </div>

                      <div className="text-center">
                        <p className="text-[10px] font-black text-[#10233b]">
                          {formatCompactCurrency(item.amount)}
                        </p>

                        <p className="mt-1 text-[9px] font-black uppercase text-slate-400">
                          {item.day}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <WandSparkles className="h-6 w-6 text-amber-400" />
              </div>

              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                AI Active
              </span>
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              KEOS AP Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Payment risks detected
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              KEOS validates invoices against purchase orders, receipts,
              duplicate patterns, vendor risk and approval thresholds.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                  <div>
                    <p className="text-sm font-black">
                      Duplicate invoice rejected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      FSI-INV-8841-D matched an existing invoice with 98%
                      probability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />

                  <div>
                    <p className="text-sm font-black">
                      Vendor payment on hold
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Urban Logistics Network has a ₹4.10L disputed invoice
                      and restricted vendor status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />

                  <div>
                    <p className="text-sm font-black">
                      Founder approval required
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Nova Luxury Textiles invoice worth ₹14.20L is awaiting
                      founder authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Review AP Alerts
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Configure AP Rules
              <ChevronRight className="h-4 w-4" />
            </button>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.45fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Aging Analysis
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Payables Aging
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Outstanding vendor balances grouped by overdue age
                </p>
              </div>

              <FileSpreadsheet className="h-6 w-6 text-[#10233b]" />
            </div>

            <div className="mt-6 space-y-4">
              {agingData.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {item.subtitle} · {item.count} invoices
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(item.amount)}
                      </p>

                      <p className="mt-1 text-xs font-black text-slate-400">
                        {item.percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={[
                        "h-full rounded-full",
                        item.label === "Current"
                          ? "bg-emerald-500"
                          : item.label === "1–30 Days"
                            ? "bg-blue-500"
                            : item.label === "31–60 Days"
                              ? "bg-amber-500"
                              : item.label === "61–90 Days"
                                ? "bg-orange-500"
                                : "bg-red-500",
                      ].join(" ")}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Payment Control
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Cash Requirement
                </h2>
              </div>

              <Banknote className="h-6 w-6 text-[#10233b]" />
            </div>

            <div className="mt-5 rounded-[22px] bg-[#10233b] p-5 text-white">
              <p className="text-xs font-semibold text-slate-300">
                Next 7 Days
              </p>

              <p className="mt-2 text-3xl font-black">
                {formatCompactCurrency(
                  paymentForecast.reduce(
                    (total, item) => total + item.amount,
                    0,
                  ),
                )}
              </p>

              <p className="mt-2 text-xs font-medium text-slate-300">
                Projected vendor payment requirement
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-xs font-semibold text-red-600">
                  Immediate Overdue
                </p>

                <p className="mt-2 text-lg font-black text-red-700">
                  {formatCompactCurrency(totals.overdueAmount)}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-600">
                  Approved Queue
                </p>

                <p className="mt-2 text-lg font-black text-emerald-700">
                  {formatCompactCurrency(totals.readyForPayment)}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Open Payment Scheduler
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Vendor Invoice Register
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Complete register of vendor invoices, approvals and payment status
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className={[
                  "flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-black transition",
                  showFilters
                    ? "border-[#10233b] bg-[#10233b] text-white"
                    : "border-slate-200 bg-white text-[#10233b] hover:bg-slate-50",
                ].join(" ")}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Download Register
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search invoice, vendor, PO, department or category..."
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <ListFilter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Pending Approval">
                    Pending Approval
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
              >
                <CalendarDays className="h-4 w-4" />
                Jul 2026
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Approval Status
                </label>

                <select
                  value={approvalFilter}
                  onChange={(event) =>
                    setApprovalFilter(event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Approvals</option>
                  <option value="Not Submitted">Not Submitted</option>
                  <option value="Department Approval">
                    Department Approval
                  </option>
                  <option value="Finance Approval">
                    Finance Approval
                  </option>
                  <option value="Founder Approval">
                    Founder Approval
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Risk Level
                </label>

                <select
                  value={riskFilter}
                  onChange={(event) => setRiskFilter(event.target.value)}
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                  <option value="Critical">Critical Risk</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Payment Priority
                </label>

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Department
                </label>

                <select className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]">
                  <option>All Departments</option>
                  <option>Procurement</option>
                  <option>Marketing</option>
                  <option>Technology</option>
                  <option>Operations</option>
                  <option>Creative</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>
          )}

                    <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-[1700px] w-full border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Invoice
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Vendor
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Dates
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      PO / GRN
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Department
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Balance
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Approval
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Priority
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Risk
                    </th>

                    <th className="px-5 py-4 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredInvoices.map((invoice) => {
                    const paymentProgress =
                      invoice.amount > 0
                        ? (invoice.paidAmount / invoice.amount) * 100
                        : 0;

                    return (
                      <tr
                        key={invoice.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={[
                                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                invoice.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : invoice.status === "Overdue"
                                    ? "bg-red-50 text-red-600"
                                    : invoice.status === "Rejected"
                                      ? "bg-red-100 text-red-700"
                                      : invoice.status === "On Hold"
                                        ? "bg-orange-50 text-orange-600"
                                        : "bg-blue-50 text-blue-600",
                              ].join(" ")}
                            >
                              <ReceiptText className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-sm font-black text-[#10233b]">
                                {invoice.invoiceNumber}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                {invoice.id}
                              </p>

                              <p className="mt-1 text-[11px] font-semibold text-slate-400">
                                {invoice.expenseCategory}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-[220px] truncate text-sm font-black text-[#10233b]">
                            {invoice.vendorName}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {invoice.vendorCategory}
                          </p>

                          <p className="mt-1 text-[11px] font-semibold text-slate-400">
                            {invoice.vendorId}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="w-14 text-[10px] font-black uppercase text-slate-400">
                                Invoice
                              </span>

                              <span className="text-xs font-black text-[#10233b]">
                                {invoice.invoiceDate}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="w-14 text-[10px] font-black uppercase text-slate-400">
                                Due
                              </span>

                              <span
                                className={[
                                  "text-xs font-black",
                                  invoice.daysUntilDue < 0
                                    ? "text-red-600"
                                    : invoice.daysUntilDue <= 7
                                      ? "text-amber-600"
                                      : "text-[#10233b]",
                                ].join(" ")}
                              >
                                {invoice.dueDate}
                              </span>
                            </div>

                            <p
                              className={[
                                "text-[11px] font-black",
                                invoice.daysUntilDue < 0
                                  ? "text-red-600"
                                  : invoice.daysUntilDue === 0
                                    ? "text-amber-600"
                                    : "text-slate-400",
                              ].join(" ")}
                            >
                              {invoice.daysUntilDue < 0
                                ? `${Math.abs(invoice.daysUntilDue)} days overdue`
                                : invoice.daysUntilDue === 0
                                  ? "Due today"
                                  : `${invoice.daysUntilDue} days remaining`}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="space-y-2">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Purchase Order
                              </p>

                              <p className="mt-1 text-xs font-black text-[#10233b]">
                                {invoice.purchaseOrder || "Not linked"}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Goods Receipt
                              </p>

                              <p className="mt-1 text-xs font-black text-[#10233b]">
                                {invoice.goodsReceipt || "Not required"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-black text-[#10233b]">
                            {invoice.department}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {invoice.costCenter}
                          </p>

                          <p className="mt-1 text-[11px] font-semibold text-slate-400">
                            Assigned: {invoice.assignedTo}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <p className="text-sm font-black text-[#10233b]">
                            {formatCurrency(invoice.amount)}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            Tax {formatCurrency(invoice.taxAmount)}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <p className="text-sm font-black text-red-600">
                            {formatCurrency(invoice.balanceAmount)}
                          </p>

                          {invoice.paidAmount > 0 && (
                            <>
                              <p className="mt-1 text-xs font-semibold text-emerald-600">
                                Paid {formatCurrency(invoice.paidAmount)}
                              </p>

                              <div className="ml-auto mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-emerald-500"
                                  style={{
                                    width: `${Math.min(
                                      paymentProgress,
                                      100,
                                    )}%`,
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-1 text-xs font-black",
                              getStatusClass(invoice.status),
                            ].join(" ")}
                          >
                            {invoice.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-1 text-xs font-black",
                              getApprovalClass(invoice.approvalStatus),
                            ].join(" ")}
                          >
                            {invoice.approvalStatus}
                          </span>

                          <p className="mt-2 max-w-[180px] truncate text-[11px] font-semibold text-slate-400">
                            {invoice.approvedBy}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-1 text-xs font-black",
                              getPriorityClass(invoice.priority),
                            ].join(" ")}
                          >
                            {invoice.priority}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={[
                                  "inline-flex rounded-full px-3 py-1 text-xs font-black",
                                  getRiskClass(invoice.riskLevel),
                                ].join(" ")}
                              >
                                {invoice.riskLevel}
                              </span>

                              <span className="text-xs font-black text-slate-400">
                                {invoice.riskScore}
                              </span>
                            </div>

                            <p
                              className={[
                                "text-[11px] font-black",
                                invoice.duplicateProbability >= 80
                                  ? "text-red-600"
                                  : invoice.duplicateProbability >= 40
                                    ? "text-amber-600"
                                    : "text-slate-400",
                              ].join(" ")}
                            >
                              Duplicate: {invoice.duplicateProbability}%
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedInvoice(invoice)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Search className="h-10 w-10 text-slate-300" />

                <h3 className="mt-4 text-lg font-black text-[#10233b]">
                  No invoices found
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Search query ya filters change karke dobara try karo.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                    setApprovalFilter("All");
                    setRiskFilter("All");
                    setPriorityFilter("All");
                  }}
                  className="mt-5 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Showing{" "}
                <span className="font-black text-[#10233b]">
                  {filteredInvoices.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-[#10233b]">
                  {payableInvoices.length}
                </span>{" "}
                vendor invoices
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-400"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-black text-[#10233b]"
                >
                  2
                </button>

                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-[#10233b]"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Vendor Exposure
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Top Vendor Liabilities
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Outstanding balances and overdue exposure by vendor
                </p>
              </div>

              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
              >
                View Vendor Ledger
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {vendors.map((vendor) => (
                <article
                  key={vendor.id}
                  className="rounded-[22px] border border-slate-200 p-4 transition hover:border-[#10233b]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#10233b]">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="max-w-[220px] truncate text-sm font-black text-[#10233b]">
                          {vendor.name}
                        </h3>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {vendor.category}
                        </p>
                      </div>
                    </div>

                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                        vendor.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : vendor.status === "Restricted"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-600",
                      ].join(" ")}
                    >
                      {vendor.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold text-slate-400">
                        Outstanding
                      </p>

                      <p className="mt-2 text-lg font-black text-[#10233b]">
                        {formatCompactCurrency(vendor.outstandingAmount)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-red-50 p-3">
                      <p className="text-[11px] font-semibold text-red-500">
                        Overdue
                      </p>

                      <p className="mt-2 text-lg font-black text-red-700">
                        {formatCompactCurrency(vendor.overdueAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <p className="text-[11px] font-semibold text-slate-400">
                        Payment Terms
                      </p>

                      <p className="mt-1 text-sm font-black text-[#10233b]">
                        {vendor.paymentTerms}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-3">
                      <p className="text-[11px] font-semibold text-slate-400">
                        Open Invoices
                      </p>

                      <p className="mt-1 text-sm font-black text-[#10233b]">
                        {vendor.totalInvoices}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-black",
                        getRiskClass(vendor.riskLevel),
                      ].join(" ")}
                    >
                      {vendor.riskLevel} Risk
                    </span>

                    <button
                      type="button"
                      className="flex items-center gap-2 text-xs font-black text-[#10233b]"
                    >
                      Open Vendor
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Approval Workflow
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Founder Approval Queue
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  High-value invoices awaiting final authorization
                </p>
              </div>

              <BadgeCheck className="h-7 w-7 text-[#10233b]" />
            </div>

            <div className="mt-6 space-y-4">
              {payableInvoices
                .filter(
                  (invoice) =>
                    invoice.approvalStatus === "Founder Approval",
                )
                .map((invoice) => (
                  <div
                    key={invoice.id}
                    className="rounded-[22px] border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {invoice.vendorName}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {invoice.invoiceNumber}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-black",
                          getRiskClass(invoice.riskLevel),
                        ].join(" ")}
                      >
                        {invoice.riskLevel}
                      </span>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold text-slate-500">
                            Payment Amount
                          </p>

                          <p className="mt-2 text-2xl font-black text-[#10233b]">
                            {formatCurrency(invoice.balanceAmount)}
                          </p>
                        </div>

                        <p className="text-right text-xs font-semibold text-slate-400">
                          Due {invoice.dueDate}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs font-black text-red-600 transition hover:bg-red-100"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#10233b] px-3 py-3 text-xs font-black text-white transition hover:bg-[#183653]"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </button>
                    </div>
                  </div>
                ))}

              {payableInvoices.filter(
                (invoice) =>
                  invoice.approvalStatus === "Founder Approval",
              ).length === 0 && (
                <div className="rounded-2xl bg-emerald-50 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />

                  <p className="mt-3 text-sm font-black text-emerald-700">
                    No founder approvals pending
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Open Complete Approval Queue
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Due Management
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Due Today
                </h2>
              </div>

              <Clock3 className="h-6 w-6 text-amber-600" />
            </div>

            <div className="mt-5 space-y-3">
              {payableInvoices
                .filter((invoice) => invoice.daysUntilDue === 0)
                .map((invoice) => (
                  <button
                    key={invoice.id}
                    type="button"
                    onClick={() => setSelectedInvoice(invoice)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                  >
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {invoice.vendorName}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {invoice.invoiceNumber}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-black text-amber-600">
                      {formatCompactCurrency(invoice.balanceAmount)}
                    </p>
                  </button>
                ))}

              {payableInvoices.filter(
                (invoice) => invoice.daysUntilDue === 0,
              ).length === 0 && (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                  No invoices are due today.
                </p>
              )}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Exception Management
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Overdue Invoices
                </h2>
              </div>

              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            <div className="mt-5 space-y-3">
              {payableInvoices
                .filter((invoice) => invoice.daysUntilDue < 0)
                .slice(0, 4)
                .map((invoice) => (
                  <button
                    key={invoice.id}
                    type="button"
                    onClick={() => setSelectedInvoice(invoice)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-left transition hover:bg-red-50"
                  >
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {invoice.vendorName}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-red-600">
                        {Math.abs(invoice.daysUntilDue)} days overdue
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-black text-red-700">
                      {formatCompactCurrency(invoice.balanceAmount)}
                    </p>
                  </button>
                ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  AI Validation
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Duplicate Alerts
                </h2>
              </div>

              <Sparkles className="h-6 w-6 text-violet-600" />
            </div>

            <div className="mt-5 space-y-3">
              {payableInvoices
                .filter(
                  (invoice) => invoice.duplicateProbability >= 40,
                )
                .map((invoice) => (
                  <button
                    key={invoice.id}
                    type="button"
                    onClick={() => setSelectedInvoice(invoice)}
                    className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {invoice.invoiceNumber}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {invoice.vendorName}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-black",
                          invoice.duplicateProbability >= 80
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-50 text-amber-600",
                        ].join(" ")}
                      >
                        {invoice.duplicateProbability}%
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      AI duplicate match probability
                    </p>
                  </button>
                ))}
            </div>
          </article>
        </section>

                <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Payment Operations
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Payment Scheduler
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Plan approved vendor payments according to due dates and
                  liquidity availability
                </p>
              </div>

              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white transition hover:bg-[#183653]"
              >
                <Plus className="h-4 w-4" />
                Schedule Payment
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#10233b] shadow-sm">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Today
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold text-slate-500">
                  Scheduled Today
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(
                    payableInvoices
                      .filter((invoice) => invoice.daysUntilDue === 0)
                      .reduce(
                        (total, invoice) => total + invoice.balanceAmount,
                        0,
                      ),
                  )}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  {
                    payableInvoices.filter(
                      (invoice) => invoice.daysUntilDue === 0,
                    ).length
                  }{" "}
                  payment instructions
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Approved
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold text-slate-500">
                  Ready for Release
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-600">
                  {formatCompactCurrency(totals.readyForPayment)}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Treasury authorization pending
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-red-600">
                    Urgent
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold text-slate-500">
                  Overdue Requirement
                </p>

                <p className="mt-2 text-2xl font-black text-red-600">
                  {formatCompactCurrency(totals.overdueAmount)}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Immediate intervention required
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#10233b]">
                      Upcoming Payment Instructions
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Approved invoices arranged by payment urgency
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-[#10233b]"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Payment Filters
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {payableInvoices
                  .filter(
                    (invoice) =>
                      invoice.status === "Approved" ||
                      invoice.status === "Scheduled" ||
                      invoice.status === "Overdue",
                  )
                  .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
                  .slice(0, 6)
                  .map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                            invoice.daysUntilDue < 0
                              ? "bg-red-50 text-red-600"
                              : invoice.daysUntilDue === 0
                                ? "bg-amber-50 text-amber-600"
                                : "bg-blue-50 text-blue-600",
                          ].join(" ")}
                        >
                          <Landmark className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-[#10233b]">
                            {invoice.vendorName}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {invoice.invoiceNumber} · {invoice.department}
                          </p>

                          <p
                            className={[
                              "mt-1 text-[11px] font-black",
                              invoice.daysUntilDue < 0
                                ? "text-red-600"
                                : invoice.daysUntilDue === 0
                                  ? "text-amber-600"
                                  : "text-slate-400",
                            ].join(" ")}
                          >
                            {invoice.daysUntilDue < 0
                              ? `${Math.abs(invoice.daysUntilDue)} days overdue`
                              : invoice.daysUntilDue === 0
                                ? "Payment due today"
                                : `Payment due in ${invoice.daysUntilDue} days`}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[560px]">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-black text-[#10233b]">
                            {formatCurrency(invoice.balanceAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Due Date
                          </p>

                          <p className="mt-1 text-sm font-black text-[#10233b]">
                            {invoice.dueDate}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Priority
                          </p>

                          <span
                            className={[
                              "mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black",
                              getPriorityClass(invoice.priority),
                            ].join(" ")}
                          >
                            {invoice.priority}
                          </span>
                        </div>

                        <div className="flex items-end justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedInvoice(invoice)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            className="flex h-9 items-center gap-2 rounded-xl bg-[#10233b] px-3 text-xs font-black text-white transition hover:bg-[#183653]"
                          >
                            Pay
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Treasury Alignment
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Funding Readiness
                  </h2>
                </div>

                <CircleDollarSign className="h-7 w-7 text-[#10233b]" />
              </div>

              <div className="mt-6 rounded-[24px] bg-[#10233b] p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Available AP Funding
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {formatCompactCurrency(3780000)}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Landmark className="h-6 w-6 text-amber-400" />
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[74%] rounded-full bg-emerald-400" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-300">
                  <span>74% funding coverage</span>
                  <span>₹13.25L gap</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Primary Operating Account
                    </p>

                    <p className="mt-1 text-sm font-black text-[#10233b]">
                      HDFC Bank •••• 4182
                    </p>
                  </div>

                  <p className="text-sm font-black text-emerald-600">
                    ₹24.80L
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Vendor Payment Account
                    </p>

                    <p className="mt-1 text-sm font-black text-[#10233b]">
                      ICICI Bank •••• 7810
                    </p>
                  </div>

                  <p className="text-sm font-black text-emerald-600">
                    ₹13.00L
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
              >
                Open Treasury Module
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Control Metrics
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    AP Performance
                  </h2>
                </div>

                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "On-time payment rate",
                    value: "91%",
                    helper: "+4.2% vs last month",
                    progress: 91,
                    positive: true,
                  },
                  {
                    label: "Invoice processing accuracy",
                    value: "97.8%",
                    helper: "AI validation enabled",
                    progress: 97.8,
                    positive: true,
                  },
                  {
                    label: "Three-way match rate",
                    value: "88%",
                    helper: "PO, GRN and invoice",
                    progress: 88,
                    positive: true,
                  },
                  {
                    label: "Average approval time",
                    value: "2.4 days",
                    helper: "-0.6 day improvement",
                    progress: 72,
                    positive: true,
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {metric.label}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {metric.helper}
                        </p>
                      </div>

                      <p className="text-sm font-black text-emerald-600">
                        {metric.value}
                      </p>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#10233b]"
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Internal Controls
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  AP Compliance Status
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monitoring of invoice controls and payment governance
                </p>
              </div>

              <ShieldAlert className="h-7 w-7 text-[#10233b]" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-sm font-black text-emerald-700">
                      GST validation active
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-emerald-600">
                      Vendor GSTIN and tax calculations are automatically
                      verified.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-sm font-black text-emerald-700">
                      Approval matrix enabled
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-emerald-600">
                      High-value invoices follow department, finance and founder
                      approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="text-sm font-black text-amber-700">
                      Two invoices missing GRN
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-amber-600">
                      Manual verification is required before payment release.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-red-100 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <div>
                    <p className="text-sm font-black text-red-700">
                      Duplicate attempt blocked
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-red-600">
                      One duplicate vendor invoice was rejected by KEOS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              Open Compliance Desk
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Team Workload
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  AP Assignment Queue
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Pending invoices assigned to finance team members
                </p>
              </div>

              <UserRound className="h-7 w-7 text-[#10233b]" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  name: "Ritika Singh",
                  role: "AP Specialist",
                  assigned: 14,
                  overdue: 3,
                  initials: "RS",
                },
                {
                  name: "Aditi Sharma",
                  role: "Procurement Finance",
                  assigned: 9,
                  overdue: 1,
                  initials: "AS",
                },
                {
                  name: "Rahul Verma",
                  role: "Marketing Finance",
                  assigned: 7,
                  overdue: 0,
                  initials: "RV",
                },
                {
                  name: "Vikas Tiwari",
                  role: "Administration Finance",
                  assigned: 6,
                  overdue: 1,
                  initials: "VT",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-sm font-black text-white">
                      {member.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#10233b]">
                        {member.name}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {member.assigned}
                      </p>

                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Assigned
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={[
                          "text-sm font-black",
                          member.overdue > 0
                            ? "text-red-600"
                            : "text-emerald-600",
                        ].join(" ")}
                      >
                        {member.overdue}
                      </p>

                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Overdue
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                    KEOS Finance Copilot
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Accounts Payable Control Brief
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-sm font-medium leading-7 text-slate-300">
                Current payable exposure is{" "}
                <span className="font-black text-white">
                  {formatCompactCurrency(totals.totalPayables)}
                </span>
                . KEOS recommends releasing approved invoices first, resolving
                the Urban Logistics dispute, and prioritizing overdue cloud and
                raw-material payments to avoid service disruption.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white">
                  {totals.overdueCount} overdue invoices
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white">
                  {totals.pendingApprovalCount} approval items
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white">
                  {totals.highRiskCount} high-risk cases
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white">
                  {totals.duplicateCount} duplicate alert
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
              >
                Generate Payment Plan
                <WandSparkles className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Ask Finance Copilot
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

              </main>

      {selectedInvoice && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#10233b]/45 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close invoice drawer"
            onClick={() => setSelectedInvoice(null)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 h-full w-full max-w-[760px] overflow-y-auto bg-[#f5f7fa] shadow-2xl">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
              <div className="flex items-start justify-between gap-5">
                <div className="flex min-w-0 items-start gap-4">
                  <div
                    className={[
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      selectedInvoice.status === "Overdue"
                        ? "bg-red-50 text-red-600"
                        : selectedInvoice.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : selectedInvoice.status === "On Hold"
                            ? "bg-orange-50 text-orange-600"
                            : selectedInvoice.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600",
                    ].join(" ")}
                  >
                    <ReceiptText className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Vendor Invoice
                    </p>

                    <h2 className="mt-2 truncate text-xl font-black text-[#10233b] sm:text-2xl">
                      {selectedInvoice.invoiceNumber}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedInvoice.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={[
                    "rounded-full px-3 py-1.5 text-xs font-black",
                    getStatusClass(selectedInvoice.status),
                  ].join(" ")}
                >
                  {selectedInvoice.status}
                </span>

                <span
                  className={[
                    "rounded-full px-3 py-1.5 text-xs font-black",
                    getApprovalClass(selectedInvoice.approvalStatus),
                  ].join(" ")}
                >
                  {selectedInvoice.approvalStatus}
                </span>

                <span
                  className={[
                    "rounded-full px-3 py-1.5 text-xs font-black",
                    getPriorityClass(selectedInvoice.priority),
                  ].join(" ")}
                >
                  {selectedInvoice.priority} Priority
                </span>

                <span
                  className={[
                    "rounded-full px-3 py-1.5 text-xs font-black",
                    getRiskClass(selectedInvoice.riskLevel),
                  ].join(" ")}
                >
                  {selectedInvoice.riskLevel} Risk
                </span>
              </div>
            </header>

            <div className="space-y-5 p-4 sm:p-6">
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">
                    Invoice Amount
                  </p>

                  <p className="mt-2 text-xl font-black text-[#10233b]">
                    {formatCurrency(selectedInvoice.amount)}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Tax {formatCurrency(selectedInvoice.taxAmount)}
                  </p>
                </article>

                <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">
                    Amount Paid
                  </p>

                  <p className="mt-2 text-xl font-black text-emerald-600">
                    {formatCurrency(selectedInvoice.paidAmount)}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Payment completed
                  </p>
                </article>

                <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">
                    Balance Payable
                  </p>

                  <p className="mt-2 text-xl font-black text-red-600">
                    {formatCurrency(selectedInvoice.balanceAmount)}
                  </p>

                  <p
                    className={[
                      "mt-2 text-xs font-black",
                      selectedInvoice.daysUntilDue < 0
                        ? "text-red-600"
                        : selectedInvoice.daysUntilDue === 0
                          ? "text-amber-600"
                          : "text-slate-400",
                    ].join(" ")}
                  >
                    {selectedInvoice.daysUntilDue < 0
                      ? `${Math.abs(
                          selectedInvoice.daysUntilDue,
                        )} days overdue`
                      : selectedInvoice.daysUntilDue === 0
                        ? "Due today"
                        : `${selectedInvoice.daysUntilDue} days remaining`}
                  </p>
                </article>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Vendor Information
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      {selectedInvoice.vendorName}
                    </h3>
                  </div>

                  <Building2 className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor ID
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedInvoice.vendorId}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedInvoice.vendorCategory}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Payment Terms
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedInvoice.paymentTerms}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Expense Category
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedInvoice.expenseCategory}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Invoice Details
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Accounting Information
                    </h3>
                  </div>

                  <FileSpreadsheet className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: "Invoice Date",
                      value: selectedInvoice.invoiceDate,
                    },
                    {
                      label: "Posting Date",
                      value: selectedInvoice.postingDate,
                    },
                    {
                      label: "Due Date",
                      value: selectedInvoice.dueDate,
                    },
                    {
                      label: "Currency",
                      value: selectedInvoice.currency,
                    },
                    {
                      label: "Purchase Order",
                      value: selectedInvoice.purchaseOrder || "Not linked",
                    },
                    {
                      label: "Goods Receipt",
                      value: selectedInvoice.goodsReceipt || "Not required",
                    },
                    {
                      label: "Department",
                      value: selectedInvoice.department,
                    },
                    {
                      label: "Cost Center",
                      value: selectedInvoice.costCenter,
                    },
                    {
                      label: "Created By",
                      value: selectedInvoice.createdBy,
                    },
                    {
                      label: "Assigned To",
                      value: selectedInvoice.assignedTo,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedInvoice.notes && (
                  <div className="mt-4 rounded-2xl bg-amber-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                      Invoice Note
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
                      {selectedInvoice.notes}
                    </p>
                  </div>
                )}
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      AI Risk Engine
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Invoice Intelligence
                    </h3>
                  </div>

                  <WandSparkles className="h-6 w-6 text-violet-600" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] bg-[#10233b] p-5 text-white">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-slate-300">
                        Risk Score
                      </p>

                      <ShieldAlert className="h-5 w-5 text-amber-400" />
                    </div>

                    <p className="mt-3 text-3xl font-black">
                      {selectedInvoice.riskScore}
                      <span className="text-base text-slate-400">/100</span>
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={[
                          "h-full rounded-full",
                          selectedInvoice.riskScore >= 80
                            ? "bg-red-400"
                            : selectedInvoice.riskScore >= 60
                              ? "bg-orange-400"
                              : selectedInvoice.riskScore >= 30
                                ? "bg-amber-400"
                                : "bg-emerald-400",
                        ].join(" ")}
                        style={{
                          width: `${selectedInvoice.riskScore}%`,
                        }}
                      />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-slate-300">
                      {selectedInvoice.riskLevel} payment risk
                    </p>
                  </div>

                  <div
                    className={[
                      "rounded-[22px] p-5",
                      selectedInvoice.duplicateProbability >= 80
                        ? "bg-red-50"
                        : selectedInvoice.duplicateProbability >= 40
                          ? "bg-amber-50"
                          : "bg-emerald-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className={[
                          "text-xs font-semibold",
                          selectedInvoice.duplicateProbability >= 80
                            ? "text-red-600"
                            : selectedInvoice.duplicateProbability >= 40
                              ? "text-amber-600"
                              : "text-emerald-600",
                        ].join(" ")}
                      >
                        Duplicate Probability
                      </p>

                      <FileCheck2
                        className={[
                          "h-5 w-5",
                          selectedInvoice.duplicateProbability >= 80
                            ? "text-red-600"
                            : selectedInvoice.duplicateProbability >= 40
                              ? "text-amber-600"
                              : "text-emerald-600",
                        ].join(" ")}
                      />
                    </div>

                    <p
                      className={[
                        "mt-3 text-3xl font-black",
                        selectedInvoice.duplicateProbability >= 80
                          ? "text-red-700"
                          : selectedInvoice.duplicateProbability >= 40
                            ? "text-amber-700"
                            : "text-emerald-700",
                      ].join(" ")}
                    >
                      {selectedInvoice.duplicateProbability}%
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
                      <div
                        className={[
                          "h-full rounded-full",
                          selectedInvoice.duplicateProbability >= 80
                            ? "bg-red-500"
                            : selectedInvoice.duplicateProbability >= 40
                              ? "bg-amber-500"
                              : "bg-emerald-500",
                        ].join(" ")}
                        style={{
                          width: `${selectedInvoice.duplicateProbability}%`,
                        }}
                      />
                    </div>

                    <p
                      className={[
                        "mt-3 text-xs font-semibold",
                        selectedInvoice.duplicateProbability >= 80
                          ? "text-red-600"
                          : selectedInvoice.duplicateProbability >= 40
                            ? "text-amber-600"
                            : "text-emerald-600",
                      ].join(" ")}
                    >
                      {selectedInvoice.duplicateProbability >= 80
                        ? "Payment must remain blocked"
                        : selectedInvoice.duplicateProbability >= 40
                          ? "Manual review recommended"
                          : "No significant duplicate match"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        Vendor identity verified
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        Vendor master record and invoice vendor information
                        match.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                    {selectedInvoice.purchaseOrder ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    )}

                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        Purchase order validation
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {selectedInvoice.purchaseOrder
                          ? `Invoice linked to ${selectedInvoice.purchaseOrder}.`
                          : "No purchase order is currently linked."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                    {selectedInvoice.goodsReceipt ||
                    selectedInvoice.vendorCategory === "Digital Marketing" ||
                    selectedInvoice.vendorCategory ===
                      "Cloud Infrastructure" ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    )}

                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        Goods receipt verification
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {selectedInvoice.goodsReceipt
                          ? `Receipt ${selectedInvoice.goodsReceipt} is linked.`
                          : "Goods receipt is missing or not required for this service."}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Approval Governance
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Approval Timeline
                    </h3>
                  </div>

                  <BadgeCheck className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-6 space-y-0">
                  {approvalHistory.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {index < approvalHistory.length - 1 && (
                        <div className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-slate-200" />
                      )}

                      <div
                        className={[
                          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white",
                          item.action === "Approved"
                            ? "bg-emerald-100 text-emerald-600"
                            : item.action === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-600",
                        ].join(" ")}
                      >
                        {item.action === "Approved" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : item.action === "Rejected" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <Clock3 className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {item.stage}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-500">
                              {item.approver}
                            </p>
                          </div>

                          <span
                            className={[
                              "w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                              item.action === "Approved"
                                ? "bg-emerald-50 text-emerald-600"
                                : item.action === "Rejected"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-amber-50 text-amber-600",
                            ].join(" ")}
                          >
                            {item.action}
                          </span>
                        </div>

                        <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                          {item.note}
                        </p>

                        <p className="mt-3 text-[11px] font-black text-slate-400">
                          {item.date} · {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Audit Trail
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Activity Log
                    </h3>
                  </div>

                  <FileCheck2 className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 divide-y divide-slate-200">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                          <UserRound className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            {log.action}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            {log.user}
                          </p>

                          <p className="mt-1 text-[11px] font-semibold text-slate-400">
                            {log.device} · {log.location}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-xs font-black text-[#10233b]">
                          {log.date}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-400">
                          {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="sticky bottom-0 z-10 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-12px_40px_rgba(15,35,59,0.08)] backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <Clock3 className="h-4 w-4" />
                    Put on Hold
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve Invoice
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}

      {showCreatePanel && (
        <div className="fixed inset-0 z-[110] flex justify-end bg-[#10233b]/45 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close create invoice panel"
            onClick={() => setShowCreatePanel(false)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 h-full w-full max-w-[700px] overflow-y-auto bg-[#f5f7fa] shadow-2xl">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Accounts Payable
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#10233b]">
                    New Vendor Invoice
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Upload, validate and submit a new payable invoice
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreatePanel(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setShowCreatePanel(false);
              }}
              className="space-y-5 p-4 sm:p-6"
            >
              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Invoice Document
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Upload Vendor Invoice
                    </h3>
                  </div>

                  <Upload className="h-6 w-6 text-[#10233b]" />
                </div>

                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-[#10233b] hover:bg-slate-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#10233b] shadow-sm">
                    <Upload className="h-6 w-6" />
                  </div>

                  <p className="mt-4 text-sm font-black text-[#10233b]">
                    Drop invoice PDF or image here
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    PDF, PNG or JPG up to 10 MB
                  </p>

                  <span className="mt-4 rounded-xl bg-[#10233b] px-4 py-2 text-xs font-black text-white">
                    Browse File
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                </label>

                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-violet-50 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />

                  <div>
                    <p className="text-sm font-black text-violet-700">
                      AI invoice extraction enabled
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-violet-600">
                      KEOS will extract vendor, invoice number, amounts, GST,
                      due date and purchase order automatically.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Basic Information
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Invoice Details
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black text-[#10233b]">
                      Vendor
                    </label>

                    <select
                      required
                      defaultValue=""
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="" disabled>
                        Select vendor
                      </option>

                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Invoice Number
                    </label>

                    <input
                      required
                      placeholder="INV-000001"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Invoice Date
                    </label>

                    <input
                      required
                      type="date"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Due Date
                    </label>

                    <input
                      required
                      type="date"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Payment Terms
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Net 15</option>
                      <option>Net 30</option>
                      <option>Net 45</option>
                      <option>Net 60</option>
                      <option>Immediate</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Purchase Order
                    </label>

                    <input
                      placeholder="PO-2026-0001"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Goods Receipt
                    </label>

                    <input
                      placeholder="GRN-2026-0001"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Financial Information
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Amount and Accounting
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Invoice Amount
                    </label>

                    <div className="relative mt-2">
                      <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        required
                        type="number"
                        min="0"
                        placeholder="0"
                        className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Tax Amount
                    </label>

                    <div className="relative mt-2">
                      <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Department
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Procurement</option>
                      <option>Marketing</option>
                      <option>Technology</option>
                      <option>Operations</option>
                      <option>Creative</option>
                      <option>Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Cost Center
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>CC-PRODUCTION</option>
                      <option>CC-MARKETING</option>
                      <option>CC-TECHNOLOGY</option>
                      <option>CC-LOGISTICS</option>
                      <option>CC-CREATIVE</option>
                      <option>CC-ADMIN</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Expense Category
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Inventory Purchase</option>
                      <option>Raw Material</option>
                      <option>Digital Advertising</option>
                      <option>Cloud Infrastructure</option>
                      <option>Freight & Logistics</option>
                      <option>Design Services</option>
                      <option>Office Lease</option>
                      <option>Facility Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Payment Priority
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Approval Routing
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Workflow Configuration
                </h3>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      stage: "Department Verification",
                      approver: "Department Finance Manager",
                      status: "Required",
                    },
                    {
                      stage: "Finance Approval",
                      approver: "Finance Director",
                      status: "Required",
                    },
                    {
                      stage: "Founder Approval",
                      approver: "Founder Office",
                      status: "For high-value invoices",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.stage}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10233b] text-sm font-black text-white">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            {item.stage}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {item.approver}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <label className="text-xs font-black text-[#10233b]">
                  Internal Notes
                </label>

                <textarea
                  rows={5}
                  placeholder="Add payment instructions, exceptions or approval notes..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                />
              </section>

              <section className="sticky bottom-0 z-10 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-12px_40px_rgba(15,35,59,0.08)] backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setShowCreatePanel(false)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-[#10233b] px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    Save Draft
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Submit Invoice
                  </button>
                </div>
              </section>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}