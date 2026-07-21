"use client";

import DepartmentShell from "@/components/keos/department-shell";

export default function WarehousePage() {
  return (
    <DepartmentShell
      requiredModule="warehouse"
      title="Warehouse Control"
      subtitle="Inventory, receiving, packing and dispatch operations"
    >
      <ModuleGrid
        items={[
          "Warehouse Dashboard",
          "Inventory",
          "Stock Receiving",
          "Packing",
          "Dispatch",
          "Barcode",
          "Low Stock",
          "Purchase Orders",
          "Stock Transfers",
          "Warehouse Reports",
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