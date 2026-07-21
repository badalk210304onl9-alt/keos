"use client";

import DepartmentShell from "@/components/keos/department-shell";

export default function AIPage() {
  return (
    <DepartmentShell
      requiredModule="ai"
      title="AI Intelligence"
      subtitle="AI models, body scan, virtual try-on and recommendation systems"
    >
      <ModuleGrid
        items={[
          "AI Dashboard",
          "AI Stylist",
          "Body Scanner",
          "Avatar Generator",
          "Virtual Try-On",
          "Recommendation Engine",
          "AI Logs",
          "Model Health",
          "GPU Status",
          "AI Performance",
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