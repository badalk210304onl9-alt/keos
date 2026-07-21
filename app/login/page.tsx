"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  authenticateDemoUser,
  getRoleHome,
  saveKeosSession,
} from "@/lib/keos-auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("founder");
  const [password, setPassword] = useState("Founder@123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = authenticateDemoUser(username, password);

    if (!user) {
      setError("Username ya password galat hai.");
      setLoading(false);
      return;
    }

    saveKeosSession(user);

    if (remember) {
      localStorage.setItem("keos_remember_device", "true");
    } else {
      localStorage.removeItem("keos_remember_device");
    }

    router.replace(getRoleHome(user.role));
  }

  return (
    <main className="h-screen overflow-hidden bg-[#eef3f8]">
      <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden h-full overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e7eef5] via-[#f7f9fb] to-[#d7e2ec]" />

          <div className="absolute right-[-120px] top-[15%] h-[440px] w-[440px] rounded-full bg-white/50 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col px-14 py-10 xl:px-20">
            <div>
              <h1 className="text-[62px] font-black leading-none tracking-[-0.045em] text-[#10233b]">
                KRVE
              </h1>

              <p className="mt-3 text-lg font-semibold uppercase tracking-[0.19em] text-[#c4171c]">
                KEOS Operating Center
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-32 bg-[#9caab8]" />
                <span className="h-2 w-2 rounded-full bg-[#c4171c]" />
                <span className="h-px w-32 bg-[#9caab8]" />
              </div>

              <p className="mt-5 text-lg tracking-wide text-[#2d4257]">
                Monitoring. Managing. Maximizing.
              </p>
            </div>

            <div className="relative mt-auto h-[45%]">
              <div className="absolute bottom-0 left-[4%] h-[56%] w-[24%] rounded-t-xl border border-[#10233b]/10 bg-[#c9d4df] shadow-xl" />

              <div className="absolute bottom-0 left-[25%] h-[82%] w-[44%] rounded-t-xl border border-[#10233b]/10 bg-[#dce4eb] shadow-2xl" />

              <div className="absolute bottom-0 right-[4%] h-[63%] w-[29%] rounded-t-xl border border-[#10233b]/10 bg-[#cbd6e0] shadow-xl" />

              <div className="absolute bottom-0 left-[38%] h-[51%] w-[19%] rounded-t-md bg-[#12283d] shadow-xl" />

              <div className="absolute bottom-[5%] left-[40%] grid h-[39%] w-[15%] grid-cols-3 gap-2 p-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className="rounded-sm bg-[#f4d48e]/90 shadow-[0_0_14px_rgba(244,212,142,0.32)]"
                  />
                ))}
              </div>

              <div className="absolute left-[32%] top-[25%] rounded-xl bg-white/85 px-6 py-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10233b] text-white">
                    <Building2 size={20} />
                  </div>

                  <div>
                    <p className="text-lg font-black tracking-wide text-[#10233b]">
                      KRVE
                    </p>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4171c]">
                      KEOS Operating Center
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#8297a9]/35 to-transparent" />
            </div>

            <div className="mb-2 mt-6 flex max-w-xl items-center gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_16px_38px_rgba(16,35,59,0.13)] backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-white">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="font-semibold text-[#10233b]">
                  KRVE Enterprise Operating System
                </p>

                <p className="mt-1 text-sm text-[#607184]">
                  Secure department-based access for every KRVE employee.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex h-full items-center justify-center bg-gradient-to-br from-white via-[#f8fafc] to-[#e7edf3] px-5 py-5 sm:px-8">
          <div className="w-full max-w-[520px] rounded-[28px] border border-white bg-white px-8 py-7 shadow-[0_26px_75px_rgba(16,35,59,0.16)] sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10233b] shadow-lg">
                <span className="relative text-4xl font-black leading-none text-white">
                  K
                  <span className="absolute -left-1 top-0 h-6 w-2.5 -skew-x-[20deg] bg-[#c4171c]" />
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-[0.08em] text-[#10233b]">
                KRVE
              </h2>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.17em] text-[#c4171c]">
                KEOS Operating Center
              </p>

              <div className="mx-auto mt-4 flex max-w-[260px] items-center gap-3">
                <span className="h-px flex-1 bg-[#d3d9df]" />
                <span className="h-2 w-2 rounded-full bg-[#c4171c]" />
                <span className="h-px flex-1 bg-[#d3d9df]" />
              </div>

              <h3 className="mt-5 text-3xl font-bold text-[#10233b]">
                Welcome Back!
              </h3>

              <p className="mt-2 text-base text-[#687482]">
                Login using your assigned KEOS account
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              <div className="relative">
                <UserRound
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#74808d]"
                />

                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={loading}
                  placeholder="Username"
                  autoComplete="username"
                  className="h-14 w-full rounded-xl border border-[#ccd4dc] bg-white pl-14 pr-5 text-base text-[#10233b] outline-none transition focus:border-[#10233b] focus:ring-4 focus:ring-[#10233b]/8"
                />
              </div>

              <div className="relative">
                <LockKeyhole
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#74808d]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="h-14 w-full rounded-xl border border-[#ccd4dc] bg-white pl-14 pr-14 text-base text-[#10233b] outline-none transition focus:border-[#10233b] focus:ring-4 focus:ring-[#10233b]/8"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#74808d] transition hover:text-[#10233b]"
                  aria-label="Show or hide password"
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#465566]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 accent-[#c4171c]"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#c4171c] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#aa0c11] via-[#d21b21] to-[#aa0c11] text-base font-bold text-white shadow-[0_14px_34px_rgba(185,25,29,0.22)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "AUTHENTICATING..." : "LOGIN"}

                {!loading ? (
                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                ) : null}
              </button>
            </form>

            <div className="my-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#d7dce2]" />
              <span className="text-xs text-[#727c86]">SECURE</span>
              <span className="h-px flex-1 bg-[#d7dce2]" />
            </div>

            <div className="flex items-center justify-center gap-2 text-[#586573]">
              <ShieldCheck size={18} />
              <span className="text-sm">
                Role and department protected access
              </span>
            </div>

            <p className="mt-4 text-center text-[11px] text-[#929aa4]">
              © 2026 KRVE Enterprise Operating System
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}