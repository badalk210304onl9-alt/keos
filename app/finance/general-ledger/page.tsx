"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  IndianRupee,
  Landmark,
  MoreHorizontal,
  Plus,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

type LedgerStatus = "Posted" | "Draft" | "Reversed";

type LedgerEntry = {
  id: number;
  journalNumber: string;
  date: string;
  accountCode: string;
  accountName: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  runningBalance: number;
  department: string;
  costCenter: string;
  createdBy: string;
  status: LedgerStatus;
};

const ledgerEntries: LedgerEntry[] = [
  {
    id: 1,
    journalNumber: "JV-2026-00481",
    date: "22 Jul 2026",
    accountCode: "110101",
    accountName: "HDFC Bank Current Account",
    description:
      "Customer payment received against sales invoice INV-2026-1142.",
    reference: "UTR-HDFC-982341",
    debit: 485000,
    credit: 0,
    runningBalance: 5250000,
    department: "Finance",
    costCenter: "CC-FINANCE",
    createdBy: "Badal Kumar",
    status: "Posted",
  },
  {
    id: 2,
    journalNumber: "JV-2026-00480",
    date: "22 Jul 2026",
    accountCode: "120101",
    accountName: "Trade Receivables",
    description:
      "Settlement received from Maison Luxe Retail against outstanding invoice.",
    reference: "INV-2026-1142",
    debit: 0,
    credit: 485000,
    runningBalance: 4860000,
    department: "Sales",
    costCenter: "CC-SALES",
    createdBy: "Badal Kumar",
    status: "Posted",
  },
  {
    id: 3,
    journalNumber: "JV-2026-00479",
    date: "21 Jul 2026",
    accountCode: "510201",
    accountName: "Advertising and Marketing",
    description:
      "Meta advertising campaign expense recorded for July 2026.",
    reference: "META-JUL-8821",
    debit: 225000,
    credit: 0,
    runningBalance: 1225000,
    department: "Marketing",
    costCenter: "CC-MARKETING",
    createdBy: "Riya Kapoor",
    status: "Posted",
  },
  {
    id: 4,
    journalNumber: "JV-2026-00478",
    date: "21 Jul 2026",
    accountCode: "210101",
    accountName: "Trade Payables",
    description:
      "Vendor invoice booked for premium textile material procurement.",
    reference: "PTPL-INV-7741",
    debit: 0,
    credit: 675000,
    runningBalance: 3525000,
    department: "Procurement",
    costCenter: "CC-PROCUREMENT",
    createdBy: "Neha Sharma",
    status: "Posted",
  },
  {
    id: 5,
    journalNumber: "JV-2026-00477",
    date: "20 Jul 2026",
    accountCode: "130101",
    accountName: "Inventory – Finished Goods",
    description:
      "Inventory capitalization for completed KRVE production batch.",
    reference: "BATCH-KRVE-0720",
    debit: 820000,
    credit: 0,
    runningBalance: 4140000,
    department: "Operations",
    costCenter: "CC-OPERATIONS",
    createdBy: "Arjun Mehta",
    status: "Posted",
  },
  {
    id: 6,
    journalNumber: "JV-2026-00476",
    date: "20 Jul 2026",
    accountCode: "410101",
    accountName: "Product Sales Revenue",
    description:
      "Online product sales recognized from the daily store settlement.",
    reference: "SHOP-SETTLEMENT-207",
    debit: 0,
    credit: 1245000,
    runningBalance: 10950000,
    department: "Sales",
    costCenter: "CC-E-COMMERCE",
    createdBy: "System",
    status: "Posted",
  },
  {
    id: 7,
    journalNumber: "JV-2026-00475",
    date: "19 Jul 2026",
    accountCode: "510301",
    accountName: "Technology and Software",
    description:
      "Cloud infrastructure and enterprise platform subscription charges.",
    reference: "AWS-JUL-2026",
    debit: 178500,
    credit: 0,
    runningBalance: 740000,
    department: "Technology",
    costCenter: "CC-TECHNOLOGY",
    createdBy: "System",
    status: "Posted",
  },
  {
    id: 8,
    journalNumber: "JV-2026-00474",
    date: "19 Jul 2026",
    accountCode: "110102",
    accountName: "ICICI Bank Current Account",
    description:
      "Vendor payment completed for packaging material procurement.",
    reference: "UTR-ICICI-779118",
    debit: 0,
    credit: 228500,
    runningBalance: 3185000,
    department: "Finance",
    costCenter: "CC-FINANCE",
    createdBy: "Badal Kumar",
    status: "Posted",
  },
  {
    id: 9,
    journalNumber: "JV-2026-00473",
    date: "18 Jul 2026",
    accountCode: "520101",
    accountName: "Employee Cost",
    description:
      "Monthly employee payroll accrual recorded for July 2026.",
    reference: "PAYROLL-JUL-2026",
    debit: 1540000,
    credit: 0,
    runningBalance: 1540000,
    department: "Human Resources",
    costCenter: "CC-HR",
    createdBy: "System",
    status: "Draft",
  },
  {
    id: 10,
    journalNumber: "JV-2026-00472",
    date: "18 Jul 2026",
    accountCode: "220101",
    accountName: "Salary Payable",
    description:
      "Monthly salary payable provision created for July 2026.",
    reference: "PAYROLL-JUL-2026",
    debit: 0,
    credit: 1540000,
    runningBalance: 1540000,
    department: "Human Resources",
    costCenter: "CC-HR",
    createdBy: "System",
    status: "Draft",
  },
  {
    id: 11,
    journalNumber: "JV-2026-00471",
    date: "17 Jul 2026",
    accountCode: "510401",
    accountName: "Rent and Administration",
    description:
      "Corporate office rent expense recognized for July 2026.",
    reference: "RENT-JUL-2026",
    debit: 325000,
    credit: 0,
    runningBalance: 720000,
    department: "Administration",
    costCenter: "CC-ADMIN",
    createdBy: "Neha Sharma",
    status: "Posted",
  },
  {
    id: 12,
    journalNumber: "JV-2026-00470",
    date: "17 Jul 2026",
    accountCode: "510499",
    accountName: "Other Administrative Expense",
    description:
      "Reversal of duplicate administrative office supply expense.",
    reference: "REV-JV-00412",
    debit: 0,
    credit: 42500,
    runningBalance: 117500,
    department: "Administration",
    costCenter: "CC-ADMIN",
    createdBy: "Badal Kumar",
    status: "Reversed",
  },
  {
    id: 13,
    journalNumber: "JV-2026-00469",
    date: "16 Jul 2026",
    accountCode: "140101",
    accountName: "Input GST Receivable",
    description:
      "Input GST credit recognized on eligible vendor procurement.",
    reference: "GST-IN-JUL-419",
    debit: 98500,
    credit: 0,
    runningBalance: 584000,
    department: "Finance",
    costCenter: "CC-TAXATION",
    createdBy: "Badal Kumar",
    status: "Posted",
  },
  {
    id: 14,
    journalNumber: "JV-2026-00468",
    date: "16 Jul 2026",
    accountCode: "230101",
    accountName: "Output GST Payable",
    description:
      "Output GST liability recorded for online sales transactions.",
    reference: "GST-OUT-JUL-610",
    debit: 0,
    credit: 224100,
    runningBalance: 786500,
    department: "Finance",
    costCenter: "CC-TAXATION",
    createdBy: "System",
    status: "Posted",
  },
  {
    id: 15,
    journalNumber: "JV-2026-00467",
    date: "15 Jul 2026",
    accountCode: "510501",
    accountName: "Logistics and Freight",
    description:
      "Outbound freight and delivery expense for customer orders.",
    reference: "SHIP-JUL-552",
    debit: 146000,
    credit: 0,
    runningBalance: 642500,
    department: "Logistics",
    costCenter: "CC-LOGISTICS",
    createdBy: "Arjun Mehta",
    status: "Posted",
  },
  {
    id: 16,
    journalNumber: "JV-2026-00466",
    date: "15 Jul 2026",
    accountCode: "110101",
    accountName: "HDFC Bank Current Account",
    description:
      "Payment processed against logistics service provider invoice.",
    reference: "UTR-HDFC-672810",
    debit: 0,
    credit: 146000,
    runningBalance: 4765000,
    department: "Finance",
    costCenter: "CC-FINANCE",
    createdBy: "Badal Kumar",
    status: "Posted",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatCompactCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const statusStyles: Record<LedgerStatus, string> = {
  Posted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Draft: "bg-amber-50 text-amber-700 ring-amber-200",
  Reversed: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function GeneralLedgerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState("All Accounts");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [statusFilter, setStatusFilter] = useState<
    "All Statuses" | LedgerStatus
  >("All Statuses");
  const [periodFilter, setPeriodFilter] =
    useState("This Financial Year");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const itemsPerPage = 8;

  const accountOptions = useMemo(
    () => [
      "All Accounts",
      ...Array.from(
        new Set(ledgerEntries.map((entry) => entry.accountName)),
      ),
    ],
    [],
  );

  const departmentOptions = useMemo(
    () => [
      "All Departments",
      ...Array.from(
        new Set(ledgerEntries.map((entry) => entry.department)),
      ),
    ],
    [],
  );

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ledgerEntries.filter((entry) => {
      const matchesSearch =
        query.length === 0 ||
        entry.journalNumber.toLowerCase().includes(query) ||
        entry.accountCode.toLowerCase().includes(query) ||
        entry.accountName.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        entry.reference.toLowerCase().includes(query) ||
        entry.department.toLowerCase().includes(query) ||
        entry.costCenter.toLowerCase().includes(query);

      const matchesAccount =
        accountFilter === "All Accounts" ||
        entry.accountName === accountFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        entry.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        entry.status === statusFilter;

      return (
        matchesSearch &&
        matchesAccount &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    accountFilter,
    departmentFilter,
    searchQuery,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / itemsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEntries = filteredEntries.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  const totalDebit = filteredEntries.reduce(
    (sum, entry) => sum + entry.debit,
    0,
  );

  const totalCredit = filteredEntries.reduce(
    (sum, entry) => sum + entry.credit,
    0,
  );

  const netMovement = totalDebit - totalCredit;

  const postedCount = ledgerEntries.filter(
    (entry) => entry.status === "Posted",
  ).length;

  const draftCount = ledgerEntries.filter(
    (entry) => entry.status === "Draft",
  ).length;

  const reversedCount = ledgerEntries.filter(
    (entry) => entry.status === "Reversed",
  ).length;

  const accountCount = new Set(
    ledgerEntries.map((entry) => entry.accountCode),
  ).size;

  const resetFilters = () => {
    setSearchQuery("");
    setAccountFilter("All Accounts");
    setDepartmentFilter("All Departments");
    setStatusFilter("All Statuses");
    setPeriodFilter("This Financial Year");
    setCurrentPage(1);
  };

  const refreshLedger = () => {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  const exportLedger = () => {
    const headers = [
      "Journal Number",
      "Date",
      "Account Code",
      "Account Name",
      "Description",
      "Reference",
      "Debit",
      "Credit",
      "Running Balance",
      "Department",
      "Cost Center",
      "Created By",
      "Status",
    ];

    const rows = filteredEntries.map((entry) => [
      entry.journalNumber,
      entry.date,
      entry.accountCode,
      entry.accountName,
      entry.description,
      entry.reference,
      entry.debit,
      entry.credit,
      entry.runningBalance,
      entry.department,
      entry.costCenter,
      entry.createdBy,
      entry.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (cell) =>
              `"${String(cell).replaceAll('"', '""')}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-general-ledger.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f4f6f9] text-[#10233b]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1700px] flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              aria-label="Back to finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#10233b] transition hover:border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#c72c41]">
                Finance ERP · Core Accounting
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                General Ledger
              </h1>

              <p className="mt-1 max-w-2xl text-sm font-medium text-slate-500">
                Review account movements, posted journals, debit and
                credit balances, cost-center allocations and financial
                control status.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black transition hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>

            <button
              type="button"
              onClick={exportLedger}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>

            <Link
              href="/finance/journal-entries/create"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              New Journal Entry
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1700px] space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <MetricCard
            title="Total Debit"
            value={formatCompactCurrency(totalDebit)}
            subtitle="Current ledger view"
            icon={<ArrowDownLeft className="h-5 w-5" />}
            iconStyle="bg-blue-50 text-blue-700"
          />

          <MetricCard
            title="Total Credit"
            value={formatCompactCurrency(totalCredit)}
            subtitle="Current ledger view"
            icon={<ArrowUpRight className="h-5 w-5" />}
            iconStyle="bg-violet-50 text-violet-700"
          />

          <MetricCard
            title="Net Movement"
            value={formatCompactCurrency(Math.abs(netMovement))}
            subtitle={netMovement >= 0 ? "Net debit" : "Net credit"}
            icon={<CircleDollarSign className="h-5 w-5" />}
            iconStyle="bg-cyan-50 text-cyan-700"
          />

          <MetricCard
            title="Posted Entries"
            value={postedCount.toString()}
            subtitle="Accounting validated"
            icon={<CheckCircle2 className="h-5 w-5" />}
            iconStyle="bg-emerald-50 text-emerald-700"
          />

          <MetricCard
            title="Draft Entries"
            value={draftCount.toString()}
            subtitle="Pending review"
            icon={<FileSpreadsheet className="h-5 w-5" />}
            iconStyle="bg-amber-50 text-amber-700"
          />

          <MetricCard
            title="Ledger Accounts"
            value={accountCount.toString()}
            subtitle={`${reversedCount} reversed entry`}
            icon={<BookOpen className="h-5 w-5" />}
            iconStyle="bg-rose-50 text-rose-700"
          />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                Ledger Controls
              </p>

              <h2 className="mt-2 text-xl font-black">
                Account Transaction Register
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {filteredEntries.length} entries available in the
                selected view.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search journal, account or reference"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#10233b] focus:bg-white sm:w-80"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-black transition ${
                  showFilters
                    ? "border-[#10233b] bg-[#10233b] text-white"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              <button
                type="button"
                onClick={refreshLedger}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black transition hover:bg-slate-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 grid grid-cols-1 gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-5">
              <FilterField label="Account">
                <select
                  value={accountFilter}
                  onChange={(event) => {
                    setAccountFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-[#10233b]"
                >
                  {accountOptions.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Department">
                <select
                  value={departmentFilter}
                  onChange={(event) => {
                    setDepartmentFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-[#10233b]"
                >
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Status">
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value as
                        | "All Statuses"
                        | LedgerStatus,
                    );
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-[#10233b]"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Posted">Posted</option>
                  <option value="Draft">Draft</option>
                  <option value="Reversed">Reversed</option>
                </select>
              </FilterField>

              <FilterField label="Accounting Period">
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={periodFilter}
                    onChange={(event) =>
                      setPeriodFilter(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#10233b]"
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Quarter</option>
                    <option>This Financial Year</option>
                    <option>Custom Period</option>
                  </select>
                </div>
              </FilterField>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                  General Ledger Register
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Journal Movements
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {periodFilter} · Currency: Indian Rupee
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Controls Active
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600">
                  <IndianRupee className="h-4 w-4" />
                  INR
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1480px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <TableHeading>Journal Entry</TableHeading>
                    <TableHeading>Date</TableHeading>
                    <TableHeading>Account</TableHeading>
                    <TableHeading>Description</TableHeading>
                    <TableHeading>Reference</TableHeading>
                    <TableHeading align="right">Debit</TableHeading>
                    <TableHeading align="right">Credit</TableHeading>
                    <TableHeading align="right">
                      Running Balance
                    </TableHeading>
                    <TableHeading>Allocation</TableHeading>
                    <TableHeading align="center">
                      Status
                    </TableHeading>
                    <TableHeading align="right">
                      Action
                    </TableHeading>
                  </tr>
                </thead>

                <tbody>
                  {paginatedEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm font-black">
                          {entry.journalNumber}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          Created by {entry.createdBy}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <p className="text-sm font-semibold">
                          {entry.date}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-white">
                            <BookOpen className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="max-w-[220px] text-sm font-black">
                              {entry.accountName}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-400">
                              {entry.accountCode}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-[330px] px-5 py-4 align-top">
                        <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-600">
                          {entry.description}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-black text-slate-600">
                          {entry.reference}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right align-top">
                        <p className="text-sm font-black text-blue-700">
                          {entry.debit
                            ? formatCurrency(entry.debit)
                            : "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right align-top">
                        <p className="text-sm font-black text-violet-700">
                          {entry.credit
                            ? formatCurrency(entry.credit)
                            : "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right align-top">
                        <p className="text-sm font-black">
                          {formatCurrency(entry.runningBalance)}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <p className="text-xs font-black">
                          {entry.department}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {entry.costCenter}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-center align-top">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-black ring-1 ring-inset ${statusStyles[entry.status]}`}
                        >
                          {entry.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/finance/general-ledger/${entry.id}`}
                            aria-label={`View ${entry.journalNumber}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            aria-label={`More actions for ${entry.journalNumber}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {paginatedEntries.length > 0 && (
                  <tfoot>
                    <tr className="bg-[#10233b] text-white">
                      <td
                        colSpan={5}
                        className="px-5 py-5 text-sm font-black"
                      >
                        Selected Ledger Totals
                      </td>

                      <td className="px-5 py-5 text-right text-sm font-black">
                        {formatCurrency(totalDebit)}
                      </td>

                      <td className="px-5 py-5 text-right text-sm font-black">
                        {formatCurrency(totalCredit)}
                      </td>

                      <td className="px-5 py-5 text-right text-sm font-black">
                        {formatCurrency(Math.abs(netMovement))}
                      </td>

                      <td colSpan={3} />
                    </tr>
                  </tfoot>
                )}
              </table>

              {paginatedEntries.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                    <BookOpen className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-lg font-black">
                    No ledger entries found
                  </h3>

                  <p className="mt-2 max-w-md text-sm font-medium text-slate-500">
                    No transaction matches the current search and filter
                    combination.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-xl bg-[#10233b] px-4 py-2.5 text-sm font-black text-white"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold text-slate-500">
                Showing{" "}
                {filteredEntries.length === 0
                  ? 0
                  : (safeCurrentPage - 1) * itemsPerPage + 1}
                –
                {Math.min(
                  safeCurrentPage * itemsPerPage,
                  filteredEntries.length,
                )}{" "}
                of {filteredEntries.length} entries
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-black transition ${
                      safeCurrentPage === page
                        ? "bg-[#10233b] text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages),
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_25px_60px_rgba(15,35,59,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-400">
                    Ledger Position
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Debit and Credit Control
                  </h2>
                </div>

                <Landmark className="h-7 w-7 text-white/80" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Debit
                  </p>

                  <p className="mt-2 text-xl font-black">
                    {formatCompactCurrency(totalDebit)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Credit
                  </p>

                  <p className="mt-2 text-xl font-black">
                    {formatCompactCurrency(totalCredit)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Net movement
                  </span>

                  <span className="text-sm font-black text-amber-300">
                    {formatCurrency(Math.abs(netMovement))}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[86%] rounded-full bg-amber-400" />
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    KEOS Intelligence
                  </p>

                  <h2 className="mt-2 text-lg font-black">
                    Ledger Analysis
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <InsightCard
                  status="success"
                  title="Posting controls active"
                  description="Posted journal entries contain account, reference and allocation information."
                />

                <InsightCard
                  status="warning"
                  title={`${draftCount} draft entries pending`}
                  description="Review payroll accrual entries before closing the current accounting period."
                />

                <InsightCard
                  status="success"
                  title="No duplicate journal detected"
                  description="Journal numbers and transaction references passed duplicate validation."
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    Account Health
                  </p>

                  <h2 className="mt-2 text-lg font-black">
                    Posting Performance
                  </h2>
                </div>

                <TrendingUp className="h-6 w-6" />
              </div>

              <div className="mt-5 space-y-5">
                <ProgressRow
                  label="Posted entries"
                  value={Math.round(
                    (postedCount / ledgerEntries.length) * 100,
                  )}
                />

                <ProgressRow
                  label="Reference validation"
                  value={96}
                />

                <ProgressRow
                  label="Account allocation"
                  value={100}
                />

                <ProgressRow
                  label="Cost-center allocation"
                  value={94}
                />
              </div>
            </section>

            <Link
              href="/finance/journal-entries/create"
              className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                  <Plus className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Create Journal Entry
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Record debit and credit posting
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-slate-400" />
            </Link>

            <section className="flex items-start gap-3 rounded-[24px] border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="text-sm font-black text-amber-800">
                  Accounting period is open
                </p>

                <p className="mt-1 text-xs font-semibold leading-5 text-amber-700">
                  Draft, adjustment and reversal entries can still
                  change the current ledger position.
                </p>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconStyle,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconStyle: string;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconStyle}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-[#10233b]">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        {subtitle}
      </p>
    </article>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-black text-[#10233b]">
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  const alignment =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <th
      className={`px-5 py-4 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 ${alignment}`}
    >
      {children}
    </th>
  );
}

function InsightCard({
  status,
  title,
  description,
}: {
  status: "success" | "warning";
  title: string;
  description: string;
}) {
  const isSuccess = status === "success";

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl p-4 ${
        isSuccess ? "bg-emerald-50" : "bg-amber-50"
      }`}
    >
      {isSuccess ? (
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      ) : (
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      )}

      <div>
        <p
          className={`text-sm font-black ${
            isSuccess ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-slate-500">
          {label}
        </span>

        <span className="text-xs font-black text-[#10233b]">
          {safeValue}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#10233b]"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}