"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  Filter,
  History,
  IndianRupee,
  Search,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";

type AuditAction =
  | "Created"
  | "Updated"
  | "Approved"
  | "Rejected"
  | "Deleted"
  | "Payment Recorded"
  | "Exported";

type AuditModule =
  | "Journal Entries"
  | "Payments"
  | "Loans & Liabilities"
  | "GST Center"
  | "Payroll"
  | "Vendors"
  | "Financial Reports"
  | "Compliance";

type AuditRisk = "Low" | "Medium" | "High";

type AuditLog = {
  id: number;
  auditNo: string;
  date: string;
  time: string;
  user: string;
  role: string;
  module: AuditModule;
  action: AuditAction;
  record: string;
  description: string;
  ipAddress: string;
  risk: AuditRisk;
  approvedBy: string;
};

const initialAuditLogs: AuditLog[] = [
  {
    id: 1,
    auditNo: "AUD-10001",
    date: "2026-07-24",
    time: "10:42 AM",
    user: "Aarav Sharma",
    role: "Finance Manager",
    module: "Journal Entries",
    action: "Approved",
    record: "JV-2026-0148",
    description:
      "Approved depreciation journal entry for June 2026.",
    ipAddress: "192.168.1.12",
    risk: "Low",
    approvedBy: "Aarav Sharma",
  },
  {
    id: 2,
    auditNo: "AUD-10002",
    date: "2026-07-24",
    time: "10:15 AM",
    user: "Priya Singh",
    role: "Accounts Executive",
    module: "Payments",
    action: "Payment Recorded",
    record: "PAY-2026-0864",
    description:
      "Recorded vendor payment of ₹2,85,000 against invoice INV-7845.",
    ipAddress: "192.168.1.18",
    risk: "Medium",
    approvedBy: "Aarav Sharma",
  },
  {
    id: 3,
    auditNo: "AUD-10003",
    date: "2026-07-24",
    time: "09:38 AM",
    user: "Rohan Mehta",
    role: "Treasury Analyst",
    module: "Loans & Liabilities",
    action: "Updated",
    record: "LN-1002",
    description:
      "Updated outstanding balance after monthly EMI repayment.",
    ipAddress: "192.168.1.25",
    risk: "Low",
    approvedBy: "System",
  },
  {
    id: 4,
    auditNo: "AUD-10004",
    date: "2026-07-23",
    time: "06:20 PM",
    user: "Neha Verma",
    role: "Tax Executive",
    module: "GST Center",
    action: "Exported",
    record: "GSTR-3B-JUN-26",
    description:
      "Exported GSTR-3B reconciliation report for June 2026.",
    ipAddress: "192.168.1.31",
    risk: "Low",
    approvedBy: "System",
  },
  {
    id: 5,
    auditNo: "AUD-10005",
    date: "2026-07-23",
    time: "04:55 PM",
    user: "Karan Malhotra",
    role: "Payroll Manager",
    module: "Payroll",
    action: "Rejected",
    record: "PAYROLL-JUL-26",
    description:
      "Rejected payroll batch because employee deductions required correction.",
    ipAddress: "192.168.1.37",
    risk: "High",
    approvedBy: "Karan Malhotra",
  },
  {
    id: 6,
    auditNo: "AUD-10006",
    date: "2026-07-23",
    time: "03:18 PM",
    user: "Simran Kaur",
    role: "Vendor Executive",
    module: "Vendors",
    action: "Created",
    record: "VEN-1038",
    description:
      "Created a new vendor profile for Nova Packaging Private Limited.",
    ipAddress: "192.168.1.42",
    risk: "Medium",
    approvedBy: "Aarav Sharma",
  },
  {
    id: 7,
    auditNo: "AUD-10007",
    date: "2026-07-23",
    time: "01:26 PM",
    user: "Aarav Sharma",
    role: "Finance Manager",
    module: "Financial Reports",
    action: "Exported",
    record: "MIS-JUN-2026",
    description:
      "Exported monthly management information report.",
    ipAddress: "192.168.1.12",
    risk: "Low",
    approvedBy: "System",
  },
  {
    id: 8,
    auditNo: "AUD-10008",
    date: "2026-07-22",
    time: "05:47 PM",
    user: "Priya Singh",
    role: "Accounts Executive",
    module: "Journal Entries",
    action: "Deleted",
    record: "JV-DRAFT-0092",
    description:
      "Deleted an unposted duplicate journal entry draft.",
    ipAddress: "192.168.1.18",
    risk: "High",
    approvedBy: "Aarav Sharma",
  },
  {
    id: 9,
    auditNo: "AUD-10009",
    date: "2026-07-22",
    time: "12:40 PM",
    user: "Neha Verma",
    role: "Tax Executive",
    module: "Compliance",
    action: "Updated",
    record: "CMP-1003",
    description:
      "Updated TDS return review status and supporting document reference.",
    ipAddress: "192.168.1.31",
    risk: "Medium",
    approvedBy: "Tax Manager",
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FinanceAuditLogsPage() {
  const [logs] = useState<AuditLog[]>(initialAuditLogs);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] =
    useState<"All" | AuditModule>("All");
  const [actionFilter, setActionFilter] =
    useState<"All" | AuditAction>("All");
  const [riskFilter, setRiskFilter] =
    useState<"All" | AuditRisk>("All");
  const [selectedLog, setSelectedLog] =
    useState<AuditLog | null>(null);
  const [notification, setNotification] = useState("");

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        log.auditNo.toLowerCase().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.record.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.role.toLowerCase().includes(query);

      const matchesModule =
        moduleFilter === "All" ||
        log.module === moduleFilter;

      const matchesAction =
        actionFilter === "All" ||
        log.action === actionFilter;

      const matchesRisk =
        riskFilter === "All" ||
        log.risk === riskFilter;

      return (
        matchesSearch &&
        matchesModule &&
        matchesAction &&
        matchesRisk
      );
    });
  }, [
    logs,
    search,
    moduleFilter,
    actionFilter,
    riskFilter,
  ]);

  const todayCount = logs.filter(
    (log) => log.date === "2026-07-24",
  ).length;

  const approvalCount = logs.filter(
    (log) => log.action === "Approved",
  ).length;

  const highRiskCount = logs.filter(
    (log) => log.risk === "High",
  ).length;

  const uniqueUsers = new Set(
    logs.map((log) => log.user),
  ).size;

  function showNotification(message: string): void {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function exportAuditLogs(): void {
    const headings = [
      "Audit Number",
      "Date",
      "Time",
      "User",
      "Role",
      "Module",
      "Action",
      "Record",
      "Description",
      "IP Address",
      "Risk",
      "Approved By",
    ];

    const rows = filteredLogs.map((log) => [
      log.auditNo,
      log.date,
      log.time,
      log.user,
      log.role,
      log.module,
      log.action,
      log.record,
      log.description,
      log.ipAddress,
      log.risk,
      log.approvedBy,
    ]);

    const csvContent = [headings, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replaceAll('"', '""')}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-finance-audit-logs.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);

    showNotification("Audit logs exported successfully.");
  }

  function clearFilters(): void {
    setSearch("");
    setModuleFilter("All");
    setActionFilter("All");
    setRiskFilter("All");
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
                  Finance Audit Logs
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">
                  <ShieldCheck size={12} />
                  Secure Trail
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Track every finance action, approval and record
                change
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={exportAuditLogs}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17395f]"
          >
            <Download size={16} />
            Export Audit Trail
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1650px] space-y-6 p-5 sm:p-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Actions Today"
            value={String(todayCount)}
            description="Finance activities recorded today"
            icon={<Activity size={22} />}
            tone="blue"
          />

          <SummaryCard
            title="Approved Actions"
            value={String(approvalCount)}
            description="Transactions formally approved"
            icon={<CheckCircle2 size={22} />}
            tone="green"
          />

          <SummaryCard
            title="High-Risk Actions"
            value={String(highRiskCount)}
            description="Records requiring close review"
            icon={<AlertTriangle size={22} />}
            tone="red"
          />

          <SummaryCard
            title="Active Users"
            value={String(uniqueUsers)}
            description="Users represented in audit trail"
            icon={<UserCheck size={22} />}
            tone="neutral"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                <History size={19} />
              </div>

              <div>
                <h2 className="text-lg font-black">
                  Audit Trail Health
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Finance activity monitoring and control status
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <HealthBox
                label="Logging Coverage"
                value="100%"
                note="All finance modules monitored"
              />

              <HealthBox
                label="Approval Coverage"
                value="94%"
                note="Controlled transactions approved"
              />

              <HealthBox
                label="Access Integrity"
                value="98%"
                note="No unusual access pattern"
              />
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  Audit control score
                </span>

                <span className="text-sm font-black text-[#102844]">
                  96%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[96%] rounded-full bg-[#102844]" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#102844] p-6 text-white shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <FileClock size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black">
              Latest Critical Activity
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              A duplicate journal entry draft was deleted after
              review. The action was approved and remains available
              in the permanent audit trail.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold text-slate-300">
                Record reference
              </p>

              <p className="mt-2 text-xl font-black">
                JV-DRAFT-0092
              </p>

              <p className="mt-2 text-xs text-slate-300">
                User: Priya Singh · Risk: High
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-black">
                  Complete Audit Trail
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review finance activity, approvals and record
                  changes
                </p>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="h-10 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
                  placeholder="Search user, record or action"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
                />
              </div>

              <FilterSelect
                value={moduleFilter}
                onChange={(value) =>
                  setModuleFilter(
                    value as "All" | AuditModule,
                  )
                }
              >
                <option value="All">All Modules</option>
                <option value="Journal Entries">
                  Journal Entries
                </option>
                <option value="Payments">Payments</option>
                <option value="Loans & Liabilities">
                  Loans &amp; Liabilities
                </option>
                <option value="GST Center">GST Center</option>
                <option value="Payroll">Payroll</option>
                <option value="Vendors">Vendors</option>
                <option value="Financial Reports">
                  Financial Reports
                </option>
                <option value="Compliance">
                  Compliance
                </option>
              </FilterSelect>

              <FilterSelect
                value={actionFilter}
                onChange={(value) =>
                  setActionFilter(
                    value as "All" | AuditAction,
                  )
                }
              >
                <option value="All">All Actions</option>
                <option value="Created">Created</option>
                <option value="Updated">Updated</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Deleted">Deleted</option>
                <option value="Payment Recorded">
                  Payment Recorded
                </option>
                <option value="Exported">Exported</option>
              </FilterSelect>

              <FilterSelect
                value={riskFilter}
                onChange={(value) =>
                  setRiskFilter(
                    value as "All" | AuditRisk,
                  )
                }
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </FilterSelect>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Date &amp; Time</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Record</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Risk</th>
                  <th className="px-6 py-4">Approved By</th>
                  <th className="px-6 py-4 text-right">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                          <Clock3 size={16} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900">
                            {log.date}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {log.time}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-black text-slate-800">
                        {log.user}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {log.role}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {log.module}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <ActionBadge action={log.action} />
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-black text-[#102844]">
                        {log.record}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {log.auditNo}
                      </p>
                    </td>

                    <td className="max-w-sm px-6 py-5 text-sm leading-6 text-slate-600">
                      {log.description}
                    </td>

                    <td className="px-6 py-5">
                      <RiskBadge risk={log.risk} />
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {log.approvedBy}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center"
                    >
                      <History
                        size={38}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-black text-slate-700">
                        No audit records found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Change the search term or filters.
                      </p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <ControlCard
            title="Immutable Records"
            value="Enabled"
            description="Audit logs cannot be modified after creation"
            icon={<ShieldCheck size={20} />}
          />

          <ControlCard
            title="Approval Tracking"
            value="Active"
            description="Approver identity is recorded permanently"
            icon={<UserCheck size={20} />}
          />

          <ControlCard
            title="Change History"
            value="Complete"
            description="Every material record update is captured"
            icon={<History size={20} />}
          />

          <ControlCard
            title="Export Control"
            value="Monitored"
            description="Report exports are included in audit logs"
            icon={<Download size={20} />}
          />
        </section>
      </div>

      {selectedLog ? (
        <AuditDetailsModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      ) : null}
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
  tone: "blue" | "green" | "red" | "neutral";
}) {
  const iconClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "red"
        ? "bg-rose-50 text-rose-700"
        : tone === "blue"
          ? "bg-blue-50 text-blue-700"
          : "bg-slate-100 text-[#102844]";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black text-slate-950">
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

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {note}
      </p>
    </article>
  );
}

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Filter
        size={15}
        className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
      />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-400"
      >
        {children}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
      />
    </div>
  );
}

