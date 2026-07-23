import Link from "next/link";
import {
  Users,
  BriefcaseBusiness,
  UserPlus,
} from "lucide-react";

const hrModules = [
  {
    title: "HR Dashboard",
    description:
      "People analytics, workforce health and HR alerts",
    href: "/hr",
    icon: "👥",
  },
  {
    title: "Organization & Workforce",
    description:
      "Structure, positions, manpower planning and headcount",
    href: "/hr/organization-workforce",
    icon: "💼",
  },
  {
    title: "Recruitment",
    description:
      "Job requisitions, vacancies and hiring pipeline",
    href: "/hr/recruitment",
    icon: "👤",
  },
  {
    title: "Employee Directory",
    description:
      "Employee profiles, departments, roles and contact details",
    href: "/hr/employees",
    icon: "👥",
  },
  {
    title: "Attendance & Leave",
    description:
      "Attendance records, leave requests and shift management",
    href: "/hr/attendance-leave",
    icon: "🗓",
  },
  {
    title: "Payroll",
    description:
      "Salary processing, deductions, benefits and payslips",
    href: "/hr/payroll",
    icon: "₹",
  },
  {
    title: "Performance Management",
    description:
      "Goals, appraisals, reviews and employee performance",
    href: "/hr/performance",
    icon: "📈",
  },
];

const alerts = [
  {
    title: "Open Positions",
    value: "12",
    note: "Across 6 departments",
  },
  {
    title: "Total Employees",
    value: "148",
    note: "132 active employees",
  },
  {
    title: "Attendance Today",
    value: "92%",
    note: "136 employees present",
  },
  {
    title: "Pending Leave Requests",
    value: "8",
    note: "Awaiting manager approval",
  },
];

const departmentData = [
  {
    department: "Finance",
    headcount: 24,
    vacancies: 2,
    attendance: "96%",
  },
  {
    department: "Marketing",
    headcount: 31,
    vacancies: 3,
    attendance: "90%",
  },
  {
    department: "Technology",
    headcount: 36,
    vacancies: 4,
    attendance: "94%",
  },
  {
    department: "Operations",
    headcount: 29,
    vacancies: 2,
    attendance: "89%",
  },
  {
    department: "Human Resources",
    headcount: 12,
    vacancies: 1,
    attendance: "100%",
  },
  {
    department: "Customer Support",
    headcount: 16,
    vacancies: 0,
    attendance: "88%",
  },
];

export default function HRDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-950 sm:p-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                KEOS Human Resources
              </p>

              <h1 className="mt-2 text-3xl font-black">
                HR Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                People analytics, workforce health and HR alerts
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Back to KEOS
            </Link>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {alerts.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold text-slate-500">
                {item.title}
              </p>

              <p className="mt-3 text-3xl font-black text-[#102844]">
                {item.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {item.note}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-black">
              HR Modules
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage the complete employee lifecycle
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {hrModules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                    {module.icon}
                  </div>

                  <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#102844]">
                    ›
                  </span>
                </div>

                <h3 className="mt-5 text-base font-black">
                  {module.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-black">
                Department Workforce
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current headcount, vacancies and attendance
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4 text-right">
                      Headcount
                    </th>
                    <th className="px-6 py-4 text-right">
                      Vacancies
                    </th>
                    <th className="px-6 py-4 text-right">
                      Attendance
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {departmentData.map((item) => (
                    <tr
                      key={item.department}
                      className="text-sm hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-black text-slate-800">
                        {item.department}
                      </td>

                      <td className="px-6 py-5 text-right font-bold">
                        {item.headcount}
                      </td>

                      <td className="px-6 py-5 text-right font-bold text-amber-700">
                        {item.vacancies}
                      </td>

                      <td className="px-6 py-5 text-right font-black text-emerald-700">
                        {item.attendance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-3xl bg-[#102844] p-6 text-white shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
              HR Priority
            </p>

            <h2 className="mt-4 text-2xl font-black">
              Recruitment Pipeline
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Twelve positions are currently open. Technology and
              Marketing have the highest hiring requirements.
            </p>

            <div className="mt-6 space-y-3">
              <PipelineRow label="Applications" value="186" />
              <PipelineRow label="Shortlisted" value="42" />
              <PipelineRow label="Interviews" value="18" />
              <PipelineRow label="Offers Released" value="7" />
            </div>

            <Link
              href="/hr/recruitment"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-[#102844]"
            >
              Open Recruitment
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

function PipelineRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
      <span className="text-sm text-slate-300">
        {label}
      </span>

      <span className="text-lg font-black">
        {value}
      </span>
    </div>
  );
}