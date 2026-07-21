"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  IndianRupee,
  Landmark,
  Link2,
  ListFilter,
  Lock,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
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

type TransactionType = "Credit" | "Debit";

type TransactionStatus =
  | "Completed"
  | "Processing"
  | "Pending"
  | "Failed"
  | "Reversed"
  | "Blocked";

type ApprovalStatus =
  | "Approved"
  | "Pending Approval"
  | "Founder Approval"
  | "Rejected"
  | "Not Required";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

type BankAccount = {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  availableBalance: number;
  currentBalance: number;
  status: "Active" | "Restricted" | "Frozen";
  branch: string;
  ifsc: string;
};

type BankTransaction = {
  id: string;
  date: string;
  time: string;
  valueDate: string;
  bankAccountId: string;
  bankName: string;
  accountNumber: string;
  counterparty: string;
  counterpartyType: "Customer" | "Vendor" | "Employee" | "Government" | "Bank";
  description: string;
  referenceNumber: string;
  bankReference: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  approvalStatus: ApprovalStatus;
  category: string;
  paymentMode:
    | "NEFT"
    | "RTGS"
    | "IMPS"
    | "UPI"
    | "Card"
    | "ACH"
    | "Internal Transfer";
  riskLevel: RiskLevel;
  riskScore: number;
  createdBy: string;
  approvedBy: string;
  linkedVoucher?: string;
  linkedInvoice?: string;
  notes?: string;
  location: string;
  ipAddress: string;
};

type TransactionTimelineItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  user: string;
  status: "Complete" | "Pending" | "Failed";
};

type AuditEvent = {
  id: string;
  action: string;
  user: string;
  date: string;
  time: string;
  device: string;
  location: string;
};

const bankAccounts: BankAccount[] = [
  {
    id: "BANK-001",
    bankName: "HDFC Bank",
    accountName: "KRVE Fashion Studio Pvt. Ltd.",
    accountNumber: "•••• 4728",
    accountType: "Current Account",
    currency: "INR",
    availableBalance: 18486000,
    currentBalance: 18624000,
    status: "Active",
    branch: "Varanasi Main Branch",
    ifsc: "HDFC0001842",
  },
  {
    id: "BANK-002",
    bankName: "ICICI Bank",
    accountName: "KRVE Fashion Studio Pvt. Ltd.",
    accountNumber: "•••• 8164",
    accountType: "Current Account",
    currency: "INR",
    availableBalance: 7245000,
    currentBalance: 7318000,
    status: "Active",
    branch: "Mumbai Corporate Branch",
    ifsc: "ICIC0000721",
  },
  {
    id: "BANK-003",
    bankName: "State Bank of India",
    accountName: "KRVE Operations Account",
    accountNumber: "•••• 9351",
    accountType: "Current Account",
    currency: "INR",
    availableBalance: 4865000,
    currentBalance: 4928000,
    status: "Restricted",
    branch: "Delhi Commercial Branch",
    ifsc: "SBIN0005817",
  },
  {
    id: "BANK-004",
    bankName: "Axis Bank",
    accountName: "KRVE Payroll Account",
    accountNumber: "•••• 2296",
    accountType: "Salary Account",
    currency: "INR",
    availableBalance: 3124000,
    currentBalance: 3124000,
    status: "Active",
    branch: "Gurugram Cyber City",
    ifsc: "UTIB0000472",
  },
];

