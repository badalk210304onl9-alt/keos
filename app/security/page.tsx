"use client";

import DepartmentShell from "@/components/keos/department-shell";

export default function SecurityPage() {
  return (
    <DepartmentShell
      requiredModule="security"
      title="Security Center"
      subtitle="Sessions, permissions, devices and enterprise audit controls"
    >
      <ModuleGrid
        items={[
          "Security Dashboard",
          "Login Logs",
          "Failed Login Attempts",
          "Device Sessions",
          "IP Restrictions",
          "Permission Management",
          "Employee Access",
          "Audit Logs",
          "Password Policy",
          "System Settings",
        ]}
      />
    </DepartmentShell>
  );
}

function ModuleGrid({ items }: { items: string[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item}
          className="rounded-2xl border border-[#dce3e9] bg-white p-5 text-left text-sm font-semibold text-[#10233b] shadow-sm hover:border-[#c4171c]"
        >
          {item}
        </button>
      ))}
    </section>
  );
}