"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BadgeIndianRupee,
  BrainCircuit,
  Boxes,
  Building2,
  ClipboardCheck,
  ContactRound,
  FileBarChart,
  Headphones,
  LayoutDashboard,
  Megaphone,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  UsersRound,
  Warehouse,
  X,
} from "lucide-react";

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string[];
  icon: typeof Search;
};

type GlobalSearchProps = {
  open: boolean;
  onClose: () => void;
};

const searchItems: SearchItem[] = [
  {
    id: "dashboard",
    title: "Founder Dashboard",
    description: "Open enterprise command center",
    category: "Navigation",
    href: "/dashboard",
    keywords: ["home", "founder", "overview", "command center"],
    icon: LayoutDashboard,
  },
  {
    id: "approvals",
    title: "Approvals",
    description: "Review pending business approvals",
    category: "Workflow",
    href: "/approvals",
    keywords: ["pending", "approve", "requests", "workflow"],
    icon: ClipboardCheck,
  },
  {
    id: "analytics",
    title: "Enterprise Analytics",
    description: "Company performance and operational intelligence",
    category: "Analytics",
    href: "/analytics",
    keywords: ["charts", "performance", "metrics", "analytics"],
    icon: Activity,
  },
  {
    id: "hr",
    title: "People & HR",
    description: "Employees, recruitment, attendance and payroll",
    category: "Department",
    href: "/hr",
    keywords: [
      "employee",
      "recruitment",
      "attendance",
      "leave",
      "payroll",
      "people",
    ],
    icon: UsersRound,
  },
  {
    id: "finance",
    title: "Finance",
    description: "Revenue, expenses, invoices and accounting",
    category: "Department",
    href: "/finance",
    keywords: [
      "revenue",
      "expense",
      "invoice",
      "gst",
      "payment",
      "budget",
    ],
    icon: BadgeIndianRupee,
  },
  {
    id: "products",
    title: "Products",
    description: "Catalog, collections, variants and pricing",
    category: "Department",
    href: "/products",
    keywords: ["catalog", "sku", "collection", "variant", "price"],
    icon: ShoppingBag,
  },
  {
    id: "orders",
    title: "Orders",
    description: "Orders, returns, refunds and deliveries",
    category: "Department",
    href: "/orders",
    keywords: ["order", "return", "refund", "delivery", "shipment"],
    icon: PackageCheck,
  },
  {
    id: "warehouse",
    title: "Warehouse",
    description: "Stock, purchase orders and dispatch",
    category: "Department",
    href: "/warehouse",
    keywords: ["stock", "inventory", "barcode", "dispatch", "purchase"],
    icon: Warehouse,
  },
  {
    id: "support",
    title: "Customer Support",
    description: "Tickets, complaints and escalations",
    category: "Department",
    href: "/support",
    keywords: ["ticket", "complaint", "customer", "chat", "escalation"],
    icon: Headphones,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns, coupons, influencers and analytics",
    category: "Department",
    href: "/marketing",
    keywords: ["campaign", "coupon", "seo", "influencer", "social media"],
    icon: Megaphone,
  },
  {
    id: "ai",
    title: "KRVE AI",
    description: "AI Stylist, Body Scan, Avatar and Virtual Try-On",
    category: "Intelligence",
    href: "/ai",
    keywords: ["ai", "avatar", "body scan", "stylist", "try on"],
    icon: BrainCircuit,
  },
  {
    id: "security",
    title: "Security",
    description: "Sessions, permissions and security incidents",
    category: "Control",
    href: "/security",
    keywords: ["login", "permissions", "sessions", "incident", "audit"],
    icon: ShieldCheck,
  },
  {
    id: "reports",
    title: "Reports",
    description: "Business reports and exports",
    category: "Analytics",
    href: "/reports",
    keywords: ["report", "download", "export", "summary"],
    icon: FileBarChart,
  },
  {
    id: "organization",
    title: "Organization",
    description: "Departments, offices and reporting structure",
    category: "Control",
    href: "/organization",
    keywords: ["company", "department", "structure", "office"],
    icon: Building2,
  },
  {
    id: "customers",
    title: "Customers",
    description: "Customer profiles and purchase history",
    category: "Business",
    href: "/customers",
    keywords: ["customer", "crm", "phone", "email", "buyer"],
    icon: ContactRound,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Company-wide inventory records",
    category: "Business",
    href: "/inventory",
    keywords: ["inventory", "stock", "quantity", "sku"],
    icon: Boxes,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Roles, permissions, integrations and preferences",
    category: "Control",
    href: "/settings",
    keywords: ["setting", "role", "permission", "integration", "profile"],
    icon: Settings,
  },
];

export default function GlobalSearch({
  open,
  onClose,
}: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchItems.slice(0, 8);
    }

    return searchItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedIndex(0);

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const openItem = (item: SearchItem) => {
    router.push(item.href);
    setQuery("");
    onClose();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((current) =>
        Math.min(current + 1, results.length - 1),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      openItem(results[selectedIndex]);
    }

    if (event.key === "Escape") {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-slate-950/55 px-4 pt-[8vh] backdrop-blur-md">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex max-h-[78vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-[0_30px_100px_rgba(2,6,23,0.35)]">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />

          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search employees, orders, products, departments..."
            className="h-[72px] flex-1 bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <kbd className="hidden rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-black text-slate-400 sm:block">
            ESC
          </kbd>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 flex items-center justify-between px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              {query ? "Search results" : "Quick access"}
            </p>

            <p className="text-xs font-semibold text-slate-400">
              {results.length} results
            </p>
          </div>

          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, index) => {
                const Icon = item.icon;
                const selected = selectedIndex === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => openItem(item)}
                    className={[
                      "flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition",
                      selected
                        ? "bg-[#10233b] text-white"
                        : "text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                        selected
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-[#10233b]",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-black">
                          {item.title}
                        </p>

                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                            selected
                              ? "bg-white/10 text-white/70"
                              : "bg-slate-100 text-slate-400",
                          ].join(" ")}
                        >
                          {item.category}
                        </span>
                      </div>

                      <p
                        className={[
                          "mt-1 truncate text-xs font-medium",
                          selected
                            ? "text-white/60"
                            : "text-slate-400",
                        ].join(" ")}
                      >
                        {item.description}
                      </p>
                    </div>

                    <span
                      className={[
                        "text-xs font-bold",
                        selected ? "text-white/50" : "text-slate-300",
                      ].join(" ")}
                    >
                      Enter
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <p className="mt-4 font-black text-[#10233b]">
                No result found
              </p>

              <p className="mt-1 text-sm font-medium text-slate-400">
                Try searching another employee, module or record.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-bold text-slate-400">
          <span>↑ ↓ Navigate</span>
          <span>Enter Open</span>
          <span>Esc Close</span>
          <span className="ml-auto text-[#d02b3f]">
            KEOS Enterprise Search
          </span>
        </div>
      </div>
    </div>
  );
}