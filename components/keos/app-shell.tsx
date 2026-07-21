"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import GlobalSearch from "./global-search";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

type AppShellProps = {
  children: React.ReactNode;
};

const publicRoutes = ["/login", "/access-denied"];

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f6f9] text-slate-900">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((current) => !current)}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={[
          "min-h-screen w-full transition-[margin] duration-300",
          collapsed
            ? "lg:ml-[92px] lg:w-[calc(100%-92px)]"
            : "lg:ml-[280px] lg:w-[calc(100%-280px)]",
        ].join(" ")}
      >
        <Topbar
          onMenuOpen={() => setMobileOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <main className="min-h-[calc(100vh-76px)] w-full overflow-x-hidden bg-[#f4f6f9]">
          {children}
        </main>
      </div>

      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}