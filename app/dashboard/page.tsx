"use client";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeIndianRupee,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Headphones,
  PackageCheck,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    title: "Revenue Today",
    value: "₹84,620",
    change: "+18.4%",
    description: "Compared with yesterday",
    icon: BadgeIndianRupee,
    type: "positive",
  },
  {
    title: "Orders",
    value: "126",
    change: "+12.1%",
    description: "18 currently processing",
    icon: ShoppingBag,
    type: "positive",
  },
  {
    title: "Employees",
    value: "128",
    change: "94%",
    description: "120 employees present",
    icon: UsersRound,
    type: "positive",
  },
  {
    title: "Inventory Units",
    value: "8,492",
    change: "6 alerts",
    description: "Low-stock attention required",
    icon: Boxes,
    type: "warning",
  },
];

const departments = [
  {
    name: "People & HR",
    status: "Operational",
    detail: "120 employees present today",
    icon: UsersRound,
    href: "/hr",
  },
  {
    name: "Finance",
    status: "Operational",
    detail: "₹84,620 revenue recorded",
    icon: BadgeIndianRupee,
    href: "/finance",
  },
  {
    name: "Orders",
    status: "Operational",
    detail: "18 orders currently processing",
    icon: PackageCheck,
    href: "/orders",
  },
  {
    name: "Products",
    status: "Attention",
    detail: "6 products have low inventory",
    icon: ShoppingBag,
    href: "/products",
  },
  {
    name: "Warehouse",
    status: "Operational",
    detail: "14 shipments ready for dispatch",
    icon: Boxes,
    href: "/warehouse",
  },
  {
    name: "Customer Support",
    status: "Attention",
    detail: "3 escalated tickets pending",
    icon: Headphones,
    href: "/support",
  },
  {
    name: "Marketing",
    status: "Operational",
    detail: "4 active campaigns running",
    icon: TrendingUp,
    href: "/marketing",
  },
  {
    name: "Security",
    status: "Operational",
    detail: "No critical incident detected",
    icon: ShieldCheck,
    href: "/security",
  },
];

const activities = [
  {
    title: "New order received",
    detail: "Order #KRVE-1048 worth ₹18,999",
    time: "2 min ago",
    icon: ShoppingBag,
  },
  {
    title: "Leave request submitted",
    detail: "Priya Sharma requested two days of leave",
    time: "14 min ago",
    icon: CalendarDays,
  },
  {
    title: "Low-stock alert generated",
    detail: "KRVE Noir Blazer has six units remaining",
    time: "28 min ago",
    icon: AlertTriangle,
  },
  {
    title: "Payment reconciled",
    detail: "Razorpay settlement successfully verified",
    time: "1 hour ago",
    icon: CheckCircle2,
  },
];

const approvals = [
  {
    title: "Expense Approval",
    description: "Marketing campaign budget",
    amount: "₹45,000",
    status: "Pending",
  },
  {
    title: "Leave Approval",
    description: "Rahul Sharma · Finance",
    amount: "3 days",
    status: "Pending",
  },
  {
    title: "Purchase Approval",
    description: "Premium packaging materials",
    amount: "₹72,500",
    status: "Pending",
  },
];

const quickActions = [
  {
    title: "Review Approvals",
    description: "7 requests awaiting decision",
    icon: ClipboardCheck,
  },
  {
    title: "Enterprise Report",
    description: "Open company-wide performance",
    icon: Activity,
  },
  {
    title: "KRVE AI Insights",
    description: "View intelligent recommendations",
    icon: Sparkles,
  },
  {
    title: "System Settings",
    description: "Manage roles and permissions",
    icon: Settings,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex w-full flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
              Founder Office
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
              Mission Control
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Enterprise-wide operational overview
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:px-5">
              <p className="text-sm font-black text-[#10233b]">
                Badal Kumar
              </p>

              <p className="text-xs font-medium text-slate-500">
                Founder & Chief Executive
              </p>
            </div>

            <button
              type="button"
              aria-label="Dashboard settings"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#10233b]"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="w-full space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-[28px] bg-[#10233b] px-6 py-8 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                Enterprise Command
              </p>

              <h2 className="mt-4 text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px]">
                KRVE is operating normally across all authorized departments.
              </h2>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300">
                Revenue, orders and customer growth are above target.
                Inventory and three customer-support escalations require
                immediate attention.
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              View enterprise report
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const warning = stat.type === "warning";

            return (
              <article
                key={stat.title}
                className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={[
                      "rounded-full px-2.5 py-1 text-[11px] font-black",
                      warning
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600",
                    ].join(" ")}
                  >
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-black tracking-tight text-[#10233b]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.6fr)]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#10233b]">
                  Enterprise Performance
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Revenue and order performance for this month
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-50"
              >
                Last 30 days
              </button>
            </div>

            <div className="mt-6">
              <div className="flex h-[270px] items-end gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 pb-4 pt-8 sm:gap-5 sm:px-6">
                {[42, 56, 48, 69, 62, 78, 70, 86, 76, 91, 82, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex h-full min-w-0 flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-lg bg-[#10233b] transition hover:bg-[#d02b3f]"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Monthly revenue
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#10233b]">
                    ₹18.42L
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />

                  <span className="text-xs font-black text-emerald-600">
                    24.8% growth
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h3 className="text-lg font-black text-[#10233b]">
                Live Activity
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Latest enterprise events
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <button
                    key={activity.title}
                    type="button"
                    className="flex w-full min-w-0 gap-3 rounded-2xl border border-slate-100 p-3 text-left transition hover:border-slate-200 hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[#10233b]">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                        {activity.detail}
                      </p>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.42fr)]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#10233b]">
                  Department Status
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Real-time operational health
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl bg-[#10233b] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#183653]"
              >
                View all departments
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {departments.map((department) => {
                const Icon = department.icon;
                const needsAttention = department.status === "Attention";

                return (
                  <button
                    key={department.name}
                    type="button"
                    className="rounded-2xl border border-slate-200 p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          needsAttention
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600",
                        ].join(" ")}
                      >
                        {department.status}
                      </span>
                    </div>

                    <h4 className="mt-4 text-sm font-black text-[#10233b]">
                      {department.name}
                    </h4>

                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                      {department.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#10233b]">
                  Pending Approvals
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Founder action required
                </p>
              </div>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#fff1f2] px-3 text-sm font-black text-[#d02b3f]">
                7
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {approvals.map((approval) => (
                <button
                  key={`${approval.title}-${approval.description}`}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-[#10233b]">
                      {approval.title}
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-slate-500">
                      {approval.description}
                    </p>

                    <p className="mt-2 text-xs font-black text-[#d02b3f]">
                      {approval.amount}
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Review all approvals
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h3 className="text-lg font-black text-[#10233b]">
              Quick Actions
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Frequently used founder controls
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-[#10233b] hover:bg-[#10233b]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b] transition group-hover:bg-white/10 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#10233b] transition group-hover:text-white">
                      {action.title}
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-slate-500 transition group-hover:text-slate-300">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS — KRVE Enterprise Operating System</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All systems operational</span>
            <span>·</span>
            <span>Last updated just now</span>
          </div>
        </footer>
      </div>
    </div>
  );
}