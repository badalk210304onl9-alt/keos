"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRightLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileSpreadsheet,
  IndianRupee,
  Landmark,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";

type AccountStatus = "Active" | "Restricted" | "Frozen";
type AccountType =
  | "Current Account"
  | "Salary Account"
  | "Escrow Account"
  | "Payment Gateway"
  | "Petty Cash"
  | "Investment Account";

type BankAccount = {
  id: string;
  name: string;
  bank: string;
  accountType: AccountType;
  accountNumber: string;
  branch: string;
  currency: string;
  currentBalance: number;
  availableBalance: number;
  reservedBalance: number;
  todayInflow: number;
  todayOutflow: number;
  status: AccountStatus;
  lastReconciled: string;
  owner: string;
};

type TreasuryTransaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

const bankAccounts: BankAccount[] = [
  {
    id: "BNK-001",
    name: "KRVE Primary Current",
    bank: "HDFC Bank",
    accountType: "Current Account",
    accountNumber: "XXXX 4821",
    branch: "Varanasi Main Branch",
    currency: "INR",
    currentBalance: 3248500,
    availableBalance: 3012500,
    reservedBalance: 236000,
    todayInflow: 468000,
    todayOutflow: 285000,
    status: "Active",
    lastReconciled: "21 Jul 2026 · 06:45 PM",
    owner: "Finance & Treasury",
  },
  {
    id: "BNK-002",
    name: "KRVE Operations Account",
    bank: "ICICI Bank",
    accountType: "Current Account",
    accountNumber: "XXXX 9134",
    branch: "Sigra Branch",
    currency: "INR",
    currentBalance: 1864200,
    availableBalance: 1744200,
    reservedBalance: 120000,
    todayInflow: 215000,
    todayOutflow: 174000,
    status: "Active",
    lastReconciled: "21 Jul 2026 · 05:30 PM",
    owner: "Business Operations",
  },
  {
    id: "BNK-003",
    name: "Employee Payroll",
    bank: "Axis Bank",
    accountType: "Salary Account",
    accountNumber: "XXXX 6679",
    branch: "Lanka Branch",
    currency: "INR",
    currentBalance: 928000,
    availableBalance: 928000,
    reservedBalance: 0,
    todayInflow: 0,
    todayOutflow: 0,
    status: "Active",
    lastReconciled: "20 Jul 2026 · 04:15 PM",
    owner: "People & Finance",
  },
  {
    id: "BNK-004",
    name: "Customer Escrow",
    bank: "State Bank of India",
    accountType: "Escrow Account",
    accountNumber: "XXXX 2088",
    branch: "BHU Branch",
    currency: "INR",
    currentBalance: 642000,
    availableBalance: 412000,
    reservedBalance: 230000,
    todayInflow: 96000,
    todayOutflow: 52000,
    status: "Restricted",
    lastReconciled: "21 Jul 2026 · 03:50 PM",
    owner: "Customer Settlements",
  },
  {
    id: "BNK-005",
    name: "Razorpay Settlements",
    bank: "Razorpay",
    accountType: "Payment Gateway",
    accountNumber: "KRVE-RZP-001",
    branch: "Digital Settlement",
    currency: "INR",
    currentBalance: 486500,
    availableBalance: 438500,
    reservedBalance: 48000,
    todayInflow: 318000,
    todayOutflow: 265000,
    status: "Active",
    lastReconciled: "21 Jul 2026 · 07:05 PM",
    owner: "E-commerce Finance",
  },
  {
    id: "BNK-006",
    name: "Founder Reserve Fund",
    bank: "HDFC Bank",
    accountType: "Investment Account",
    accountNumber: "XXXX 7410",
    branch: "Private Banking",
    currency: "INR",
    currentBalance: 2450000,
    availableBalance: 2450000,
    reservedBalance: 0,
    todayInflow: 0,
    todayOutflow: 0,
    status: "Active",
    lastReconciled: "18 Jul 2026 · 11:00 AM",
    owner: "Founder Office",
  },
  {
    id: "BNK-007",
    name: "Office Petty Cash",
    bank: "Internal Cash",
    accountType: "Petty Cash",
    accountNumber: "CASH-001",
    branch: "Founder Office",
    currency: "INR",
    currentBalance: 48500,
    availableBalance: 48500,
    reservedBalance: 0,
    todayInflow: 10000,
    todayOutflow: 6800,
    status: "Active",
    lastReconciled: "21 Jul 2026 · 06:00 PM",
    owner: "Administration",
  },
];

