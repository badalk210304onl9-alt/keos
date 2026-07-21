"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileCheck2,
  FileSpreadsheet,
  Landmark,
  Link2,
  ListFilter,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Upload,
  WalletCards,
  WandSparkles,
  X,
} from "lucide-react";

type AccountStatus =
  | "Reconciled"
  | "In Progress"
  | "Pending Review"
  | "Variance Detected";

type MatchStatus = "Matched" | "Suggested" | "Unmatched";

type TransactionType = "Credit" | "Debit";

type ActiveTab =
  | "Bank Statement"
  | "Company Ledger"
  | "Unmatched"
  | "History";

type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  statementBalance: number;
  ledgerBalance: number;
  transactions: number;
  matchedTransactions: number;
  unmatchedAmount: number;
  status: AccountStatus;
  statementDate: string;
  lastReconciledDate: string;
};

type BankTransaction = {
  id: string;
  accountId: string;
  reference: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: TransactionType;
  balance: number;
  status: MatchStatus;
  confidence?: number;
  ledgerReference?: string;
};

type LedgerTransaction = {
  id: string;
  accountId: string;
  voucher: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: TransactionType;
  status: MatchStatus;
  bankReference?: string;
  createdBy: string;
};

type HistoryItem = {
  id: string;
  account: string;
  period: string;
  statementBalance: number;
  ledgerBalance: number;
  difference: number;
  reconciledBy: string;
  approvedBy: string;
  status: "Approved" | "Pending Approval";
};

const bankAccounts: BankAccount[] = [
  {
    id: "BANK-001",
    bankName: "HDFC Bank",
    accountNumber: "•••• 4728",
    accountType: "Current Account",
    statementBalance: 18486000,
    ledgerBalance: 18296000,
    transactions: 284,
    matchedTransactions: 276,
    unmatchedAmount: 190000,
    status: "In Progress",
    statementDate: "21 Jul 2026",
    lastReconciledDate: "20 Jul 2026",
  },
  {
    id: "BANK-002",
    bankName: "ICICI Bank",
    accountNumber: "•••• 8164",
    accountType: "Current Account",
    statementBalance: 7245000,
    ledgerBalance: 7245000,
    transactions: 146,
    matchedTransactions: 146,
    unmatchedAmount: 0,
    status: "Reconciled",
    statementDate: "21 Jul 2026",
    lastReconciledDate: "21 Jul 2026",
  },
  {
    id: "BANK-003",
    bankName: "State Bank of India",
    accountNumber: "•••• 9351",
    accountType: "Operations Account",
    statementBalance: 4865000,
    ledgerBalance: 4715000,
    transactions: 198,
    matchedTransactions: 191,
    unmatchedAmount: 150000,
    status: "Variance Detected",
    statementDate: "21 Jul 2026",
    lastReconciledDate: "19 Jul 2026",
  },
  {
    id: "BANK-004",
    bankName: "Axis Bank",
    accountNumber: "•••• 2296",
    accountType: "Payroll Account",
    statementBalance: 3124000,
    ledgerBalance: 3106000,
    transactions: 92,
    matchedTransactions: 89,
    unmatchedAmount: 18000,
    status: "Pending Review",
    statementDate: "21 Jul 2026",
    lastReconciledDate: "20 Jul 2026",
  },
];