const transactions: BankTransaction[] = [
  {
    id: "TXN-2026-10482",
    date: "21 Jul 2026",
    time: "02:42 PM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Razorpay Software Pvt. Ltd.",
    counterpartyType: "Customer",
    description: "Daily e-commerce settlement",
    referenceNumber: "KRVE-SET-7821",
    bankReference: "HDFC/UPI/729184",
    amount: 485600,
    type: "Credit",
    status: "Completed",
    approvalStatus: "Not Required",
    category: "Sales Settlement",
    paymentMode: "UPI",
    riskLevel: "Low",
    riskScore: 8,
    createdBy: "Payment Gateway Integration",
    approvedBy: "System",
    linkedVoucher: "RV-2026-7821",
    linkedInvoice: "SET-2026-0721",
    notes: "Automated Razorpay settlement for online orders.",
    location: "Mumbai, Maharashtra",
    ipAddress: "103.21.58.14",
  },
  {
    id: "TXN-2026-10481",
    date: "21 Jul 2026",
    time: "01:28 PM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Fabric Source India",
    counterpartyType: "Vendor",
    description: "Raw material supplier payment",
    referenceNumber: "PV-2026-4182",
    bankReference: "NEFT/HDFC/884129",
    amount: 275000,
    type: "Debit",
    status: "Completed",
    approvalStatus: "Approved",
    category: "Supplier Payment",
    paymentMode: "NEFT",
    riskLevel: "Low",
    riskScore: 14,
    createdBy: "Accounts Payable",
    approvedBy: "Finance Director",
    linkedVoucher: "PV-2026-4182",
    linkedInvoice: "FSI-INV-8841",
    notes: "Payment against approved fabric procurement invoice.",
    location: "Varanasi, Uttar Pradesh",
    ipAddress: "49.36.145.91",
  },
  {
    id: "TXN-2026-10480",
    date: "21 Jul 2026",
    time: "12:16 PM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-003",
    bankName: "State Bank of India",
    accountNumber: "•••• 9351",
    counterparty: "Nova Luxury Textiles",
    counterpartyType: "Vendor",
    description: "Premium textile bulk purchase",
    referenceNumber: "PV-2026-4181",
    bankReference: "RTGS/SBI/881024",
    amount: 1420000,
    type: "Debit",
    status: "Pending",
    approvalStatus: "Founder Approval",
    category: "Inventory Purchase",
    paymentMode: "RTGS",
    riskLevel: "High",
    riskScore: 76,
    createdBy: "Procurement Finance",
    approvedBy: "Pending",
    linkedVoucher: "PV-2026-4181",
    linkedInvoice: "NLT-2026-5821",
    notes: "High-value transaction awaiting founder authorization.",
    location: "Delhi, India",
    ipAddress: "106.219.88.41",
  },
  {
    id: "TXN-2026-10479",
    date: "21 Jul 2026",
    time: "11:45 AM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Meta Platforms India",
    counterpartyType: "Vendor",
    description: "Digital advertising campaign payment",
    referenceNumber: "MKT-2026-2194",
    bankReference: "UPI/HDFC/291674",
    amount: 149000,
    type: "Debit",
    status: "Completed",
    approvalStatus: "Approved",
    category: "Marketing Expense",
    paymentMode: "UPI",
    riskLevel: "Medium",
    riskScore: 38,
    createdBy: "Marketing Finance",
    approvedBy: "Finance Manager",
    linkedVoucher: "PV-2026-4172",
    linkedInvoice: "META-0721-2026",
    location: "Gurugram, Haryana",
    ipAddress: "49.207.214.82",
  },
  {
    id: "TXN-2026-10478",
    date: "21 Jul 2026",
    time: "10:32 AM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-002",
    bankName: "ICICI Bank",
    accountNumber: "•••• 8164",
    counterparty: "Luxe Retail Partners",
    counterpartyType: "Customer",
    description: "B2B wholesale invoice receipt",
    referenceNumber: "RV-2026-7805",
    bankReference: "NEFT/ICICI/627190",
    amount: 725000,
    type: "Credit",
    status: "Completed",
    approvalStatus: "Not Required",
    category: "B2B Revenue",
    paymentMode: "NEFT",
    riskLevel: "Low",
    riskScore: 11,
    createdBy: "Accounts Receivable",
    approvedBy: "System",
    linkedVoucher: "RV-2026-7805",
    linkedInvoice: "KRVE-B2B-2841",
    location: "Mumbai, Maharashtra",
    ipAddress: "117.204.67.15",
  },
  {
    id: "TXN-2026-10477",
    date: "21 Jul 2026",
    time: "09:48 AM",
    valueDate: "21 Jul 2026",
    bankAccountId: "BANK-004",
    bankName: "Axis Bank",
    accountNumber: "•••• 2296",
    counterparty: "KRVE Employee Payroll",
    counterpartyType: "Employee",
    description: "July salary batch transfer",
    referenceNumber: "PAY-2026-0721",
    bankReference: "ACH/AXIS/721945",
    amount: 2185000,
    type: "Debit",
    status: "Processing",
    approvalStatus: "Approved",
    category: "Payroll",
    paymentMode: "ACH",
    riskLevel: "Low",
    riskScore: 19,
    createdBy: "Payroll Automation",
    approvedBy: "HR Director",
    linkedVoucher: "JV-2026-1298",
    location: "Varanasi, Uttar Pradesh",
    ipAddress: "103.77.182.10",
  },
  {
    id: "TXN-2026-10476",
    date: "20 Jul 2026",
    time: "06:55 PM",
    valueDate: "20 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Unknown Beneficiary",
    counterpartyType: "Vendor",
    description: "Unidentified corporate transfer",
    referenceNumber: "UNKN-2026-884",
    bankReference: "IMPS/HDFC/510892",
    amount: 685000,
    type: "Debit",
    status: "Blocked",
    approvalStatus: "Founder Approval",
    category: "Unclassified",
    paymentMode: "IMPS",
    riskLevel: "Critical",
    riskScore: 96,
    createdBy: "Manual Entry",
    approvedBy: "Blocked by KEOS",
    notes: "Beneficiary is not available in approved vendor master.",
    location: "Unknown",
    ipAddress: "185.191.24.71",
  },
  {
    id: "TXN-2026-10475",
    date: "20 Jul 2026",
    time: "05:36 PM",
    valueDate: "20 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Amazon Web Services India",
    counterpartyType: "Vendor",
    description: "Cloud infrastructure subscription",
    referenceNumber: "TECH-2026-1295",
    bankReference: "ACH/HDFC/721945",
    amount: 84000,
    type: "Debit",
    status: "Completed",
    approvalStatus: "Approved",
    category: "Technology Expense",
    paymentMode: "ACH",
    riskLevel: "Low",
    riskScore: 12,
    createdBy: "Technology Finance",
    approvedBy: "CTO Office",
    linkedVoucher: "JV-2026-1295",
    linkedInvoice: "AWS-IN-72914",
    location: "Hyderabad, Telangana",
    ipAddress: "13.235.72.19",
  },
  {
    id: "TXN-2026-10474",
    date: "20 Jul 2026",
    time: "04:20 PM",
    valueDate: "20 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Fabric Source India",
    counterpartyType: "Vendor",
    description: "Duplicate supplier payment request",
    referenceNumber: "PV-2026-4168-D",
    bankReference: "NEFT/HDFC/412580",
    amount: 275000,
    type: "Debit",
    status: "Failed",
    approvalStatus: "Rejected",
    category: "Supplier Payment",
    paymentMode: "NEFT",
    riskLevel: "High",
    riskScore: 89,
    createdBy: "Accounts Payable",
    approvedBy: "Rejected by KEOS",
    linkedVoucher: "PV-2026-4168",
    linkedInvoice: "FSI-INV-8841",
    notes: "Duplicate amount and invoice number detected.",
    location: "Varanasi, Uttar Pradesh",
    ipAddress: "49.36.145.91",
  },
  {
    id: "TXN-2026-10473",
    date: "20 Jul 2026",
    time: "03:18 PM",
    valueDate: "20 Jul 2026",
    bankAccountId: "BANK-002",
    bankName: "ICICI Bank",
    accountNumber: "•••• 8164",
    counterparty: "KRVE Treasury Account",
    counterpartyType: "Bank",
    description: "Internal liquidity transfer",
    referenceNumber: "TRF-2026-1842",
    bankReference: "RTGS/ICICI/415620",
    amount: 2500000,
    type: "Credit",
    status: "Completed",
    approvalStatus: "Approved",
    category: "Internal Transfer",
    paymentMode: "Internal Transfer",
    riskLevel: "Medium",
    riskScore: 32,
    createdBy: "Treasury Team",
    approvedBy: "Finance Director",
    linkedVoucher: "JV-2026-1291",
    location: "Mumbai, Maharashtra",
    ipAddress: "117.240.81.55",
  },
  {
    id: "TXN-2026-10472",
    date: "20 Jul 2026",
    time: "01:06 PM",
    valueDate: "20 Jul 2026",
    bankAccountId: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    counterparty: "Customer Refund Pool",
    counterpartyType: "Customer",
    description: "Customer refund for order KRVE-9841",
    referenceNumber: "CN-2026-3284",
    bankReference: "IMPS/HDFC/510194",
    amount: 28900,
    type: "Debit",
    status: "Reversed",
    approvalStatus: "Approved",
    category: "Customer Refund",
    paymentMode: "IMPS",
    riskLevel: "Low",
    riskScore: 16,
    createdBy: "Customer Experience",
    approvedBy: "Finance Automation",
    linkedVoucher: "CN-2026-3284",
    linkedInvoice: "KRVE-9841",
    notes: "Refund reversed due to invalid beneficiary account.",
    location: "Bengaluru, Karnataka",
    ipAddress: "106.51.72.18",
  },
];

