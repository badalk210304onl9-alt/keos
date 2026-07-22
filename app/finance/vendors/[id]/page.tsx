"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function VendorDetailsPage() {
  const params = useParams();
  const vendorId = params.id;

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-8 text-[#10233b]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/finance/vendors"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vendors
        </Link>

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
            Vendor Management
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Vendor Details
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Vendor ID:
            <span className="ml-2 font-black text-[#10233b]">
              {String(vendorId)}
            </span>
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm font-black">
              Vendor profile module
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              Vendor information, transactions, bills and payment history will
              appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}