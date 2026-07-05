export default function TokensInfo() {
  return (
    <div className="group flex items-center gap-2.5 rounded-2xl border border-teal-500/20 bg-gradient-to-r from-teal-50 to-emerald-50 px-3.5 py-1.5 shadow-sm transition-all duration-300 hover:border-teal-500/40 hover:shadow-md cursor-pointer">
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
        <div className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-bold text-teal-500/70 uppercase tracking-widest">Tokens</span>
        <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 transition-transform duration-300 group-hover:scale-105">2,450</span>
      </div>
    </div>
  );
}