function ActionBadge({
  action,
}: {
  action: AuditAction;
}) {
  const className =
    action === "Approved"
      ? "bg-emerald-100 text-emerald-700"
      : action === "Rejected" || action === "Deleted"
        ? "bg-rose-100 text-rose-700"
        : action === "Created"
          ? "bg-blue-100 text-blue-700"
          : action === "Updated"
            ? "bg-amber-100 text-amber-700"
            : action === "Payment Recorded"
              ? "bg-violet-100 text-violet-700"
              : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
    >
      {action}
    </span>
  );
}

function RiskBadge({
  risk,
}: {
  risk: AuditRisk;
}) {
  const className =
    risk === "High"
      ? "bg-rose-100 text-rose-700"
      : risk === "Medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-emerald-100 text-emerald-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
    >
      {risk}
    </span>
  );
}

function ControlCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-lg font-black text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function AuditDetailsModal({
  log,
  onClose,
}: {
  log: AuditLog;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Audit Record Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {log.auditNo}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close audit details"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap gap-3">
            <ActionBadge action={log.action} />
            <RiskBadge risk={log.risk} />
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Activity description
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {log.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailBox label="Date" value={log.date} />
            <DetailBox label="Time" value={log.time} />
            <DetailBox label="User" value={log.user} />
            <DetailBox label="Role" value={log.role} />
            <DetailBox label="Module" value={log.module} />
            <DetailBox label="Record" value={log.record} />
            <DetailBox
              label="IP Address"
              value={log.ipAddress}
            />
            <DetailBox
              label="Approved By"
              value={log.approvedBy}
            />
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <FileCheck2
                size={18}
                className="mt-0.5 shrink-0 text-emerald-700"
              />

              <div>
                <p className="text-sm font-black text-emerald-800">
                  Audit record secured
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  This record forms part of the permanent finance
                  audit trail and cannot be edited from this screen.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl bg-[#102844] px-6 text-sm font-bold text-white transition hover:bg-[#17395f]"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}