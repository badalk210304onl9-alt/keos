"use client";

import DepartmentShell from "@/components/keos/department-shell";

export default function SupportPage() {
  return (
    <DepartmentShell
      requiredModule="support"
      title="Customer Support"
      subtitle="Tickets, complaints, returns and customer communication"
    >
      <ModuleGrid
        items={[
          "Support Dashboard",
          "Live Tickets",
          "Customer Profiles",
          "Live Chat",
          "Complaints",
          "Returns",
          "Exchanges",
          "Refund Requests",
          "Order Status",
          "Email",
          "WhatsApp",
          "Call Notes",
          "Satisfaction Reports",
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