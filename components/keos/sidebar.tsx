"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgeIndianRupee,
  Boxes,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ContactRound,
  FileBarChart,
  Headphones,
  LayoutDashboard,
  Megaphone,
  PackageCheck,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UsersRound,
  Warehouse,
  X,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onMobileClose: () => void;
};

const navigation = [
  {
    label: "Command Center",
    items: [
      {
        name: "Founder Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Approvals",
        href: "/approvals",
        icon: ClipboardCheck,
      },
      {
        name: "Enterprise Analytics",
        href: "/analytics",
        icon: Activity,
      },
    ],
  },
  {
    label: "Business Operations",
    items: [
      {
        name: "People & HR",
        href: "/hr",
        icon: UsersRound,
      },
      {
        name: "Finance",
        href: "/finance",
        icon: BadgeIndianRupee,
      },
      {
        name: "Products",
        href: "/products",
        icon: ShoppingBag,
      },
      {
        name: "Orders",
        href: "/orders",
        icon: PackageCheck,
      },
      {
        name: "Warehouse",
        href: "/warehouse",
        icon: Warehouse,
      },
      {
        name: "Customer Support",
        href: "/support",
        icon: Headphones,
      },
      {
        name: "Marketing",
        href: "/marketing",
        icon: Megaphone,
      },
    ],
  },
  {
    label: "Intelligence & Control",
    items: [
      {
        name: "KRVE AI",
        href: "/ai",
        icon: BrainCircuit,
      },
      {
        name: "Security",
        href: "/security",
        icon: ShieldCheck,
      },
      {
        name: "Reports",
        href: "/reports",
        icon: FileBarChart,
      },
      {
        name: "Organization",
        href: "/organization",
        icon: Building2,
      },
      {
        name: "Customers",
        href: "/customers",
        icon: ContactRound,
      },
      {
        name: "Inventory",
        href: "/inventory",
        icon: Boxes,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onCollapse,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-[20px_0_60px_rgba(15,23,42,0.06)] transition-all duration-300",
          collapsed ? "lg:w-[92px]" : "lg:w-[280px]",
          mobileOpen
            ? "w-[280px] translate-x-0"
            : "w-[280px] -translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/dashboard"
            onClick={onMobileClose}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] shadow-lg shadow-slate-900/15">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-lg font-black tracking-[0.16em] text-[#10233b]">
                  KEOS
                </p>
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
                  Enterprise Operating System
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-7">
            {navigation.map((section) => (
              <div key={section.label}>
                {!collapsed && (
                  <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                    {section.label}
                  </p>
                )}

                <div className="space-y-1.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.name : undefined}
                        onClick={onMobileClose}
                        className={[
                          "group relative flex min-h-12 items-center rounded-2xl transition-all duration-200",
                          collapsed
                            ? "justify-center px-2"
                            : "gap-3 px-3.5",
                          active
                            ? "bg-[#10233b] text-white shadow-lg shadow-[#10233b]/15"
                            : "text-slate-600 hover:bg-slate-100 hover:text-[#10233b]",
                        ].join(" ")}
                      >
                        {active && !collapsed && (
                          <span className="absolute -left-3 h-7 w-1 rounded-r-full bg-[#d02b3f]" />
                        )}

                        <Icon
                          className={[
                            "h-5 w-5 shrink-0",
                            active
                              ? "text-white"
                              : "text-slate-400 group-hover:text-[#d02b3f]",
                          ].join(" ")}
                        />

                        {!collapsed && (
                          <span className="truncate text-sm font-bold">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 p-3">
          {!collapsed && (
            <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black text-[#10233b]">
                System status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                <span className="text-xs font-semibold text-slate-500">
                  All systems operational
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onCollapse}
            className="hidden h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#10233b] lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                Collapse menu
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}