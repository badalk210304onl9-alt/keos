"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  GraduationCap,
  IdCard,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "128",
    description: "Across 11 departments",
    change: "+4 this month",
    icon: UsersRound,
  },
  {
    title: "Present Today",
    value: "120",
    description: "93.7% attendance",
    change: "8 absent",
    icon: UserCheck,
  },
  {
    title: "Open Positions",
    value: "14",
    description: "6 high-priority roles",
    change: "82 candidates",
    icon: BriefcaseBusiness,
  },
  {
    title: "Pending Requests",
    value: "17",
    description: "Leave, payroll and documents",
    change: "Needs action",
    icon: ClipboardList,
  },
];

const modules = [
  {
    title: "HR Dashboard",
    description: "People analytics, workforce health and HR alerts",
    href: "/hr/dashboard",
    icon: UsersRound,
  },
  {
    title: "Organization & Workforce",
    description: "Structure, positions, manpower planning and headcount",
    href: "/hr/workforce",
    icon: BriefcaseBusiness,
  },
  {
    title: "Recruitment",
    description: "Job requisitions, vacancies and hiring pipeline",
    href: "/hr/recruitment",
    icon: UserPlus,
  },
  {
    title: "Candidates",
    description: "Applications, screening, stages and candidate records",
    href: "/hr/candidates",
    icon: IdCard,
  },
  {
    title: "Interviews",
    description: "Panels, schedules, scorecards and interview feedback",
    href: "/hr/interviews",
    icon: CalendarDays,
  },
  {
    title: "Offers & Background Checks",
    description: "Offer letters, approvals, verification and joining status",
    href: "/hr/offers",
    icon: BadgeCheck,
  },
  {
    title: "Onboarding",
    description: "Joining forms, induction, assets and orientation",
    href: "/hr/onboarding",
    icon: CheckCircle2,
  },
  {
    title: "Employee Directory",
    description: "Search and manage all employee records",
    href: "/hr/employees",
    icon: UsersRound,
  },
  {
    title: "Employee Profiles",
    description: "Personal, professional, bank and emergency information",
    href: "/hr/profiles",
    icon: IdCard,
  },
  {
    title: "Credentials & Permissions",
    description: "Create login access, roles and department permissions",
    href: "/hr/access",
    icon: ShieldCheck,
  },
  {
    title: "Attendance",
    description: "Daily attendance, regularization and biometric records",
    href: "/hr/attendance",
    icon: Clock3,
  },
  {
    title: "Shifts & Overtime",
    description: "Shift planning, rosters, overtime and weekly offs",
    href: "/hr/shifts",
    icon: CalendarDays,
  },
  {
    title: "Leave & WFH",
    description: "Leave balances, approvals, comp-off and remote work",
    href: "/hr/leave",
    icon: FileText,
  },
  {
    title: "Payroll Inputs",
    description: "Salary inputs, deductions, arrears and monthly payroll",
    href: "/hr/payroll",
    icon: WalletCards,
  },
  {
    title: "Compensation & Benefits",
    description: "CTC structures, bonuses, insurance and employee benefits",
    href: "/hr/compensation",
    icon: WalletCards,
  },
  {
    title: "Performance & Appraisals",
    description: "Reviews, ratings, appraisal cycles and feedback",
    href: "/hr/performance",
    icon: ClipboardList,
  },
  {
    title: "Goals & KPIs",
    description: "Employee goals, departmental targets and KPI tracking",
    href: "/hr/goals",
    icon: CheckCircle2,
  },
  {
    title: "Promotions & Transfers",
    description: "Promotion, designation, department and location changes",
    href: "/hr/promotions",
    icon: ArrowUpRight,
  },
  {
    title: "Training & Certifications",
    description: "Learning plans, courses, certifications and skills",
    href: "/hr/training",
    icon: GraduationCap,
  },
  {
    title: "Engagement & Surveys",
    description: "Employee feedback, surveys, recognition and engagement",
    href: "/hr/engagement",
    icon: UsersRound,
  },
  {
    title: "Grievances & Discipline",
    description: "Complaints, investigations, warnings and disciplinary cases",
    href: "/hr/grievances",
    icon: AlertTriangle,
  },
  {
    title: "Policies & POSH",
    description: "Policies, acknowledgements, POSH and workplace conduct",
    href: "/hr/policies",
    icon: ShieldCheck,
  },
  {
    title: "Compliance",
    description: "Contracts, statutory records and compliance monitoring",
    href: "/hr/compliance",
    icon: BadgeCheck,
  },
  {
    title: "Documents & Letters",
    description: "Contracts, payslips, letters and employee documents",
    href: "/hr/documents",
    icon: FileText,
  },
  {
    title: "Exit Management",
    description: "Resignation, notice period, clearance and exit interviews",
    href: "/hr/exit",
    icon: BriefcaseBusiness,
  },
  {
    title: "Full & Final Settlement",
    description: "Dues, recoveries, settlement and relieving documents",
    href: "/hr/settlement",
    icon: WalletCards,
  },
  {
    title: "HR Reports",
    description: "Headcount, attrition, payroll and workforce reports",
    href: "/hr/reports",
    icon: ClipboardList,
  },
  {
    title: "Audit Logs",
    description: "Track every HR record, permission and approval change",
    href: "/hr/audit",
    icon: ShieldCheck,
  },
];