const transactionTimeline: TransactionTimelineItem[] = [
  {
    id: "TL-001",
    title: "Transaction initiated",
    description: "Payment request created in KEOS.",
    date: "21 Jul 2026",
    time: "12:02 PM",
    user: "Procurement Finance",
    status: "Complete",
  },
  {
    id: "TL-002",
    title: "Budget validation completed",
    description: "Available procurement budget verified.",
    date: "21 Jul 2026",
    time: "12:05 PM",
    user: "KEOS Finance Engine",
    status: "Complete",
  },
  {
    id: "TL-003",
    title: "Risk screening completed",
    description: "High-value transaction flagged for enhanced approval.",
    date: "21 Jul 2026",
    time: "12:08 PM",
    user: "KEOS Risk AI",
    status: "Complete",
  },
  {
    id: "TL-004",
    title: "Founder approval pending",
    description: "Transaction is waiting for founder authorization.",
    date: "21 Jul 2026",
    time: "12:16 PM",
    user: "Founder Office",
    status: "Pending",
  },
];

const auditEvents: AuditEvent[] = [
  {
    id: "AUD-9021",
    action: "Transaction created",
    user: "Procurement Finance",
    date: "21 Jul 2026",
    time: "12:02 PM",
    device: "Windows Desktop",
    location: "Varanasi, India",
  },
  {
    id: "AUD-9022",
    action: "Invoice attached",
    user: "Aditi Sharma",
    date: "21 Jul 2026",
    time: "12:04 PM",
    device: "Chrome Browser",
    location: "Delhi, India",
  },
  {
    id: "AUD-9023",
    action: "Risk score updated",
    user: "KEOS Risk AI",
    date: "21 Jul 2026",
    time: "12:08 PM",
    device: "System Automation",
    location: "KEOS Cloud",
  },
  {
    id: "AUD-9024",
    action: "Approval requested",
    user: "Finance Director",
    date: "21 Jul 2026",
    time: "12:16 PM",
    device: "MacBook Pro",
    location: "Mumbai, India",
  },
];