const transactions: TreasuryTransaction[] = [
  {
    id: "TRX-260721-001",
    date: "21 Jul 2026 · 07:02 PM",
    description: "Razorpay customer settlement",
    category: "Customer Collection",
    account: "KRVE Primary Current",
    type: "Credit",
    amount: 318000,
    status: "Completed",
  },
  {
    id: "TRX-260721-002",
    date: "21 Jul 2026 · 06:42 PM",
    description: "Premium fabric vendor payment",
    category: "Vendor Payment",
    account: "KRVE Operations Account",
    type: "Debit",
    amount: 174000,
    status: "Completed",
  },
  {
    id: "TRX-260721-003",
    date: "21 Jul 2026 · 05:18 PM",
    description: "Marketplace collection",
    category: "Sales Revenue",
    account: "KRVE Primary Current",
    type: "Credit",
    amount: 150000,
    status: "Completed",
  },
  {
    id: "TRX-260721-004",
    date: "21 Jul 2026 · 04:36 PM",
    description: "Warehouse equipment advance",
    category: "Capital Expenditure",
    account: "KRVE Primary Current",
    type: "Debit",
    amount: 111000,
    status: "Pending",
  },
  {
    id: "TRX-260721-005",
    date: "21 Jul 2026 · 02:15 PM",
    description: "Escrow customer refund",
    category: "Customer Refund",
    account: "Customer Escrow",
    type: "Debit",
    amount: 52000,
    status: "Completed",
  },
  {
    id: "TRX-260721-006",
    date: "21 Jul 2026 · 12:08 PM",
    description: "Corporate bulk order advance",
    category: "Customer Advance",
    account: "Customer Escrow",
    type: "Credit",
    amount: 96000,
    status: "Completed",
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
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getAccountStatusClass(status: AccountStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Restricted":
      return "bg-amber-50 text-amber-700";
    case "Frozen":
      return "bg-red-50 text-red-700";
  }
}

function getTransactionStatusClass(
  status: TreasuryTransaction["status"],
) {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    case "Failed":
      return "bg-red-50 text-red-700";
  }
}

