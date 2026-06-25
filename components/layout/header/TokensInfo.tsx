export default function TokensInfo() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#14b8a6]/15 bg-[#14b8a6]/5 px-3 py-2">
      <div className="h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Tokens</span>
        <span className="text-sm font-bold text-[#14b8a6]">2,450</span>
      </div>
    </div>
  );
}
