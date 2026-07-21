type IconName = "shield"|"mail"|"lock"|"eye"|"arrow"|"globe"|"brain"|"chart"|"crown"|"building";

export default function KeosIcon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.7, strokeLinecap:"round" as const, strokeLinejoin:"round" as const, className, "aria-hidden":true };
  if (name==="shield") return <svg {...p}><path d="M12 3 19 6v5c0 4.8-2.8 8-7 10-4.2-2-7-5.2-7-10V6l7-3Z"/><path d="m9.5 12 1.7 1.7 3.5-3.7"/></svg>;
  if (name==="mail") return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (name==="lock") return <svg {...p}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
  if (name==="eye") return <svg {...p}><path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
  if (name==="arrow") return <svg {...p}><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></svg>;
  if (name==="globe") return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>;
  if (name==="brain") return <svg {...p}><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0-1 5.8A3 3 0 0 0 7 18h2.5V4.5ZM14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1 1 5.8A3 3 0 0 1 17 18h-2.5V4.5Z"/></svg>;
  if (name==="chart") return <svg {...p}><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/></svg>;
  if (name==="crown") return <svg {...p}><path d="m4 17 2-9 6 5 6-5 2 9H4Z"/><path d="M7 17h10"/></svg>;
  return <svg {...p}><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01"/></svg>;
}