const dailyTransactionData = [
  { day: "15 Jul", credits: 38, debits: 25 },
  { day: "16 Jul", credits: 52, debits: 33 },
  { day: "17 Jul", credits: 47, debits: 42 },
  { day: "18 Jul", credits: 61, debits: 36 },
  { day: "19 Jul", credits: 43, debits: 29 },
  { day: "20 Jul", credits: 68, debits: 51 },
  { day: "21 Jul", credits: 74, debits: 58 },
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

function getStatusClass(status: TransactionStatus) {
  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Processing") {
    return "bg-blue-50 text-blue-600";
  }

  if (status === "Pending") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Reversed") {
    return "bg-violet-50 text-violet-600";
  }

  if (status === "Blocked") {
    return "bg-red-100 text-red-700";
  }

  return "bg-red-50 text-red-600";
}

function getApprovalClass(status: ApprovalStatus) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Pending Approval") {
    return "bg-amber-50 text-amber-600";
  }

  if (status === "Founder Approval") {
    return "bg-violet-50 text-violet-600";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-600";
  }

  return "bg-slate-100 text-slate-500";
}

function getRiskClass(riskLevel: RiskLevel) {
  if (riskLevel === "Low") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (riskLevel === "Medium") {
    return "bg-amber-50 text-amber-600";
  }

  if (riskLevel === "High") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-red-100 text-red-700";
}

