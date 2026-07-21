import KeosIcon from "@/components/login/keos-icon";

const features = [
  { label: "Secure Infrastructure", icon: "shield" as const },
  { label: "AI Operations", icon: "brain" as const },
  { label: "Live Analytics", icon: "chart" as const },
  { label: "Founder Oversight", icon: "crown" as const },
];

export default function LoginVisual() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden border-r border-white/[0.06] lg:block">
      <div className="absolute inset-0 bg-[#070707]" />
      <div className="keos-grid absolute inset-0 opacity-35" />
      <div className="absolute -left-20 top-20 h-[420px] w-[420px] rounded-full border border-[#c6a15b]/15" />
      <div className="absolute left-10 top-40 h-[520px] w-[520px] rounded-full border border-[#c6a15b]/10" />
      <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full bg-[#c6a15b]/10 blur-[120px]" />

      <div className="absolute inset-x-0 bottom-0 h-[46%]">
        <div className="absolute bottom-0 left-[6%] h-[32%] w-[7%] border border-[#c6a15b]/18 bg-[#0d0d0f]" />
        <div className="absolute bottom-0 left-[15%] h-[46%] w-[9%] border border-[#c6a15b]/22 bg-[#101012]" />
        <div className="absolute bottom-0 left-[27%] h-[60%] w-[8%] border border-[#c6a15b]/26 bg-[#111113]" />
        <div className="absolute bottom-0 left-[39%] h-[40%] w-[10%] border border-[#c6a15b]/18 bg-[#0c0c0e]" />
        <div className="absolute bottom-0 left-[53%] h-[68%] w-[9%] border border-[#c6a15b]/28 bg-[#121214]" />
        <div className="absolute bottom-0 left-[66%] h-[52%] w-[8%] border border-[#c6a15b]/22 bg-[#0f0f11]" />
        <div className="absolute bottom-0 left-[78%] h-[38%] w-[10%] border border-[#c6a15b]/18 bg-[#0d0d0f]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col px-10 py-8 xl:px-14">
        <div>
          <p className="font-serif text-4xl tracking-[0.22em] text-[#e4c477]">KRVE</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.30em] text-white/55">Enterprise Operating System</p>
        </div>

        <div className="my-auto max-w-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c6a15b]/30 bg-[#c6a15b]/8 text-[#e3c170]">
            <KeosIcon name="building" size={26}/>
          </div>
          <p className="mt-7 text-[11px] uppercase tracking-[0.28em] text-[#c6a15b]">Private Enterprise Access</p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.04] tracking-[-0.03em] text-[#f4eee5] xl:text-6xl">
            One secure operating core for every KRVE department.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
            Founder, HR, finance, operations, support and AI teams work through a single role-based system built for clarity, security and control.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/35 backdrop-blur-xl">
            {features.map((feature,index)=>(
              <div key={feature.label} className={["px-3 py-4 text-center", index!==0?"border-l border-white/[0.06]":""].join(" ")}>
                <KeosIcon name={feature.icon} size={20} className="mx-auto text-[#d3ae61]"/>
                <p className="mt-3 text-[9px] uppercase leading-4 tracking-[0.11em] text-white/55">{feature.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.26em] text-[#a98749]">Built for excellence. Designed for leaders.</p>
        </div>
      </div>
    </section>
  );
}