const bankTransactions: BankTransaction[] = [
  {
    id: "BTX-20481",
    accountId: "BANK-001",
    reference: "HDFC/UPI/729184",
    description: "Razorpay Settlement — KRVE Orders",
    date: "21 Jul 2026",
    category: "Sales Settlement",
    amount: 485600,
    type: "Credit",
    balance: 18486000,
    status: "Matched",
    confidence: 100,
    ledgerReference: "RV-2026-7821",
  },
  {
    id: "BTX-20480",
    accountId: "BANK-001",
    reference: "NEFT/HDFC/884129",
    description: "Payment to Fabric Source India",
    date: "21 Jul 2026",
    category: "Supplier Payment",
    amount: 275000,
    type: "Debit",
    balance: 18000400,
    status: "Suggested",
    confidence: 94,
    ledgerReference: "PV-2026-4182",
  },
  {
    id: "BTX-20479",
    accountId: "BANK-001",
    reference: "ACH/HDFC/721945",
    description: "Cloud Infrastructure Subscription",
    date: "21 Jul 2026",
    category: "Technology Expense",
    amount: 84000,
    type: "Debit",
    balance: 18275400,
    status: "Matched",
    confidence: 100,
    ledgerReference: "JV-2026-1295",
  },
  {
    id: "BTX-20478",
    accountId: "BANK-001",
    reference: "HDFC/CHG/072126",
    description: "Monthly Bank Service Charges",
    date: "21 Jul 2026",
    category: "Bank Charges",
    amount: 12500,
    type: "Debit",
    balance: 18359400,
    status: "Unmatched",
  },
  {
    id: "BTX-20477",
    accountId: "BANK-001",
    reference: "IMPS/HDFC/510892",
    description: "Customer Refund — Order KRVE-9841",
    date: "20 Jul 2026",
    category: "Customer Refund",
    amount: 28900,
    type: "Debit",
    balance: 18371900,
    status: "Suggested",
    confidence: 87,
    ledgerReference: "CN-2026-3284",
  },
  {
    id: "BTX-20476",
    accountId: "BANK-001",
    reference: "NEFT/HDFC/627190",
    description: "Payment Received — Luxe Retail Partners",
    date: "20 Jul 2026",
    category: "B2B Revenue",
    amount: 725000,
    type: "Credit",
    balance: 18400800,
    status: "Matched",
    confidence: 100,
    ledgerReference: "RV-2026-7805",
  },
  {
    id: "BTX-20475",
    accountId: "BANK-001",
    reference: "HDFC/INT/072026",
    description: "Bank Interest Credit",
    date: "20 Jul 2026",
    category: "Interest Income",
    amount: 8500,
    type: "Credit",
    balance: 17675800,
    status: "Unmatched",
  },
  {
    id: "BTX-20474",
    accountId: "BANK-001",
    reference: "UPI/HDFC/291674",
    description: "Meta Advertising India",
    date: "20 Jul 2026",
    category: "Marketing Expense",
    amount: 149000,
    type: "Debit",
    balance: 17667300,
    status: "Suggested",
    confidence: 91,
    ledgerReference: "PV-2026-4172",
  },
  {
    id: "BTX-20473",
    accountId: "BANK-001",
    reference: "RTGS/HDFC/415620",
    description: "Warehouse Lease Payment",
    date: "19 Jul 2026",
    category: "Rent Expense",
    amount: 480000,
    type: "Debit",
    balance: 17816300,
    status: "Matched",
    confidence: 100,
    ledgerReference: "PV-2026-4164",
  },
  {
    id: "BTX-20472",
    accountId: "BANK-001",
    reference: "NEFT/HDFC/880125",
    description: "Unknown Corporate Transfer",
    date: "19 Jul 2026",
    category: "Unclassified",
    amount: 168000,
    type: "Credit",
    balance: 18296300,
    status: "Unmatched",
  },
];

const ledgerTransactions: LedgerTransaction[] = [
  {
    id: "LTX-90182",
    accountId: "BANK-001",
    voucher: "RV-2026-7821",
    description: "Razorpay Settlement — KRVE Orders",
    date: "21 Jul 2026",
    category: "Sales Settlement",
    amount: 485600,
    type: "Credit",
    status: "Matched",
    bankReference: "HDFC/UPI/729184",
    createdBy: "System Integration",
  },
  {
    id: "LTX-90181",
    accountId: "BANK-001",
    voucher: "PV-2026-4182",
    description: "Fabric Source India Payment",
    date: "21 Jul 2026",
    category: "Supplier Payment",
    amount: 275000,
    type: "Debit",
    status: "Suggested",
    bankReference: "NEFT/HDFC/884129",
    createdBy: "Accounts Payable",
  },
  {
    id: "LTX-90180",
    accountId: "BANK-001",
    voucher: "JV-2026-1295",
    description: "Cloud Infrastructure Subscription",
    date: "21 Jul 2026",
    category: "Technology Expense",
    amount: 84000,
    type: "Debit",
    status: "Matched",
    bankReference: "ACH/HDFC/721945",
    createdBy: "Finance Automation",
  },
  {
    id: "LTX-90179",
    accountId: "BANK-001",
    voucher: "CN-2026-3284",
    description: "Refund for Order KRVE-9841",
    date: "20 Jul 2026",
    category: "Customer Refund",
    amount: 28900,
    type: "Debit",
    status: "Suggested",
    bankReference: "IMPS/HDFC/510892",
    createdBy: "Customer Experience",
  },
  {
    id: "LTX-90178",
    accountId: "BANK-001",
    voucher: "RV-2026-7805",
    description: "Payment from Luxe Retail Partners",
    date: "20 Jul 2026",
    category: "B2B Revenue",
    amount: 725000,
    type: "Credit",
    status: "Matched",
    bankReference: "NEFT/HDFC/627190",
    createdBy: "Accounts Receivable",
  },
  {
    id: "LTX-90177",
    accountId: "BANK-001",
    voucher: "PV-2026-4172",
    description: "Meta Advertising India",
    date: "20 Jul 2026",
    category: "Marketing Expense",
    amount: 149000,
    type: "Debit",
    status: "Suggested",
    bankReference: "UPI/HDFC/291674",
    createdBy: "Marketing Finance",
  },
];

