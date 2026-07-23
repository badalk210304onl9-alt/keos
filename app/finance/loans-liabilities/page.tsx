"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Landmark,
  Plus,
  Search,
  X,
} from "lucide-react";

type LoanStatus = "Active" | "Overdue" | "Closed";

type Loan = {
  id: number;
  loanNo: string;
  lender: string;
  loanType: string;
  principal: number;
  outstanding: number;
  interestRate: number;
  emi: number;
  startDate: string;
  endDate: string;
  nextDueDate: string;
  status: LoanStatus;
};

type LoanFormState = {
  loanNo: string;
  lender: string;
  loanType: string;
  principal: string;
  outstanding: string;
  interestRate: string;
  emi: string;
  startDate: string;
  endDate: string;
  nextDueDate: string;
  status: LoanStatus;
};

const INITIAL_LOANS: Loan[] = [
  {
    id: 1,
    loanNo: "LN-1001",
    lender: "HDFC Bank",
    loanType: "Business Loan",
    principal: 5000000,
    outstanding: 3480000,
    interestRate: 10.25,
    emi: 107500,
    startDate: "2025-04-15",
    endDate: "2030-04-15",
    nextDueDate: "2026-08-05",
    status: "Active",
  },
  {
    id: 2,
    loanNo: "LN-1002",
    lender: "ICICI Bank",
    loanType: "Working Capital Loan",
    principal: 2500000,
    outstanding: 1760000,
    interestRate: 11.2,
    emi: 76400,
    startDate: "2025-09-10",
    endDate: "2028-09-10",
    nextDueDate: "2026-08-10",
    status: "Active",
  },
  {
    id: 3,
    loanNo: "LN-1003",
    lender: "Axis Bank",
    loanType: "Vehicle Loan",
    principal: 950000,
    outstanding: 120000,
    interestRate: 9.5,
    emi: 23800,
    startDate: "2023-06-20",
    endDate: "2027-06-20",
    nextDueDate: "2026-08-03",
    status: "Overdue",
  },
  {
    id: 4,
    loanNo: "LN-1004",
    lender: "State Bank of India",
    loanType: "Equipment Finance",
    principal: 1800000,
    outstanding: 0,
    interestRate: 8.75,
    emi: 45200,
    startDate: "2022-03-01",
    endDate: "2026-03-01",
    nextDueDate: "-",
    status: "Closed",
  },
];

