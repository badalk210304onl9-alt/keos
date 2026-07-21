"use client";

import DepartmentShell from "@/components/keos/department-shell";

export default function MarketingPage() {
  return (
    <DepartmentShell
      requiredModule="marketing"
      title="Marketing Center"
      subtitle="Campaigns, promotions, influencers and customer engagement"
    >
      <ModuleGrid
        items={[
          "Marketing Dashboard",
          "Campaigns",
          "Email Marketing",
          "SMS",
          "Push Notifications",
          "Influencers",
          "Coupons",
          "SEO",
          "Social Content",
          "Customer Segments",
          "Marketing Analytics",
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