const historyItems: HistoryItem[] = [
  {
    id: "REC-2026-0719",
    account: "HDFC Bank •••• 4728",
    period: "19 Jul 2026",
    statementBalance: 17816300,
    ledgerBalance: 17816300,
    difference: 0,
    reconciledBy: "Aditya Rao",
    approvedBy: "Founder Office",
    status: "Approved",
  },
  {
    id: "REC-2026-0718",
    account: "ICICI Bank •••• 8164",
    period: "18 Jul 2026",
    statementBalance: 6892000,
    ledgerBalance: 6892000,
    difference: 0,
    reconciledBy: "Priya Nair",
    approvedBy: "Finance Director",
    status: "Approved",
  },
  {
    id: "REC-2026-0717",
    account: "SBI •••• 9351",
    period: "17 Jul 2026",
    statementBalance: 4624000,
    ledgerBalance: 4598000,
    difference: 26000,
    reconciledBy: "Ritesh Singh",
    approvedBy: "Pending",
    status: "Pending Approval",
  },
];

const trendData = [
  { day: "15 Jul", matched: 88 },
  { day: "16 Jul", matched: 91 },
  { day: "17 Jul", matched: 90 },
  { day: "18 Jul", matched: 94 },
  { day: "19 Jul", matched: 96 },
  { day: "20 Jul", matched: 95 },
  { day: "21 Jul", matched: 97 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  const absolute = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absolute >= 10000000) {
    return `${sign}₹${(absolute / 10000000).toFixed(2)}Cr`;
  }

  if (absolute >= 100000) {
    return `${sign}₹${(absolute / 100000).toFixed(2)}L`;
  }

  return `${sign}₹${absolute.toLocaleString("en-IN")}`;
}

function accountStatusClass(status: AccountStatus) {
  if (status === "Reconciled") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "In Progress") {
    return "bg-blue-50 text-blue-600";
  }

  if (status === "Pending Review") {
    return "bg-amber-50 text-amber-600";
  }

  return "bg-red-50 text-red-600";
}

function matchStatusClass(status: MatchStatus) {
  if (status === "Matched") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Suggested") {
    return "bg-blue-50 text-blue-600";
  }

  return "bg-red-50 text-red-600";
}

