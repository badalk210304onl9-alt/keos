"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Filter,
  IndianRupee,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";

type ComplianceStatus =
  | "Compliant"
  | "Due Soon"
  | "Overdue"
  | "In Review";

type ComplianceCategory =
  | "GST"
  | "TDS"
  | "Payroll"
  | "Corporate"
  | "Internal Control";

type ComplianceRecord = {
  id: number;
  complianceNo: string;
  title: string;
  category: ComplianceCategory;
  authority: string;
  period: string;
  dueDate: string;
  owner: string;
  amount: number;
  status: ComplianceStatus;
};

const initialRecords: ComplianceRecord[] = [
  {
    id: 1,
    complianceNo: "CMP-1001",
    title: "GSTR-3B Filing",
    category: "GST",
    authority: "GST Department",
    period: "June 2026",
    dueDate: "2026-07-20",
    owner: "Indirect Tax Team",
    amount: 485000,
    status: "Compliant",
  },
  {
    id: 2,
    complianceNo: "CMP-1002",
    title: "GSTR-1 Filing",
    category: "GST",
    authority: "GST Department",
    period: "July 2026",
    dueDate: "2026-08-11",
    owner: "Indirect Tax Team",
    amount: 0,
    status: "Due Soon",
  },
  {
    id: 3,
    complianceNo: "CMP-1003",
    title: "TDS Return – Form 26Q",
    category: "TDS",
    authority: "Income Tax Department",
    period: "Q1 FY 2026-27",
    dueDate: "2026-07-31",
    owner: "Direct Tax Team",
    amount: 176500,
    status: "In Review",
  },
  {
    id: 4,
    complianceNo: "CMP-1004",
    title: "Professional Tax Payment",
    category: "Payroll",
    authority: "State Tax Department",
    period: "June 2026",
    dueDate: "2026-07-15",
    owner: "Payroll Team",
    amount: 32500,
    status: "Overdue",
  },
  {
    id: 5,
    complianceNo: "CMP-1005",
    title: "Board Financial Review",
    category: "Corporate",
    authority: "Board of Directors",
    period: "Q1 FY 2026-27",
    dueDate: "2026-08-05",
    owner: "Finance Controller",
    amount: 0,
    status: "Due Soon",
  },
  {
    id: 6,
    complianceNo: "CMP-1006",
    title: "Bank Reconciliation Review",
    category: "Internal Control",
    authority: "Internal Finance",
    period: "June 2026",
    dueDate: "2026-07-10",
    owner: "Treasury Team",
    amount: 0,
    status: "Compliant",
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FinanceCompliancePage() {
  const [records, setRecords] =
    useState<ComplianceRecord[]>(initialRecords);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | ComplianceStatus>("All");
  const [categoryFilter, setCategoryFilter] =
    useState<"All" | ComplianceCategory>("All");
  const [notification, setNotification] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.title.toLowerCase().includes(query) ||
        record.complianceNo.toLowerCase().includes(query) ||
        record.authority.toLowerCase().includes(query) ||
        record.owner.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        record.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    records,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const compliantCount = records.filter(
    (record) => record.status === "Compliant",
  ).length;

  const dueSoonCount = records.filter(
    (record) => record.status === "Due Soon",
  ).length;

  const overdueCount = records.filter(
    (record) => record.status === "Overdue",
  ).length;

  const payableAmount = records
    .filter((record) => record.status !== "Compliant")
    .reduce(
      (total, record) => total + record.amount,
      0,
    );

  function showNotification(message: string): void {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function markCompliant(id: number): void {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Compliant",
            }
          : record,
      ),
    );

    showNotification(
      "Compliance record marked as completed.",
    );
  }

  function exportCsv(): void {
    const headings = [
      "Compliance Number",
      "Title",
      "Category",
      "Authority",
      "Period",
      "Due Date",
      "Owner",
      "Amount",
      "Status",
    ];

    const rows = filteredRecords.map((record) => [
      record.complianceNo,
      record.title,
      record.category,
      record.authority,
      record.period,
      record.dueDate,
      record.owner,
      String(record.amount),
      record.status,
    ]);

    const csvContent = [headings, ...rows]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download =
      "keos-finance-compliance.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);

    showNotification(
      "Compliance report exported successfully.",
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      {notification ? (
        <div className="fixed right-5 top-5 z-[100] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#102844] shadow-2xl">
          {notification}
        </div>
      ) : null}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1650px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              aria-label="Back to Finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black sm:text-3xl">
                  Finance Compliance
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  <ShieldCheck size={12} />
                  Controlled
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Financial policies, statutory filings
                and internal control monitoring
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                showNotification(
                  "Document upload will be connected to storage.",
                )
              }
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Upload size={16} />
              Upload Evidence
            </button>

            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-4 text-sm font-bold text-white transition hover:bg-[#17395f]"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1650px] space-y-6 p-5 sm:p-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Compliant"
            value={String(compliantCount)}
            description="Completed compliance items"
            icon={<CheckCircle2 size={22} />}
            tone="positive"
          />

          <SummaryCard
            title="Due Soon"
            value={String(dueSoonCount)}
            description="Requires timely completion"
            icon={<Clock3 size={22} />}
            tone="warning"
          />

          <SummaryCard
            title="Overdue"
            value={String(overdueCount)}
            description="Immediate action required"
            icon={<AlertTriangle size={22} />}
            tone="danger"
          />

          <SummaryCard
            title="Pending Liability"
            value={formatCurrency(payableAmount)}
            description="Amount linked to pending filings"
            icon={<IndianRupee size={22} />}
            tone="neutral"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="text-lg font-black">
                  Compliance Health
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current statutory and control position
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <HealthBox
                label="Overall Score"
                value="82%"
                note="Healthy compliance position"
              />

              <HealthBox
                label="Statutory Filings"
                value="4 / 5"
                note="One filing needs attention"
              />

              <HealthBox
                label="Internal Controls"
                value="96%"
                note="Control effectiveness"
              />
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  Compliance completion
                </span>

                <span className="text-sm font-black text-[#102844]">
                  82%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-[#102844]" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#102844] p-6 text-white shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <AlertTriangle size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black">
              Priority Attention
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Professional Tax Payment is overdue.
              Complete the payment and upload supporting
              evidence to restore full compliance.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold text-slate-300">
                Overdue amount
              </p>

              <p className="mt-2 text-2xl font-black">
                ₹32,500
              </p>

              <p className="mt-2 text-xs text-slate-300">
                Due date: 15 July 2026
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 border-b border-slate-100 p-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black">
                Compliance Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor filings, payments, reviews and
                supporting documentation
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search compliance records"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 md:w-72"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(
                      event.target.value as
                        | "All"
                        | ComplianceCategory,
                    )
                  }
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-semibold outline-none"
                >
                  <option value="All">
                    All Categories
                  </option>
                  <option value="GST">GST</option>
                  <option value="TDS">TDS</option>
                  <option value="Payroll">
                    Payroll
                  </option>
                  <option value="Corporate">
                    Corporate
                  </option>
                  <option value="Internal Control">
                    Internal Control
                  </option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | "All"
                      | ComplianceStatus,
                  )
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option value="All">All Status</option>
                <option value="Compliant">
                  Compliant
                </option>
                <option value="Due Soon">
                  Due Soon
                </option>
                <option value="Overdue">
                  Overdue
                </option>
                <option value="In Review">
                  In Review
                </option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">
                    Compliance
                  </th>
                  <th className="px-6 py-4">
                    Category
                  </th>
                  <th className="px-6 py-4">
                    Authority
                  </th>
                  <th className="px-6 py-4">
                    Period
                  </th>
                  <th className="px-6 py-4">
                    Due Date
                  </th>
                  <th className="px-6 py-4">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-right">
                    Amount
                  </th>
                  <th className="px-6 py-4">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                          <FileText size={16} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900">
                            {record.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {record.complianceNo}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {record.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {record.authority}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {record.period}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays size={15} />
                        {record.dueDate}
                      </div>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {record.owner}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {record.amount > 0
                        ? formatCurrency(record.amount)
                        : "—"}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={record.status}
                      />
                    </td>

                    <td className="px-6 py-5 text-right">
                      {record.status === "Compliant" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700">
                          <FileCheck2 size={14} />
                          Completed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            markCompliant(record.id)
                          }
                          className="rounded-xl bg-[#102844] px-4 py-2 text-xs font-black text-white transition hover:bg-[#17395f]"
                        >
                          Mark Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center"
                    >
                      <ShieldCheck
                        size={36}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-black text-slate-700">
                        No compliance records found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Change your filters or search term.
                      </p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone:
    | "positive"
    | "warning"
    | "danger"
    | "neutral";
}) {
  const iconClass =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "warning"
        ? "bg-amber-50 text-amber-700"
        : tone === "danger"
          ? "bg-rose-50 text-rose-700"
          : "bg-slate-100 text-[#102844]";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

function HealthBox({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-[#102844]">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {note}
      </p>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: ComplianceStatus;
}) {
  const className =
    status === "Compliant"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Due Soon"
        ? "bg-amber-100 text-amber-700"
        : status === "Overdue"
          ? "bg-rose-100 text-rose-700"
          : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
    >
      {status}
    </span>
  );
}