export default function BankTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bankFilter, setBankFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState<BankTransaction | null>(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(query) ||
        transaction.counterparty.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.referenceNumber.toLowerCase().includes(query) ||
        transaction.bankReference.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      const matchesBank =
        bankFilter === "All" || transaction.bankAccountId === bankFilter;

      const matchesRisk =
        riskFilter === "All" || transaction.riskLevel === riskFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesBank &&
        matchesRisk
      );
    });
  }, [searchQuery, typeFilter, statusFilter, bankFilter, riskFilter]);

  const totals = useMemo(() => {
    return transactions.reduce(
      (result, transaction) => {
        if (transaction.type === "Credit") {
          result.credits += transaction.amount;
        } else {
          result.debits += transaction.amount;
        }

        if (
          transaction.status === "Pending" ||
          transaction.status === "Processing"
        ) {
          result.pending += transaction.amount;
          result.pendingCount += 1;
        }

        if (transaction.status === "Failed") {
          result.failedCount += 1;
        }

        if (
          transaction.riskLevel === "High" ||
          transaction.riskLevel === "Critical"
        ) {
          result.highRiskCount += 1;
        }

        return result;
      },
      {
        credits: 0,
        debits: 0,
        pending: 0,
        pendingCount: 0,
        failedCount: 0,
        highRiskCount: 0,
      },
    );
  }, []);

  const totalBankBalance = bankAccounts.reduce(
    (total, account) => total + account.availableBalance,
    0,
  );

  const netCashFlow = totals.credits - totals.debits;

  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "Completed",
  ).length;

  const completionRate =
    transactions.length > 0
      ? (completedTransactions / transactions.length) * 100
      : 0;

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
                Banking Operations
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Bank Transactions
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Monitor, approve and investigate enterprise banking activity
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export Register
            </button>

            <button
              type="button"
              onClick={() => setShowCreatePanel(true)}
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              New Transaction
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
              Bank Balance
            </p>

            <p className="mt-1 text-2xl font-black text-[#10233b]">
              {formatCompactCurrency(totalBankBalance)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Across {bankAccounts.length} accounts
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ArrowDownLeft className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Total Credits
            </p>

            <p className="mt-1 text-2xl font-black text-emerald-600">
              {formatCompactCurrency(totals.credits)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Incoming transactions
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Total Debits
            </p>

            <p className="mt-1 text-2xl font-black text-red-600">
              {formatCompactCurrency(totals.debits)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Outgoing transactions
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Net Cash Flow
            </p>

            <p
              className={[
                "mt-1 text-2xl font-black",
                netCashFlow >= 0 ? "text-blue-600" : "text-red-600",
              ].join(" ")}
            >
              {formatCompactCurrency(netCashFlow)}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Credits minus debits
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Pending
            </p>

            <p className="mt-1 text-2xl font-black text-[#10233b]">
              {totals.pendingCount}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              {formatCompactCurrency(totals.pending)}
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              High Risk
            </p>

            <p className="mt-1 text-2xl font-black text-red-700">
              {totals.highRiskCount}
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Requires investigation
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Transaction Overview
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Banking Activity Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Credit and debit activity across connected bank accounts
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <CalendarDays className="h-4 w-4" />
                  Last 7 Days
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
                  Total Transactions
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {transactions.length}
                </p>

                <p className="mt-2 text-xs font-medium text-emerald-600">
                  +12.8% from previous period
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Completion Rate
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {completionRate.toFixed(1)}%
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Failed Transactions
                </p>

                <p className="mt-2 text-2xl font-black text-red-600">
                  {totals.failedCount}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Blocked or rejected
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Average Transaction
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(
                    (totals.credits + totals.debits) / transactions.length,
                  )}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Average processed value
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex h-[280px] items-end gap-3 sm:gap-5">
                {dailyTransactionData.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end gap-1.5">
                      <div
                        className="w-1/2 rounded-t-lg bg-emerald-500"
                        style={{ height: `${item.credits}%` }}
                      />

                      <div
                        className="w-1/2 rounded-t-lg bg-[#10233b]"
                        style={{ height: `${item.debits}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-black">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Credits
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <span className="h-3 w-3 rounded-full bg-[#10233b]" />
                Debits
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <WandSparkles className="h-6 w-6 text-amber-400" />
              </div>

              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                Live Monitoring
              </span>
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              KEOS Transaction AI
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Financial risks detected
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              KEOS continuously monitors transaction amount, beneficiary,
              frequency, device, location and approval behavior.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                  <div>
                    <p className="text-sm font-black">
                      Unknown beneficiary blocked
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      A ₹6.85L IMPS transfer was blocked because the beneficiary
                      was not found in the approved vendor master.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />

                  <div>
                    <p className="text-sm font-black">
                      Duplicate payment stopped
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      A duplicate ₹2.75L supplier payment using the same invoice
                      was rejected automatically.
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
                      A ₹14.20L textile payment is waiting for founder
                      authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Review Risk Alerts
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Configure Monitoring Rules
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Transaction Register
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Complete register of banking activity and payment approvals
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
                <FileSpreadsheet className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search transaction, beneficiary, reference or category..."
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <ListFilter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Types</option>
                  <option value="Credit">Credits</option>
                  <option value="Debit">Debits</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-black text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Reversed">Reversed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
              >
                <CalendarDays className="h-4 w-4" />
                15 Jul – 21 Jul
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Bank Account
                </label>

                <select
                  value={bankFilter}
                  onChange={(event) => setBankFilter(event.target.value)}
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Bank Accounts</option>

                  {bankAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bankName} · {account.accountNumber}
                    </option>
                  ))}
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
                  Minimum Amount
                </label>

                <input
                  type="number"
                  placeholder="₹0"
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Maximum Amount
                </label>

                <input
                  type="number"
                  placeholder="No limit"
                  className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>
            </div>
          )}

                    <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-[1550px] w-full border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Transaction
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Date & Time
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Bank Account
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Counterparty
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Category
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Mode
                    </th>
                    <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Amount
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Approval
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
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={[
                              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                              transaction.type === "Credit"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-600",
                            ].join(" ")}
                          >
                            {transaction.type === "Credit" ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {transaction.id}
                            </p>

                            <p className="mt-1 max-w-[240px] text-xs font-medium text-slate-500">
                              {transaction.description}
                            </p>

                            <p className="mt-1 text-[11px] font-semibold text-slate-400">
                              Ref: {transaction.referenceNumber}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {transaction.date}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {transaction.time}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {transaction.bankName}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {transaction.accountNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[220px] truncate text-sm font-black text-[#10233b]">
                          {transaction.counterparty}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {transaction.counterpartyType}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                          {transaction.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {transaction.paymentMode}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {transaction.bankReference}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <p
                          className={[
                            "text-sm font-black",
                            transaction.type === "Credit"
                              ? "text-emerald-600"
                              : "text-red-600",
                          ].join(" ")}
                        >
                          {transaction.type === "Credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {transaction.type}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "inline-flex rounded-full px-3 py-1 text-xs font-black",
                            getStatusClass(transaction.status),
                          ].join(" ")}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "inline-flex rounded-full px-3 py-1 text-xs font-black",
                            getApprovalClass(transaction.approvalStatus),
                          ].join(" ")}
                        >
                          {transaction.approvalStatus}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-1 text-xs font-black",
                              getRiskClass(transaction.riskLevel),
                            ].join(" ")}
                          >
                            {transaction.riskLevel}
                          </span>

                          <span className="text-xs font-black text-slate-400">
                            {transaction.riskScore}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTransaction(transaction)
                            }
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
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Search className="h-10 w-10 text-slate-300" />

                <h3 className="mt-4 text-lg font-black text-[#10233b]">
                  No transactions found
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Search term ya filters change karke dobara try karo.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Showing{" "}
                <span className="font-black text-[#10233b]">
                  {filteredTransactions.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-[#10233b]">
                  {transactions.length}
                </span>{" "}
                transactions
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

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {bankAccounts.map((account) => (
            <article
              key={account.id}
              className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#10233b]">
                  <Landmark className="h-5 w-5" />
                </div>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                    account.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : account.status === "Restricted"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-600",
                  ].join(" ")}
                >
                  {account.status}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-black text-[#10233b]">
                {account.bankName}
              </h3>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                {account.accountNumber}
              </p>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Available Balance
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(account.availableBalance)}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Current Balance
                  </p>

                  <p className="mt-1 text-sm font-black text-[#10233b]">
                    {formatCompactCurrency(account.currentBalance)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Account Type
                  </p>

                  <p className="mt-1 truncate text-sm font-black text-[#10233b]">
                    {account.accountType}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
              >
                View Account
                <ChevronRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Founder Control
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  High-Value Approval Queue
                </h2>
              </div>

              <ShieldCheck className="h-7 w-7 text-[#10233b]" />
            </div>

            <div className="mt-5 space-y-3">
              {transactions
                .filter(
                  (transaction) =>
                    transaction.approvalStatus === "Founder Approval",
                )
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {transaction.counterparty}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {transaction.id} · {transaction.bankName}
                        </p>

                        <p className="mt-2 text-lg font-black text-red-600">
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 text-xs font-black text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>

                        <button
                          type="button"
                          className="flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-3 text-xs font-black text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Control Summary
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Transaction Security
                </h2>
              </div>

              <Lock className="h-7 w-7 text-[#10233b]" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />

                <p className="mt-4 text-2xl font-black text-emerald-700">
                  98.7%
                </p>

                <p className="mt-1 text-xs font-black text-emerald-600">
                  Safe transactions
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <ShieldAlert className="h-5 w-5 text-red-600" />

                <p className="mt-4 text-2xl font-black text-red-700">2</p>

                <p className="mt-1 text-xs font-black text-red-600">
                  Transactions blocked
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <BadgeCheck className="h-5 w-5 text-violet-600" />

                <p className="mt-4 text-2xl font-black text-violet-700">1</p>

                <p className="mt-1 text-xs font-black text-violet-600">
                  Founder approval
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <Sparkles className="h-5 w-5 text-blue-600" />

                <p className="mt-4 text-2xl font-black text-blue-700">24/7</p>

                <p className="mt-1 text-xs font-black text-blue-600">
                  AI monitoring
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>

            {selectedTransaction && (
        <>
          <button
            type="button"
            aria-label="Close transaction details"
            onClick={() => setSelectedTransaction(null)}
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px]"
          />

          <aside className="fixed right-0 top-0 z-50 h-screen w-full max-w-[760px] overflow-y-auto border-l border-slate-200 bg-[#f5f7fa] shadow-2xl">
            <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      selectedTransaction.type === "Credit"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600",
                    ].join(" ")}
                  >
                    {selectedTransaction.type === "Credit" ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                      Transaction Details
                    </p>

                    <h2 className="mt-2 text-xl font-black text-[#10233b]">
                      {selectedTransaction.id}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedTransaction.counterparty}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTransaction(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-6">
              <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-lg sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Transaction Amount
                    </p>

                    <p
                      className={[
                        "mt-2 text-3xl font-black",
                        selectedTransaction.type === "Credit"
                          ? "text-emerald-300"
                          : "text-red-300",
                      ].join(" ")}
                    >
                      {selectedTransaction.type === "Credit" ? "+" : "-"}
                      {formatCurrency(selectedTransaction.amount)}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-300">
                      {selectedTransaction.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-black",
                        getStatusClass(selectedTransaction.status),
                      ].join(" ")}
                    >
                      {selectedTransaction.status}
                    </span>

                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-black",
                        getRiskClass(selectedTransaction.riskLevel),
                      ].join(" ")}
                    >
                      {selectedTransaction.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Type
                    </p>

                    <p className="mt-2 text-sm font-black">
                      {selectedTransaction.type}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Mode
                    </p>

                    <p className="mt-2 text-sm font-black">
                      {selectedTransaction.paymentMode}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Risk Score
                    </p>

                    <p className="mt-2 text-sm font-black">
                      {selectedTransaction.riskScore}/100
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Value Date
                    </p>

                    <p className="mt-2 text-sm font-black">
                      {selectedTransaction.valueDate}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Transaction Information
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Banking Details
                    </h3>
                  </div>

                  <Banknote className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Bank Name
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.bankName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Bank Account
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.accountNumber}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Bank Reference
                    </p>

                    <p className="mt-2 break-all text-sm font-black text-[#10233b]">
                      {selectedTransaction.bankReference}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Internal Reference
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.referenceNumber}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Transaction Date
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.date}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Transaction Time
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.time}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Category
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.category}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Counterparty Type
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.counterpartyType}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Approval Control
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Authorization Status
                    </h3>
                  </div>

                  <BadgeCheck className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Approval Status
                    </p>

                    <span
                      className={[
                        "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black",
                        getApprovalClass(
                          selectedTransaction.approvalStatus,
                        ),
                      ].join(" ")}
                    >
                      {selectedTransaction.approvalStatus}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Approved By
                    </p>

                    <p className="mt-3 text-sm font-black text-[#10233b]">
                      {selectedTransaction.approvedBy}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Created By
                    </p>

                    <p className="mt-3 text-sm font-black text-[#10233b]">
                      {selectedTransaction.createdBy}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Current Control
                    </p>

                    <p className="mt-3 text-sm font-black text-[#10233b]">
                      {selectedTransaction.status === "Blocked"
                        ? "Transaction frozen"
                        : selectedTransaction.approvalStatus ===
                            "Founder Approval"
                          ? "Founder review required"
                          : "Standard monitoring"}
                    </p>
                  </div>
                </div>

                {selectedTransaction.approvalStatus ===
                  "Founder Approval" && (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject Transaction
                    </button>

                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve Transaction
                    </button>
                  </div>
                )}
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Linked Records
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Supporting Documents
                    </h3>
                  </div>

                  <Link2 className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileCheck2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Linked Voucher
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {selectedTransaction.linkedVoucher ||
                            "No voucher linked"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <FileSpreadsheet className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Linked Invoice
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {selectedTransaction.linkedInvoice ||
                            "No invoice linked"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Supporting Document
                  </button>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Process Timeline
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Transaction Journey
                    </h3>
                  </div>

                  <Clock3 className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-6 space-y-0">
                  {transactionTimeline.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4 pb-6">
                      {index !== transactionTimeline.length - 1 && (
                        <span className="absolute left-[17px] top-9 h-[calc(100%-20px)] w-px bg-slate-200" />
                      )}

                      <div
                        className={[
                          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                          item.status === "Complete"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-red-50 text-red-600",
                        ].join(" ")}
                      >
                        {item.status === "Complete" ? (
                          <Check className="h-4 w-4" />
                        ) : item.status === "Pending" ? (
                          <Clock3 className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {item.title}
                            </p>

                            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <span className="shrink-0 text-[11px] font-black text-slate-400">
                            {item.time}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-400">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Audit Trail
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Security Activity
                    </h3>
                  </div>

                  <ShieldCheck className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-[650px] w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Activity
                          </th>

                          <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-500">
                            User
                          </th>

                          <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Device
                          </th>

                          <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Date
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200">
                        {auditEvents.map((event) => (
                          <tr key={event.id}>
                            <td className="px-4 py-4">
                              <p className="text-sm font-black text-[#10233b]">
                                {event.action}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-400">
                                {event.id}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <p className="text-sm font-black text-[#10233b]">
                                {event.user}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-400">
                                {event.location}
                              </p>
                            </td>

                            <td className="px-4 py-4 text-sm font-semibold text-slate-500">
                              {event.device}
                            </td>

                            <td className="px-4 py-4">
                              <p className="text-sm font-black text-[#10233b]">
                                {event.date}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-400">
                                {event.time}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                      Security Metadata
                    </p>

                    <h3 className="mt-2 text-lg font-black text-[#10233b]">
                      Device & Location
                    </h3>
                  </div>

                  <ShieldAlert className="h-6 w-6 text-[#10233b]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      IP Address
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.ipAddress}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Location
                    </p>

                    <p className="mt-2 text-sm font-black text-[#10233b]">
                      {selectedTransaction.location}
                    </p>
                  </div>
                </div>

                {selectedTransaction.notes && (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <div>
                        <p className="text-sm font-black text-amber-800">
                          Transaction Note
                        </p>

                        <p className="mt-1 text-xs font-semibold leading-5 text-amber-700">
                          {selectedTransaction.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Founder Actions
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Transaction Controls
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <FileCheck2 className="h-4 w-4" />
                    Generate Audit Report
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-black text-amber-700 transition hover:bg-amber-100"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reverse Transaction
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
                  >
                    <Lock className="h-4 w-4" />
                    Freeze Transaction
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </>
      )}

      {showCreatePanel && (
        <>
          <button
            type="button"
            aria-label="Close new transaction panel"
            onClick={() => setShowCreatePanel(false)}
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px]"
          />

          <aside className="fixed right-0 top-0 z-50 h-screen w-full max-w-[620px] overflow-y-auto border-l border-slate-200 bg-[#f5f7fa] shadow-2xl">
            <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Banking Operations
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Create New Transaction
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Initiate a controlled enterprise payment or transfer
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreatePanel(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-6">
              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#10233b]">
                  Transaction Type
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-[#10233b] bg-slate-50 p-4 text-[#10233b]"
                  >
                    <ArrowUpRight className="h-5 w-5" />

                    <span className="mt-2 text-sm font-black">
                      Bank Payment
                    </span>

                    <span className="mt-1 text-[11px] font-semibold text-slate-500">
                      Outgoing debit
                    </span>
                  </button>

                  <button
                    type="button"
                    className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-4 text-[#10233b] transition hover:bg-slate-50"
                  >
                    <ArrowDownLeft className="h-5 w-5" />

                    <span className="mt-2 text-sm font-black">
                      Bank Receipt
                    </span>

                    <span className="mt-1 text-[11px] font-semibold text-slate-500">
                      Incoming credit
                    </span>
                  </button>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#10233b]">
                  Payment Information
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Source Bank Account
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Select bank account</option>

                      {bankAccounts.map((account) => (
                        <option key={account.id}>
                          {account.bankName} · {account.accountNumber} ·{" "}
                          {formatCompactCurrency(account.availableBalance)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Beneficiary
                    </label>

                    <div className="relative mt-2">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        placeholder="Search approved vendor or customer"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-black text-[#10233b]">
                        Amount
                      </label>

                      <div className="relative mt-2">
                        <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          type="number"
                          placeholder="0.00"
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#10233b]">
                        Payment Mode
                      </label>

                      <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                        <option>NEFT</option>
                        <option>RTGS</option>
                        <option>IMPS</option>
                        <option>UPI</option>
                        <option>ACH</option>
                        <option>Internal Transfer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Transaction Category
                    </label>

                    <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]">
                      <option>Select category</option>
                      <option>Supplier Payment</option>
                      <option>Inventory Purchase</option>
                      <option>Marketing Expense</option>
                      <option>Technology Expense</option>
                      <option>Payroll</option>
                      <option>Customer Refund</option>
                      <option>Internal Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Reference Number
                    </label>

                    <input
                      placeholder="Invoice, voucher or internal reference"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#10233b]">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Enter transaction purpose and supporting details"
                      className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-[#10233b]">
                  Supporting Documents
                </h3>

                <button
                  type="button"
                  className="mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-8 text-center transition hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#10233b]">
                    <Upload className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-sm font-black text-[#10233b]">
                    Upload invoice or payment document
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    PDF, JPG, PNG or XLSX up to 10 MB
                  </p>
                </button>
              </section>

              <section className="rounded-[26px] bg-[#10233b] p-5 text-white shadow-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-sm font-black">
                      KEOS pre-submission check
                    </p>

                    <p className="mt-2 text-xs font-medium leading-5 text-slate-300">
                      Beneficiary validation, duplicate payment detection,
                      budget availability and approval threshold will run before
                      this transaction is submitted.
                    </p>
                  </div>
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowCreatePanel(false)}
                  className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Validate & Submit
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}