const EMPTY_FORM: LoanFormState = {
  loanNo: "",
  lender: "",
  loanType: "Business Loan",
  principal: "",
  outstanding: "",
  interestRate: "",
  emi: "",
  startDate: "",
  endDate: "",
  nextDueDate: "",
  status: "Active",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LoansLiabilitiesPage() {
  const [loans, setLoans] = useState<Loan[]>(INITIAL_LOANS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | LoanStatus
  >("All");

  const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
  const [form, setForm] = useState<LoanFormState>(EMPTY_FORM);
  const [notification, setNotification] = useState("");

  const filteredLoans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return loans.filter((loan) => {
      const matchesSearch =
        loan.loanNo.toLowerCase().includes(query) ||
        loan.lender.toLowerCase().includes(query) ||
        loan.loanType.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, search, statusFilter]);

  const totalBorrowings = useMemo(
    () => loans.reduce((total, loan) => total + loan.principal, 0),
    [loans],
  );

  const totalOutstanding = useMemo(
    () =>
      loans.reduce(
        (total, loan) => total + loan.outstanding,
        0,
      ),
    [loans],
  );

  const totalMonthlyEmi = useMemo(
    () =>
      loans
        .filter((loan) => loan.status !== "Closed")
        .reduce((total, loan) => total + loan.emi, 0),
    [loans],
  );

  const activeLoans = useMemo(
    () => loans.filter((loan) => loan.status === "Active").length,
    [loans],
  );

  function showNotification(message: string): void {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function updateForm(
    field: keyof LoanFormState,
    value: string,
  ): void {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function closeAddLoanModal(): void {
    setIsAddLoanOpen(false);
    setForm(EMPTY_FORM);
  }

  function handleAddLoan(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    const principal = Number(form.principal);
    const outstanding = Number(form.outstanding);
    const interestRate = Number(form.interestRate);
    const emi = Number(form.emi);

    if (
      !form.loanNo.trim() ||
      !form.lender.trim() ||
      !form.loanType.trim() ||
      !form.startDate ||
      !form.endDate ||
      principal <= 0 ||
      outstanding < 0 ||
      interestRate < 0 ||
      emi <= 0
    ) {
      showNotification("Please enter all required loan details.");
      return;
    }

    if (form.endDate < form.startDate) {
      showNotification("End date cannot be before start date.");
      return;
    }

    const loanAlreadyExists = loans.some(
      (loan) =>
        loan.loanNo.toLowerCase() ===
        form.loanNo.trim().toLowerCase(),
    );

    if (loanAlreadyExists) {
      showNotification("This loan number already exists.");
      return;
    }

    const finalStatus: LoanStatus =
      outstanding === 0 ? "Closed" : form.status;

    const newLoan: Loan = {
      id: Date.now(),
      loanNo: form.loanNo.trim(),
      lender: form.lender.trim(),
      loanType: form.loanType.trim(),
      principal,
      outstanding,
      interestRate,
      emi,
      startDate: form.startDate,
      endDate: form.endDate,
      nextDueDate:
        finalStatus === "Closed"
          ? "-"
          : form.nextDueDate || "-",
      status: finalStatus,
    };

    setLoans((currentLoans) => [newLoan, ...currentLoans]);
    closeAddLoanModal();
    showNotification("Loan added successfully.");
  }

  function recordPayment(loanId: number): void {
    setLoans((currentLoans) =>
      currentLoans.map((loan) => {
        if (loan.id !== loanId || loan.status === "Closed") {
          return loan;
        }

        const updatedOutstanding = Math.max(
          0,
          loan.outstanding - loan.emi,
        );

        return {
          ...loan,
          outstanding: updatedOutstanding,
          status:
            updatedOutstanding === 0 ? "Closed" : "Active",
          nextDueDate:
            updatedOutstanding === 0 ? "-" : loan.nextDueDate,
        };
      }),
    );

    showNotification("Payment recorded successfully.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {notification ? (
        <div className="fixed right-5 top-5 z-[100] max-w-sm rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#102844] shadow-2xl">
          {notification}
        </div>
      ) : null}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              aria-label="Back to Finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
                Loans &amp; Liabilities
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage company borrowings, repayments and outstanding
                liabilities
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddLoanOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17395f]"
          >
            <Plus size={17} />
            Add Loan
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 p-5 sm:p-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Borrowings"
            value={formatCurrency(totalBorrowings)}
            description="Total sanctioned principal"
            icon={<Landmark size={22} />}
          />

          <SummaryCard
            title="Outstanding"
            value={formatCurrency(totalOutstanding)}
            description="Amount pending for repayment"
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Monthly EMI"
            value={formatCurrency(totalMonthlyEmi)}
            description="Combined running loan EMI"
            icon={<CalendarDays size={22} />}
          />

          <SummaryCard
            title="Active Loans"
            value={String(activeLoans)}
            description="Currently active borrowings"
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
                Review lenders, outstanding balances and repayment
                schedules
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
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
                  placeholder="Search lender, type or number"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 sm:w-72"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as "All" | LoanStatus,
                  )
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-slate-400"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Overdue">Overdue</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Loan</th>
                  <th className="px-6 py-4">Lender</th>
                  <th className="px-6 py-4">Tenure</th>
                  <th className="px-6 py-4 text-right">
                    Principal
                  </th>
                  <th className="px-6 py-4 text-right">
                    Outstanding
                  </th>
                  <th className="px-6 py-4 text-right">
                    Interest
                  </th>
                  <th className="px-6 py-4 text-right">EMI</th>
                  <th className="px-6 py-4">Next Due</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-900">
                        {loan.loanType}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {loan.loanNo}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-700">
                      {loan.lender}
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-700">
                        {loan.startDate}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        to {loan.endDate}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-slate-800">
                      {formatCurrency(loan.principal)}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(loan.outstanding)}
                    </td>

                    <td className="px-6 py-5 text-right font-semibold text-slate-700">
                      {loan.interestRate}%
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-slate-800">
                      {formatCurrency(loan.emi)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock3 size={15} />
                        {loan.nextDueDate}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={loan.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      {loan.status === "Closed" ? (
                        <span className="text-xs font-black text-emerald-700">
                          Fully Repaid
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => recordPayment(loan.id)}
                          className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-100"
                        >
                          Record Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-16 text-center"
                    >
                      <AlertTriangle
                        size={34}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-black text-slate-700">
                        No loan records found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Change the search term or status filter.
                      </p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isAddLoanOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Add New Loan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter loan and repayment information
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddLoanModal}
                aria-label="Close add loan form"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleAddLoan}
              className="space-y-6 p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Loan Number">
                  <input
                    required
                    value={form.loanNo}
                    onChange={(event) =>
                      updateForm("loanNo", event.target.value)
                    }
                    placeholder="LN-1005"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Lender">
                  <input
                    required
                    value={form.lender}
                    onChange={(event) =>
                      updateForm("lender", event.target.value)
                    }
                    placeholder="Bank or financial institution"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Loan Type">
                  <select
                    value={form.loanType}
                    onChange={(event) =>
                      updateForm("loanType", event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="Business Loan">
                      Business Loan
                    </option>
                    <option value="Working Capital Loan">
                      Working Capital Loan
                    </option>
                    <option value="Term Loan">Term Loan</option>
                    <option value="Equipment Finance">
                      Equipment Finance
                    </option>
                    <option value="Vehicle Loan">
                      Vehicle Loan
                    </option>
                    <option value="Overdraft Facility">
                      Overdraft Facility
                    </option>
                    <option value="Other Liability">
                      Other Liability
                    </option>
                  </select>
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm("status", event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="Active">Active</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Closed">Closed</option>
                  </select>
                </FormField>

                <FormField label="Principal Amount">
                  <input
                    required
                    min="1"
                    type="number"
                    value={form.principal}
                    onChange={(event) =>
                      updateForm("principal", event.target.value)
                    }
                    placeholder="5000000"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Outstanding Amount">
                  <input
                    required
                    min="0"
                    type="number"
                    value={form.outstanding}
                    onChange={(event) =>
                      updateForm(
                        "outstanding",
                        event.target.value,
                      )
                    }
                    placeholder="3480000"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Interest Rate (%)">
                  <input
                    required
                    min="0"
                    step="0.01"
                    type="number"
                    value={form.interestRate}
                    onChange={(event) =>
                      updateForm(
                        "interestRate",
                        event.target.value,
                      )
                    }
                    placeholder="10.25"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Monthly EMI">
                  <input
                    required
                    min="1"
                    type="number"
                    value={form.emi}
                    onChange={(event) =>
                      updateForm("emi", event.target.value)
                    }
                    placeholder="107500"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Start Date">
                  <input
                    required
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      updateForm("startDate", event.target.value)
                    }
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="End Date">
                  <input
                    required
                    type="date"
                    value={form.endDate}
                    onChange={(event) =>
                      updateForm("endDate", event.target.value)
                    }
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Next Payment Due">
                  <input
                    type="date"
                    disabled={form.status === "Closed"}
                    value={form.nextDueDate}
                    onChange={(event) =>
                      updateForm(
                        "nextDueDate",
                        event.target.value,
                      )
                    }
                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </FormField>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeAddLoanModal}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-6 text-sm font-bold text-white transition hover:bg-[#17395f]"
                >
                  <Plus size={17} />
                  Save Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}

const inputClassName =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400";

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
  status: LoanStatus;
}) {
  const badgeClassName =
    status === "Active"
      ? "bg-blue-100 text-blue-700"
      : status === "Closed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${badgeClassName}`}
    >
      {status}
    </span>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </span>

      {children}
    </label>
  );
}