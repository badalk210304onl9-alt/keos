import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/keos/app-shell";

export const metadata: Metadata = {
  title: "KEOS — KRVE Enterprise Operating System",
  description:
    "Enterprise command and management system for KRVE The Fashion Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}