"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  IndianRupee,
  Landmark,
  Plus,
  Search,
} from "lucide-react";

type LoanStatus = "Active" | "Closed" | "Overdue";

type LoanRecord = {
  id: number;
  loanId: string;
  lender: string;
  loanType: string;
  startDate: string;
  maturityDate: string;
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  monthlyEmi: number;
  nextDueDate: string;
  status: LoanStatus;
};

const initialLoans: LoanRecord[] = [
  {
    id: 1,
    loanId: "LOAN-001",
    lender: "HDFC Bank",
    loanType: "Business Term Loan",
    startDate: "2025-04-10",
    maturityDate: "2030-04-10",
    principalAmount: 5000000,
    outstandingAmount: 3850000,
    interestRate: 10.5,
    monthlyEmi: 107500,
    nextDueDate: "2026-08-05",
    status: "Active",
  },
  {
    id: 2,
    loanId: "LOAN-002",
    lender: "ICICI Bank",
    loanType: "Working Capital Loan",
    startDate: "2025-09-01",
    maturityDate: "2028-09-01",
    principalAmount: 2500000,
    outstandingAmount: 1920000,
    interestRate: 11.25,
    monthlyEmi: 82100,
    nextDueDate: "2026-08-08",
    status: "Active",
  },
  {
    id: 3,
    loanId: "LOAN-003",
    lender: "Tata Capital",
    loanType: "Equipment Finance",
    startDate: "2024-02-15",
    maturityDate: "2027-02-15",
    principalAmount: 1800000,
    outstandingAmount: 620000,
    interestRate: 12,
    monthlyEmi: 59800,
    nextDueDate: "2026-08-02",
    status: "Overdue",
  },
  {
    id: 4,
    loanId: "LOAN-004",
    lender: "State Bank of India",
    loanType: "Vehicle Loan",
    startDate: "2022-06-20",
    maturityDate: "2026-06-20",
    principalAmount: 950000,
    outstandingAmount: 0,
    interestRate: 9.5,
    monthlyEmi: 24500,
    nextDueDate: "",
    status: "Closed",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LoansLiabilitiesPage() {
  const [loans, setLoans] = useState<LoanRecord[]>(initialLoans);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredLoans = useMemo(() => {
    const query = search.toLowerCase();

    return loans.filter((loan) => {
      const matchesSearch =
        loan.lender.toLowerCase().includes(query) ||
        loan.loanId.toLowerCase().includes(query) ||
        loan.loanType.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, search, statusFilter]);

  const totalPrincipal = loans.reduce(
    (sum, loan) => sum + loan.principalAmount,
    0,
  );

  const totalOutstanding = loans.reduce(
    (sum, loan) => sum + loan.outstandingAmount,
    0,
  );

  const totalEmi = loans
    .filter((loan) => loan.status !== "Closed")
    .reduce((sum, loan) => sum + loan.monthlyEmi, 0);

  const activeLoans = loans.filter(
    (loan) => loan.status === "Active",
  ).length;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function markPaid(id: number) {
    setLoans((currentLoans) =>
      currentLoans.map((loan) =>
        loan.id === id
          ? {
              ...loan,
              outstandingAmount: Math.max(
                0,
                loan.outstandingAmount - loan.monthlyEmi,
              ),
              status:
                loan.outstandingAmount - loan.monthlyEmi <= 0
                  ? "Closed"
                  : "Active",
            }
          : loan,
      ),
    );

    showMessage("Loan repayment recorded successfully.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">
          {message}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Loans & Liabilities
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage company borrowings, repayments and liabilities
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showMessage("New loan form will open here.")}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
          >
            <Plus size={17} />
            Add Loan
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Borrowings"
            value={formatCurrency(totalPrincipal)}
            description="Original sanctioned loan value"
            icon={<Landmark size={22} />}
          />

          <SummaryCard
            title="Outstanding Liability"
            value={formatCurrency(totalOutstanding)}
            description="Remaining amount payable"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Monthly EMI"
            value={formatCurrency(totalEmi)}
            description="Current monthly repayment"
            icon={<CircleDollarSign size={22} />}
          />

          <SummaryCard
            title="Active Loans"
            value={String(activeLoans)}
            description="Currently active facilities"
            icon={<CheckCircle2 size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Loan Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review outstanding balances and repayment schedules
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search lender or loan"
                  className="h-11 rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Overdue</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Loan</th>
                  <th className="px-6 py-4">Lender</th>
                  <th className="px-6 py-4">Maturity</th>
                  <th className="px-6 py-4 text-right">Principal</th>
                  <th className="px-6 py-4 text-right">
                    Outstanding
                  </th>
                  <th className="px-6 py-4 text-right">Interest</th>
                  <th className="px-6 py-4 text-right">Monthly EMI</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="text-sm">
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-900">
                        {loan.loanType}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {loan.loanId}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" />
                        <span className="font-bold text-slate-700">
                          {loan.lender}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <CalendarDays size={15} />
                        {loan.maturityDate}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right font-bold">
                      {formatCurrency(loan.principalAmount)}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(loan.outstandingAmount)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      {loan.interestRate}%
                    </td>

                    <td className="px-6 py-5 text-right font-bold">
                      {formatCurrency(loan.monthlyEmi)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={loan.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      {loan.status !== "Closed" ? (
                        <button
                          type="button"
                          onClick={() => markPaid(loan.id)}
                          className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100"
                        >
                          Record Payment
                        </button>
                      ) : (
                        <span className="text-xs font-black text-emerald-700">
                          Repaid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredLoans.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center text-sm font-bold text-slate-400"
                    >
                      No loan records found
                    </td>
                  </tr>
                )}
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
          <p className="text-xs font-bold text-slate-500">{title}</p>

          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
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

function StatusBadge({ status }: { status: LoanStatus }) {
  const className =
    status === "Active"
      ? "bg-blue-100 text-blue-700"
      : status === "Closed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {status}
    </span>
  );
}