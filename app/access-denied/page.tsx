"use client";

import { useRouter } from "next/navigation";
import { ShieldX } from "lucide-react";

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f8] px-6 text-center">
      <div className="max-w-lg rounded-3xl border border-[#dce3e9] bg-white p-10 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#c4171c]">
          <ShieldX size={30} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#c4171c]">
          Restricted Module
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#10233b]">
          Access Denied
        </h1>

        <p className="mt-4 leading-7 text-[#687482]">
          Aapke department ya role ko is KEOS module ka access nahi diya gaya
          hai.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-7 rounded-xl bg-[#10233b] px-6 py-3 font-semibold text-white"
        >
          Return to Workspace
        </button>
      </div>
    </main>
  );
}