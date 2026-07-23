import Link from "next/link";

import {
  ArrowLeft,
  BadgeIndianRupee,
  ClipboardCheck,
  FileText,
  IndianRupee,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

const gstModules = [
  {
    title: "GST Returns",
    description:
      "Manage GSTR-1, GSTR-3B and annual GST returns",
    href: "/finance/gst-center/returns",
    icon: FileText,
  },
  {
    title: "Input Tax Credit",
    description:
      "Track eligible and utilised input tax credits",
    href: "/finance/gst-center/input-tax-credit",
    icon: IndianRupee,
  },
  {
    title: "GST Collections",
    description:
      "Monitor output GST collected from customers",
    href: "/finance/gst-center/collections",
    icon: ReceiptText,
  },
  {
    title: "GST Compliance",
    description:
      "Review filing status and compliance alerts",
    href: "/finance/gst-center/compliance",
    icon: ShieldCheck,
  },
];

export default function GSTCenterPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <Link
          href="/finance"
          className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
          aria-label="Back to finance"
        >
          <ArrowLeft size={20} />
        </Link>

        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
              <BadgeIndianRupee size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">
                GST Center
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                GST collections, input credits, returns and reports
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {gstModules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.title}
                  href={module.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#102844] hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#102844] transition group-hover:bg-[#102844] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <h2 className="mt-5 text-lg font-black text-slate-950">
                    {module.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {module.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-black text-[#102844]">
                    <ClipboardCheck size={15} />
                    Open module
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}