"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";

export default function PayrollApprovalCreatePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/finance/payroll-approval"
          className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          <ArrowLeft size={20} />
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
              <BadgeCheck size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-950">
                Payroll Approval
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Review and approve employee payroll processing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}