const pendingActions = [
  {
    title: "Leave approvals",
    value: "8",
    description: "Requests awaiting HR review",
  },
  {
    title: "Candidate evaluations",
    value: "12",
    description: "Interview feedback pending",
  },
  {
    title: "Document verification",
    value: "5",
    description: "New joining documents",
  },
  {
    title: "Payroll exceptions",
    value: "3",
    description: "Salary inputs need correction",
  },
];

const recentEmployees = [
  {
    name: "Aarav Sharma",
    employeeId: "KRVE-EMP-0128",
    department: "Marketing",
    designation: "Content Executive",
    status: "Active",
  },
  {
    name: "Neha Verma",
    employeeId: "KRVE-EMP-0127",
    department: "Finance",
    designation: "Accounts Executive",
    status: "Onboarding",
  },
  {
    name: "Rohan Singh",
    employeeId: "KRVE-EMP-0126",
    department: "Warehouse",
    designation: "Inventory Associate",
    status: "Active",
  },
  {
    name: "Priya Mehta",
    employeeId: "KRVE-EMP-0125",
    department: "Customer Support",
    designation: "Support Executive",
    status: "Active",
  },
];

export default function HRPage() {
  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
              People Operations
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
              People & HR
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Complete workforce, recruitment, payroll, performance and compliance management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Search className="h-4 w-4" />
              Search Employees
            </button>

            <Link
              href="/hr/employees/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <UserPlus className="h-4 w-4" />
              Create Employee
            </Link>
          </div>
        </div>
      </section>

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">
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

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  HR Operations
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Complete HR workspace and employee lifecycle controls
                </p>
              </div>

              <span className="rounded-full bg-[#eef3f8] px-3 py-1.5 text-xs font-black text-[#10233b]">
                {modules.length} Modules
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="group flex min-h-[150px] flex-col rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-[#10233b] hover:bg-[#10233b] hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#10233b] transition group-hover:bg-white/10 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:text-white" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-[#10233b] transition group-hover:text-white">
                      {module.title}
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-slate-500 transition group-hover:text-slate-300">
                      {module.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </article>

          <aside className="space-y-5">
            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Pending Actions
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    HR attention required
                  </p>
                </div>

                <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-red-50 px-3 text-sm font-black text-[#d02b3f]">
                  28
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {pendingActions.map((action) => (
                  <button
                    key={action.title}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-[#10233b]">
                      {action.value}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-[#10233b]">
                        {action.title}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </button>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-lg">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                Workforce Health
              </p>

              <h3 className="mt-3 text-2xl font-black">
                94% operational
              </h3>

              <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
                Attendance and hiring remain healthy. Payroll exceptions and pending documentation require review.
              </p>

              <button
                type="button"
                className="mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                Open HR Analytics
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-[#10233b]">
                Recent Employees
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Latest employee and onboarding records
              </p>
            </div>

            <Link
              href="/hr/employees"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
            >
              View Directory
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Employee
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Employee ID
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Department
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Designation
                  </th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                  <th className="px-3 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentEmployees.map((employee) => (
                  <tr
                    key={employee.employeeId}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10233b] text-xs font-black text-white">
                          {employee.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <p className="text-sm font-black text-[#10233b]">
                          {employee.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-500">
                      {employee.employeeId}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-500">
                      {employee.department}
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-slate-500">
                      {employee.designation}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          employee.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600",
                        ].join(" ")}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-right">
                      <button
                        type="button"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-[#10233b] transition hover:bg-slate-50"
                      >
                        Open Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}