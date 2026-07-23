"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Landmark,
  IndianRupee,
  CalendarDays,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

type LoanStatus =
  | "Active"
  | "Closed"
  | "Overdue";

type Loan = {
  id: number;
  loanNo: string;
  lender: string;
  type: string;
  principal: number;
  outstanding: number;
  interest: number;
  emi: number;
  startDate: string;
  endDate: string;
  nextDue: string;
  status: LoanStatus;
};

const initialLoans: Loan[] = [
  {
    id: 1,
    loanNo: "LN-1001",
    lender: "HDFC Bank",
    type: "Business Loan",
    principal: 5000000,
    outstanding: 3480000,
    interest: 10.25,
    emi: 107500,
    startDate: "2025-04-15",
    endDate: "2030-04-15",
    nextDue: "2026-08-05",
    status: "Active",
  },
  {
    id: 2,
    loanNo: "LN-1002",
    lender: "ICICI Bank",
    type: "Working Capital",
    principal: 2500000,
    outstanding: 1760000,
    interest: 11.2,
    emi: 76400,
    startDate: "2025-09-10",
    endDate: "2028-09-10",
    nextDue: "2026-08-10",
    status: "Active",
  },
  {
    id: 3,
    loanNo: "LN-1003",
    lender: "Axis Bank",
    type: "Vehicle Loan",
    principal: 950000,
    outstanding: 120000,
    interest: 9.5,
    emi: 23800,
    startDate: "2023-06-20",
    endDate: "2027-06-20",
    nextDue: "2026-08-03",
    status: "Overdue",
  },
  {
    id: 4,
    loanNo: "LN-1004",
    lender: "SBI",
    type: "Equipment Finance",
    principal: 1800000,
    outstanding: 0,
    interest: 8.75,
    emi: 45200,
    startDate: "2022-03-01",
    endDate: "2026-03-01",
    nextDue: "-",
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

  const [loans, setLoans] =
    useState(initialLoans);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const filtered = useMemo(() => {

    return loans.filter((loan) => {

      const matchSearch =
        loan.loanNo.toLowerCase().includes(search.toLowerCase()) ||
        loan.lender.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filter === "All" ||
        loan.status === filter;

      return matchSearch && matchStatus;

    });

  }, [search, filter, loans]);

  const totalLoan =
    loans.reduce(
      (sum, item) => sum + item.principal,
      0
    );

  const outstanding =
    loans.reduce(
      (sum, item) => sum + item.outstanding,
      0
    );

  const monthlyEmi =
    loans
      .filter(x => x.status !== "Closed")
      .reduce(
        (sum, item) => sum + item.emi,
        0
      );

  const activeLoans =
    loans.filter(
      x => x.status === "Active"
    ).length;

  function markPaid(id:number){

      setLoans(current=>

        current.map(item=>{

          if(item.id!==id) return item;

          const remaining =
            Math.max(
              0,
              item.outstanding-item.emi
            );

          return{

            ...item,

            outstanding:remaining,

            status:
              remaining===0
              ? "Closed"
              :"Active"

          }

        })

      )

  }

  return (

<main className="min-h-screen bg-[#f5f7fb]">

<header className="border-b bg-white">

<div className="mx-auto max-w-[1600px] flex items-center justify-between px-8 py-5">

<div className="flex items-center gap-4">

<Link
href="/finance"
className="h-11 w-11 flex items-center justify-center rounded-xl border">

<ArrowLeft size={20}/>

</Link>

<div>

<h1 className="text-3xl font-black">

Loans & Liabilities

</h1>

<p className="text-slate-500">

Manage company borrowings and liabilities

</p>

</div>

</div>

<button className="bg-[#102844] text-white px-5 h-11 rounded-xl flex items-center gap-2">

<Plus size={17}/>

Add Loan

</button>

</div>

</header>

<div className="max-w-[1600px] mx-auto p-8 space-y-6">

<div className="grid xl:grid-cols-4 gap-5">

<Card
title="Total Borrowings"
value={formatCurrency(totalLoan)}
icon={<Landmark size={22}/>}
/>

<Card
title="Outstanding"
value={formatCurrency(outstanding)}
icon={<IndianRupee size={22}/>}
/>

<Card
title="Monthly EMI"
value={formatCurrency(monthlyEmi)}
icon={<CalendarDays size={22}/>}
/>

<Card
title="Active Loans"
value={String(activeLoans)}
icon={<CheckCircle2 size={22}/>}
/>

</div>
<section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

  <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">

    <div>
      <h2 className="text-lg font-black text-slate-950">
        Loan Register
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Review outstanding balances, EMI schedules and repayment status
      </p>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row">

      <div className="relative">

        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
        />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search lender or loan number"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 sm:w-72"
        />

      </div>

      <select
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
      >
        <option value="All">All</option>
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

          <th className="px-6 py-4">
            Loan
          </th>

          <th className="px-6 py-4">
            Lender
          </th>

          <th className="px-6 py-4">
            Tenure
          </th>

          <th className="px-6 py-4 text-right">
            Principal
          </th>

          <th className="px-6 py-4 text-right">
            Outstanding
          </th>

          <th className="px-6 py-4 text-right">
            Interest
          </th>

          <th className="px-6 py-4 text-right">
            EMI
          </th>

          <th className="px-6 py-4">
            Next Due
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

        {filtered.map((loan) => (

          <tr
            key={loan.id}
            className="text-sm transition hover:bg-slate-50"
          >

            <td className="px-6 py-5">

              <p className="font-black text-slate-900">
                {loan.type}
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
              {loan.interest}%
            </td>

            <td className="px-6 py-5 text-right font-bold text-slate-800">
              {formatCurrency(loan.emi)}
            </td>

            <td className="px-6 py-5">

              <div className="flex items-center gap-2 text-slate-500">

                <Clock3 size={15} />

                {loan.nextDue}

              </div>

            </td>

            <td className="px-6 py-5">
              <StatusBadge status={loan.status} />
            </td>

            <td className="px-6 py-5 text-right">

              {loan.status !== "Closed" ? (

                <button
                  type="button"
                  onClick={() => markPaid(loan.id)}
                  className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-100"
                >
                  Record Payment
                </button>

              ) : (

                <span className="text-xs font-black text-emerald-700">
                  Fully Repaid
                </span>

              )}

            </td>

          </tr>

        ))}

        {filtered.length === 0 && (

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

        )}

      </tbody>

    </table>

  </div>

</section>

</div>

</main>

  );

}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
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