"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Save,
  Users,
} from "lucide-react";

type PayrollStatus = "Pending" | "Approved" | "Rejected";

type PayrollEmployee = {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: PayrollStatus;
};

const initialEmployees: PayrollEmployee[] = [
  {
    id: 1,
    employeeId: "KRVE-EMP-001",
    name: "Aarav Sharma",
    department: "Finance",
    designation: "Finance Manager",
    basicSalary: 85000,
    allowances: 15000,
    deductions: 8000,
    netSalary: 92000,
    status: "Pending",
  },
  {
    id: 2,
    employeeId: "KRVE-EMP-002",
    name: "Riya Verma",
    department: "Marketing",
    designation: "Marketing Manager",
    basicSalary: 72000,
    allowances: 12000,
    deductions: 6500,
    netSalary: 77500,
    status: "Pending",
  },
  {
    id: 3,
    employeeId: "KRVE-EMP-003",
    name: "Kabir Singh",
    department: "Technology",
    designation: "Software Engineer",
    basicSalary: 95000,
    allowances: 18000,
    deductions: 10000,
    netSalary: 103000,
    status: "Approved",
  },
  {
    id: 4,
    employeeId: "KRVE-EMP-004",
    name: "Ananya Gupta",
    department: "Human Resources",
    designation: "HR Executive",
    basicSalary: 58000,
    allowances: 9000,
    deductions: 5000,
    netSalary: 62000,
    status: "Pending",
  },
  {
    id: 5,
    employeeId: "KRVE-EMP-005",
    name: "Vivaan Mehta",
    department: "Operations",
    designation: "Operations Lead",
    basicSalary: 78000,
    allowances: 13000,
    deductions: 7000,
    netSalary: 84000,
    status: "Approved",
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PayrollApprovalCreatePage() {
  const [employees, setEmployees] =
    useState<PayrollEmployee[]>(initialEmployees);

  const [payrollMonth, setPayrollMonth] = useState("2026-07");
  const [approvalDate, setApprovalDate] = useState("2026-07-23");
  const [paymentDate, setPaymentDate] = useState("2026-07-31");
  const [remarks, setRemarks] = useState(
    "Monthly payroll reviewed against attendance and approved salary structure.",
  );

  const [message, setMessage] = useState("");

  const totalEmployees = employees.length;

  const approvedEmployees = employees.filter(
    (employee) => employee.status === "Approved",
  ).length;

  const pendingEmployees = employees.filter(
    (employee) => employee.status === "Pending",
  ).length;

  const totalPayroll = useMemo(
    () =>
      employees.reduce(
        (total, employee) => total + employee.netSalary,
        0,
      ),
    [employees],
  );

  const approvedPayroll = useMemo(
    () =>
      employees
        .filter((employee) => employee.status === "Approved")
        .reduce(
          (total, employee) => total + employee.netSalary,
          0,
        ),
    [employees],
  );

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function updateEmployeeStatus(
    id: number,
    status: PayrollStatus,
  ) {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status,
            }
          : employee,
      ),
    );
  }

  function approveAllPayroll() {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) => ({
        ...employee,
        status: "Approved",
      })),
    );

    showMessage("All payroll records approved successfully.");
  }

  function saveDraft() {
    showMessage("Payroll approval saved as draft.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={18} />
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
                  Payroll Approval
                </h1>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-700">
                  {pendingEmployees > 0
                    ? `${pendingEmployees} Pending`
                    : "Approved"}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Review salary inputs and approve monthly payroll.
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
              onClick={approveAllPayroll}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17385f]"
            >
              <BadgeCheck size={17} />
              Approve All Payroll
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Employees"
            value={String(totalEmployees)}
            description="Employees included in payroll"
            icon={<Users size={22} />}
          />

          <SummaryCard
            title="Total Payroll"
            value={formatCurrency(totalPayroll)}
            description="Total net salary payable"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Pending Approval"
            value={String(pendingEmployees)}
            description="Salary records awaiting review"
            icon={<Clock3 size={22} />}
          />

          <SummaryCard
            title="Approved Payroll"
            value={formatCurrency(approvedPayroll)}
            description={`${approvedEmployees} employees approved`}
            icon={<CheckCircle2 size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-black text-slate-950">
              Payroll Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select payroll period, approval date and payment date.
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Payroll Month
              </label>

              <input
                type="month"
                value={payrollMonth}
                onChange={(event) =>
                  setPayrollMonth(event.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Approval Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="date"
                  value={approvalDate}
                  onChange={(event) =>
                    setApprovalDate(event.target.value)
                  }
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Payment Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="date"
                  value={paymentDate}
                  onChange={(event) =>
                    setPaymentDate(event.target.value)
                  }
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Employee Payroll Review
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review employee salary calculations before approval.
              </p>
            </div>

            <span className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
              {totalEmployees} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-right">
                    Basic Salary
                  </th>
                  <th className="px-6 py-4 text-right">
                    Allowances
                  </th>
                  <th className="px-6 py-4 text-right">
                    Deductions
                  </th>
                  <th className="px-6 py-4 text-right">
                    Net Salary
                  </th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-sm transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-900">
                        {employee.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {employee.employeeId} ·{" "}
                        {employee.designation}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-600">
                      {employee.department}
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-slate-700">
                      {formatCurrency(employee.basicSalary)}
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-emerald-700">
                      {formatCurrency(employee.allowances)}
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-rose-700">
                      {formatCurrency(employee.deductions)}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-slate-950">
                      {formatCurrency(employee.netSalary)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={employee.status} />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateEmployeeStatus(
                              employee.id,
                              "Approved",
                            )
                          }
                          className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-100"
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateEmployeeStatus(
                              employee.id,
                              "Rejected",
                            )
                          }
                          className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 transition hover:bg-rose-100"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-black text-slate-950">
              Approval Remarks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add notes for finance and payroll processing teams.
            </p>
          </div>

          <div className="p-6">
            <textarea
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              placeholder="Enter payroll approval remarks"
            />
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
  status: PayrollStatus;
}) {
  const className =
    status === "Approved"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Rejected"
        ? "bg-rose-100 text-rose-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}