export default function TreasuryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountTypeFilter, setAccountTypeFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAccount, setSelectedAccount] =
    useState<BankAccount | null>(null);

  const filteredAccounts = useMemo(() => {
    return bankAccounts.filter((account) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        account.name.toLowerCase().includes(query) ||
        account.bank.toLowerCase().includes(query) ||
        account.accountNumber.toLowerCase().includes(query) ||
        account.owner.toLowerCase().includes(query);

      const matchesType =
        accountTypeFilter === "All" ||
        account.accountType === accountTypeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        account.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, accountTypeFilter, statusFilter]);

  const totalCash = bankAccounts.reduce(
    (sum, account) => sum + account.currentBalance,
    0,
  );

  const availableCash = bankAccounts.reduce(
    (sum, account) => sum + account.availableBalance,
    0,
  );

  const reservedCash = bankAccounts.reduce(
    (sum, account) => sum + account.reservedBalance,
    0,
  );

  const todayInflows = bankAccounts.reduce(
    (sum, account) => sum + account.todayInflow,
    0,
  );

  const todayOutflows = bankAccounts.reduce(
    (sum, account) => sum + account.todayOutflow,
    0,
  );

  const netMovement = todayInflows - todayOutflows;
  const monthlyBurn = 1680000;
  const runwayMonths = availableCash / monthlyBurn;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#10233b]">
      <main className="mx-auto w-full max-w-[1900px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <section className="rounded-[30px] bg-[#10233b] p-5 text-white shadow-[0_24px_70px_rgba(15,35,59,0.16)] sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Link
                href="/finance"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-300 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Finance Command Center
              </Link>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                  <Landmark className="h-7 w-7" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      Treasury Live
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-300">
                      Real-Time Liquidity
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
                    Treasury & Cash Management
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-300">
                    Control enterprise cash positions, bank accounts,
                    settlements, payment exposure, liquidity and
                    financial runway.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  window.alert("Opening fund transfer workflow.")
                }
                className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
              >
                <ArrowRightLeft className="h-4 w-4" />
                Transfer Funds
              </button>

              <button
                type="button"
                onClick={() =>
                  window.alert("Opening bank account setup.")
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
                Add Account
              </button>

              <button
                type="button"
                onClick={() =>
                  window.alert("Treasury report exported.")
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              title: "Total Cash Position",
              value: formatCompactCurrency(totalCash),
              detail: `${bankAccounts.length} treasury accounts`,
              icon: WalletCards,
              iconClass: "bg-blue-50 text-blue-600",
            },
            {
              title: "Available Liquidity",
              value: formatCompactCurrency(availableCash),
              detail: "Immediately deployable",
              icon: CircleDollarSign,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Reserved Funds",
              value: formatCompactCurrency(reservedCash),
              detail: "Escrow and commitments",
              icon: LockKeyhole,
              iconClass: "bg-purple-50 text-purple-600",
            },
            {
              title: "Net Movement Today",
              value: formatCompactCurrency(netMovement),
              detail:
                netMovement >= 0
                  ? "Positive daily movement"
                  : "Negative daily movement",
              icon:
                netMovement >= 0 ? TrendingUp : TrendingDown,
              iconClass:
                netMovement >= 0
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600",
            },
            {
              title: "Cash Runway",
              value: `${runwayMonths.toFixed(1)} months`,
              detail: "Based on monthly burn",
              icon: Clock3,
              iconClass: "bg-amber-50 text-amber-600",
            },
          ].map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    card.iconClass,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-5 text-xs font-bold text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-black tracking-tight text-[#10233b]">
                  {card.value}
                </p>

                <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {card.detail}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Cash Position
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Daily Liquidity Movement
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Treasury inflows and outflows across all active
                  accounts.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert("Cash forecast regenerated.")
                }
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b]"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh Position
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600">
                    <ArrowDownLeft className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-emerald-700">
                    INFLOW
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold text-emerald-700">
                  Today’s Collections
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-700">
                  {formatCompactCurrency(todayInflows)}
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-red-600">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-red-700">
                    OUTFLOW
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold text-red-700">
                  Today’s Payments
                </p>

                <p className="mt-2 text-2xl font-black text-red-700">
                  {formatCompactCurrency(todayOutflows)}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600">
                    <IndianRupee className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-blue-700">
                    NET
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold text-blue-700">
                  Net Cash Movement
                </p>

                <p className="mt-2 text-2xl font-black text-blue-700">
                  {formatCompactCurrency(netMovement)}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#10233b]">
                    Available Cash Ratio
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Share of total treasury funds immediately
                    available for deployment.
                  </p>
                </div>

                <p className="text-2xl font-black text-[#10233b]">
                  {((availableCash / totalCash) * 100).toFixed(1)}%
                </p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#10233b]"
                  style={{
                    width: `${Math.min(
                      (availableCash / totalCash) * 100,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.16)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
              <Sparkles className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              KEOS Treasury Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight">
              Liquidity remains stable with a positive daily cash
              movement.
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              Idle funds in the founder reserve may be optimized while
              preserving the minimum operational cash buffer.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Liquidity score
                  </span>

                  <span className="text-sm font-black text-emerald-300">
                    93.4%
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Minimum reserve
                  </span>

                  <span className="text-sm font-black text-amber-300">
                    ₹28L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Idle investment cash
                  </span>

                  <span className="text-sm font-black text-blue-300">
                    ₹24.5L
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Opening AI treasury recommendations.",
                )
              }
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              <Sparkles className="h-4 w-4" />
              View AI Recommendations
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Banking Network
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Treasury Account Register
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monitor account balances, reserves, ownership and
                  reconciliation status.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-[320px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search bank or account..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <select
                  value={accountTypeFilter}
                  onChange={(event) =>
                    setAccountTypeFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Account Types</option>
                  <option value="Current Account">
                    Current Account
                  </option>
                  <option value="Salary Account">
                    Salary Account
                  </option>
                  <option value="Escrow Account">
                    Escrow Account
                  </option>
                  <option value="Payment Gateway">
                    Payment Gateway
                  </option>
                  <option value="Petty Cash">Petty Cash</option>
                  <option value="Investment Account">
                    Investment Account
                  </option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Frozen">Frozen</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  {[
                    "Account",
                    "Bank / Branch",
                    "Type",
                    "Account Number",
                    "Current Balance",
                    "Available",
                    "Reserved",
                    "Today Inflow",
                    "Today Outflow",
                    "Owner",
                    "Reconciled",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                          {account.accountType ===
                          "Payment Gateway" ? (
                            <CreditCard className="h-4 w-4" />
                          ) : account.accountType ===
                            "Petty Cash" ? (
                            <Banknote className="h-4 w-4" />
                          ) : (
                            <Landmark className="h-4 w-4" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            {account.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {account.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-slate-700">
                        {account.bank}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {account.branch}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {account.accountType}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {account.accountNumber}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {formatCompactCurrency(
                        account.currentBalance,
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-emerald-600">
                      {formatCompactCurrency(
                        account.availableBalance,
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-purple-600">
                      {formatCompactCurrency(
                        account.reservedBalance,
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-emerald-600">
                      +{formatCompactCurrency(account.todayInflow)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-red-600">
                      -{formatCompactCurrency(account.todayOutflow)}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {account.owner}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-xs font-black text-[#10233b]">
                        {account.lastReconciled}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          getAccountStatusClass(account.status),
                        ].join(" ")}
                      >
                        {account.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAccount(account)
                          }
                          className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAccounts.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      className="px-5 py-16 text-center"
                    >
                      <Search className="mx-auto h-8 w-8 text-slate-300" />

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No treasury accounts found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change the search query or selected filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Treasury Ledger
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Recent Cash Transactions
                </h2>
              </div>

              <FileSpreadsheet className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    {[
                      "Transaction",
                      "Description",
                      "Category",
                      "Account",
                      "Type",
                      "Amount",
                      "Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
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
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4">
                        <p className="text-xs font-black text-[#10233b]">
                          {transaction.id}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          {transaction.date}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-sm font-black text-slate-700">
                        {transaction.description}
                      </td>

                      <td className="px-4 py-4 text-sm font-bold text-slate-600">
                        {transaction.category}
                      </td>

                      <td className="px-4 py-4 text-sm font-bold text-slate-600">
                        {transaction.account}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                            transaction.type === "Credit"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700",
                          ].join(" ")}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td
                        className={[
                          "px-4 py-4 text-sm font-black",
                          transaction.type === "Credit"
                            ? "text-emerald-600"
                            : "text-red-600",
                        ].join(" ")}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}
                        {formatCompactCurrency(transaction.amount)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                            getTransactionStatusClass(
                              transaction.status,
                            ),
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Treasury Calendar
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Upcoming Obligations
                </h2>
              </div>

              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: "Fabric Vendor Payment",
                  date: "22 Jul 2026",
                  amount: 285000,
                  risk: "High",
                },
                {
                  title: "GST Liability",
                  date: "24 Jul 2026",
                  amount: 164000,
                  risk: "Medium",
                },
                {
                  title: "Employee Payroll",
                  date: "31 Jul 2026",
                  amount: 928000,
                  risk: "Normal",
                },
                {
                  title: "Warehouse Rent",
                  date: "01 Aug 2026",
                  amount: 125000,
                  risk: "Normal",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {item.title}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {item.date}
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                        item.risk === "High"
                          ? "bg-red-50 text-red-700"
                          : item.risk === "Medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700",
                      ].join(" ")}
                    >
                      {item.risk}
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-black text-[#10233b]">
                    {formatCompactCurrency(item.amount)}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert("Opening treasury calendar.")
              }
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b] transition hover:border-[#10233b]"
            >
              View Full Calendar
              <ChevronRight className="h-4 w-4" />
            </button>
          </aside>
        </section>

                <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  AI Cash Forecast
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  6-Month Liquidity Forecast
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Projected opening balance, inflows, outflows and
                  monthly closing cash.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    window.alert(
                      "Treasury forecast assumptions refreshed.",
                    )
                  }
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b]"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh Forecast
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.alert(
                      "Cash forecast exported successfully.",
                    )
                  }
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-3 text-xs font-black text-white transition hover:bg-[#183653]"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    {[
                      "Month",
                      "Opening Cash",
                      "Expected Inflows",
                      "Expected Outflows",
                      "Net Movement",
                      "Closing Cash",
                      "Liquidity Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      month: "August 2026",
                      opening: 9667700,
                      inflow: 4380000,
                      outflow: 3610000,
                    },
                    {
                      month: "September 2026",
                      opening: 10437700,
                      inflow: 4720000,
                      outflow: 3890000,
                    },
                    {
                      month: "October 2026",
                      opening: 11267700,
                      inflow: 5180000,
                      outflow: 4210000,
                    },
                    {
                      month: "November 2026",
                      opening: 12237700,
                      inflow: 5640000,
                      outflow: 4820000,
                    },
                    {
                      month: "December 2026",
                      opening: 13057700,
                      inflow: 6890000,
                      outflow: 5360000,
                    },
                    {
                      month: "January 2027",
                      opening: 14587700,
                      inflow: 4970000,
                      outflow: 4430000,
                    },
                  ].map((forecast) => {
                    const net =
                      forecast.inflow - forecast.outflow;
                    const closing =
                      forecast.opening + net;

                    const status =
                      closing >= 12000000
                        ? "Strong"
                        : closing >= 9000000
                          ? "Stable"
                          : "Monitor";

                    return (
                      <tr
                        key={forecast.month}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-black text-[#10233b]">
                          {forecast.month}
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-slate-700">
                          {formatCompactCurrency(
                            forecast.opening,
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm font-black text-emerald-600">
                          +
                          {formatCompactCurrency(
                            forecast.inflow,
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm font-black text-red-600">
                          -
                          {formatCompactCurrency(
                            forecast.outflow,
                          )}
                        </td>

                        <td
                          className={[
                            "px-4 py-4 text-sm font-black",
                            net >= 0
                              ? "text-emerald-600"
                              : "text-red-600",
                          ].join(" ")}
                        >
                          {net >= 0 ? "+" : ""}
                          {formatCompactCurrency(net)}
                        </td>

                        <td className="px-4 py-4 text-sm font-black text-[#10233b]">
                          {formatCompactCurrency(closing)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={[
                              "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                              status === "Strong"
                                ? "bg-emerald-50 text-emerald-700"
                                : status === "Stable"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700",
                            ].join(" ")}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Projected 6-Month Inflows
                </p>

                <p className="mt-2 text-xl font-black text-emerald-600">
                  ₹3.18Cr
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Sales, collections and advances
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Projected 6-Month Outflows
                </p>

                <p className="mt-2 text-xl font-black text-red-600">
                  ₹2.63Cr
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Operating and capital expenditure
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Forecasted Net Increase
                </p>

                <p className="mt-2 text-xl font-black text-blue-600">
                  ₹55L
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Before investment deployment
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Liquidity Control
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Treasury Ratios
                </h2>
              </div>

              <CircleDollarSign className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Current Ratio",
                  value: "2.48",
                  benchmark: "Target ≥ 1.50",
                  percentage: 88,
                  status: "Healthy",
                },
                {
                  label: "Quick Ratio",
                  value: "1.82",
                  benchmark: "Target ≥ 1.00",
                  percentage: 82,
                  status: "Healthy",
                },
                {
                  label: "Cash Coverage",
                  value: "4.7x",
                  benchmark: "Target ≥ 3.00x",
                  percentage: 78,
                  status: "Strong",
                },
                {
                  label: "Operating Cash Ratio",
                  value: "1.36",
                  benchmark: "Target ≥ 1.00",
                  percentage: 68,
                  status: "Stable",
                },
              ].map((ratio) => (
                <div
                  key={ratio.label}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        {ratio.label}
                      </p>

                      <p className="mt-1 text-2xl font-black text-[#10233b]">
                        {ratio.value}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase text-emerald-700">
                      {ratio.status}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#10233b]"
                      style={{
                        width: `${ratio.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {ratio.benchmark}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                <div>
                  <p className="text-sm font-black text-emerald-800">
                    Liquidity risk is low
                  </p>

                  <p className="mt-1 text-xs font-medium leading-5 text-emerald-700">
                    Available cash can cover approximately 4.7 months
                    of projected operating obligations.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Accounts Receivable
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Customer Collection Aging
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monitor customer dues and delayed collections.
                </p>
              </div>

              <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "0–30 Days",
                  amount: 1280000,
                  count: 18,
                  className: "text-emerald-600",
                },
                {
                  label: "31–60 Days",
                  amount: 620000,
                  count: 9,
                  className: "text-blue-600",
                },
                {
                  label: "61–90 Days",
                  amount: 315000,
                  count: 5,
                  className: "text-amber-600",
                },
                {
                  label: "90+ Days",
                  amount: 148000,
                  count: 3,
                  className: "text-red-600",
                },
              ].map((bucket) => (
                <div
                  key={bucket.label}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {bucket.label}
                  </p>

                  <p
                    className={[
                      "mt-2 text-xl font-black",
                      bucket.className,
                    ].join(" ")}
                  >
                    {formatCompactCurrency(bucket.amount)}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {bucket.count} invoices
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  customer: "Urban Vogue Retail Pvt. Ltd.",
                  invoice: "INV-2026-1482",
                  due: "18 Jul 2026",
                  amount: 248000,
                  overdue: "3 days overdue",
                  risk: "Medium",
                },
                {
                  customer: "Luxury Avenue Marketplace",
                  invoice: "INV-2026-1398",
                  due: "02 Jul 2026",
                  amount: 148000,
                  overdue: "19 days overdue",
                  risk: "High",
                },
                {
                  customer: "Fashion District India",
                  invoice: "INV-2026-1521",
                  due: "24 Jul 2026",
                  amount: 186000,
                  overdue: "Due in 3 days",
                  risk: "Normal",
                },
              ].map((invoice) => (
                <div
                  key={invoice.invoice}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-[#10233b]">
                          {invoice.customer}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                            invoice.risk === "High"
                              ? "bg-red-50 text-red-700"
                              : invoice.risk === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700",
                          ].join(" ")}
                        >
                          {invoice.risk}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {invoice.invoice} · Due {invoice.due}
                      </p>

                      <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {invoice.overdue}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-lg font-black text-[#10233b]">
                        {formatCompactCurrency(invoice.amount)}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Collection reminder sent for ${invoice.invoice}.`,
                          )
                        }
                        className="flex h-9 items-center gap-2 rounded-xl bg-[#10233b] px-3 text-xs font-black text-white"
                      >
                        Send Reminder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Opening complete receivable management.",
                )
              }
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b] transition hover:border-[#10233b]"
            >
              Open Receivables
              <ChevronRight className="h-4 w-4" />
            </button>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Accounts Payable
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Vendor Payment Exposure
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Review vendor obligations and upcoming payments.
                </p>
              </div>

              <ArrowUpRight className="h-5 w-5 text-red-600" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Due Today",
                  amount: 285000,
                  count: 2,
                  className: "text-red-600",
                },
                {
                  label: "This Week",
                  amount: 742000,
                  count: 7,
                  className: "text-amber-600",
                },
                {
                  label: "Next 30 Days",
                  amount: 1860000,
                  count: 16,
                  className: "text-blue-600",
                },
                {
                  label: "Overdue",
                  amount: 86000,
                  count: 1,
                  className: "text-red-600",
                },
              ].map((bucket) => (
                <div
                  key={bucket.label}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {bucket.label}
                  </p>

                  <p
                    className={[
                      "mt-2 text-xl font-black",
                      bucket.className,
                    ].join(" ")}
                  >
                    {formatCompactCurrency(bucket.amount)}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {bucket.count} bills
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  vendor: "Imperial Textiles Pvt. Ltd.",
                  bill: "BILL-2026-0871",
                  due: "22 Jul 2026",
                  amount: 285000,
                  status: "Approval Required",
                  risk: "High",
                },
                {
                  vendor: "Cloud Infrastructure India",
                  bill: "BILL-2026-0912",
                  due: "25 Jul 2026",
                  amount: 118000,
                  status: "Scheduled",
                  risk: "Normal",
                },
                {
                  vendor: "KRVE Logistics Partner",
                  bill: "BILL-2026-0898",
                  due: "26 Jul 2026",
                  amount: 164000,
                  status: "Pending Review",
                  risk: "Medium",
                },
              ].map((bill) => (
                <div
                  key={bill.bill}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-[#10233b]">
                          {bill.vendor}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                            bill.risk === "High"
                              ? "bg-red-50 text-red-700"
                              : bill.risk === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700",
                          ].join(" ")}
                        >
                          {bill.risk}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {bill.bill} · Due {bill.due}
                      </p>

                      <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {bill.status}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-lg font-black text-[#10233b]">
                        {formatCompactCurrency(bill.amount)}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          const approved = window.confirm(
                            `Approve payment of ${formatCurrency(
                              bill.amount,
                            )} for ${bill.bill}?`,
                          );

                          if (approved) {
                            window.alert(
                              `${bill.bill} approved and sent to payment queue.`,
                            );
                          }
                        }}
                        className="flex h-9 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-black text-white transition hover:bg-emerald-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Opening complete payable management.",
                )
              }
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b] transition hover:border-[#10233b]"
            >
              Open Payables
              <ChevronRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.3fr)_minmax(380px,0.7fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Payment Governance
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Payment Approval Queue
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Founder and treasury approvals for controlled
                  enterprise payments.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Opening complete payment approval workspace.",
                  )
                }
                className="flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white"
              >
                View Approval Center
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  id: "PAY-2026-00781",
                  beneficiary: "Imperial Textiles Pvt. Ltd.",
                  purpose: "Premium fabric procurement",
                  amount: 285000,
                  account: "KRVE Operations Account",
                  requester: "Procurement Department",
                  level: "Founder Approval",
                  risk: "High",
                },
                {
                  id: "PAY-2026-00782",
                  beneficiary: "Cloud Infrastructure India",
                  purpose: "Cloud hosting and AI infrastructure",
                  amount: 118000,
                  account: "KRVE Primary Current",
                  requester: "Technology Department",
                  level: "Treasury Approval",
                  risk: "Medium",
                },
                {
                  id: "PAY-2026-00783",
                  beneficiary: "Studio Lease Management",
                  purpose: "Monthly flagship studio lease",
                  amount: 125000,
                  account: "KRVE Operations Account",
                  requester: "Administration",
                  level: "Treasury Approval",
                  risk: "Normal",
                },
              ].map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black text-[#10233b]">
                          {payment.beneficiary}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                            payment.risk === "High"
                              ? "bg-red-50 text-red-700"
                              : payment.risk === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700",
                          ].join(" ")}
                        >
                          {payment.risk}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {payment.id} · {payment.purpose}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>{payment.account}</span>
                        <span>{payment.requester}</span>
                        <span>{payment.level}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <p className="mr-2 text-lg font-black text-[#10233b]">
                        {formatCompactCurrency(payment.amount)}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `${payment.id} has been rejected.`,
                          )
                        }
                        className="flex h-9 items-center gap-2 rounded-xl border border-red-200 px-3 text-xs font-black text-red-600 transition hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const confirmed = window.confirm(
                            `Approve ${payment.id} for ${formatCurrency(
                              payment.amount,
                            )}?`,
                          );

                          if (confirmed) {
                            window.alert(
                              `${payment.id} approved successfully.`,
                            );
                          }
                        }}
                        className="flex h-9 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-black text-white transition hover:bg-emerald-700"
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

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.16)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                  Founder Controls
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  Treasury Command
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  High-authority controls for liquidity protection and
                  emergency financial operations.
                </p>
              </div>

              <ShieldCheck className="h-6 w-6 text-amber-400" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-1">
              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Opening founder payment approval center.",
                  )
                }
                className="flex h-14 items-center justify-between rounded-2xl bg-white/5 px-4 text-left transition hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-black">
                    Approve Payments
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Review high-value payments
                  </p>
                </div>

                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Freeze all non-essential treasury payments?",
                  );

                  if (confirmed) {
                    window.alert(
                      "Non-essential payment freeze activated.",
                    );
                  }
                }}
                className="flex h-14 items-center justify-between rounded-2xl bg-white/5 px-4 text-left transition hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-black">
                    Freeze Payments
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Stop non-essential outflows
                  </p>
                </div>

                <LockKeyhole className="h-4 w-4 text-red-400" />
              </button>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Opening emergency transfer workflow.",
                  )
                }
                className="flex h-14 items-center justify-between rounded-2xl bg-white/5 px-4 text-left transition hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-black">
                    Emergency Transfer
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Transfer protected funds
                  </p>
                </div>

                <ArrowRightLeft className="h-4 w-4 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Lock the complete treasury workspace?",
                  );

                  if (confirmed) {
                    window.alert(
                      "Treasury workspace locked for review.",
                    );
                  }
                }}
                className="flex h-14 items-center justify-between rounded-2xl bg-white/5 px-4 text-left transition hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-black">
                    Lock Treasury
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Restrict financial access
                  </p>
                </div>

                <ShieldCheck className="h-4 w-4 text-blue-400" />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Founder treasury report generated.",
                )
              }
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#10233b]"
            >
              <Download className="h-4 w-4" />
              Generate Founder Report
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                KEOS AI Recommendations
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Treasury Optimization Actions
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                AI-generated actions based on current liquidity,
                collections and payment obligations.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Treasury AI analysis regenerated.",
                )
              }
              className="flex h-10 items-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white"
            >
              <Sparkles className="h-4 w-4" />
              Regenerate Analysis
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Optimize Idle Cash",
                description:
                  "Move ₹15L from the reserve account into a short-term liquid investment while maintaining the minimum cash buffer.",
                impact: "+₹1.1L annual return",
                icon: TrendingUp,
                iconClass: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "Accelerate Collection",
                description:
                  "Prioritize recovery of the ₹1.48L invoice outstanding for more than 90 days.",
                impact: "Improve cash conversion",
                icon: ArrowDownLeft,
                iconClass: "bg-blue-50 text-blue-600",
              },
              {
                title: "Reschedule Vendor Payment",
                description:
                  "The ₹1.18L cloud infrastructure bill may be moved by two days without operational penalty.",
                impact: "Protect weekly liquidity",
                icon: CalendarDays,
                iconClass: "bg-amber-50 text-amber-600",
              },
              {
                title: "Maintain Reserve Floor",
                description:
                  "Keep at least ₹28L immediately available to protect payroll, tax and essential vendor obligations.",
                impact: "Reduce liquidity risk",
                icon: ShieldCheck,
                iconClass: "bg-purple-50 text-purple-600",
              },
            ].map((recommendation) => {
              const Icon = recommendation.icon;

              return (
                <article
                  key={recommendation.title}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      recommendation.iconClass,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-[#10233b]">
                    {recommendation.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                    {recommendation.description}
                  </p>

                  <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-[#d02b3f]">
                    {recommendation.impact}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `${recommendation.title} workflow opened.`,
                      )
                    }
                    className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-slate-50 text-xs font-black text-[#10233b] transition hover:bg-[#10233b] hover:text-white"
                  >
                    Review Action
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() =>
              window.alert("Opening fund transfer workspace.")
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ArrowRightLeft className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Fund Transfer
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Move funds between accounts
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Opening bank reconciliation workspace.",
              )
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <RefreshCcw className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Reconciliation
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Match bank transactions
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert("Opening treasury calendar.")
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Treasury Calendar
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  View upcoming obligations
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Complete treasury report exported.",
              )
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <FileSpreadsheet className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Treasury Report
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Export financial position
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Treasury & Cash Management</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Treasury systems operational</span>
            <span>·</span>
            <span>{bankAccounts.length} connected accounts</span>
            <span>·</span>
            <span>
              {formatCompactCurrency(availableCash)} available
            </span>
          </div>
        </footer>

        {selectedAccount && (
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close account details"
              onClick={() => setSelectedAccount(null)}
              className="absolute inset-0 bg-[#07111f]/65 backdrop-blur-[3px]"
            />

            <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f4f6f8] shadow-[-30px_0_80px_rgba(15,35,59,0.24)] sm:max-w-[760px]">
              <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      {selectedAccount.accountType ===
                      "Payment Gateway" ? (
                        <CreditCard className="h-5 w-5" />
                      ) : selectedAccount.accountType ===
                        "Petty Cash" ? (
                        <Banknote className="h-5 w-5" />
                      ) : (
                        <Landmark className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                          {selectedAccount.id}
                        </span>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
                            getAccountStatusClass(
                              selectedAccount.status,
                            ),
                          ].join(" ")}
                        >
                          {selectedAccount.status}
                        </span>
                      </div>

                      <h2 className="mt-2 truncate text-xl font-black text-[#10233b] sm:text-2xl">
                        {selectedAccount.name}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {selectedAccount.bank} ·{" "}
                        {selectedAccount.accountType}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAccount(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-7">
                <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_20px_60px_rgba(15,35,59,0.18)] sm:p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                    Current Account Balance
                  </p>

                  <p className="mt-3 text-4xl font-black tracking-tight">
                    {formatCompactCurrency(
                      selectedAccount.currentBalance,
                    )}
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-300">
                    {formatCurrency(
                      selectedAccount.currentBalance,
                    )}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Available
                      </p>

                      <p className="mt-2 text-lg font-black text-emerald-300">
                        {formatCompactCurrency(
                          selectedAccount.availableBalance,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Reserved
                      </p>

                      <p className="mt-2 text-lg font-black text-purple-300">
                        {formatCompactCurrency(
                          selectedAccount.reservedBalance,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Net Today
                      </p>

                      <p
                        className={[
                          "mt-2 text-lg font-black",
                          selectedAccount.todayInflow -
                            selectedAccount.todayOutflow >=
                          0
                            ? "text-emerald-300"
                            : "text-red-300",
                        ].join(" ")}
                      >
                        {formatCompactCurrency(
                          selectedAccount.todayInflow -
                            selectedAccount.todayOutflow,
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ArrowDownLeft className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Today’s Inflow
                    </p>

                    <p className="mt-1 text-2xl font-black text-emerald-600">
                      {formatCompactCurrency(
                        selectedAccount.todayInflow,
                      )}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Today’s Outflow
                    </p>

                    <p className="mt-1 text-2xl font-black text-red-600">
                      {formatCompactCurrency(
                        selectedAccount.todayOutflow,
                      )}
                    </p>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Account Information
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Banking, ownership and reconciliation details
                      </p>
                    </div>

                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        label: "Bank / Institution",
                        value: selectedAccount.bank,
                      },
                      {
                        label: "Account Number",
                        value: selectedAccount.accountNumber,
                      },
                      {
                        label: "Account Type",
                        value: selectedAccount.accountType,
                      },
                      {
                        label: "Currency",
                        value: selectedAccount.currency,
                      },
                      {
                        label: "Branch",
                        value: selectedAccount.branch,
                      },
                      {
                        label: "Account Owner",
                        value: selectedAccount.owner,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-slate-50 p-4"
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

                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Last Reconciled
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                      <p className="text-sm font-black text-[#10233b]">
                        {selectedAccount.lastReconciled}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Recent Account Transactions
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Latest transactions linked to this treasury
                        account
                      </p>
                    </div>

                    <FileSpreadsheet className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 space-y-3">
                    {transactions
                      .filter(
                        (transaction) =>
                          transaction.account ===
                          selectedAccount.name,
                      )
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-black text-[#10233b]">
                                {transaction.description}
                              </p>

                              <p className="mt-1 text-xs font-medium text-slate-500">
                                {transaction.id} ·{" "}
                                {transaction.date}
                              </p>

                              <span
                                className={[
                                  "mt-2 inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                                  getTransactionStatusClass(
                                    transaction.status,
                                  ),
                                ].join(" ")}
                              >
                                {transaction.status}
                              </span>
                            </div>

                            <p
                              className={[
                                "text-lg font-black",
                                transaction.type === "Credit"
                                  ? "text-emerald-600"
                                  : "text-red-600",
                              ].join(" ")}
                            >
                              {transaction.type === "Credit"
                                ? "+"
                                : "-"}
                              {formatCompactCurrency(
                                transaction.amount,
                              )}
                            </p>
                          </div>
                        </div>
                      ))}

                    {transactions.filter(
                      (transaction) =>
                        transaction.account ===
                        selectedAccount.name,
                    ).length === 0 && (
                      <div className="rounded-2xl bg-slate-50 p-5 text-center">
                        <FileSpreadsheet className="mx-auto h-7 w-7 text-slate-300" />

                        <p className="mt-3 text-sm font-black text-[#10233b]">
                          No recent transactions
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          No transaction activity is available for
                          this account.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                        KEOS Account Intelligence
                      </p>

                      <h3 className="mt-2 text-base font-black text-[#10233b]">
                        Account Risk Analysis
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Liquidity Position
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {(
                              (selectedAccount.availableBalance /
                                selectedAccount.currentBalance) *
                              100
                            ).toFixed(1)}
                            % of the account balance is immediately
                            available for treasury deployment.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Control Recommendation
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedAccount.status === "Restricted"
                              ? "Review release conditions before attempting fund transfers or external payments."
                              : selectedAccount.reservedBalance >
                                  200000
                                ? "Review the reserved balance and release unused commitments after approval."
                                : "Continue daily reconciliation and normal treasury monitoring."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `AI treasury report generated for ${selectedAccount.id}.`,
                      )
                    }
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Account Analysis
                  </button>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="text-base font-black text-[#10233b]">
                    Account Actions
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Execute authorized treasury operations
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening transfer from ${selectedAccount.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b]"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Transfer Funds
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Move available balance
                        </p>
                      </div>

                      <ArrowRightLeft className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Reconciliation started for ${selectedAccount.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b]"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Reconcile Account
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Match bank records
                        </p>
                      </div>

                      <RefreshCcw className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Statement exported for ${selectedAccount.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b]"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Export Statement
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Download transaction history
                        </p>
                      </div>

                      <Download className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Freeze ${selectedAccount.name}?`,
                        );

                        if (confirmed) {
                          window.alert(
                            `${selectedAccount.name} submitted for freeze approval.`,
                          );
                        }
                      }}
                      className="flex h-14 items-center justify-between rounded-2xl border border-red-200 px-4 text-left transition hover:bg-red-50"
                    >
                      <div>
                        <p className="text-xs font-black text-red-600">
                          Freeze Account
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Restrict account operations
                        </p>
                      </div>

                      <LockKeyhole className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </section>

                <div className="flex flex-col gap-3 pb-5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedAccount(null)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-black text-[#10233b]"
                  >
                    <X className="h-4 w-4" />
                    Close Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Opening full workspace for ${selectedAccount.id}.`,
                      )
                    }
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white"
                  >
                    Open Account Workspace
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