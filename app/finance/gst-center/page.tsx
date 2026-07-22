"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileCheck2,
  FileText,
  IndianRupee,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

export default function GSTCenterPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-900 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          <ArrowLeft size={20} />
        </button>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
              <FileCheck2 size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-black">GST Center</h1>
              <p className="mt-1 text-sm text-slate-500">
                GST collections, input credits, returns and reports
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <GSTCard
              title="GST Returns"
              description="Manage GSTR-1, GSTR-3B and annual GST returns"
              href="/finance/gst-center/returns"
              icon={<FileText size={22} />}
            />

            <GSTCard
              title="Input Tax Credit"
              description="Track eligible and utilised input tax credits"
              href="#"
              icon={<IndianRupee size={22} />}
            />

            <GSTCard
              title="GST Collections"
              description="Monitor output GST collected from customers"
              href="#"
              icon={<ReceiptText size={22} />}
            />

            <GSTCard
              title="GST Compliance"
              description="Review filing status and compliance alerts"
              href="#"
              icon={<ShieldCheck size={22} />}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function GSTCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
        {icon}
      </div>

      <h2 className="mt-5 text-base font-black">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </Link>
  );
}