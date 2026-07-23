"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  IndianRupee,
  Paperclip,
  ReceiptText,
  Save,
  Search,
  Send,
  UserRound,
  XCircle,
} from "lucide-react";

type ReimbursementStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Paid";

type ReimbursementRecord = {
  id: number;
  claimId: string;
  employeeName: string;
  employeeId: string;
  department: string;
  category: string;
  expenseDate: string;
  submittedDate: string;
  amount: number;
  approvedAmount: number;
  status: ReimbursementStatus;
  description: string;
};

const initialRecords: ReimbursementRecord[] = [
  {
    id: 1,
    claimId: "REM-2026-001",
    employeeName: "Aarav Sharma",
    employeeId: "KRVE-EMP-001",
    department: "Finance",
    category: "Travel",
    expenseDate: "2026-07-08",
    submittedDate: "2026-07-10",
    amount: 18500,
    approvedAmount: 18500,
    status: "Approved",
    description: "Client meeting travel and accommodation expenses.",
  },
  {
    id: 2,
    claimId: "REM-2026-002",
    employeeName: "Riya Verma",
    employeeId: "KRVE-EMP-002",
    department: "Marketing",
    category: "Advertising",
    expenseDate: "2026-07-12",
    submittedDate: "2026-07-14",
    amount: 12500,
    approvedAmount: 0,
    status: "Pending",
    description: "Social media campaign production expense.",
  },
  {
    id: 3,
    claimId: "REM-2026-003",
    employeeName: "Kabir Singh",
    employeeId: "KRVE-EMP-003",
    department: "Technology",
    category: "Software",
    expenseDate: "2026-07-15",
    submittedDate: "2026-07-16",
    amount: 8900,
    approvedAmount: 8900,
    status: "Paid",
    description: "Developer software subscription renewal.",
  },
  {
    id: 4,
    claimId: "REM-2026-004",
    employeeName: "Ananya Gupta",
    employeeId: "KRVE-EMP-004",
    department: "Human Resources",
    category: "Training",
    expenseDate: "2026-07-17",
    submittedDate: "2026-07-19",
    amount: 15000,
    approvedAmount: 0,
    status: "Pending",
    description: "Employee learning and development workshop.",
  },
  {
    id: 5,
    claimId: "REM-2026-005",
    employeeName: "Vivaan Mehta",
    employeeId: "KRVE-EMP-005",
    department: "Operations",
    category: "Local Conveyance",
    expenseDate: "2026-07-18",
    submittedDate: "2026-07-20",
    amount: 4200,
    approvedAmount: 0,
    status: "Rejected",
    description: "Local transportation expenses.",
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass =
  "mb-2 block text-xs font-bold text-slate-600";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ReimbursementsCreatePage() {
  const [records, setRecords] =
    useState<ReimbursementRecord[]>(initialRecords);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("Finance");
  const [category, setCategory] = useState("Travel");
  const [expenseDate, setExpenseDate] = useState("2026-07-23");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  const totalClaims = records.length;

  const pendingClaims = records.filter(
    (record) => record.status === "Pending",
  ).length;

  const approvedClaims = records.filter(
    (record) =>
      record.status === "Approved" ||
      record.status === "Paid",
  ).length;

  const totalClaimedAmount = useMemo(
    () =>
      records.reduce(
        (total, record) => total + record.amount,
        0,
      ),
    [records],
  );

  const totalApprovedAmount = useMemo(
    () =>
      records.reduce(
        (total, record) =>
          total + record.approvedAmount,
        0,
      ),
    [records],
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.employeeName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.claimId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function updateStatus(
    id: number,
    status: ReimbursementStatus,
  ) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status,
              approvedAmount:
                status === "Approved" ||
                status === "Paid"
                  ? record.amount
                  : 0,
            }
          : record,
      ),
    );

    showMessage(`Reimbursement marked as ${status}.`);
  }

  function approveAllPending() {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.status === "Pending"
          ? {
              ...record,
              status: "Approved",
              approvedAmount: record.amount,
            }
          : record,
      ),
    );

    showMessage("All pending reimbursements approved.");
  }

  function saveDraft() {
    showMessage("Reimbursement request saved as draft.");
  }

  function submitClaim() {
    if (!employeeName.trim()) {
      showMessage("Enter employee name.");
      return;
    }

    if (!employeeId.trim()) {
      showMessage("Enter employee ID.");
      return;
    }

    if (amount <= 0) {
      showMessage("Enter a valid reimbursement amount.");
      return;
    }

    const newRecord: ReimbursementRecord = {
      id: Date.now(),
      claimId: `REM-2026-${String(
        records.length + 1,
      ).padStart(3, "0")}`,
      employeeName,
      employeeId,
      department,
      category,
      expenseDate,
      submittedDate: new Date()
        .toISOString()
        .slice(0, 10),
      amount,
      approvedAmount: 0,
      status: "Pending",
      description,
    };

    setRecords((currentRecords) => [
      newRecord,
      ...currentRecords,
    ]);

    setEmployeeName("");
    setEmployeeId("");
    setAmount(0);
    setDescription("");
    setAttachmentName("");

    showMessage("Reimbursement request submitted.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check size={18} />
          </div>

          <p className="text-sm font-bold text-slate-800">
            {message}
          </p>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Back to finance"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-slate-950">
                  Employee Reimbursements
                </h1>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-700">
                  {pendingClaims} Pending
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Submit, review and approve employee expense claims.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Save size={17} />
              Save Draft
            </button>

            <button
              type="button"
              onClick={approveAllPending}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17385f]"
            >
              <BadgeCheck size={17} />
              Approve All Pending
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Claims"
            value={String(totalClaims)}
            description="All reimbursement requests"
            icon={<ReceiptText size={22} />}
          />

          <SummaryCard
            title="Total Claimed"
            value={formatCurrency(totalClaimedAmount)}
            description="Gross reimbursement requested"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Pending Approval"
            value={String(pendingClaims)}
            description="Claims awaiting finance review"
            icon={<Clock3 size={22} />}
          />

          <SummaryCard
            title="Approved Amount"
            value={formatCurrency(totalApprovedAmount)}
            description={`${approvedClaims} approved or paid claims`}
            icon={<CheckCircle2 size={22} />}
          />
        </section>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-black text-slate-950">
                New Reimbursement Request
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter employee and expense details.
              </p>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className={labelClass}>
                  Employee Name
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    value={employeeName}
                    onChange={(event) =>
                      setEmployeeName(event.target.value)
                    }
                    placeholder="Enter employee name"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Employee ID
                </label>

                <input
                  value={employeeId}
                  onChange={(event) =>
                    setEmployeeId(event.target.value)
                  }
                  placeholder="KRVE-EMP-000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Department
                </label>

                <select
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  className={inputClass}
                >
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Technology</option>
                  <option>Human Resources</option>
                  <option>Operations</option>
                  <option>Creative</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Expense Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className={inputClass}
                >
                  <option>Travel</option>
                  <option>Local Conveyance</option>
                  <option>Food and Meals</option>
                  <option>Hotel</option>
                  <option>Software</option>
                  <option>Training</option>
                  <option>Advertising</option>
                  <option>Office Supplies</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Expense Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="date"
                    value={expenseDate}
                    onChange={(event) =>
                      setExpenseDate(event.target.value)
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Claim Amount
                </label>

                <div className="relative">
                  <IndianRupee
                    size={16}
                    className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(event) =>
                      setAmount(Number(event.target.value))
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Expense Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the business purpose"
                  className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Supporting Document
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 p-4 transition hover:bg-slate-50">
                  <Paperclip
                    size={19}
                    className="text-slate-500"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {attachmentName ||
                        "Attach invoice or receipt"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF, JPG or PNG
                    </p>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(event) =>
                      setAttachmentName(
                        event.target.files?.[0]?.name ?? "",
                      )
                    }
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={submitClaim}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#102844] text-sm font-bold text-white transition hover:bg-[#17385f]"
              >
                <Send size={17} />
                Submit Reimbursement
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Reimbursement Requests
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review submitted employee expense claims.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search claims"
                    className={`${inputClass} w-full pl-10 sm:w-56`}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className={`${inputClass} sm:w-40`}
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Paid</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">Claim</th>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Expense Date</th>
                    <th className="px-6 py-4 text-right">
                      Claimed
                    </th>
                    <th className="px-6 py-4 text-right">
                      Approved
                    </th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="text-sm transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <p className="font-black text-slate-900">
                          {record.claimId}
                        </p>

                        <p className="mt-1 max-w-[230px] truncate text-xs text-slate-400">
                          {record.description}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-800">
                          {record.employeeName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {record.employeeId} ·{" "}
                          {record.department}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-semibold text-slate-600">
                        {record.category}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {record.expenseDate}
                      </td>

                      <td className="px-6 py-5 text-right font-black text-slate-900">
                        {formatCurrency(record.amount)}
                      </td>

                      <td className="px-6 py-5 text-right font-black text-emerald-700">
                        {formatCurrency(
                          record.approvedAmount,
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={record.status}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(
                                record.id,
                                "Approved",
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                            aria-label="Approve reimbursement"
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(
                                record.id,
                                "Rejected",
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                            aria-label="Reject reimbursement"
                          >
                            <XCircle size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(
                                record.id,
                                "Paid",
                              )
                            }
                            className="flex h-9 items-center justify-center rounded-xl bg-blue-50 px-3 text-xs font-black text-blue-700 transition hover:bg-blue-100"
                          >
                            Pay
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center"
                      >
                        <FileText
                          size={34}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-4 font-black text-slate-700">
                          No reimbursements found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Change the search or status filter.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReimbursementStatus;
}) {
  const className =
    status === "Approved"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Rejected"
        ? "bg-rose-100 text-rose-700"
        : status === "Paid"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}