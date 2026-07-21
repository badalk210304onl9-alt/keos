"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import KeosIcon from "@/components/login/keos-icon";

export default function LoginForm() {
  const router = useRouter();
  const [username,setUsername] = useState("founder");
  const [password,setPassword] = useState("Founder@123");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(resolve=>setTimeout(resolve,550));

    if (username.trim().toLowerCase()!=="founder" || password!=="Founder@123") {
      setError("Invalid username or password.");
      setLoading(false);
      return;
    }

    localStorage.setItem("keos_demo_session", JSON.stringify({name:"Badal Kumar",username:"founder",role:"FOUNDER"}));
    router.push("/dashboard");
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-6 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(198,161,91,0.09),transparent_26%),linear-gradient(180deg,#050505_0%,#09090a_100%)]" />

      <div className="absolute right-6 top-5 z-20">
        <button type="button" className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-black/30 px-3 text-sm text-white/70">
          <KeosIcon name="globe" size={15} className="text-[#c6a15b]"/> English
        </button>
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-[24px] border border-[#c6a15b]/30 bg-[#0d0d0f]/94 p-6 shadow-[0_36px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c6a15b]/24 bg-[#c6a15b]/7 text-[#e1c078]">
            <KeosIcon name="shield" size={26}/>
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.26em] text-[#c6a15b]">Secure Authentication</p>
          <h1 className="mt-3 font-serif text-4xl text-[#f5f2ea]">Welcome Back</h1>
          <p className="mt-2 text-sm text-[#8f887f]">Sign in to continue to KRVE Enterprise OS</p>
          <div className="mx-auto my-5 h-px w-56 bg-gradient-to-r from-transparent via-[#c6a15b]/65 to-transparent"/>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c6a15b]">Email or Username</span>
            <div className="relative">
              <KeosIcon name="mail" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6962]"/>
              <input value={username} onChange={e=>setUsername(e.target.value)} disabled={loading}
                className="h-13 w-full rounded-[16px] border border-white/[0.08] bg-black/30 pl-11 pr-4 text-[#f2ece2] outline-none transition duration-200 focus:border-[#c6a15b]/48 focus:ring-4 focus:ring-[#c6a15b]/7"
                placeholder="Enter your username" autoComplete="username"/>
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c6a15b]">Password</span>
            <div className="relative">
              <KeosIcon name="lock" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6962]"/>
              <input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} disabled={loading}
                className="h-13 w-full rounded-[16px] border border-white/[0.08] bg-black/30 pl-11 pr-11 text-[#f2ece2] outline-none transition duration-200 focus:border-[#c6a15b]/48 focus:ring-4 focus:ring-[#c6a15b]/7"
                placeholder="Enter your password" autoComplete="current-password"/>
              <button type="button" onClick={()=>setShowPassword(v=>!v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6962] transition hover:text-[#d8ba72]"
                aria-label="Toggle password visibility"><KeosIcon name="eye" size={18}/></button>
            </div>
          </label>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-xs text-[#817b73]"><input type="checkbox" className="accent-[#c6a15b]"/>Remember device</label>
            <button type="button" className="text-sm text-[#c6a15b]">Forgot Password?</button>
          </div>

          {error ? <p className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">{error}</p> : null}

          <button disabled={loading} type="submit"
            className="group flex h-13 w-full items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-[#a9823d] via-[#e4c374] to-[#a9823d] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_18px_45px_rgba(198,161,91,0.16)] transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-65">
            {loading?"Authenticating...":"Sign In"}
            {!loading ? <KeosIcon name="arrow" size={17} className="transition group-hover:translate-x-1"/> : null}
          </button>
        </form>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.018] px-4 py-3 text-center text-xs leading-5 text-[#777169]">
          Google Workspace and SSO will be enabled during the real authentication phase.
        </div>

        <p className="mt-5 text-center text-sm text-[#857f77]">Need access? <span className="text-[#c6a15b]">Contact Administrator</span></p>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center justify-between gap-1 px-6 text-[10px] text-[#5f5a54] sm:flex-row">
        <span>© 2026 KRVE Enterprise OS</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>All Systems Operational</span>
      </div>
    </section>
  );
}
