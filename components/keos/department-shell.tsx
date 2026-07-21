"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeIndianRupee,
  Boxes,
  BrainCircuit,
  Headphones,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Users,
  Warehouse,
} from "lucide-react";

import {
  canAccessModule,
  clearKeosSession,
  getKeosSession,
  type KeosModule,
  type SafeKeosUser,
} from "@/lib/keos-auth";

const navigation: {
  label: string;
  module: KeosModule;
  href: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    label: "Mission Control",
    module: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "People & HR",
    module: "hr",
    href: "/hr",
    icon: Users,
  },
  {
    label: "Finance",
    module: "finance",
    href: "/finance",
    icon: BadgeIndianRupee,
  },
  {
    label: "Customer Support",
    module: "support",
    href: "/support",
    icon: Headphones,
  },
  {
    label: "Products",
    module: "products",
    href: "/products",
    icon: Boxes,
  },
  {
    label: "Orders",
    module: "orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    label: "Warehouse",
    module: "warehouse",
    href: "/warehouse",
    icon: Warehouse,
  },
  {
    label: "Marketing",
    module: "marketing",
    href: "/marketing",
    icon: Megaphone,
  },
  {
    label: "AI Intelligence",
    module: "ai",
    href: "/ai",
    icon: BrainCircuit,
  },
  {
    label: "Security",
    module: "security",
    href: "/security",
    icon: ShieldCheck,
  },
];

export default function DepartmentShell({
  requiredModule,
  title,
  subtitle,
  children,
}: {
  requiredModule: KeosModule;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<SafeKeosUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = getKeosSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    if (!canAccessModule(session, requiredModule)) {
      router.replace("/access-denied");
      return;
    }

    setUser(session);
    setChecking(false);
  }, [requiredModule, router]);

  if (checking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef3f8]">
        <p className="font-semibold text-[#10233b]">
          Loading secure workspace...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef3f8] text-[#10233b]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-[#d6dee6] bg-white lg:flex">
        <div className="border-b border-[#e0e6ec] px-6 py-6">
          <p className="text-3xl font-black tracking-[0.08em] text-[#10233b]">
            KRVE
          </p>

          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c4171c]">
            KEOS Operating Center
          </p>
        </div>

        <div className="px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a96a3]">
            Authorized Modules
          </p>

          <nav className="space-y-1">
            {navigation
              .filter((item) => canAccessModule(user, item.module))
              .map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <button
                    key={item.module}
                    onClick={() => router.push(item.href)}
                    className={[
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                      active
                        ? "border-[#10233b]/10 bg-[#10233b] text-white shadow-md"
                        : "border-transparent text-[#536273] hover:bg-[#edf2f7] hover:text-[#10233b]",
                    ].join(" ")}
                  >
                    <Icon size={17} />

                    <span>{item.label}</span>
                  </button>
                );
              })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-[#dfe5eb] bg-[#f7f9fb] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10233b] text-sm font-semibold text-white">
                {user.initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#10233b]">
                  {user.name}
                </p>

                <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4171c]">
                  {user.role} Access
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                clearKeosSession();
                router.replace("/login");
              }}
              className="mt-4 flex w-full items-center gap-2 border-t border-[#dfe5eb] pt-4 text-sm text-[#657383] hover:text-[#c4171c]"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[250px]">
        <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between border-b border-[#d9e0e7] bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4171c]">
              {user.department}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#10233b]">
              {title}
            </h1>

            <p className="mt-1 text-xs text-[#768391]">{subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-[#dce3e9] bg-[#f8fafc] px-4 py-2 text-right sm:block">
              <p className="text-sm font-semibold text-[#10233b]">
                {user.name}
              </p>

              <p className="text-[11px] text-[#75818d]">
                {user.designation}
              </p>
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce3e9] bg-white text-[#697786]">
              <Settings size={17} />
            </button>
          </div>
        </header>

        <div className="px-4 py-5 sm:px-6 xl:px-8">{children}</div>
      </div>
    </main>
  );
}