export default function BankReconciliationPage() {
  const [selectedAccountId, setSelectedAccountId] = useState("BANK-001");
  const [activeTab, setActiveTab] =
    useState<ActiveTab>("Bank Statement");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<BankTransaction | null>(null);

  const selectedAccount =
    bankAccounts.find((account) => account.id === selectedAccountId) ??
    bankAccounts[0];

  const accountTransactions = useMemo(() => {
    return bankTransactions.filter(
      (transaction) => transaction.accountId === selectedAccountId,
    );
  }, [selectedAccountId]);

  const accountLedger = useMemo(() => {
    return ledgerTransactions.filter(
      (transaction) => transaction.accountId === selectedAccountId,
    );
  }, [selectedAccountId]);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return accountTransactions.filter((transaction) => {
      const matchesQuery =
        transaction.description.toLowerCase().includes(query) ||
        transaction.reference.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [accountTransactions, searchQuery, statusFilter]);

  const totals = useMemo(() => {
    return bankAccounts.reduce(
      (result, account) => {
        result.statement += account.statementBalance;
        result.ledger += account.ledgerBalance;
        result.transactions += account.transactions;
        result.matched += account.matchedTransactions;
        result.unmatched += account.unmatchedAmount;
        return result;
      },
      {
        statement: 0,
        ledger: 0,
        transactions: 0,
        matched: 0,
        unmatched: 0,
      },
    );
  }, []);

  const selectedDifference =
    selectedAccount.statementBalance - selectedAccount.ledgerBalance;

  const totalDifference = totals.statement - totals.ledger;

  const totalMatchRate =
    totals.transactions > 0
      ? (totals.matched / totals.transactions) * 100
      : 0;

  const accountMatchRate =
    selectedAccount.transactions > 0
      ? (selectedAccount.matchedTransactions /
          selectedAccount.transactions) *
        100
      : 0;

  const unmatchedTransactions = accountTransactions.filter(
    (transaction) =>
      transaction.status === "Unmatched" ||
      transaction.status === "Suggested",
  );

  const credits = accountTransactions
    .filter((transaction) => transaction.type === "Credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const debits = accountTransactions
    .filter((transaction) => transaction.type === "Debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const tabs: ActiveTab[] = [
    "Bank Statement",
    "Company Ledger",
    "Unmatched",
    "History",
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
                Banking & Treasury Control
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Bank Reconciliation
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Match bank statements, ledger entries and financial
                adjustments
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>

            <button
              type="button"
              onClick={() => setShowUploadPanel(true)}
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Upload className="h-4 w-4" />
              Upload Statement
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            icon={<Landmark className="h-5 w-5" />}
            iconClass="bg-[#10233b] text-white"
            label="Bank Accounts"
            value={bankAccounts.length.toString()}
            note="Active company accounts"
          />

          <MetricCard
            icon={<WalletCards className="h-5 w-5" />}
            iconClass="bg-blue-50 text-blue-600"
            label="Statement Balance"
            value={formatCompactCurrency(totals.statement)}
            note="Across all accounts"
          />

          <MetricCard
            icon={<FileSpreadsheet className="h-5 w-5" />}
            iconClass="bg-emerald-50 text-emerald-600"
            label="Ledger Balance"
            value={formatCompactCurrency(totals.ledger)}
            note="Recorded in company books"
          />

          <MetricCard
            icon={<Link2 className="h-5 w-5" />}
            iconClass="bg-amber-50 text-amber-600"
            label="Match Rate"
            value={`${totalMatchRate.toFixed(1)}%`}
            note={`${totals.matched} transactions matched`}
          />

          <MetricCard
            icon={<AlertTriangle className="h-5 w-5" />}
            iconClass="bg-red-50 text-red-600"
            label="Difference"
            value={formatCompactCurrency(totalDifference)}
            note="Requires reconciliation"
            valueClass="text-red-600"
          />
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(350px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Active Reconciliation
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  Account Summary
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Review the selected bank account and current variance
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAccountMenu((value) => !value)}
                  className="flex min-w-[290px] items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10233b] text-white">
                      <Landmark className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {selectedAccount.bankName}
                      </p>

                      <p className="text-xs font-medium text-slate-400">
                        {selectedAccount.accountNumber}
                      </p>
                    </div>
                  </div>

                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-full min-w-[320px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    {bankAccounts.map((account) => (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => {
                          setSelectedAccountId(account.id);
                          setShowAccountMenu(false);
                          setSearchQuery("");
                          setStatusFilter("All");
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                      >
                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            {account.bankName}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {account.accountNumber} · {account.accountType}
                          </p>
                        </div>

                        {selectedAccountId === account.id && (
                          <Check className="h-4 w-4 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryBox
                label="Statement Balance"
                value={formatCompactCurrency(
                  selectedAccount.statementBalance,
                )}
                note={selectedAccount.statementDate}
              />

              <SummaryBox
                label="Ledger Balance"
                value={formatCompactCurrency(selectedAccount.ledgerBalance)}
                note="Company books"
              />

              <SummaryBox
                label="Difference"
                value={formatCompactCurrency(selectedDifference)}
                note="Bank minus ledger"
                valueClass={
                  selectedDifference === 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }
              />

              <SummaryBox
                label="Match Completion"
                value={`${accountMatchRate.toFixed(1)}%`}
                note={`${selectedAccount.matchedTransactions} matched`}
              />
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#10233b]">
                    Reconciliation Progress
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Automated and manually confirmed records
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${accountStatusClass(
                    selectedAccount.status,
                  )}`}
                >
                  {selectedAccount.status}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-500">
                    {selectedAccount.matchedTransactions} of{" "}
                    {selectedAccount.transactions} transactions
                  </span>

                  <span className="text-[#10233b]">
                    {accountMatchRate.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#10233b]"
                    style={{
                      width: `${Math.min(accountMatchRate, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SmallValueBox
                  label="Total Credits"
                  value={formatCompactCurrency(credits)}
                  valueClass="text-emerald-600"
                />

                <SmallValueBox
                  label="Total Debits"
                  value={formatCompactCurrency(debits)}
                  valueClass="text-red-600"
                />

                <SmallValueBox
                  label="Unmatched Value"
                  value={formatCompactCurrency(
                    selectedAccount.unmatchedAmount,
                  )}
                  valueClass="text-amber-600"
                />
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <WandSparkles className="h-6 w-6 text-amber-400" />
              </div>

              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                AI Active
              </span>
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              KEOS Reconciliation AI
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Financial anomalies detected
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              KEOS analyzed transaction descriptions, values, dates and
              ledger references.
            </p>

            <div className="mt-6 space-y-3">
              <AiInsight
                icon={<Sparkles className="h-5 w-5 text-blue-400" />}
                title="High-confidence matches"
                text="Three transactions can be matched automatically with an average confidence above 90%."
              />

              <AiInsight
                icon={<Banknote className="h-5 w-5 text-amber-400" />}
                title="Adjustment entries"
                text="Bank charges of ₹12,500 and interest income of ₹8,500 are missing from the ledger."
              />

              <AiInsight
                icon={
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                }
                title="Unknown transfer"
                text="An incoming transfer of ₹1.68L has no matching invoice, receipt or journal entry."
              />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Run Auto Reconciliation
              <RefreshCcw className="h-4 w-4" />
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Reconciliation Workspace
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Compare bank and company records
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
                    activeTab === tab
                      ? "bg-[#10233b] text-white"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab !== "History" && (
            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search transaction, reference or category..."
                  className="h-11 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <ListFilter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-black text-[#10233b] outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Matched">Matched</option>
                    <option value="Suggested">Suggested</option>
                    <option value="Unmatched">Unmatched</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-black text-[#10233b]"
                >
                  <CalendarDays className="h-4 w-4" />
                  15 Jul – 21 Jul
                </button>
              </div>
            </div>
          )}

          {activeTab === "Bank Statement" && (
            <BankStatementTable
              transactions={filteredTransactions}
              onSelect={setSelectedTransaction}
            />
          )}

          {activeTab === "Company Ledger" && (
            <LedgerTable transactions={accountLedger} />
          )}

          {activeTab === "Unmatched" && (
            <UnmatchedSection
              transactions={unmatchedTransactions}
              onSelect={setSelectedTransaction}
            />
          )}

          {activeTab === "History" && <HistoryTable />}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.75fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Reconciliation Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Daily transaction matching rate
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-[#10233b]">
                Last 7 Days
              </span>
            </div>

            <div className="mt-6 flex h-[260px] items-end gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              {trendData.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                >
                  <div
                    className="w-full max-w-12 rounded-t-xl bg-[#10233b]"
                    style={{ height: `${item.matched}%` }}
                  />

                  <span className="text-[10px] font-black uppercase text-slate-400">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Adjustment Entries
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Missing items detected by KEOS
                </p>
              </div>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10233b] text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <AdjustmentCard
                title="Bank Service Charges"
                description="Monthly service and transaction charges"
                amount="-₹12,500"
                amountClass="text-red-600"
                status="Draft"
              />

              <AdjustmentCard
                title="Interest Income"
                description="Interest credited by HDFC Bank"
                amount="+₹8,500"
                amountClass="text-emerald-600"
                status="Pending Approval"
              />

              <AdjustmentCard
                title="Payment Gateway Fee"
                description="Razorpay settlement processing fee"
                amount="-₹6,800"
                amountClass="text-red-600"
                status="Posted"
              />
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
              Period Completion
            </p>

            <h2 className="mt-2 text-lg font-black text-[#10233b]">
              Approval Workflow
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Validate and approve the current reconciliation
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <WorkflowCard
                icon={<Check className="h-5 w-5" />}
                title="Statement Imported"
                text="Statement uploaded and validated."
                status="Complete"
                cardClass="border-emerald-100 bg-emerald-50"
                iconClass="bg-emerald-600"
                statusClass="text-emerald-600"
              />

              <WorkflowCard
                icon={<Link2 className="h-5 w-5" />}
                title="Transactions Matched"
                text={`${selectedAccount.matchedTransactions} records matched.`}
                status="Complete"
                cardClass="border-emerald-100 bg-emerald-50"
                iconClass="bg-emerald-600"
                statusClass="text-emerald-600"
              />

              <WorkflowCard
                icon={<FileSpreadsheet className="h-5 w-5" />}
                title="Adjustments Posted"
                text="Adjustment entries require approval."
                status="In Progress"
                cardClass="border-amber-100 bg-amber-50"
                iconClass="bg-amber-500"
                statusClass="text-amber-600"
              />

              <WorkflowCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Final Approval"
                text="Unlocks after variance reaches zero."
                status="Locked"
                cardClass="border-slate-200 bg-slate-50"
                iconClass="bg-slate-300"
                statusClass="text-slate-500"
              />
            </div>

            <div className="mt-6 flex flex-col gap-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Current unresolved difference
                </p>

                <p
                  className={`mt-2 text-3xl font-black ${
                    selectedDifference === 0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(selectedDifference)}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#10233b]"
                >
                  <FileCheck2 className="h-4 w-4" />
                  Save Reconciliation
                </button>

                <button
                  type="button"
                  disabled={selectedDifference !== 0}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Submit for Approval
                </button>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Founder Controls
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Reconciliation safeguards
            </h2>

            <div className="mt-6 space-y-3">
              <ControlItem
                icon={<BadgeCheck className="h-5 w-5 text-emerald-400" />}
                title="Dual authorization"
                text="High-value variances require finance director and founder approval."
              />

              <ControlItem
                icon={
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                }
                title="Unknown transfer lock"
                text="Unidentified transfers cannot be posted without supporting evidence."
              />

              <ControlItem
                icon={<Clock3 className="h-5 w-5 text-blue-400" />}
                title="Period closing control"
                text="Reconciliation must finish before monthly financial closing."
              />
            </div>
          </aside>
        </section>
      </main>

      {selectedTransaction && (
        <TransactionDrawer
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {showUploadPanel && (
        <UploadPanel onClose={() => setShowUploadPanel(false)} />
      )}
    </div>
  );
}

function MetricCard({
  icon,
  iconClass,
  label,
  value,
  note,
  valueClass = "text-[#10233b]",
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
  note: string;
  valueClass?: string;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>

      <p className={`mt-1 text-3xl font-black ${valueClass}`}>{value}</p>

      <p className="mt-2 text-xs font-medium text-slate-400">{note}</p>
    </article>
  );
}

function SummaryBox({
  label,
  value,
  note,
  valueClass = "text-[#10233b]",
}: {
  label: string;
  value: string;
  note: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-black ${valueClass}`}>{value}</p>
      <p className="mt-2 text-[11px] font-medium text-slate-400">{note}</p>
    </div>
  );
}

function SmallValueBox({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-lg font-black ${valueClass}`}>{value}</p>
    </div>
  );
}

function AiInsight({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>

        <div>
          <p className="text-sm font-black">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

function BankStatementTable({
  transactions,
  onSelect,
}: {
  transactions: BankTransaction[];
  onSelect: (transaction: BankTransaction) => void;
}) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[1150px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            {[
              "Transaction",
              "Reference",
              "Date",
              "Category",
              "Debit",
              "Credit",
              "Balance",
              "Match Status",
              "Action",
            ].map((heading) => (
              <th
                key={heading}
                className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-4">
                <button
                  type="button"
                  onClick={() => onSelect(transaction)}
                  className="text-left"
                >
                  <p className="text-sm font-black text-[#10233b]">
                    {transaction.description}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {transaction.id}
                  </p>
                </button>
              </td>

              <td className="px-3 py-4">
                <p className="text-sm font-bold text-slate-600">
                  {transaction.reference}
                </p>

                {transaction.ledgerReference && (
                  <p className="mt-1 text-xs font-medium text-blue-500">
                    Ledger: {transaction.ledgerReference}
                  </p>
                )}
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {transaction.date}
              </td>

              <td className="px-3 py-4">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">
                  {transaction.category}
                </span>
              </td>

              <td className="px-3 py-4 text-sm font-black text-red-600">
                {transaction.type === "Debit"
                  ? formatCurrency(transaction.amount)
                  : "—"}
              </td>

              <td className="px-3 py-4 text-sm font-black text-emerald-600">
                {transaction.type === "Credit"
                  ? formatCurrency(transaction.amount)
                  : "—"}
              </td>

              <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                {formatCurrency(transaction.balance)}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${matchStatusClass(
                    transaction.status,
                  )}`}
                >
                  {transaction.status}
                </span>

                {transaction.status === "Suggested" && (
                  <p className="mt-1 text-[10px] font-black text-blue-500">
                    {transaction.confidence}% confidence
                  </p>
                )}
              </td>

              <td className="px-3 py-4">
                <button
                  type="button"
                  onClick={() => onSelect(transaction)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-black text-[#10233b]">
            No transactions found
          </p>
        </div>
      )}
    </div>
  );
}

function LedgerTable({
  transactions,
}: {
  transactions: LedgerTransaction[];
}) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            {[
              "Voucher",
              "Description",
              "Date",
              "Category",
              "Debit",
              "Credit",
              "Bank Reference",
              "Status",
              "Created By",
            ].map((heading) => (
              <th
                key={heading}
                className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-4">
                <p className="text-sm font-black text-[#10233b]">
                  {transaction.voucher}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {transaction.id}
                </p>
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {transaction.description}
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {transaction.date}
              </td>

              <td className="px-3 py-4">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase text-slate-600">
                  {transaction.category}
                </span>
              </td>

              <td className="px-3 py-4 text-sm font-black text-red-600">
                {transaction.type === "Debit"
                  ? formatCurrency(transaction.amount)
                  : "—"}
              </td>

              <td className="px-3 py-4 text-sm font-black text-emerald-600">
                {transaction.type === "Credit"
                  ? formatCurrency(transaction.amount)
                  : "—"}
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {transaction.bankReference ?? "Not linked"}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${matchStatusClass(
                    transaction.status,
                  )}`}
                >
                  {transaction.status}
                </span>
              </td>

              <td className="px-3 py-4 text-sm font-semibold text-slate-500">
                {transaction.createdBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UnmatchedSection({
  transactions,
  onSelect,
}: {
  transactions: BankTransaction[];
  onSelect: (transaction: BankTransaction) => void;
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
      {transactions.map((transaction) => (
        <article
          key={transaction.id}
          className="rounded-[24px] border border-slate-200 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  transaction.type === "Credit"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {transaction.type === "Credit" ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  {transaction.description}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {transaction.reference}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${matchStatusClass(
                transaction.status,
              )}`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <SmallValueBox
              label="Amount"
              value={formatCurrency(transaction.amount)}
              valueClass={
                transaction.type === "Credit"
                  ? "text-emerald-600"
                  : "text-red-600"
              }
            />

            <SmallValueBox
              label="Date"
              value={transaction.date}
              valueClass="text-[#10233b]"
            />
          </div>

          {transaction.status === "Suggested" ? (
            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <p className="text-xs font-black text-blue-700">
                  AI Suggested Match
                </p>
              </div>

              <p className="mt-2 text-sm font-black text-[#10233b]">
                {transaction.ledgerReference}
              </p>

              <p className="mt-1 text-xs font-medium text-blue-600">
                Confidence score: {transaction.confidence}%
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs font-black text-red-700">
                No matching ledger entry found
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => onSelect(transaction)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-xs font-black text-white"
          >
            Review Transaction
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>
      ))}
    </div>
  );
}

function HistoryTable() {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            {[
              "Reconciliation",
              "Account",
              "Statement Balance",
              "Ledger Balance",
              "Difference",
              "Reconciled By",
              "Approved By",
              "Status",
            ].map((heading) => (
              <th
                key={heading}
                className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {historyItems.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-4">
                <p className="text-sm font-black text-[#10233b]">
                  {item.id}
                </p>
                <p className="mt-1 text-xs text-slate-400">{item.period}</p>
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {item.account}
              </td>

              <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                {formatCurrency(item.statementBalance)}
              </td>

              <td className="px-3 py-4 text-sm font-black text-[#10233b]">
                {formatCurrency(item.ledgerBalance)}
              </td>

              <td
                className={`px-3 py-4 text-sm font-black ${
                  item.difference === 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(item.difference)}
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {item.reconciledBy}
              </td>

              <td className="px-3 py-4 text-sm font-bold text-slate-600">
                {item.approvedBy}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                    item.status === "Approved"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdjustmentCard({
  title,
  description,
  amount,
  amountClass,
  status,
}: {
  title: string;
  description: string;
  amount: string;
  amountClass: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#10233b]">{title}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {description}
          </p>
        </div>

        <p className={`shrink-0 text-sm font-black ${amountClass}`}>
          {amount}
        </p>
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
        {status}
      </p>
    </div>
  );
}

function WorkflowCard({
  icon,
  title,
  text,
  status,
  cardClass,
  iconClass,
  statusClass,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  status: string;
  cardClass: string;
  iconClass: string;
  statusClass: string;
}) {
  return (
    <div className={`rounded-[22px] border p-5 ${cardClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${iconClass}`}
        >
          {icon}
        </div>

        <span
          className={`text-[10px] font-black uppercase tracking-wider ${statusClass}`}
        >
          {status}
        </span>
      </div>

      <p className="mt-5 text-sm font-black text-[#10233b]">{title}</p>

      <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function ControlItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>

        <div>
          <p className="text-sm font-black">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

function TransactionDrawer({
  transaction,
  onClose,
}: {
  transaction: BankTransaction;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#10233b]/35 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        className="absolute inset-0"
      />

      <aside className="relative h-full w-full max-w-[620px] overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur sm:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
              {transaction.id}
            </p>

            <h2 className="mt-2 text-xl font-black text-[#10233b]">
              Transaction Review
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
            <p className="text-xs text-slate-300">Transaction Amount</p>

            <p
              className={`mt-2 text-3xl font-black ${
                transaction.type === "Credit"
                  ? "text-emerald-300"
                  : "text-red-300"
              }`}
            >
              {transaction.type === "Credit" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>

            <p className="mt-5 text-sm font-black">
              {transaction.description}
            </p>

            <p className="mt-2 text-xs text-slate-300">
              {transaction.reference}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SummaryBox
              label="Date"
              value={transaction.date}
              note="Transaction date"
            />

            <SummaryBox
              label="Category"
              value={transaction.category}
              note="Financial classification"
            />

            <SummaryBox
              label="Running Balance"
              value={formatCompactCurrency(transaction.balance)}
              note="Statement balance"
            />

            <SummaryBox
              label="Match Status"
              value={transaction.status}
              note={
                transaction.confidence
                  ? `${transaction.confidence}% confidence`
                  : "Manual review"
              }
            />
          </div>

          {transaction.status === "Suggested" && (
            <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-sm font-black text-blue-700">
                    AI Suggested Ledger Match
                  </p>

                  <p className="mt-1 text-xs text-blue-600">
                    {transaction.ledgerReference}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirm Match
              </button>
            </div>
          )}

          {transaction.status === "Unmatched" && (
            <div className="rounded-[24px] border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-black text-red-700">
                No ledger match identified
              </p>

              <p className="mt-2 text-xs leading-5 text-red-600">
                Create an adjustment, search the ledger manually or send the
                transaction for investigation.
              </p>
            </div>
          )}

          <div className="rounded-[24px] border border-slate-200 p-5">
            <h3 className="text-sm font-black text-[#10233b]">
              Manual Reconciliation
            </h3>

            <input
              defaultValue={transaction.ledgerReference ?? ""}
              placeholder="Search ledger voucher..."
              className="mt-4 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#10233b]"
            />

            <textarea
              rows={4}
              placeholder="Add reconciliation note..."
              className="mt-4 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#10233b]"
            />

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm font-black text-slate-500"
            >
              <Upload className="h-4 w-4" />
              Upload Supporting Evidence
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function UploadPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#10233b]/35 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close upload panel"
        onClick={onClose}
        className="absolute inset-0"
      />

      <aside className="relative h-full w-full max-w-[560px] overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur sm:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
              Bank Data Import
            </p>

            <h2 className="mt-2 text-xl font-black text-[#10233b]">
              Upload Bank Statement
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="space-y-5 p-5 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="text-xs font-black text-[#10233b]">
              Bank Account
            </label>

            <select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none">
              {bankAccounts.map((account) => (
                <option key={account.id}>
                  {account.bankName} · {account.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="date"
              className="h-12 rounded-2xl border border-slate-200 px-4 text-sm font-semibold"
            />

            <input
              type="date"
              className="h-12 rounded-2xl border border-slate-200 px-4 text-sm font-semibold"
            />
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.pdf"
              className="hidden"
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#10233b] shadow-sm">
              <Upload className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-black text-[#10233b]">
              Select bank statement
            </p>

            <p className="mt-2 text-xs font-medium text-slate-500">
              CSV, Excel or PDF up to 20 MB
            </p>
          </label>

          <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <WandSparkles className="mt-0.5 h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm font-black text-blue-700">
                  AI import validation
                </p>

                <p className="mt-2 text-xs leading-5 text-blue-600">
                  KEOS will detect duplicate records, normalize references
                  and suggest ledger matches automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white"
            >
              <Upload className="h-4 w-4" />
              Import Statement
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}